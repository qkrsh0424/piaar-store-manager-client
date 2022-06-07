import React, { useRef, useState } from 'react';
import { Container, BodyFieldWrapper, HeadFieldWrapper, ControlFieldWrapper } from "./CreateDownloadHeaderDetailModal.styled";
import { useEffect, useReducer } from "react";
import _ from 'lodash';
import valueUtils from "../../../utils/valueUtils";
import { v4 as uuidv4 } from 'uuid';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CancelIcon from '@mui/icons-material/Cancel';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import CustomCheckbox from '../../module/checkbox/CustomCheckbox';
import CustomSelect from '../../module/select/CustomSelect';
import { excelTranslatorDataConnect } from '../../../data_connect/excelTranslatorDataConnect';
import SingleBlockButton from '../../module/button/SingleBlockButton';

const CreateDownloadHeaderDetailModalComponent = (props) => {
    const uploaderRef = useRef();

    const [downloadHeaderDetails, dispatchDownloadHeaderDetails] = useReducer(downloadHeaderDetailsReducer, initialDownloadHeaderDetails);
    const [uploadHeaderDetails, dispatchUploadHeaderDetails] = useReducer(uploadHeaderDetailsReducer, initialUploadHeaderDetails);

    const [formLoaderOpen, setFormLoaderOpen] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(false);

    useEffect(() => {
        if (!props.selectedTranslatorHeader || !props.selectedTranslatorHeader?.downloadHeaderDetail?.details) {
            dispatchDownloadHeaderDetails({
                type: 'CLEAR'
            })
            return;
        }

        dispatchDownloadHeaderDetails({
            type: 'SET_DATA',
            payload: _.cloneDeep(props.selectedTranslatorHeader?.downloadHeaderDetail?.details)
        });

        dispatchUploadHeaderDetails({
            type: 'SET_DATA',
            payload: _.cloneDeep(props.selectedTranslatorHeader?.uploadHeaderDetail?.details)
        })
    }, [props.selectedTranslatorHeader]);

    useEffect(() => {
        if (!disabledBtn) {
            return;
        }

        let timeout = setTimeout(() => {
            setDisabledBtn(false);
        }, 1000);

        return () => clearTimeout(timeout);

    }, [disabledBtn])

    const __downloadHeaderDetails = {
        req: {
            uploadExcelForm: async (formData) => {
                await excelTranslatorDataConnect().postHeaderFile(formData, 1)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            let returnedDetails = [...res.data.data.uploadedData.details];

                            let newDetails = returnedDetails.map(r => {
                                return {
                                    id: r.id,
                                    headerName: r.colData,
                                    targetCellNumber: -1,
                                    fixedValue: '',
                                    uploadHeaderId: null,
                                }
                            });

                            dispatchDownloadHeaderDetails({
                                type: 'SET_DATA',
                                payload: _.cloneDeep(newDetails)
                            });

                            alert("양식이 성공적으로 업로드되었습니다. 양식 설정을 완료해주세요.");
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 500) {
                            alert('undefined error');
                            return;
                        }
                        alert(res.data.memo);
                    })
            }
        },
        submit: {
            confirm: (e) => {
                e.preventDefault();

                setDisabledBtn(true);

                props.onActionStoreDownloadHeaderForm(downloadHeaderDetails);
            },
            formUpload: async (e) => {
                e.preventDefault();

                // 헤더 타이틀을 선택하지 않은 경우
                if (!props.selectedTranslatorHeader) {
                    alert('헤더 형식을 먼저 선택해주세요.');
                    return;
                }

                // 파일을 선택하지 않은 경우
                if (e.target.files.length === 0) return;

                let addFiles = e.target.files;

                var uploadedFormData = new FormData();
                uploadedFormData.append('file', addFiles[0]);

                await __downloadHeaderDetails.req.uploadExcelForm(uploadedFormData);
            }
        },
        action: {
            addCell: () => {
                let newDetail = {
                    id: uuidv4(),
                    headerName: '',
                    targetCellNumber: -1,
                    fixedValue: '',
                    uploadHeaderId: null
                }

                let targetHeaderDetails = [...downloadHeaderDetails];

                targetHeaderDetails.push(newDetail);

                dispatchDownloadHeaderDetails({
                    type: 'SET_DATA',
                    payload: targetHeaderDetails
                });
            },
            deleteCell: (detailId) => {
                let targetHeaderDetails = [...downloadHeaderDetails];

                targetHeaderDetails = targetHeaderDetails.filter(r => r.id !== detailId);

                dispatchDownloadHeaderDetails({
                    type: 'SET_DATA',
                    payload: targetHeaderDetails
                })
            },
            formUploaderOpen: () => {
                uploaderRef.current.click();
            },
            formLoaderOpen: () => {
                setFormLoaderOpen(true);
            },
            formLoaderClose: () => {
                setFormLoaderOpen(false);
            },
            selectLoadedForm: (form) => {
                let newDetails = form.downloadHeaderDetail.details.map(r => {
                    return {
                        ...r,
                        id: uuidv4()
                    }
                });

                dispatchDownloadHeaderDetails({
                    type: 'SET_DATA',
                    payload: newDetails
                })
                __downloadHeaderDetails.action.formLoaderClose();
            }
        },
        change: {
            valueOfNameWithDetailId: (e, detailId) => {
                let name = e.target.name;
                let value = e.target.value;

                console.log(name, value);
                let targetDownloadHeaderDetails = downloadHeaderDetails.map(r => {
                    if (r.id === detailId) {
                        return {
                            ...r,
                            [name]: value
                        }
                    } else {
                        return {
                            ...r
                        }
                    }
                });

                dispatchDownloadHeaderDetails({
                    type: 'SET_DATA',
                    payload: targetDownloadHeaderDetails
                })
            },
            order: (result) => {
                if (!result.destination) return;

                let targetHeaderDetails = [...downloadHeaderDetails];

                const newDetails = valueUtils.reorder(
                    targetHeaderDetails,
                    result.source.index,
                    result.destination.index
                );

                dispatchDownloadHeaderDetails({
                    type: 'SET_DATA',
                    payload: newDetails
                })
            },
            fixedValueUsage: (e, detailId) => {
                let checked = e.target.checked;

                let targetHeaderDetails = [...downloadHeaderDetails];

                targetHeaderDetails = targetHeaderDetails.map(r => {
                    if (r.id === detailId) {
                        if (checked) {
                            return {
                                ...r,
                                targetCellNumber: parseInt(-1)
                            }
                        } else {
                            return {
                                ...r,
                                targetCellNumber: 0,
                                fixedValue: ''
                            }
                        }
                    } else {
                        return {
                            ...r
                        }
                    }
                })

                dispatchDownloadHeaderDetails({
                    type: 'SET_DATA',
                    payload: targetHeaderDetails
                })
            }
        }
    }

    if (!downloadHeaderDetails) {
        return null;
    }

    /**
     * 기존 양식 불러오기
     */
    if (formLoaderOpen) {
        return (
            <Container>
                <HeadField
                    element={
                        (
                            <>
                                <SingleBlockButton
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '80px',
                                        height: '34px',
                                        borderRadius: '3px'
                                    }}
                                    onClick={__downloadHeaderDetails.action.formLoaderClose}
                                >
                                    <div>
                                        <img
                                            src='/assets/icon/left_arrow_black_icon.svg'
                                            alt={'left arrow black icon'}
                                            width={'24px'}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            flex: 1
                                        }}
                                    >
                                        이전
                                    </div>
                                </SingleBlockButton>
                            </>
                        )
                    }
                />
                {props.excelTranslatorHeaderList?.map(r => {
                    return (
                        <div
                            key={r.id}
                            style={{
                                userSelect: 'none',
                                padding: '15px 10px',
                                borderBottom: '1px solid #e0e0e0',
                                cursor: 'pointer'
                            }}
                            onClick={() => __downloadHeaderDetails.action.selectLoadedForm(r)}
                        >
                            <div
                                style={{
                                    fontSize: '14px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <div>[{r.uploadHeaderTitle}</div>
                                <img src='/assets/icon/right_arrow_black_icon.svg' alt="right_arrow_black" width={24} />
                                <div>
                                    {r.downloadHeaderTitle}] 의
                                </div>
                                <div>
                                    &nbsp;<span style={{ color: '#2c73d2' }}>{r.downloadHeaderTitle}</span> 양식
                                </div>
                            </div>
                            <div
                                style={{
                                    fontSize: '14px'
                                }}
                            >
                                헤더 개수 : {r.downloadHeaderDetail.details.length}
                            </div>
                        </div>
                    );
                })}
            </Container>
        );
    }

    /**
     * 메인 모달
     */
    return (
        <Container>
            <form onSubmit={__downloadHeaderDetails.submit.confirm}>
                <HeadField
                    element={(
                        <>
                            <div className='title'>다운로드 엑셀 양식 설정</div>
                            <button
                                className='submit-button'
                                type='submit'
                                disabled={disabledBtn}
                            >
                                <AddTaskIcon />
                            </button>
                        </>
                    )}
                />
                <ControlField
                    onActionFormLoaderOpen={__downloadHeaderDetails.action.formLoaderOpen}
                    onActionFormUploaderOpen={__downloadHeaderDetails.action.formUploaderOpen}
                />
                <BodyField
                    downloadHeaderDetails={downloadHeaderDetails}
                    uploadHeaderDetails={uploadHeaderDetails}

                    onChangeValueOfNameWithDetailId={__downloadHeaderDetails.change.valueOfNameWithDetailId}
                    onChangeFixedValueUsage={__downloadHeaderDetails.change.fixedValueUsage}
                    onChangeOrder={__downloadHeaderDetails.change.order}
                    onActionAddCell={__downloadHeaderDetails.action.addCell}
                    onActionDeleteCell={__downloadHeaderDetails.action.deleteCell}
                    onActionStoreDownloadHeaderForm={__downloadHeaderDetails.submit.confirm}
                />
            </form>
            <input
                ref={uploaderRef}
                type="file"
                accept=".xls,.xlsx"
                onClick={(e) => e.target.value = ''}
                onChange={__downloadHeaderDetails.submit.formUpload}
                hidden
            />
        </Container >
    )
}

export default CreateDownloadHeaderDetailModalComponent;

const initialDownloadHeaderDetails = null;
const initialUploadHeaderDetails = null;

const downloadHeaderDetailsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialDownloadHeaderDetails;
    }
}

const uploadHeaderDetailsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialUploadHeaderDetails;
    }
}

function HeadField({ element }) {
    return (
        <HeadFieldWrapper>
            {element}
        </HeadFieldWrapper>
    );
}

function ControlField({
    onActionFormLoaderOpen,
    onActionFormUploaderOpen
}) {
    return (
        <ControlFieldWrapper>
            <SingleBlockButton
                type='button'
                style={{
                    flex: 1
                }}
                onClick={onActionFormLoaderOpen}
            >
                기존 양식 불러오기
            </SingleBlockButton>
            <SingleBlockButton
                type='button'
                style={{ flex: 1, marginLeft: -1 }}
                onClick={onActionFormUploaderOpen}
            >
                양식 업로드
            </SingleBlockButton>
        </ControlFieldWrapper>
    );
}

function BodyField(props) {
    return (
        <BodyFieldWrapper>
            <DragDropContext onDragEnd={(result) => props.onChangeOrder(result)}>
                <Droppable droppableId={uuidv4()}>
                    {provided => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <div className="header-detail-box">
                                <div className="grid-box fixed-header">
                                    <div className="header-title"></div>
                                    <div className="header-title">순서</div>
                                    <div className="header-title">헤더명</div>
                                    <div className="header-title">필드값</div>
                                    <div className="header-title">고정값 여부</div>
                                    <div className="header-title">고정값</div>
                                    <div className="header-title">삭제</div>
                                </div>
                                <div>
                                    {props.downloadHeaderDetails.map((downloadHeader, idx) => {
                                        return (
                                            <Draggable
                                                key={downloadHeader.id}
                                                draggableId={downloadHeader.id}
                                                index={idx}
                                            >
                                                {(provided => (
                                                    <div className="grid-box"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <div>
                                                            <MoveDownIcon />
                                                        </div>
                                                        <div>
                                                            <span>{idx + 1}.</span>
                                                        </div>
                                                        <div>
                                                            <input type="text" name='headerName' placeholder='다운로드 엑셀 항목명' onChange={(e) => props.onChangeValueOfNameWithDetailId(e, downloadHeader.id)} value={downloadHeader.headerName} required></input>
                                                        </div>
                                                        <div className="form-selector">
                                                            <CustomSelect
                                                                value={downloadHeader.targetCellNumber}
                                                                name='targetCellNumber'
                                                                onChange={(e) => props.onChangeValueOfNameWithDetailId(e, downloadHeader.id)}
                                                                disabled={parseInt(downloadHeader.targetCellNumber) === -1}
                                                            >
                                                                {parseInt(downloadHeader.targetCellNumber) !== -1 &&
                                                                    <>
                                                                        {props.uploadHeaderDetails.map((headerTitle, idx2) => {
                                                                            return (
                                                                                <option
                                                                                    key={'excel_translator_upload_header_name' + idx2}
                                                                                    value={parseInt(headerTitle.cellNumber)}
                                                                                >
                                                                                    {headerTitle.headerName}
                                                                                </option>
                                                                            )
                                                                        })}
                                                                    </>
                                                                }
                                                                <option value={-1}>고정값</option>
                                                            </CustomSelect>
                                                        </div>
                                                        <div>
                                                            <div>
                                                                <CustomCheckbox
                                                                    checked={parseInt(downloadHeader.targetCellNumber) === -1 && true}
                                                                    onChange={(e) => props.onChangeFixedValueUsage(e, downloadHeader.id)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <input type="text" name='fixedValue' placeholder='엑셀 고정 값'
                                                                onChange={(e) => props.onChangeValueOfNameWithDetailId(e, downloadHeader.id)}
                                                                disabled={!(parseInt(downloadHeader.targetCellNumber) === -1)}
                                                                value={downloadHeader.fixedValue || ''} />
                                                        </div>
                                                        <div className="delete-box">
                                                            <button type="button" onClick={() => props.onActionDeleteCell(downloadHeader.id)}><CancelIcon type="button" sx={{ fontSize: 23 }} /></button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </Draggable>
                                        )
                                    })}
                                </div>
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="add-btn-box">
                <AddCircleOutlineIcon type="button" sx={{ fontSize: 30 }} className="add-btn-icon"
                    onClick={props.onActionAddCell}
                />
            </div>
        </BodyFieldWrapper >
    );
}
import { Container, ControlFieldWrapper, CreateFormFieldWrapper, HeadFieldWrapper } from "./CreateUploadHeaderDetailModal.styled";
import { useEffect, useReducer, useRef, useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from 'uuid';
import valueUtils from "../../../utils/valueUtils";

import AddTaskIcon from '@mui/icons-material/AddTask';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { excelTranslatorDataConnect } from "../../../data_connect/excelTranslatorDataConnect";
import SingleBlockButton from "../../module/button/SingleBlockButton";

const CreateUploadHeaderDetailModalComponent = (props) => {
    const uploaderRef = useRef();
    const [uploadHeaderDetails, dispatchUploadHeaderDetails] = useReducer(uploadHeaderDetailsReducer, initialUploadHeaderDetails);
    const [formLoaderOpen, setFormLoaderOpen] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(false);

    useEffect(() => {
        if (!props.selectedTranslatorHeader || !props.selectedTranslatorHeader?.uploadHeaderDetail?.details) {
            return;
        }

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
    }, [disabledBtn]);

    const __uploadHeaderDetails = {
        req: {
            uploadExcelForm: async (formData, rowStartNumber) => {
                await excelTranslatorDataConnect().postHeaderFile(formData, rowStartNumber)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            let returnedDetails = [...res.data.data.uploadedData.details];

                            let newDetails = returnedDetails.map((r, idx) => {
                                return {
                                    id: r.id,
                                    cellNumber: idx,
                                    headerName: r.colData,
                                    cellType: r.cellType
                                }
                            })

                            dispatchUploadHeaderDetails({
                                type: 'SET_DATA',
                                payload: _.cloneDeep(newDetails)
                            })
                            alert("양식이 성공적으로 업로드되었습니다. 양식 설정을 완료해주세요.");
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        console.log(err);
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

                props.onActionStoreUploadHeaderForm(uploadHeaderDetails);
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

                await __uploadHeaderDetails.req.uploadExcelForm(uploadedFormData, props.selectedTranslatorHeader.rowStartNumber);
            }
        },
        action: {
            addCell: () => {
                let newDetail = {
                    id: uuidv4(),
                    colData: '',
                    cellType: 'String'
                }

                let targetUploadHeaderDetails = [...uploadHeaderDetails];

                targetUploadHeaderDetails.push(newDetail);
                dispatchUploadHeaderDetails({
                    type: 'SET_DATA',
                    payload: targetUploadHeaderDetails
                })
            },
            deleteCell: (detailId) => {
                let targetUploadHeaderDetails = [...uploadHeaderDetails];

                targetUploadHeaderDetails = targetUploadHeaderDetails.filter(r => r.id !== detailId);

                dispatchUploadHeaderDetails({
                    type: 'SET_DATA',
                    payload: targetUploadHeaderDetails
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
                let newDetails = form.uploadHeaderDetail.details.map(r => {
                    return {
                        ...r,
                        id: uuidv4()
                    }
                });

                dispatchUploadHeaderDetails({
                    type: 'SET_DATA',
                    payload: newDetails
                })
                __uploadHeaderDetails.action.formLoaderClose();
            }
        },
        change: {
            valueOfNameWithDetailId: (e, detailId) => {
                let name = e.target.name;
                let value = e.target.value;

                let targetUploadHeaderDetails = uploadHeaderDetails.map(r => {
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

                dispatchUploadHeaderDetails({
                    type: 'SET_DATA',
                    payload: targetUploadHeaderDetails
                })
            },
            order: (result) => {
                if (!result.destination) return;

                let targetUploadHeaderDetails = [...uploadHeaderDetails];

                const newDetails = valueUtils.reorder(
                    targetUploadHeaderDetails,
                    result.source.index,
                    result.destination.index
                );

                dispatchUploadHeaderDetails({
                    type: 'SET_DATA',
                    payload: newDetails
                })
            }
        }
    }

    if (!uploadHeaderDetails) {
        return null;
    }

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
                                    onClick={__uploadHeaderDetails.action.formLoaderClose}
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
                            onClick={() => __uploadHeaderDetails.action.selectLoadedForm(r)}
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
                                    &nbsp;<span style={{ color: '#2c73d2' }}>{r.uploadHeaderTitle}</span> 양식
                                </div>
                            </div>
                            <div
                                style={{
                                    fontSize: '14px'
                                }}
                            >
                                헤더 개수 : {r.uploadHeaderDetail.details.length}
                            </div>
                        </div>
                    );
                })}
            </Container>
        );
    }
    return (
        <Container>
            <form onSubmit={__uploadHeaderDetails.submit.confirm}>
                <HeadField
                    element={
                        (
                            <>
                                <div className="title">업로드 엑셀 양식 설정</div>
                                <button
                                    className="submit-button"
                                    type='submit'
                                    disabled={disabledBtn}
                                >
                                    <AddTaskIcon />
                                </button>
                            </>
                        )
                    }
                />
                <ControlField
                    onActionFormLoaderOpen={__uploadHeaderDetails.action.formLoaderOpen}
                    onActionFormUploaderOpen={__uploadHeaderDetails.action.formUploaderOpen}
                />
                <BodyField
                    uploadHeaderDetails={uploadHeaderDetails}

                    onChangeValueOfNameWithDetailId={__uploadHeaderDetails.change.valueOfNameWithDetailId}
                    onActionAddCell={__uploadHeaderDetails.action.addCell}
                    onActionDeleteCell={__uploadHeaderDetails.action.deleteCell}
                    onChangeOrder={__uploadHeaderDetails.change.order}
                ></BodyField>
            </form>
            <input
                ref={uploaderRef}
                type="file"
                accept=".xls,.xlsx"
                onClick={(e) => e.target.value = ''}
                onChange={__uploadHeaderDetails.submit.formUpload}
                hidden
            />
        </Container>
    )
}

export default CreateUploadHeaderDetailModalComponent;

const initialUploadHeaderDetails = null;

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
        <CreateFormFieldWrapper>
            <div className="detail-body">
                <DragDropContext onDragEnd={(result) => props.onChangeOrder(result)}>
                    <Droppable droppableId={uuidv4()}>
                        {provided => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <div className="detail-list">
                                    {props.uploadHeaderDetails.map((uploadHeader, idx) => {
                                        return (
                                            <Draggable
                                                key={uploadHeader.id}
                                                draggableId={uploadHeader.id}
                                                index={idx}
                                            >
                                                {(provided => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <div key={'create_header_detail_idx' + idx} className="mb-3 list-group">
                                                            <div className="data-text">
                                                                <div>
                                                                    <MoveDownIcon />
                                                                </div>
                                                                <span>{idx + 1}.</span>
                                                                <input type="text" name='headerName' placeholder='업로드 엑셀 항목명' onChange={(e) => props.onChangeValueOfNameWithDetailId(e, uploadHeader.id)} value={uploadHeader.headerName || uploadHeader.colData || ''} required />
                                                            </div>
                                                            <div className="delete-box">
                                                                <CancelIcon type="button" sx={{ fontSize: 33 }}
                                                                    onClick={() => props.onActionDeleteCell(uploadHeader.id)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </Draggable>
                                        )
                                    })}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <div className="add-btn-box">
                <AddCircleOutlineIcon type="button" sx={{ fontSize: 30 }} className="add-btn"
                    onClick={props.onActionAddCell}
                />
            </div>
        </CreateFormFieldWrapper>
    );
}
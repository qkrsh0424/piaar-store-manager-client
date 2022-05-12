import { Container } from "./DownloadDataTable.styled";
import { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import queryString from 'query-string';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

import DataControlFieldView from "./DataControlField.view";
import TableFieldView from "./TableField.view";
import CommonModalComponent from "../../module/modal/CommonModalComponent";
import CreateUploadHeaderDetailModalComponent from "../create-upload-header-detail-modal/CreateUploadHeaderDetailModal.component";
import CreateDownloadHeaderDetailModalComponent from "../create-download-header-detail-modal/CreateDownloadHeaderDetailModal.component";

class DownloadHeaderDetail {
    constructor() {
        this.id = uuidv4();
        this.headerName = '';
        this.targetCellNumber = -1;
        this.fixedValue = '';
        this.uploadHeaderId = null;
    }

    toJSON() {
        return {
            id: this.id,
            headerName: this.headerName,
            targetCellNumber: this.targetCellNumber,
            fixedValue: this.fixedValue,
            uploadHeaderId: this.uploadheaderId
        }
    }
}

const DownloadDataTableComponent = (props) => {
    const location = useLocation();
    let params = queryString.parse(location.search);

    const [createTranslatorDownloadHeaderDetailModalOpen, setCreateTranslatorDownloadHeaderDetailModalOpen] = useState(false);
    const [fixedValueCheckList, setFixedValueCheckList] = useState([]);

    const [selectedHeaderTitleState, dispatchSelectedHeaderTitleState] = useReducer(selectedHeaderTitleStateReducer, initialSelectedHeaderTitleState);
    const [updateDownloadHeaderForm, dispatchUpdateDownloadHeaderForm] = useReducer(updateDownloadHeaderFormReducer, initialUpdateDownloadHeaderForm);

    useEffect(() => {
        function initHeaderTitleState() {
            if (!props.excelTranslatorHeaderList) {
                return;
            }

            if(!params.headerId) {
                dispatchSelectedHeaderTitleState({
                    type: 'CLEAR'
                });
                return;
            }

            let headerId = params.headerId;
            let headerTitleState = props.excelTranslatorHeaderList?.filter(r => r.id === headerId)[0];

            dispatchSelectedHeaderTitleState({
                type: 'INIT_DATA',
                payload: headerTitleState
            });
        }
        initHeaderTitleState();
    }, [params.headerId, props.excelTranslatorHeaderList]);

    const onCreateTranslatorDownloadHeaderDetailModalOpen = (e) => {
        e.preventDefault();

        if (!selectedHeaderTitleState) {
            alert('헤더 형식을 먼저 선택해주세요.');
            return;
        } else if (!(selectedHeaderTitleState.uploadHeaderDetail.details.length > 0)) {
            alert('업로드 엑셀 양식을 먼저 설정해주세요.');
            return;
        }

        dispatchUpdateDownloadHeaderForm({
            type: 'CLEAR'
        });

        dispatchUpdateDownloadHeaderForm({
            type: 'INIT_DATA',
            payload: { ...selectedHeaderTitleState }
        });

        setFixedValueCheckList(selectedHeaderTitleState.downloadHeaderDetail.details.map(r => {
            if (r.targetCellNumber === -1) {
                return r.id;
            }
        }));

        if (!(selectedHeaderTitleState.downloadHeaderDetail.details.length > 0)) {
            dispatchUpdateDownloadHeaderForm({
                type: 'INIT_DATA',
                payload: {
                    ...selectedHeaderTitleState,
                    downloadHeaderDetail: {
                        details: [new DownloadHeaderDetail().toJSON()]
                    }
                }
            });
        }
        setCreateTranslatorDownloadHeaderDetailModalOpen(true);
    }

    const onCreateTranslatorDownloadHeaderDetailModalClose = () => {
        setCreateTranslatorDownloadHeaderDetailModalOpen(false);
    }

    const onActionAddFormCell = (e) => {
        e.preventDefault();

        dispatchUpdateDownloadHeaderForm({
            type: 'ADD_DATA'
        });
    }

    const onActionDeleteCell = (e, headerId) => {
        e.preventDefault();

        if (updateDownloadHeaderForm.downloadHeaderDetail.details.length > 1) {
            let newDetails = updateDownloadHeaderForm.downloadHeaderDetail.details.filter(r => r.id !== headerId);

            dispatchUpdateDownloadHeaderForm({
                type: 'SET_DOWNLOAD_HEADER_DETAIL_DATA',
                payload: newDetails
            });
        } else {
            alert('삭제할 수 없습니다.');
        }
    }

    const onActionSelectUploadHeader = (e, headerId) => {
        e.preventDefault();

        let newDetails = updateDownloadHeaderForm.downloadHeaderDetail.details.map(r => {
            if (r.id === headerId) {
                let uploadHeaderId = updateDownloadHeaderForm.uploadHeaderDetail.details.filter(uploadHeader => uploadHeader.cellNumber === e.target.value)[0].id;

                return {
                    ...r,
                    targetCellNumber: parseInt(e.target.value),
                    uploadHeaderId: uploadHeaderId
                }
            } else {
                return {
                    ...r
                }
            }
        });

        dispatchUpdateDownloadHeaderForm({
            type: 'SET_DOWNLOAD_HEADER_DETAIL_DATA',
            payload: newDetails
        });
    }

    const onChangeInputValue = (e, headerId) => {
        e.preventDefault();

        let newDetails = updateDownloadHeaderForm?.downloadHeaderDetail.details.map(r => {
            if (r.id === headerId) {
                return {
                    ...r,
                    [e.target.name]: e.target.value
                }
            } else {
                return {
                    ...r
                }
            }
        });

        dispatchUpdateDownloadHeaderForm({
            type: 'SET_DOWNLOAD_HEADER_DETAIL_DATA',
            payload: newDetails
        })
    }

    const isChecked = (headerId) => {
        return fixedValueCheckList.includes(headerId);
    }

    const checkOne = (e, headerId) => {
        if (e.target.checked) {
            setFixedValueCheckList(fixedValueCheckList.concat(headerId));

            // 체크하면 targetCellNumber을 -1으로 변경
            let newDetails = updateDownloadHeaderForm.downloadHeaderDetail.details.map(r=>{
                if(r.id === headerId){
                    return {
                        ...r,
                        targetCellNumber: parseInt(-1)
                    }
                }else{
                    return {
                        ...r
                    }
                }
            });

            dispatchUpdateDownloadHeaderForm({
                type: 'SET_DOWNLOAD_HEADER_DETAIL_DATA',
                payload: newDetails
            })
        } else {
            setFixedValueCheckList(fixedValueCheckList.filter(r => r !== headerId));

            // 체크 해제하면 fixedValue를 빈 값으로 변경
            let newDetails = updateDownloadHeaderForm.downloadHeaderDetail.details.map(r=>{
                if(r.id === headerId){
                    return {
                        ...r,
                        fixedValue: ""
                    }
                }else{
                    return {
                        ...r
                    }
                }
            });

            dispatchUpdateDownloadHeaderForm({
                type: 'SET_DOWNLOAD_HEADER_DETAIL_DATA',
                payload: newDetails
            })
        }
    }

    // 다운로드 엑셀 헤더의 targetCellNumber에 대응하는 업로드 엑셀의 헤더명을 찾는다.
    const getUploadHeaderName = (targetCellNumber) => {
        let result = updateDownloadHeaderForm?.uploadHeaderDetail?.details.filter(r => r.cellNumber === targetCellNumber)[0];
        return result?.cellNumber ?? -1;
    }

    const onActionStoreDownloadHeaderForm = async (e) => {
        e.preventDefault();

        await props._onSubmit_storeDownloadHeaderDetail(updateDownloadHeaderForm);

        dispatchSelectedHeaderTitleState({
            type: 'INIT_DATA',
            payload: updateDownloadHeaderForm
        })

        onCreateTranslatorDownloadHeaderDetailModalClose();
    }

    return (
        <Container>
            <DataControlFieldView
                onCreateTranslatorDownloadHeaderDetailModalOpen={(e) => onCreateTranslatorDownloadHeaderDetailModalOpen(e)}
            ></DataControlFieldView>

            <TableFieldView
                selectedHeaderTitleState={selectedHeaderTitleState}
            ></TableFieldView>

            {/* ExcelTranslator Donwload Header Create Modal */}
            <CommonModalComponent
                open={createTranslatorDownloadHeaderDetailModalOpen}
                onClose={() => onCreateTranslatorDownloadHeaderDetailModalClose()}
                maxWidth={'md'}
                fullWidth={true}
            >
                <CreateDownloadHeaderDetailModalComponent
                    updateDownloadHeaderForm={updateDownloadHeaderForm}

                    onActionAddFormCell={(e) => onActionAddFormCell(e)}
                    onActionDeleteCell={(e, headerId) => onActionDeleteCell(e, headerId)}
                    onActionSelectUploadHeader={(e, headerId) => onActionSelectUploadHeader(e, headerId)}
                    onChangeInputValue={(e, headerId) => onChangeInputValue(e, headerId)}
                    isChecked={(headerId) => isChecked(headerId)}
                    checkOne={(e, headerId) => checkOne(e, headerId)}
                    getUploadHeaderName={(targetCellNum) => getUploadHeaderName(targetCellNum)}
                    onActionStoreDownloadHeaderForm={(e) => onActionStoreDownloadHeaderForm(e)}
                ></CreateDownloadHeaderDetailModalComponent>
            </CommonModalComponent>
        </Container>
    )
}

export default DownloadDataTableComponent;

const initialSelectedHeaderTitleState = null;
const initialUpdateDownloadHeaderForm = null;

const selectedHeaderTitleStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return {...action.payload};
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}

const updateDownloadHeaderFormReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'SET_DOWNLOAD_HEADER_DETAIL_DATA':
            return {
                ...state,
                downloadHeaderDetail: {
                    ...state.downloadHeaderDetail,
                    details: action.payload
                }
            }
        case 'ADD_DATA':
            return {
                ...state,
                downloadHeaderDetail: {
                    ...state.downloadHeaderDetail,
                    details: state.downloadHeaderDetail.details.concat(new DownloadHeaderDetail().toJSON())
                }
            }
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}
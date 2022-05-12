import { Container } from "./UploadDataTable.styled";
import { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import queryString from 'query-string';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

import DataControlFieldView from "./DataControlField.view";
import TableFieldView from "./TableField.view";
import CommonModalComponent from "../../module/modal/CommonModalComponent";
import CreateUploadHeaderDetailModalComponent from "../create-upload-header-detail-modal/CreateUploadHeaderDetailModal.component";

class UploadHeaderDetail {
    constructor() {
        this.id = uuidv4();
        this.cellNumber = -1;
        this.headerName = '';
        this.cellType = '';
    }

    toJSON() {
        return {
            id: this.id,
            cellNumber: this.cellNumber,
            headerName: this.headerName,
            cellType: this.cellType
        }
    }
}

const UploadDataTableComponent = (props) => {
    const userRdx = useSelector(state => state.user);
    const location = useLocation();
    let params = queryString.parse(location.search);

    const [createTranslatorUploadHeaderDetailModalOpen, setCreateTranslatorUploadHeaderDetailModalOpen] = useState(false);
    const [selectedHeaderTitleState, dispatchSelectedHeaderTitleState] = useReducer(selectedHeaderTitleStateReducer, initialSelectedHeaderTitleState);
    const [createUploadHeaderDetailState, dispatchCreateUploadHeaderDetailState] = useReducer(createUploadHeaderDetailStateReducer, initialCreateUploadHeaderDetailState);
    const [uploadedExcelHeaderDataState, dispatchUploadedExcelHeaderDataState] = useReducer(uploadExcelHeaderDataStateReducer, initialUploadExcelHeaderDataState);
    const [uploadedExcelDataState, dispatchUploadedExcelDataState] = useReducer(uploadExcelDataStateReducer, initialUploadExcelDataState);
    
    useEffect(() => {
        function initHeaderTitleState() {
            if (!props.excelTranslatorHeaderList) {
                return;
            }

            if(!params.headerId) {
                dispatchSelectedHeaderTitleState({
                    type: 'CLEAR'
                });
                dispatchUploadedExcelHeaderDataState({
                    type: 'CLEAR'
                });
                dispatchUploadedExcelDataState({
                    type: 'CLEAR'
                })
                return;
            }

            dispatchUploadedExcelHeaderDataState({
                type: 'CLEAR'
            });
            dispatchUploadedExcelDataState({
                type: 'CLEAR'
            });
            
            let headerId = params.headerId;
            let headerTitleState = props.excelTranslatorHeaderList?.filter(r => r.id === headerId)[0];

            dispatchSelectedHeaderTitleState({
                type: 'INIT_DATA',
                payload: headerTitleState
            });
        }
        initHeaderTitleState();
    }, [params.headerId, props.excelTranslatorHeaderList]);

    useEffect(() => {
        if (!selectedHeaderTitleState) {
            return;
        }

        if (selectedHeaderTitleState?.uploadHeaderDetail.details.length) {
            let data = selectedHeaderTitleState.uploadHeaderDetail.details.map(r => {
                    return {
                        ...r,
                        colData: r.headerName
                    }
                });
            dispatchUploadedExcelHeaderDataState({
                type: 'INIT_DATA',
                payload: data
            });
            return;
        }

        if(!props.uploadedExcelData) {
            return;
        }

        // 헤더 데이터 설정
        dispatchUploadedExcelHeaderDataState({
            type: 'INIT_DATA',
            payload: props.uploadedExcelData[0].uploadedData.details
        });
    }, [selectedHeaderTitleState, props.uploadedExcelData]);

    useEffect(() => {
        if(!selectedHeaderTitleState) {
            return;
        }
        
        if(!props.uploadedExcelData) {
            return;
        }

        // 헤더 데이터를 제외한 데이터 설정
        dispatchUploadedExcelDataState({
            type: 'INIT_DATA',
            payload: props.uploadedExcelData?.filter((r, idx) => idx !== 0)
        });
    }, [selectedHeaderTitleState, props.uploadedExcelData]);

    const onActionDownloadExcelForm = async (e) => {
        e.preventDefault();

        let downloadDetail = selectedHeaderTitleState.uploadHeaderDetail.details.map(r => {
            return {
                ...r,
                colData: r.headerName
            }
        });

        await props._onAction_downloadUploadHeaderDetails(selectedHeaderTitleState.uploadHeaderTitle, downloadDetail);
    }

    const onCreateTranslatorUploadHeaderDetailModalOpen = (e) => {
        e.preventDefault();

        if (!selectedHeaderTitleState) {
            alert('헤더 형식을 먼저 선택해주세요.');
            return;
        }

        setCreateTranslatorUploadHeaderDetailModalOpen(true);

        // 이미 등록된 헤더 양식이 있는 경우
        if (selectedHeaderTitleState?.uploadHeaderDetail.details.length > 0) {
            let createHeaderData = {
                uploadedData: {
                    details: selectedHeaderTitleState?.uploadHeaderDetail.details
                }
            }

            dispatchCreateUploadHeaderDetailState({
                type: 'INIT_DATA',
                payload: createHeaderData
            });
        } else if (props.uploadedExcelData) {     // 업로드된 엑셀 파일이 있는 경우
            dispatchCreateUploadHeaderDetailState({
                type: 'INIT_DATA',
                payload: props.uploadedExcelData[0]
            });
        } else {     // 새로운 양식을 만들 경우
            let createHeaderData = {
                id: uuidv4(),
                uploadedData: {
                    details: [{
                        id: uuidv4(),
                        headerName: '',
                        cellType: 'String'
                    }]
                }
            }

            dispatchCreateUploadHeaderDetailState({
                type: 'INIT_DATA',
                payload: createHeaderData
            })
        }
    }

    const onCreateTranslatorUploadHeaderDetailModalClose = () => {
        setCreateTranslatorUploadHeaderDetailModalOpen(false);
    }

    const onActionAddFormCell = (e) => {
        e.preventDefault();

        let newDetail = {
            id: uuidv4(),
            colData: '',
            cellType: 'String'
        }

        dispatchCreateUploadHeaderDetailState({
            type: 'SET_UPLOAD_HEADER_DETAIL_DATA',
            payload: createUploadHeaderDetailState.uploadedData.details.concat(newDetail)
        });
    }

    const onActionDeleteFormCell = (e, uploadHeaderId) => {
        e.preventDefault();

        let newDetails = createUploadHeaderDetailState.uploadedData.details.filter(r => r.id !== uploadHeaderId);

        dispatchCreateUploadHeaderDetailState({
            type: 'SET_UPLOAD_HEADER_DETAIL_DATA',
            payload: newDetails
        });
    }

    const onActionMoveHeaderFormUp = (e, detailId) => {
        e.preventDefault();

        let targetIdx = -1;

        createUploadHeaderDetailState.uploadedData.details.forEach((detail, idx) => {
            if (detail.id === detailId) {
                targetIdx = idx;
                return;
            }
        });

        onChangeArrayContorl(targetIdx, parseInt(targetIdx) - 1);
    }

    const onActionMoveHeaderFormDown = (e, detailId) => {
        e.preventDefault();

        let targetIdx = -1;

        createUploadHeaderDetailState.uploadedData.details.forEach((detail, idx) => {
            if (detail.id === detailId) {
                targetIdx = idx;
                return;
            }
        });

        onChangeArrayContorl(targetIdx, parseInt(targetIdx) + 1);
    }

    const onChangeArrayContorl = (targetIdx, moveValue) => {
        if (!(createUploadHeaderDetailState.uploadedData.details.length > 1)) return;

        let newPosition = parseInt(moveValue);
        if (newPosition < 0 || newPosition >= createUploadHeaderDetailState.uploadedData.details.length) return;

        let headerDetailList = createUploadHeaderDetailState.uploadedData.details;
        let target = headerDetailList.splice(targetIdx, 1)[0];
        headerDetailList.splice(newPosition, 0, target);

        dispatchCreateUploadHeaderDetailState({
            type: 'SET_UPLOAD_HEADER_DETAIL_DATA',
            payload: headerDetailList
        })
    }

    const onActionStoreUploadHeaderForm = async (e) => {
        e.preventDefault();

        if(!window.confirm('업로드 엑셀헤더 양식을 변경하면 다운로드 엑셀헤더 양식은 초기화됩니다.')) {
            return;
        }

        let uploadedHeader = createUploadHeaderDetailState.uploadedData;

        let uploadDetails = uploadedHeader.details.map((r, idx) => {
            let data = new UploadHeaderDetail().toJSON();
            data = {
                ...data,
                cellNumber: idx,
                headerName: r.headerName || r.colData,
                cellType: r.cellType
            };

            return data;
        });

        let excelHeader = {
            ...selectedHeaderTitleState,
            uploadHeaderDetail: {
                ...selectedHeaderTitleState.uploadHeaderDetail,
                details: uploadDetails
            }
        };

        dispatchSelectedHeaderTitleState({
            type: 'SET_UPLOAD_HEADER_DETAIL_DATA',
            payload: uploadDetails
        });

        await props._onSubmit_createUploadHeaderDetails(excelHeader);

        onCreateTranslatorUploadHeaderDetailModalClose();
    }

    const onChangeUploadHeaderDetail = (e, detailId) => {
        e.preventDefault();

        let newDetails = createUploadHeaderDetailState?.uploadedData.details.map(r => {
            if (r.id === detailId) {
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

        dispatchCreateUploadHeaderDetailState({
            type: 'SET_UPLOAD_HEADER_DETAIL_DATA',
            payload: newDetails
        });
    }

    return (
        <Container>
            <DataControlFieldView
                selectedHeaderTitleState={selectedHeaderTitleState}

                onActionDownloadExcelForm={(e) => onActionDownloadExcelForm(e)}
                onCreateTranslatorUploadHeaderDetailModalOpen={(e) => onCreateTranslatorUploadHeaderDetailModalOpen(e)}
            ></DataControlFieldView>

            <TableFieldView
                uploadedExcelHeaderDataState={uploadedExcelHeaderDataState}
                uploadedExcelDataState={uploadedExcelDataState}
            ></TableFieldView>

            {/* ExcelTranslatorHeader Create Modal */}
            <CommonModalComponent
                open={createTranslatorUploadHeaderDetailModalOpen}
                onClose={() => onCreateTranslatorUploadHeaderDetailModalClose()}
                maxWidth={'xs'}
                fullWidth={true}
            >
                <CreateUploadHeaderDetailModalComponent
                    createUploadHeaderDetailState={createUploadHeaderDetailState}

                    onActionAddFormCell={(e) => onActionAddFormCell(e)}
                    onActionDeleteFormCell={(e, uploadHeaderId) => onActionDeleteFormCell(e, uploadHeaderId)}
                    onActionMoveHeaderFormDown={(e, detailId) => onActionMoveHeaderFormDown(e, detailId)}
                    onActionMoveHeaderFormUp={(e, detailId) => onActionMoveHeaderFormUp(e, detailId)}
                    onActionStoreUploadHeaderForm={(e) => onActionStoreUploadHeaderForm(e)}
                    onChangeUploadHeaderDetail={(e, detailId) => onChangeUploadHeaderDetail(e, detailId)}
                ></CreateUploadHeaderDetailModalComponent>
            </CommonModalComponent>
        </Container>
    )
}

export default UploadDataTableComponent;

const initialSelectedHeaderTitleState = null;
const initialCreateUploadHeaderDetailState = null;
const initialUploadExcelHeaderDataState = null;
const initialUploadExcelDataState = null;

const selectedHeaderTitleStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'SET_UPLOAD_HEADER_DETAIL_DATA':
            return {
                ...state,
                uploadHeaderDetail: {
                    ...state.uploadHeaderDetail,
                    details: action.payload
                }
            }
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}

const createUploadHeaderDetailStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'SET_UPLOAD_HEADER_DETAIL_DATA':
            return {
                ...state,
                uploadedData: {
                    ...state.uploadedData,
                    details: action.payload
                }
            }
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}

const uploadExcelHeaderDataStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}

const uploadExcelDataStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}
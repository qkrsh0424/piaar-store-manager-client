import { Container } from "./UploadHeaderTable.styled";
import { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import queryString from 'query-string';
import { useLocation } from "react-router-dom";

import DataControlFieldView from "./DataControlField.view";
import TableFieldView from "./TableField.view";
import CommonModalComponent from "../../module/modal/CommonModalComponent";
import CreateUploadHeaderDetailModalComponent from "../create-upload-header-detail-modal/CreateUploadHeaderDetailModal.component";
import valueUtils from "../../../utils/valueUtils";

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

const UploadHeaderTableComponent = (props) => {
    const location = useLocation();
    let params = queryString.parse(location.search);
    
    const [createTranslatorUploadHeaderDetailModalOpen, setCreateTranslatorUploadHeaderDetailModalOpen] = useState(false);
    const [selectedHeaderTitleState, dispatchSelectedHeaderTitleState] = useReducer(selectedHeaderTitleStateReducer, initialSelectedHeaderTitleState);
    const [createUploadHeaderDetailState, dispatchCreateUploadHeaderDetailState] = useReducer(createUploadHeaderDetailStateReducer, initialCreateUploadHeaderDetailState);
    const [uploadHeaderExcelDataState, dispatchUploadHeaderExcelDataState] = useReducer(uploadHeaderExcelDataStateReducer, initialUploadHeaderExcelDataState);

    useEffect(() => {
        function initHeaderTitleState() {
            if (!props.excelTranslatorHeaderList) {
                return;
            }

            if(!params.headerId) {
                dispatchSelectedHeaderTitleState({
                    type: 'CLEAR'
                });
                dispatchUploadHeaderExcelDataState({
                    type: 'CLEAR'
                });
                return;
            }

            dispatchUploadHeaderExcelDataState({
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

        if (selectedHeaderTitleState?.uploadHeaderDetail?.details.length) {
            let data = selectedHeaderTitleState.uploadHeaderDetail.details.map(r => {
                    return {
                        ...r,
                        colData: r.headerName
                    }
                });

            dispatchUploadHeaderExcelDataState({
                type: 'INIT_DATA',
                payload: data
            });
            return;
        }
    }, [selectedHeaderTitleState]);

    useEffect(() => {
        if(!props.uploadedUploadHeaderExcelData) {
            dispatchUploadHeaderExcelDataState({
                type: 'CLEAR'
            });
            return;
        }

        // 헤더 데이터 설정
        dispatchUploadHeaderExcelDataState({
            type: 'INIT_DATA',
            payload: props.uploadedUploadHeaderExcelData.uploadedData.details
        });
    }, [props.uploadedUploadHeaderExcelData])

    const onActionUploadUploadHeaderFormExcelFile = async (e) => {
        e.preventDefault();

        // 헤더 타이틀을 선택하지 않은 경우
        if (!selectedHeaderTitleState) {
            alert('헤더 형식을 먼저 선택해주세요.');
            return;
        }

        // 파일을 선택하지 않은 경우
        if (e.target.files.length === 0) return;

        let addFiles = e.target.files;

        var uploadedFormData = new FormData();
        uploadedFormData.append('file', addFiles[0]);
        uploadedFormData.append(
            "dto",
            new Blob([JSON.stringify(selectedHeaderTitleState)], { type: "application/json" })
        );

        await props._onSubmit_uploadUploadHeaderFormExcelFile(uploadedFormData, selectedHeaderTitleState.rowStartNumber);
    }

    const onCreateTranslatorUploadHeaderDetailModalOpen = (e) => {
        e.preventDefault();

        if (!selectedHeaderTitleState) {
            alert('헤더 형식을 먼저 선택해주세요.');
            return;
        }

        dispatchCreateUploadHeaderDetailState({
            type: 'INIT_DATA',
            payload: { ...selectedHeaderTitleState }
        });
        
        // 다운로드헤더 엑셀파일이 업로드 되었다면 이 데이터로 헤더 설정
        if (uploadHeaderExcelDataState) {
            let dataArr = [];
            for (let i = 0; i < uploadHeaderExcelDataState.length; i++) {
                let data = new UploadHeaderDetail().toJSON();
                data = {
                    ...data,
                    cellNumber: parseInt(i),
                    headerName: uploadHeaderExcelDataState[i].colData,
                    cellType: 'STRING'
                }
                dataArr.push(data);
            }

            dispatchCreateUploadHeaderDetailState({
                type: 'INIT_DATA',
                payload: {
                    ...selectedHeaderTitleState,
                    uploadHeaderDetail: {
                        details: dataArr
                    }
                }
            });
        } else {
            dispatchCreateUploadHeaderDetailState({
                type: 'INIT_DATA',
                payload: {
                    ...selectedHeaderTitleState,
                    uploadHeaderDetail: {
                        details: [new UploadHeaderDetail().toJSON()]
                    }
                }
            });
        }

        setCreateTranslatorUploadHeaderDetailModalOpen(true);
    }

    const onCreateTranslatorUploadHeaderDetailModalClose = () => {
        setCreateTranslatorUploadHeaderDetailModalOpen(false);
    }

    const onActionStoreUploadHeaderForm = async (e) => {
        e.preventDefault();

        if(selectedHeaderTitleState.downloadHeaderDetail.details.length > 0) {
            // 다운로드헤더 형식이 설정되어있다면 형식초기화
            if(!window.confirm('업로드 엑셀헤더 양식을 변경하면 다운로드 엑셀헤더 양식은 초기화됩니다.')) {
                return;
            }
        }

        let uploadedHeader = createUploadHeaderDetailState.uploadHeaderDetail;

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

    const onActionAddFormCell = (e) => {
        e.preventDefault();

        let newDetail = {
            id: uuidv4(),
            colData: '',
            cellType: 'String'
        }

        dispatchCreateUploadHeaderDetailState({
            type: 'SET_UPLOAD_HEADER_DETAIL_DATA',
            payload: createUploadHeaderDetailState.uploadHeaderDetail.details.concat(newDetail)
        });
    }

    const onActionDeleteFormCell = (e, uploadHeaderId) => {
        e.preventDefault();

        let newDetails = createUploadHeaderDetailState.uploadHeaderDetail.details.filter(r => r.id !== uploadHeaderId);

        dispatchCreateUploadHeaderDetailState({
            type: 'SET_UPLOAD_HEADER_DETAIL_DATA',
            payload: newDetails
        });
    }

    const onChangeUploadHeaderDetail = (e, detailId) => {
        e.preventDefault();

        let newDetails = createUploadHeaderDetailState?.uploadHeaderDetail.details.map(r => {
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
    
    const onChangeDetailsOrder = (result) => {
        if(!result.destination) return;

        let targetUpdateHeader = { ...createUploadHeaderDetailState };
        let targetDetails = targetUpdateHeader.uploadHeaderDetail.details;
        
        const newDetails = valueUtils.reorder(
            targetDetails,
            result.source.index,
            result.destination.index
        );

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
                onActionUploadUploadHeaderFormExcelFile={(e) => onActionUploadUploadHeaderFormExcelFile(e)}
                onCreateTranslatorUploadHeaderDetailModalOpen={(e) => onCreateTranslatorUploadHeaderDetailModalOpen(e)}
            ></DataControlFieldView>

            <TableFieldView
                selectedHeaderTitleState={selectedHeaderTitleState}
                uploadHeaderExcelDataState={uploadHeaderExcelDataState}
            ></TableFieldView>

            {/* ExcelTranslator Donwload Header Create Modal */}
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
                    onChangeDetailsOrder={(result) => onChangeDetailsOrder(result)}
                    onActionStoreUploadHeaderForm={(e) => onActionStoreUploadHeaderForm(e)}
                    onChangeUploadHeaderDetail={(e, detailId) => onChangeUploadHeaderDetail(e, detailId)}
                ></CreateUploadHeaderDetailModalComponent>
            </CommonModalComponent>
        </Container>
    )
}

export default UploadHeaderTableComponent;

const initialSelectedHeaderTitleState = null;
const initialCreateUploadHeaderDetailState = null;
const initialUploadHeaderExcelDataState = null;

const selectedHeaderTitleStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return {...action.payload};
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

const uploadHeaderExcelDataStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}
import { Container } from "./DownloadHeaderTable.styled";
import { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import queryString from 'query-string';
import { useLocation } from "react-router-dom";

import DataControlFieldView from "./DataControlField.view";
import TableFieldView from "./TableField.view";
import CommonModalComponent from "../../module/modal/CommonModalComponent";
import CreateDownloadHeaderDetailModalComponent from '../create-download-header-detail-modal/CreateDownloadHeaderDetailModal.component'
import valueUtils from "../../../utils/valueUtils";

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
            fixedValueFlag: this.fixedValueFlag,
            fixedValue: this.fixedValue,
            uploadHeaderId: this.uploadheaderId
        }
    }
}

const DownloadHeaderTableComponent = (props) => {
    const location = useLocation();
    let params = queryString.parse(location.search);

    const [createTranslatorDownloadHeaderDetailModalOpen, setCreateTranslatorDownloadHeaderDetailModalOpen] = useState(false);
    const [fixedValueCheckList, setFixedValueCheckList] = useState([]);

    const [selectedHeaderTitleState, dispatchSelectedHeaderTitleState] = useReducer(selectedHeaderTitleStateReducer, initialSelectedHeaderTitleState);
    const [updateDownloadHeaderForm, dispatchUpdateDownloadHeaderForm] = useReducer(updateDownloadHeaderFormReducer, initialUpdateDownloadHeaderForm);
    const [downloadHeaderExcelDataState, dispatchDownloadHeaderExcelDataState] = useReducer(downloadHeaderExcelDataStateReducer, initialDownloadHeaderExcelDataState);
    const [uploadedDownloadHeaderFile, setUploadedDownloadHeaderFile] = useState(false);

    useEffect(() => {
        function initHeaderTitleState() {
            if (!props.excelTranslatorHeaderList) {
                return;
            }

            if (!params.headerId) {
                dispatchSelectedHeaderTitleState({
                    type: 'CLEAR'
                });
                dispatchDownloadHeaderExcelDataState({
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

            dispatchDownloadHeaderExcelDataState({
                type: 'CLEAR'
            })
        }
        initHeaderTitleState();
    }, [params.headerId, props.excelTranslatorHeaderList]);

    useEffect(() => {
        if (!selectedHeaderTitleState) {
            return;
        }

        if (selectedHeaderTitleState?.downloadHeaderDetail?.details.length) {
            let data = selectedHeaderTitleState.downloadHeaderDetail.details.map(r => {
                return {
                    ...r,
                    colData: r.headerName
                }
            });

            dispatchDownloadHeaderExcelDataState({
                type: 'INIT_DATA',
                payload: data
            });
            return;
        }
    }, [selectedHeaderTitleState]);

    useEffect(() => {
        if (!props.uploadedDownloadHeaderExcelData) {
            setUploadedDownloadHeaderFile(false);
            return;
        }

        setUploadedDownloadHeaderFile(true);

        dispatchDownloadHeaderExcelDataState({
            type: 'INIT_DATA',
            payload: props.uploadedDownloadHeaderExcelData.uploadedData.details
        });
    }, [props.uploadedDownloadHeaderExcelData])

    const onCreateTranslatorDownloadHeaderDetailModalOpen = (e) => {
        e.preventDefault();

        if (!selectedHeaderTitleState) {
            alert('헤더 형식을 먼저 선택해주세요.');
            return;
        } else if (!(selectedHeaderTitleState.uploadHeaderDetail.details.length > 0)) {
            alert('업로드 엑셀 양식을 먼저 설정해주세요.');
            return;
        }

        if (selectedHeaderTitleState.downloadHeaderDetail.details.length > 0) {
            dispatchUpdateDownloadHeaderForm({
                type: 'INIT_DATA',
                payload: { ...selectedHeaderTitleState }
            });

            setFixedValueCheckList(selectedHeaderTitleState.downloadHeaderDetail?.details.map(r => {
                if (r.targetCellNumber === -1) {
                    return r.id;
                }
            }));
        } else {
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

        // 다운로드헤더 엑셀파일이 업로드 되었다면 이 데이터로 헤더 설정
        if (uploadedDownloadHeaderFile) {
            let dataArr = [];
            for (let i = 0; i < downloadHeaderExcelDataState.length; i++) {
                let data = new DownloadHeaderDetail().toJSON();
                data = {
                    ...data,
                    headerName: downloadHeaderExcelDataState[i].colData,
                }
                dataArr.push(data);
            }

            dispatchUpdateDownloadHeaderForm({
                type: 'INIT_DATA',
                payload: {
                    ...selectedHeaderTitleState,
                    downloadHeaderDetail: {
                        details: dataArr
                    }
                }
            });
        }

        setCreateTranslatorDownloadHeaderDetailModalOpen(true);
    }

    const onCreateTranslatorDownloadHeaderDetailModalClose = () => {
        dispatchUpdateDownloadHeaderForm({
            type: 'CLEAR'
        });
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

        let newDetails = updateDownloadHeaderForm.downloadHeaderDetail.details.filter(r => r.id !== headerId);

        dispatchUpdateDownloadHeaderForm({
            type: 'SET_DOWNLOAD_HEADER_DETAIL_DATA',
            payload: newDetails
        });
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
            let newDetails = updateDownloadHeaderForm.downloadHeaderDetail.details.map(r => {
                if (r.id === headerId) {
                    return {
                        ...r,
                        targetCellNumber: parseInt(-1)
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
        } else {
            setFixedValueCheckList(fixedValueCheckList.filter(r => r !== headerId));

            // 체크 해제하면 fixedValue를 빈 값으로 변경
            let newDetails = updateDownloadHeaderForm.downloadHeaderDetail.details.map(r => {
                if (r.id === headerId) {
                    return {
                        ...r,
                        fixedValue: ""
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
    }

    // 다운로드 엑셀 헤더의 targetCellNumber에 대응하는 업로드 엑셀의 헤더명을 찾는다.
    const getUploadHeaderName = (targetCellNumber) => {
        let result = updateDownloadHeaderForm?.uploadHeaderDetail?.details.filter(r => r.cellNumber === targetCellNumber)[0];
        return result?.cellNumber ?? -1;
    }

    const onActionStoreDownloadHeaderForm = async (downloadHeaderDetails) => {
        let targetForm = {
            ...updateDownloadHeaderForm,
            downloadHeaderDetail: {
                ...updateDownloadHeaderForm.downloadHeaderDetail,
                details: downloadHeaderDetails
            }
        };
        await props._onSubmit_storeDownloadHeaderDetail(targetForm);

        onCreateTranslatorDownloadHeaderDetailModalClose();
    }

    const onActionUploadDownloadHeaderFormExcelFile = async (e) => {
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

        await props._onSubmit_uploadDownloadHeaderFormExcelFile(uploadedFormData);
    }

    const onActionDownloadExcelForm = async (e) => {
        e.preventDefault();

        let downloadDetail = selectedHeaderTitleState.downloadHeaderDetail.details.map(r => {
            return {
                ...r,
                colData: r.headerName
            }
        });

        await props._onAction_downloadUploadHeaderDetails(selectedHeaderTitleState.downloadHeaderTitle, downloadDetail);
    }

    const onChangeDetailsOrder = (result) => {
        if (!result.destination) return;

        let targetUpdateHeader = { ...updateDownloadHeaderForm };
        let targetDetails = targetUpdateHeader.downloadHeaderDetail.details;

        const newDetails = valueUtils.reorder(
            targetDetails,
            result.source.index,
            result.destination.index
        );

        dispatchUpdateDownloadHeaderForm({
            type: 'SET_DOWNLOAD_HEADER_DETAIL_DATA',
            payload: newDetails
        });
    }

    return (
        <Container>
            <DataControlFieldView
                selectedHeaderTitleState={selectedHeaderTitleState}

                onActionDownloadExcelForm={(e) => onActionDownloadExcelForm(e)}
                onActionUploadDownloadHeaderFormExcelFile={(e) => onActionUploadDownloadHeaderFormExcelFile(e)}
                onCreateTranslatorDownloadHeaderDetailModalOpen={(e) => onCreateTranslatorDownloadHeaderDetailModalOpen(e)}
            ></DataControlFieldView>

            <TableFieldView
                selectedHeaderTitleState={selectedHeaderTitleState}
                downloadHeaderExcelDataState={downloadHeaderExcelDataState}
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

                    onChangeDetailsOrder={(result) => onChangeDetailsOrder(result)}
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

export default DownloadHeaderTableComponent;

const initialSelectedHeaderTitleState = null;
const initialUpdateDownloadHeaderForm = null;
const initialDownloadHeaderExcelDataState = null;
const initialUploadedDownloadHeaderState = null;

const selectedHeaderTitleStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return { ...action.payload };
        case 'CLEAR':
            return initialSelectedHeaderTitleState;
        default: return initialSelectedHeaderTitleState
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
            return initialUpdateDownloadHeaderForm;
        default: return initialUpdateDownloadHeaderForm
    }
}

const downloadHeaderExcelDataStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialDownloadHeaderExcelDataState;
        default: return initialDownloadHeaderExcelDataState
    }
}

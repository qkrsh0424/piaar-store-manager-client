import { Container } from "./UploadHeaderTable.styled";
import { useEffect, useReducer, useState } from "react";
import queryString from 'query-string';
import { useLocation } from "react-router-dom";

import DataControlFieldView from "./DataControlField.view";
import TableFieldView from "./TableField.view";
import CommonModalComponent from "../../module/modal/CommonModalComponent";
import CreateUploadHeaderDetailModalComponent from "../create-upload-header-detail-modal/CreateUploadHeaderDetailModal.component";

const UploadHeaderTableComponent = (props) => {
    const location = useLocation();
    let query = queryString.parse(location.search);

    const [settingFormModalOpen, setSettingFormModalOpen] = useState(false);
    const [selectedTranslatorHeader, dispatchSelectedTranslatorHeader] = useReducer(selectedTranslatorHeaderReducer, initialSelectedTranslatorHeader);

    useEffect(() => {
        function initHeaderTitleState() {
            if (!props.excelTranslatorHeaderList) {
                return;
            }

            if (!query.headerId) {
                dispatchSelectedTranslatorHeader({
                    type: 'CLEAR'
                });
                return;
            }

            let headerId = query.headerId;
            let headerTitleState = props.excelTranslatorHeaderList?.filter(r => r.id === headerId)[0];

            dispatchSelectedTranslatorHeader({
                type: 'INIT_DATA',
                payload: headerTitleState
            });
        }
        initHeaderTitleState();
    }, [query.headerId, props.excelTranslatorHeaderList]);

    const __handler = {
        action: {
            openSettingFormModal: () => {
                if (!selectedTranslatorHeader) {
                    alert('헤더 형식을 먼저 선택해주세요.');
                    return;
                }

                setSettingFormModalOpen(true);
            },
            closeSettingFormModal: () => {
                setSettingFormModalOpen(false);
            }
        },
        submit: {
            storeDownloadHeaderForm: async (uploadHeaderDetails) => {
                if (uploadHeaderDetails.length > 0) {
                    // 다운로드헤더 형식이 설정되어있다면 형식초기화
                    if (!window.confirm('업로드 엑셀헤더 양식을 변경하면 다운로드 엑셀헤더 양식은 초기화됩니다.')) {
                        return;
                    }
                }

                let excelHeader = {
                    ...selectedTranslatorHeader,
                    uploadHeaderDetail: {
                        ...selectedTranslatorHeader.uploadHeaderDetail,
                        details: uploadHeaderDetails
                    }
                };

                await props.onSubmitUpdateUploadHeaderDetails(excelHeader);

                __handler.action.closeSettingFormModal();
            },
            downloadHeaderSampleExcel: async () => {
                let downloadDetail = selectedTranslatorHeader.uploadHeaderDetail.details.map(r => {
                    return {
                        ...r,
                        colData: r.headerName
                    }
                });

                await props.onActionDownloadExcelForm(selectedTranslatorHeader.uploadHeaderTitle, downloadDetail);
            }
        }
    }

    return (
        <Container>
            <DataControlFieldView
                onActionDownloadExcelForm={__handler.submit.downloadHeaderSampleExcel}
                onCreateTranslatorUploadHeaderDetailModalOpen={__handler.action.openSettingFormModal}
            ></DataControlFieldView>

            <TableFieldView
                selectedTranslatorHeader={selectedTranslatorHeader}
            ></TableFieldView>

            {/* ExcelTranslator Donwload Header Create Modal */}
            <CommonModalComponent
                open={settingFormModalOpen}
                onClose={__handler.action.closeSettingFormModal}
                maxWidth={'xs'}
                fullWidth={true}
            >
                <CreateUploadHeaderDetailModalComponent
                    excelTranslatorHeaderList={props.excelTranslatorHeaderList}
                    selectedTranslatorHeader={selectedTranslatorHeader}

                    onActionStoreUploadHeaderForm={__handler.submit.storeDownloadHeaderForm}
                ></CreateUploadHeaderDetailModalComponent>
            </CommonModalComponent>
        </Container>
    )
}

export default UploadHeaderTableComponent;

const initialSelectedTranslatorHeader = null;

const selectedTranslatorHeaderReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return { ...action.payload };
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}

import { Container } from "./DownloadHeaderTable.styled";
import { useEffect, useReducer, useState } from "react";
import queryString from 'query-string';
import { useLocation } from "react-router-dom";

import DataControlFieldView from "./DataControlField.view";
import TableFieldView from "./TableField.view";
import CommonModalComponent from "../../module/modal/CommonModalComponent";
import CreateDownloadHeaderDetailModalComponent from '../create-download-header-detail-modal/CreateDownloadHeaderDetailModal.component'

const DownloadHeaderTableComponent = (props) => {
    const location = useLocation();
    let params = queryString.parse(location.search);

    const [selectedTranslatorHeader, dispatchSelectedTranslatorHeader] = useReducer(selectedTranslatorHeaderReducer, initialSelectedTranslatorHeader);

    const [settingFormModalOpen, setSettingFormModalOpen] = useState(false);

    useEffect(() => {
        function initHeaderTitleState() {
            if (!props.excelTranslatorHeaderList) {
                return;
            }

            if (!params.headerId) {
                dispatchSelectedTranslatorHeader({
                    type: 'CLEAR'
                });
                return;
            }

            let headerId = params.headerId;
            let headerTitleState = props.excelTranslatorHeaderList?.filter(r => r.id === headerId)[0];

            dispatchSelectedTranslatorHeader({
                type: 'INIT_DATA',
                payload: headerTitleState
            });
        }
        initHeaderTitleState();
    }, [params.headerId, props.excelTranslatorHeaderList]);

    const __handler = {
        action: {
            openSettingFormModal: () => {
                if (!selectedTranslatorHeader) {
                    alert('헤더 형식을 먼저 선택해주세요.');
                    return;
                } else if (!(selectedTranslatorHeader.uploadHeaderDetail.details.length > 0)) {
                    alert('업로드 엑셀 양식을 먼저 설정해주세요.');
                    return;
                }

                setSettingFormModalOpen(true);
            },
            closeSettingFormModal: () => {
                setSettingFormModalOpen(false);
            }
        },
        submit: {
            storeDownloadHeaderForm: async (downloadHeaderDetails) => {
                let targetForm = {
                    ...selectedTranslatorHeader,
                    downloadHeaderDetail: {
                        ...selectedTranslatorHeader.downloadHeaderDetail,
                        details: downloadHeaderDetails
                    }
                };
                await props.onSubmitUpdateDownloadHeaderDetails(targetForm);

                __handler.action.closeSettingFormModal();
            },
            downloadHeaderSampleExcel: async () => {
                let downloadDetail = selectedTranslatorHeader.downloadHeaderDetail.details.map(r => {
                    return {
                        ...r,
                        colData: r.headerName
                    }
                });

                await props.onActionDownloadExcelForm(selectedTranslatorHeader.downloadHeaderTitle, downloadDetail);
            }
        }
    }

    return (
        <Container>
            <DataControlFieldView
                onActionDownloadHeaderSampleExcel={(e) => __handler.submit.downloadHeaderSampleExcel(e)}
                onActionOpenSettingFormModal={(e) => __handler.action.openSettingFormModal(e)}
            />

            <TableFieldView
                selectedTranslatorHeader={selectedTranslatorHeader}
            />

            {/* ExcelTranslator Donwload Header Create Modal */}
            <CommonModalComponent
                open={settingFormModalOpen}
                onClose={() => __handler.action.closeSettingFormModal()}
                maxWidth={'md'}
                fullWidth={true}
            >
                <CreateDownloadHeaderDetailModalComponent
                    excelTranslatorHeaderList={props.excelTranslatorHeaderList}
                    selectedTranslatorHeader={selectedTranslatorHeader}

                    onActionStoreDownloadHeaderForm={__handler.submit.storeDownloadHeaderForm}
                />
            </CommonModalComponent>
        </Container>
    )
}

export default DownloadHeaderTableComponent;

const initialSelectedTranslatorHeader = null;

const selectedTranslatorHeaderReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return { ...action.payload };
        case 'CLEAR':
            return initialSelectedTranslatorHeader;
        default: return initialSelectedTranslatorHeader
    }
}
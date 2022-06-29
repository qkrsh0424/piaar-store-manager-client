import { Container } from "./UploadDataTable.styled";
import { useEffect, useReducer, useState } from "react";
import queryString from 'query-string';
import { useLocation } from "react-router-dom";

import TableFieldView from "./TableField.view";
import ExcelDataControlFieldView from "./ExcelDataControlField.view";

const UploadDataTableComponent = (props) => {
    const location = useLocation();
    let params = queryString.parse(location.search);

    const [selectedTranslatorHeader, dispatchSelectedTranslatorHeader] = useReducer(selectedTranslatorHeaderReducer, initialSelectedTranslatorHeader);

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

    const onActionUploadExcelFile = async (e) => {
        e.preventDefault();

        // 헤더 타이틀을 선택하지 않은 경우
        if (!selectedTranslatorHeader) {
            alert('헤더 형식을 먼저 선택해주세요.');
            return;
        }
        
        if(selectedTranslatorHeader.uploadHeaderDetail.details.length <= 0) {
            alert('업로드 헤더 양식을 먼저 설정해주세요.');
            return;
        }

        // 파일을 선택하지 않은 경우
        if (e.target.files.length === 0) return;

        let addFiles = e.target.files;

        var uploadedFormData = new FormData();
        uploadedFormData.append('file', addFiles[0]);
        uploadedFormData.append(
            "dto",
            new Blob([JSON.stringify(selectedTranslatorHeader)], { type: "application/json" })
        );

        await props.onActionUploadExcelFile(uploadedFormData);
    }

    const onActionDownloadExcelFile = async (e) => {
        e.preventDefault();

        if (!props.uploadedExcelData) {
            alert('엑셀 파일을 먼저 업로드 해주세요.');
            return;
        } else if (!(selectedTranslatorHeader.uploadHeaderDetail.details.length > 0)) {
            alert('업로드 엑셀 양식을 설정해주세요.');
            return;
        } else if (!(selectedTranslatorHeader.downloadHeaderDetail.details.length > 0)) {
            alert('다운로드 엑셀 양식을 설정해주세요.');
            return;
        }

        await props.onActionDownloadExcelFile(selectedTranslatorHeader);
    }

    return (
        <Container>
            <ExcelDataControlFieldView
                onActionUploadExcelFile={(e) => onActionUploadExcelFile(e)}
                onActionDownloadExcelFile={(e) => onActionDownloadExcelFile(e)}
            />

            <TableFieldView
                selectedTranslatorHeader={selectedTranslatorHeader}
                uploadedExcelData={props.uploadedExcelData}
            />
        </Container>
    )
}

export default UploadDataTableComponent;

const initialSelectedTranslatorHeader = null;

const selectedTranslatorHeaderReducer = (state, action) => {
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
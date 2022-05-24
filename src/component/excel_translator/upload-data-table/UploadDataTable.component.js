import { Container } from "./UploadDataTable.styled";
import { useEffect, useReducer, useState } from "react";
import queryString from 'query-string';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

import TableFieldView from "./TableField.view";
import ExcelDataControlFieldView from "./ExcelDataControlField.view";

const UploadDataTableComponent = (props) => {
    const userRdx = useSelector(state => state.user);
    const location = useLocation();
    let params = queryString.parse(location.search);

    const [selectedHeaderTitleState, dispatchSelectedHeaderTitleState] = useReducer(selectedHeaderTitleStateReducer, initialSelectedHeaderTitleState);
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

    const onActionUploadExcelFile = async (e) => {
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

        await props._onSubmit_uploadExcelFile(uploadedFormData);
    }

    const onActionDownloadExcelFile = async (e) => {
        e.preventDefault();

        if (!props.uploadedExcelData) {
            alert('엑셀 파일을 먼저 업로드 해주세요.');
            return;
        } else if (!(selectedHeaderTitleState.uploadHeaderDetail.details.length > 0)) {
            alert('업로드 엑셀 양식을 설정해주세요.');
            return;
        } else if (!(selectedHeaderTitleState.downloadHeaderDetail.details.length > 0)) {
            alert('다운로드 엑셀 양식을 설정해주세요.');
            return;
        }

        await props._onSubmit_downloadExcelFile(selectedHeaderTitleState.downloadHeaderTitle, selectedHeaderTitleState.downloadHeaderDetail.details);
    }

    return (
        <Container>
            <ExcelDataControlFieldView
                onActionUploadExcelFile={(e) => onActionUploadExcelFile(e)}
                onActionDownloadExcelFile={(e) => onActionDownloadExcelFile(e)}
            ></ExcelDataControlFieldView>

            <TableFieldView
                uploadedExcelHeaderDataState={uploadedExcelHeaderDataState}
                uploadedExcelDataState={uploadedExcelDataState}
            ></TableFieldView>
        </Container>
    )
}

export default UploadDataTableComponent;

const initialSelectedHeaderTitleState = null;
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
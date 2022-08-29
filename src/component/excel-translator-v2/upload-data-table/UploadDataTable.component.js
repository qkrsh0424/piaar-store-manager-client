import { Container } from "./UploadDataTable.styled";
import { useEffect, useReducer, useState } from "react";
import queryString from 'query-string';
import { useLocation } from "react-router-dom";

import TableFieldView from "./TableField.view";
import ExcelDataControlFieldView from "./ExcelDataControlField.view";
import ExcelPasswordInputModalComponent from "../../module/excel/check-password/excel-password-input-modal/ExcelPasswordInputModal.component";
import CommonModalComponent from "../../module/modal/CommonModalComponent";
import { excelFormDataConnect } from "../../../data_connect/excelFormDataConnect";

const UploadDataTableComponent = (props) => {
    const location = useLocation();
    let params = queryString.parse(location.search);

    const [selectedTranslatorHeader, dispatchSelectedTranslatorHeader] = useReducer(selectedTranslatorHeaderReducer, initialSelectedTranslatorHeader);

    const [excelPassword, dispatchExcelPassword] = useReducer(excelPasswordReducer, initialExcelPassword);
    const [excelPasswordInputModalOpen, setExcelPasswordInputModalOpen] = useState(false);
    const [formData, dispatchFormData] = useReducer(formDataReducer, initialFormData);

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

    useEffect(() => {
        async function uploadExcel() {
            await props.onActionUploadExcelFile(formData);
        }

        if(!excelPassword) {
            return;
        }

        // 암호화되지 않았다면 바로 엑셀 업로드, 그렇지 않다면 비밀번호 입력 모달 오픈
        if (!excelPassword.isEncrypted) {
            uploadExcel();
        }else {
            setExcelPasswordInputModalOpen(true);
        }
    }, [excelPassword])

    const __reqCheckPasswordForExcel = async (formData) => {
        await excelFormDataConnect().checkPwdForUploadedExcelFile(formData)
            .then(res => {
                if (res.status === 200 && res.data.message === 'need_password') {
                    dispatchExcelPassword({
                        type: 'CHANGE_DATA',
                        payload: {
                            name: 'isEncrypted',
                            value: true
                        }
                    })
                } else {
                    dispatchExcelPassword({
                        type: 'CHANGE_DATA',
                        payload: {
                            name: 'isEncrypted',
                            value: false
                        }
                    })
                }
            })
            .catch(err => {
                let res = err.response;

                if (res?.status === 500) {
                    alert('undefined error.')
                    return;
                }

                alert(res?.data.memo);
            })
    }

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

        dispatchFormData({
            type: 'SET_DATA',
            payload: uploadedFormData
        })

        await __reqCheckPasswordForExcel(uploadedFormData);
        // await props.onActionUploadExcelFile(uploadedFormData);
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

    const onActionCloseExcelPasswordInputModal = () => {
        setExcelPasswordInputModalOpen(false);
    }

    const onActionCheckPassword = async (password) => {
        let excelPassword = password || null;

        let params = {
            excelPassword
        }

        await props.onActionUploadExcelFile(formData, params);
        dispatchExcelPassword({type: 'CLEAR'});
        onActionCloseExcelPasswordInputModal();
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

            {/* Excel Password Input Modal */}
            <CommonModalComponent
                open={excelPasswordInputModalOpen}
                maxWidth={'xs'}

                onClose={onActionCloseExcelPasswordInputModal}
            >
                <ExcelPasswordInputModalComponent
                    excelPassword={excelPassword}

                    _onSubmit_uploadExcelFile={onActionCheckPassword}
                ></ExcelPasswordInputModalComponent>
            </CommonModalComponent>
        </Container>
    )
}

export default UploadDataTableComponent;

const initialSelectedTranslatorHeader = null;
const initialExcelPassword = null;
const initialFormData = null;

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

const excelPasswordReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialExcelPassword;
        default: return {...state};
    }
}

const formDataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialFormData;
        default: return {...state};
    }
}

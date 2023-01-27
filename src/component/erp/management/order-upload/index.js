import { useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import { erpDownloadExcelHeaderDataConnect } from "../../../../data_connect/erpDownloadExcelHeaderDataConnect";
import { erpOrderItemDataConnect } from "../../../../data_connect/erpOrderItemDataConnect";
import { excelTranslatorDataConnect } from "../../../../data_connect/excelTranslatorDataConnect";
import { erpOrderItemSocket } from "../../../../data_connect/socket/erpOrderItemSocket";
import { useBackdropHook, BackdropHookComponent } from "../../../../hooks/backdrop/useBackdropHook";
import { useSocketConnectLoadingHook, SocketConnectLoadingHookComponent } from "../../../../hooks/loading/useSocketConnectLoadingHook";
import { dateToYYYYMMDDhhmmssFile } from "../../../../utils/dateFormatUtils";
import qs from 'query-string';
import useSocketClient from "../../../../web-hooks/socket/useSocketClient";
import CommonModalComponent from "../../../module/modal/CommonModalComponent";
import OperatorComponent from "./operator/Operator.component";
import PreviewTableComponent from "./preview-table/PreviewTable.component";
import { excelFormDataConnect } from "../../../../data_connect/excelFormDataConnect";
import ExcelPasswordInputModalComponent from "../../../module/excel/check-password/excel-password-input-modal/ExcelPasswordInputModal.component";
import { v4 as uuidv4 } from 'uuid';

const ErpOrderUploadComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);

    const {
        connected,
        onPublish,
        onSubscribes,
        onUnsubscribes
    } = useSocketClient();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        open: socketConnectLoadingOpen,
        onActionOpen: onActionOpenSocketConnectLoading,
        onActionClose: onActionCloseSocketConnectLoading
    } = useSocketConnectLoadingHook();

    const [excelDataList, dispatchExcelDataList] = useReducer(excelDataListReducer, initialExcelDataList);
    const [excelTranslatorData, dispatchExcelTranslatorData] = useReducer(excelTranslatorDataReducer, initialExcelTranslatorData);
    const [excelPassword, dispatchExcelPassword] = useReducer(excelPasswordReducer, initialExcelPassword);
    const [excelPasswordInputModalOpen, setExcelPasswordInputModalOpen] = useState(false);
    const [formData, dispatchFormData] = useReducer(formDataReducer, initialFormData);

    useEffect(() => {
        if(excelTranslatorData) {
            return;
        }

        __reqSearchExcelTranslator();
    }, []);

    useEffect(() => {
        async function uploadExcel(params) {
            onActionOpenBackdrop();
            await __reqUploadExcelFile(formData, params);
            onActionCloseBackdrop();

        }

        if(!excelPassword) {
            return;
        }

        // 암호화되지 않았다면 바로 엑셀 업로드, 그렇지 않다면 비밀번호 입력 모달 오픈
        if (!excelPassword.isEncrypted) {
            let params = {};
            if (query.headerId) {
                params = {
                    ...params,
                    headerId: query.headerId
                }
            }
            uploadExcel(params);
        }else {
            setExcelPasswordInputModalOpen(true);
        }
    }, [excelPassword])

    const __reqSearchExcelTranslator = async () => {
        await excelTranslatorDataConnect().searchList()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchExcelTranslatorData({
                        type: 'SET_DATA',
                        payload: res.data.data
                    });
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

    const __reqCheckPwdForUploadedExcelFile = async (formData) => {
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
                }else {
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

    const __reqUploadExcelFile = async (formData, params) => {
        await erpOrderItemDataConnect().uploadExcelFile(formData, params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    if (excelDataList) {
                        dispatchExcelDataList({
                            type: 'SET_DATA',
                            payload: [
                                ...excelDataList,
                                ...res.data.data
                            ]
                        });
                        return;
                    }
                    dispatchExcelDataList({
                        type: 'SET_DATA',
                        payload: res.data.data
                    })

                    dispatchExcelPassword({type: 'CLEAR'})
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

    const __reqCreateOrderItemsSocket = async function (params) {
        await erpOrderItemSocket().createList(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchExcelDataList({
                        type: 'CLEAR'
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

    const __reqDownloadUploadExcelSample = async function () {
        await erpDownloadExcelHeaderDataConnect().actionDownloadForUploadExcelSampleForm()
            .then(res => {
                if (res.status === 200) {
                    const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                    const link = document.createElement('a');
                    link.href = url;

                    let date = dateToYYYYMMDDhhmmssFile(new Date());

                    link.setAttribute('download', date + '_판매데이터_엑셀.xlsx');
                    document.body.appendChild(link);
                    link.click();
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

    useEffect(() => {
        let subscribes = [];

        const __effect = {
            mount: async () => {
                onActionOpenSocketConnectLoading();
                if (!connected) {
                    return;
                }

                subscribes = await onSubscribes([
                    {
                        subscribeUrl: `/topic/erp.erp-order-item`,
                        callback: async (e) => {
                            let body = JSON.parse(e.body);
                            if (body?.statusCode === 200) {
                            }
                        }
                    }
                ]);
                onActionCloseSocketConnectLoading();
            },
            unmount: async () => {
                onUnsubscribes(subscribes);
            }
        }

        __effect.mount();

        return () => {
            __effect.unmount();
        };
    }, [connected]);

    const _onSubmit_checkPasswordForUploadedExcelFile = async (formData) => {
        dispatchFormData({
            type: 'SET_DATA',
            payload: formData
        })

        onActionOpenBackdrop();
        await __reqCheckPwdForUploadedExcelFile(formData);
        onActionCloseBackdrop();
    }

    const _onSubmit_createOrderItems = async () => {
        if (!excelDataList || excelDataList.length <= 0) {
            return;
        }
        onActionOpenBackdrop();
        await __reqCreateOrderItemsSocket(excelDataList);
        onActionCloseBackdrop();
    }

    const _onSubmit_downloadUploadExcelSample = async () => {
        onActionOpenBackdrop();
        await __reqDownloadUploadExcelSample();
        onActionCloseBackdrop();
    }

    const _onSubmit_addSingleExcelData = async (data) => {
        if (excelDataList) {
            dispatchExcelDataList({
                type: 'SET_DATA',
                payload: [
                    ...excelDataList,
                    data
                ]
            })
        } else {
            dispatchExcelDataList({
                type: 'SET_DATA',
                payload: [
                    data
                ]
            })
        }
    }

    const _onAction_deleteDataOne = async (index) => {
        let data = excelDataList.filter((r, i) => i !== index);

        dispatchExcelDataList({
            type: 'SET_DATA',
            payload: data
        })
    }

    const _onSubmit_uploadExcelFile = async (password) => {

        onActionOpenBackdrop();
        let params = {};
        if(excelPassword.isEncrypted) {
            params = {
                ...params,
                excelPassword: password
            }
        }

        if(query.headerId) {
            params = {
                ...params,
                headerId: query.headerId
            }
        }

        await __reqUploadExcelFile(formData, params);
        onActionCloseBackdrop();
        _onAction_closeExcelPasswordInputModal();
    }

    const _onAction_closeExcelPasswordInputModal = () => {
        setExcelPasswordInputModalOpen(false);
    }

    // 단일 erpOrderItem 업데이트
    const _onAction_updateErpOrderItemOne = (targetItem) => {
        let data = excelDataList.map(r => {
            return r.id === targetItem.id ? targetItem : r;
        })

        dispatchExcelDataList({
            type: 'SET_DATA',
            payload: data
        });
    }

    // 단일 erpOrderItem 복사. id값 설정.
    const _onAction_copyErpOrderItemOne = (targetId) => {
        let targetData = excelDataList.filter(r => r.id === targetId)[0];
        targetData = {
            ...targetData,
            id: uuidv4()
        }

        let data = excelDataList.concat(targetData);

        dispatchExcelDataList({
            type: 'SET_DATA',
            payload: data
        });
    }

    return (
        <>
            {connected && excelTranslatorData &&
                <>
                    <OperatorComponent
                        excelTranslatorData={excelTranslatorData}

                        _onSubmit_checkPasswordForUploadedExcelFile={_onSubmit_checkPasswordForUploadedExcelFile}
                        _onSubmit_createOrderItems={() => _onSubmit_createOrderItems()}
                        _onSubmit_downloadUploadExcelSample={_onSubmit_downloadUploadExcelSample}
                        _onSubmit_addSingleExcelData={_onSubmit_addSingleExcelData}
                    ></OperatorComponent>
                    <PreviewTableComponent
                        excelDataList={excelDataList}

                        _onAction_deleteDataOne={_onAction_deleteDataOne}
                        _onAction_updateErpOrderItemOne={_onAction_updateErpOrderItemOne}
                        _onAction_copyErpOrderItemOne={_onAction_copyErpOrderItemOne}
                    ></PreviewTableComponent>
                </>
            }

            {/* Backdrop Loading */}
            <BackdropHookComponent
                open={backdropOpen}
            />

            <SocketConnectLoadingHookComponent
                open={socketConnectLoadingOpen}
            ></SocketConnectLoadingHookComponent>

            {/* Excel Password Input Modal */}
            <CommonModalComponent
                open={excelPasswordInputModalOpen}
                maxWidth={'xs'}

                onClose={_onAction_closeExcelPasswordInputModal}
            >
                <ExcelPasswordInputModalComponent
                    excelPassword={excelPassword}

                    _onSubmit_uploadExcelFile={_onSubmit_uploadExcelFile}
                ></ExcelPasswordInputModalComponent>
            </CommonModalComponent>

        </>
    );
}

export default ErpOrderUploadComponent;

const initialExcelDataList = null;
const initialExcelTranslatorData = null;
const initialExcelPassword = null;
const initialFormData = null;

const excelDataListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialExcelDataList;
        default: return {...state};
    }
}

const excelTranslatorDataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialExcelTranslatorData;
        default: return {...state};
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
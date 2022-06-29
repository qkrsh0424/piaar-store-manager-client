import { useEffect, useReducer, useState } from "react";
import { erpDownloadExcelHeaderDataConnect } from "../../../../data_connect/erpDownloadExcelHeaderDataConnect";
import { erpOrderItemDataConnect } from "../../../../data_connect/erpOrderItemDataConnect";
import { excelTranslatorDataConnect } from "../../../../data_connect/excelTranslatorDataConnect";
import { erpOrderItemSocket } from "../../../../data_connect/socket/erpOrderItemSocket";
import { useBackdropHook, BackdropHookComponent } from "../../../../hooks/backdrop/useBackdropHook";
import { useSocketConnectLoadingHook, SocketConnectLoadingHookComponent } from "../../../../hooks/loading/useSocketConnectLoadingHook";
import { dateToYYYYMMDDhhmmssFile } from "../../../../utils/dateFormatUtils";
import useSocketClient from "../../../../web-hooks/socket/useSocketClient";
import OperatorComponent from "./operator/Operator.component";
import PreviewTableComponent from "./preview-table/PreviewTable.component";

const ErpOrderUploadComponent = (props) => {
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

    useEffect(() => {
        if(excelTranslatorData) {
            return;
        }

        __reqSearchExcelTranslator();
    }, []);

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

    const __reqUploadExcelFile = async (formData) => {
        await erpOrderItemDataConnect().uploadExcelFile(formData)
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

    const __reqUploadExcelFileByOtherForm = async (headerId, formData) => {
        await erpOrderItemDataConnect().uploadExcelFileByOtherForm(headerId, formData)
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

    const _onSubmit_uploadExcelFile = async (formData) => {
        onActionOpenBackdrop();
        await __reqUploadExcelFile(formData);
        onActionCloseBackdrop();
    }

    const _onSubmit_uploadExcelFileByOtherForm = async (headerId, formData) => {
        onActionOpenBackdrop();
        await __reqUploadExcelFileByOtherForm(headerId, formData);
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

    return (
        <>
            {connected && excelTranslatorData &&
                <>
                    <OperatorComponent
                        excelTranslatorData={excelTranslatorData}

                        _onSubmit_uploadExcelFile={(formData) => _onSubmit_uploadExcelFile(formData)}
                        _onSubmit_uploadExcelFileByOtherForm={(headerId, formData) => _onSubmit_uploadExcelFileByOtherForm(headerId, formData)}
                        _onSubmit_createOrderItems={() => _onSubmit_createOrderItems()}
                        _onSubmit_downloadUploadExcelSample={_onSubmit_downloadUploadExcelSample}
                        _onSubmit_addSingleExcelData={_onSubmit_addSingleExcelData}
                    ></OperatorComponent>
                    <PreviewTableComponent
                        excelDataList={excelDataList}

                        _onAction_deleteDataOne={_onAction_deleteDataOne}
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
        </>
    );
}

export default ErpOrderUploadComponent;

const initialExcelDataList = null;
const initialExcelTranslatorData = null;

const excelDataListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}

const excelTranslatorDataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialExcelTranslatorData;
        default: return initialExcelTranslatorData;
    }
}
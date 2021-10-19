import {useState, useEffect} from 'react';

import {dateToYYMMDD} from '../../../handler/dateHandler';

// data connect
import { orderRegistrationNaverDataConnect } from '../../../data_connect/orderRegistrationNaverDataConnect';

// component
import DrawerNavbarMain from '../../nav/DrawerNavbarMain';
import OrderRegistrationNaverBody from './OrderRegistrationNaverBody';
import BackdropLoading from '../../loading/BackdropLoading';


const OrderRegistrationNaverMain = () => {
    const [backdropLoading, setBackdropLoading] = useState(false);
    
    const [orderRegistrationHansanList, setOrderRegistrationHansanList] = useState([]);
    const [orderRegistrationSendedTailoList, setOrderRegistrationSendedTailoList] = useState([]);
    const [orderRegistrationReceivedTailoList, setOrderRegistrationReceivedTailoList] = useState([]);
    const [orderRegistrationTailoList, setOrderRegistrationTailoList] = useState([]);

    useEffect(() => {
        let uploadedExcelData = [
            ...orderRegistrationSendedTailoList,
            ...orderRegistrationReceivedTailoList
        ];

        setOrderRegistrationTailoList(uploadedExcelData);

    }, [orderRegistrationSendedTailoList, orderRegistrationReceivedTailoList]);

    const __handleDataConnect = () => {
        return {
            uploadHansanExcelFile: async function (e) {
                if(e.target.files.length === 0) return;

                let addFiles = e.target.files;

                var uploadedFormData = new FormData();
                uploadedFormData.set('file', addFiles[0]);

                await orderRegistrationNaverDataConnect().postHansanFile(uploadedFormData)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setOrderRegistrationHansanList(res.data.data);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            },
            downloadNaverExcelByHansan: async function (data) {
                await orderRegistrationNaverDataConnect().downloadNaverExcelByHansan(data)
                .then(res => {
                    const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                    const link = document.createElement('a');
                    link.href = url;

                    let date = dateToYYMMDD(new Date());

                    link.setAttribute('download', '[' + date + ']네이버 대량등록_한산.xlsx');
                    document.body.appendChild(link);
                    link.click();

                    setOrderRegistrationHansanList([]);
                })
                .catch(err => {
                    console.log(err);
                });
            },
            uploadTailoSendedExcelFile: async function (e) {
                if(e.target.files.length === 0) return;

                let addFiles = e.target.files;

                var uploadedFormData = new FormData();
                uploadedFormData.set('file', addFiles[0]);

                await orderRegistrationNaverDataConnect().postSendedTailoFile(uploadedFormData)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setOrderRegistrationSendedTailoList(res.data.data);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            },
            uploadTailoReceivedExcelFile: async function (e) {
                if(e.target.files.length === 0) return;

                let addFiles = e.target.files;

                var uploadedFormData = new FormData();
                uploadedFormData.set('file', addFiles[0]);

                await orderRegistrationNaverDataConnect().postReceivedTailoFile(uploadedFormData)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setOrderRegistrationReceivedTailoList(res.data.data);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            },
            downloadNaverExcelByTailo: async function (sendedTailoExcel, receivedTailoExcel) {
                await orderRegistrationNaverDataConnect().downloadNaverExcelByTailo(sendedTailoExcel, receivedTailoExcel)
                .then(res => {
                    const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                    const link = document.createElement('a');
                    link.href = url;

                    let date = dateToYYMMDD(new Date());

                    link.setAttribute('download', '[' + date + ']네이버 대량등록_테일로.xlsx');
                    document.body.appendChild(link);
                    link.click();

                    setOrderRegistrationTailoList([]);
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }
    }

    const __handleEventControl = () => {
        return {
            hansanExcelList: function () {
                return {
                    upload: async function (e) {
                        e.preventDefault();
                        setBackdropLoading(true);
                        await __handleDataConnect().uploadHansanExcelFile(e);
                        setBackdropLoading(false);
                    },
                    download: async function (e) {
                        e.preventDefault();

                        if(orderRegistrationHansanList.length === 0) {
                            alert('파일을 먼저 업로드해주세요.');
                            return;
                        }

                        setBackdropLoading(true);
                        await __handleDataConnect().downloadNaverExcelByHansan(orderRegistrationHansanList);
                        setBackdropLoading(false);
                    }
                }
            },
            tailoExcelList: function () {
                return {
                    uploadSendedExcel: async function (e) {
                        e.preventDefault();
                        setBackdropLoading(true);
                        await __handleDataConnect().uploadTailoSendedExcelFile(e);
                        setBackdropLoading(false);
                    },
                    uploadReceivedExcel: async function (e) {
                        e.preventDefault();
                        setBackdropLoading(true);
                        await __handleDataConnect().uploadTailoReceivedExcelFile(e);
                        setBackdropLoading(false);
                    },
                    download: async function (e) {
                        e.preventDefault();

                        if(orderRegistrationSendedTailoList.length === 0 || orderRegistrationReceivedTailoList.length === 0) {
                            alert('테일로 엑셀1&엑셀2 파일을 모두 업로드해주세요.');
                            return;
                        }

                        setBackdropLoading(true);
                        await __handleDataConnect().downloadNaverExcelByTailo(orderRegistrationSendedTailoList, orderRegistrationReceivedTailoList);
                        setBackdropLoading(false);
                    }
                }
            }
        }
    }

    return (
        <>
            <BackdropLoading open={backdropLoading} />
            <DrawerNavbarMain></DrawerNavbarMain>
            <OrderRegistrationNaverBody
                orderRegistrationHansanList={orderRegistrationHansanList}
                orderRegistrationTailoList={orderRegistrationTailoList}

                __handleEventControl={__handleEventControl}
            ></OrderRegistrationNaverBody>
        </>
    )
}

export default OrderRegistrationNaverMain;
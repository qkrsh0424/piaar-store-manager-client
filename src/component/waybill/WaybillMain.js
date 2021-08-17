import axios from 'axios';
import { useEffect, useState } from 'react';

// handler
import {dateToYYYYMMDDhhmmssFile} from '../../handler/dateHandler';
// component
import DrawerNavbarMain from '../nav/DrawerNavbarMain';
import WaybillBodyComponent from './WaybillBodyComponent';

const WayBillMain = () => {
    const [fileFormData, setFileFormData] = useState(null);
    const [waybillData, setWaybillData] = useState(null);

    const __handleDataConnect = () => {
        return {
            postReadExcel: async function () {
                await axios.post(`${process.env.REACT_APP_API_HOST}/api/excel/waybill/read`, fileFormData)
                    .then(res => {
                        console.log(res);
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setWaybillData(res.data.data);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            postWriteLogenExcel: async function (data) {
                await axios.post(`${process.env.REACT_APP_API_HOST}/api/excel/waybill/logen/write`, data,{
                    responseType:'blob'
                })
                    .then(res => {
                        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                        const link = document.createElement('a');
                        link.href = url;
                        // link.setAttribute('download', 'test.xlsx');
                        link.setAttribute('download', `${dateToYYYYMMDDhhmmssFile(new Date())}${data.prodName}.xlsx`);
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch(err => {
                        console.log(err)
                    });
            },
            postWriteSendTodayExcel: async function(data){
                await axios.post(`${process.env.REACT_APP_API_HOST}/api/excel/waybill/send-today/write`, data,{
                    responseType:'blob'
                })
                    .then(res => {
                        
                        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                        const link = document.createElement('a');
                        link.href = url;
                        // link.setAttribute('download', 'test.xlsx');
                        link.setAttribute('download', `${dateToYYYYMMDDhhmmssFile(new Date())}${data.prodName}.xlsx`);
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch(err => {
                        console.log(err)
                    });
            },
            postWriteLogenAllExcel: async function(data){
                await axios.post(`${process.env.REACT_APP_API_HOST}/api/excel/waybill/logen-all/write`, data,{
                    responseType:'blob'
                })
                    .then(res => {
                        console.log(res);
                        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                        const link = document.createElement('a');
                        link.href = url;
                        // link.setAttribute('download', 'test.xlsx');
                        link.setAttribute('download', `${dateToYYYYMMDDhhmmssFile(new Date())}${'hello'}.xlsx`);
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        }
    }

    const __handleEventControl = () => {
        return {
            excelRead: async function (e) {
                e.preventDefault();
                await __handleDataConnect().postReadExcel();
            },
            fileOnChange: function (e) {
                let formData = new FormData();
                formData.append("file", e.target.files[0])
                setFileFormData(formData);
            },
            logenExcelDownload: async function (uuid) {
                // console.log(uuid);
                let data = waybillData.filter(r => r.uuid == uuid)[0];
                // console.log(data);
                // console.log(dateToYYYYMMDDhhmmssFile(new Date()));
                await __handleDataConnect().postWriteLogenExcel(data);
            },
            sendTodayExcelDownload: async function(){
                __handleDataConnect().postWriteSendTodayExcel(waybillData);
            },
            logenAllExcelDownload: async function(){
                __handleDataConnect().postWriteLogenAllExcel(waybillData);
            }
        }
    }
    return (
        <>
            <DrawerNavbarMain></DrawerNavbarMain>
            <div className='container-fluid mt-3'>
                <form onSubmit={(e) => __handleEventControl().excelRead(e)}>
                    <div className='row'>
                        <div className='form-group col-lg-6'>
                            <input type='file' className='form-control' id='i_sell_reg_excel_uploader' onChange={(e) => __handleEventControl().fileOnChange(e)}></input>
                        </div>
                        <div className='form-group col-lg-6'>
                            <button type='submit' className='btn btn-info btn-block'>엑셀 읽기</button>
                        </div>
                    </div>
                </form>
            </div>
            <button type='button' onClick={()=>__handleEventControl().sendTodayExcelDownload()}>오늘 보낼것 엑셀 다운</button>
            <button type='button' onClick={()=>__handleEventControl().logenAllExcelDownload()}>모든 항목 로젠 엑셀 다운</button>
            {waybillData ?
                <WaybillBodyComponent
                    waybillData={waybillData}

                    __handleEventControl={__handleEventControl}
                ></WaybillBodyComponent>
                :
                <></>
            }

        </>
    );
}

export default WayBillMain;
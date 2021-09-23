import {useState} from 'react';
import { useHistory } from 'react-router';

// data connect
import { deliveryReadyDataConnect } from '../../data_connect/deliveryReadyDataConnect';

// component
import DrawerNavbarMain from '../nav/DrawerNavbarMain';
import DeliveryReadyUploadBody from './DeliveryReadyUploadBody';
import BackdropLoading from '../loading/BackdropLoading';

const DeliveryReadyUploadMain = () => {
    let history = useHistory();

    const [excelData, setExcelData] = useState(null);
    const [formData, setFormData] = useState([]);
    const [backdropLoading, setBackdropLoading] = useState(false);

    const __handleDataConnect = () => {
        return {
            uploadExcelFile: async function (e) {
                // 파일을 선택하지 않은 경우
                if(e.target.files.length === 0) return;

                let addFiles = e.target.files;

                var uploadedFormData = new FormData();
                uploadedFormData.set('file', addFiles[0]);

                setFormData(uploadedFormData);

                await deliveryReadyDataConnect().postFile(uploadedFormData)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setExcelData(res.data.data);
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 401 && res.data.message === 'need_login') {
                            alert('접근 권한이 없습니다.');
                        } else if (res.status === 415 && res.data.message === 'file_extension_error') {
                            alert('엑셀 파일만 업로드 해주세요.');
                        } else if (res.status === 400){
                            alert(res.data.memo);   // res.data.message도 비교할 건지 고민
                        } else {
                            alert('undefined error. : uploadExcelFile');
                        }
                    })
            },
            storeExcelFile: async function () {
            
                if(!excelData) {
                    alert('파일을 먼저 업로드 해주세요.');
                    return;
                }

                await deliveryReadyDataConnect().putFileData(formData)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            alert('저장되었습니다.');
                            history.push('/delivery-ready/naver/view');
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 403) {
                            alert('권한이 없습니다.');
                        } else {
                            alert('undefined error. : storeExcelFile');
                        }
                    })
            }
        }
    }

    const __handleEventControl = () => {
        return {
            uploadExcelData: function () {
                return {
                    submit: async function (e) {
                        e.preventDefault();
                        setBackdropLoading(true);
                        await __handleDataConnect().uploadExcelFile(e);
                        setBackdropLoading(false);
                    },
                }
            },
            storeExcelData: function () {
                return {
                    submit: async function (e) {
                        e.preventDefault();
                        console.log(e);
                        await __handleDataConnect().storeExcelFile(e);
                    }
                }
            }
        }
    }

    return (
        <>
            <BackdropLoading open={backdropLoading} />
            <DrawerNavbarMain></DrawerNavbarMain>
            <DeliveryReadyUploadBody
                excelData={excelData}

                __handleEventControl={__handleEventControl}
            ></DeliveryReadyUploadBody>
        </>
    )
}

export default DeliveryReadyUploadMain;
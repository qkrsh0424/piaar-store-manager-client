import {useState} from 'react';

// data connect
import { deliveryReadyNaverDataConnect } from '../../../data_connect/deliveryReadyNaverDataConnect';

// component
import DrawerNavbarMain from '../../nav/DrawerNavbarMain';
import DeliveryReadyUploadNaverBody from './DeliveryReadyUploadNaverBody';
import BackdropLoading from '../../loading/BackdropLoading';
import { useNavigate } from 'react-router-dom';

const DeliveryReadyUploadMain = () => {
    const navigate = useNavigate();

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

                await deliveryReadyNaverDataConnect().postFile(uploadedFormData)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setExcelData(res.data.data);
                            setFormData(uploadedFormData);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            },
            storeExcelFile: async function () {
                if(!excelData) {
                    alert('파일을 먼저 업로드 해주세요.');
                    return;
                }

                await deliveryReadyNaverDataConnect().putFileData(formData)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            alert('저장되었습니다.');
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
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
                        setBackdropLoading(true);
                        await __handleDataConnect().storeExcelFile(e);
                        setBackdropLoading(false);                
                    }
                }
            },
            movePage: function () {
                return {
                    deliveryReadyView: async function () {
                        navigate('/delivery-ready/naver/view');
                    }
                }
            }
        }
    }

    return (
        <>
            <BackdropLoading open={backdropLoading} />
            <DrawerNavbarMain></DrawerNavbarMain>
            <DeliveryReadyUploadNaverBody
                excelData={excelData}

                __handleEventControl={__handleEventControl}
            ></DeliveryReadyUploadNaverBody>
        </>
    )
}

export default DeliveryReadyUploadMain;
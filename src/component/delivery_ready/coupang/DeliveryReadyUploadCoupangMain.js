import {useState} from 'react';

// data connect
import { deliveryReadyCoupangDataConnect } from '../../../data_connect/deliveryReadyCoupangDataConnect';

// component
import DrawerNavbarMain from '../../nav/DrawerNavbarMain';
import DeliveryReadyUploadCoupangBody from './DeliveryReadyUploadCoupangBody';
import BackdropLoading from '../../loading/BackdropLoading';
import { useNavigate } from 'react-router-dom';

const DeliveryReadyUploadCoupangMain = (props) => {
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

                await deliveryReadyCoupangDataConnect().postFile(uploadedFormData)
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

                await deliveryReadyCoupangDataConnect().putFileData(formData)
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
                        navigate('/delivery-ready/coupang/view');
                    }
                }
            }
        }
    }

    return (
        <>
            <BackdropLoading open={backdropLoading} />
            <DrawerNavbarMain></DrawerNavbarMain>
            <DeliveryReadyUploadCoupangBody
                excelData={excelData}

                __handleEventControl={__handleEventControl}
            ></DeliveryReadyUploadCoupangBody>
        </>
    )
}

export default DeliveryReadyUploadCoupangMain;
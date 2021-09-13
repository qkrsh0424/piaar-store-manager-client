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
    // const [uploadedFile, setUploadedFile] = useState(null);

    const __handleDataConnect = () => {
        return {
            uploadExcelFile: async function (e) {
                // 파일을 선택하지 않은 경우
                if(e.target.files.length === 0) return;

                let addFiles = e.target.files;

                var uploadedFormData = new FormData();
                uploadedFormData.set('file', addFiles[0]);

                // for (let i = 0; i < addFiles.length; i++) {
                //     formData.set('file', addFiles[i]);
                // }

                setFormData(uploadedFormData);

                await deliveryReadyDataConnect().postFile(uploadedFormData)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setExcelData(res.data.data);
                            __handleEventControl().backdropLoading().close();
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 401) {
                            alert('접근 권한이 없습니다.');
                        } else {
                            alert('undefined error. : uploadExcelFile');
                        }
                        __handleEventControl().backdropLoading().close();
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
                        __handleEventControl().backdropLoading().open();
                        // console.log(uploadedFile)
                        await __handleDataConnect().uploadExcelFile(e);
                    },
                    // change: async function (e) {
                    //     e.preventDefault();
                    //     setUploadedFile(e);
                    // }
                }
            },
            storeExcelData: function () {
                return {
                    submit: async function (e) {
                        e.preventDefault();
                        await __handleDataConnect().storeExcelFile(e);
                    }
                }
            },
            backdropLoading: function () {
                return {
                    open: function () {
                        setBackdropLoading(true);
                    },
                    close: function () {
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
            <DeliveryReadyUploadBody
                excelData={excelData}
                // uploadedFile={uploadedFile}

                __handleEventControl={__handleEventControl}
            ></DeliveryReadyUploadBody>
        </>
    )
}

export default DeliveryReadyUploadMain;
import axios from 'axios';
import { useEffect, useState } from 'react';

// component
import DrawerNavbarMain from '../../../nav/DrawerNavbarMain';
import SPackingListCoupangBody from './SPackingListCoupangBody';

const SPackingListCoupangMain = () => {
    const [fileFormData, setFileFormData] = useState(null);
    const [salesRateDataList, setSalesRateDataList] = useState(null);

    const __handleDataConnect = () => {
        return {
            postReadCoupangExcel: async function () {
                await axios.post(`${process.env.REACT_APP_API_HOST}/api/v1/shipment/packing-list/coupang/excel/read`, fileFormData)
                    .then(res => {
                        console.log(res);
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setSalesRateDataList(res.data.data);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        if (res && res.status == 400) {
                            switch (res.data.message) {
                                case 'not_matched_file_error':
                                    alert('파일 종류 에러, 업로드 대상 파일을 다시 확인해 주세요.');
                                    break;
                                case 'extension_error':
                                    alert('파일 확장자를 다시 확인해주세요. xls or xlsx 파일만 읽기 가능.');
                                    break;
                                default:
                                    alert('undefined error. inner')
                                    break;
                            }
                        } else {
                            alert('undefined error. outter')
                        }
                    })
            },
        }
    }

    const __handleEventControl = () => {
        return {
            fileOnChange: function (e) {
                let formData = new FormData();
                formData.append("file", e.target.files[0])
                setFileFormData(formData);
            },
            readCoupangExcel: async function (e) {
                e.preventDefault();
                if (fileFormData) {
                    await __handleDataConnect().postReadCoupangExcel();
                }
            },
        }
    }

    return (
        <>
            <DrawerNavbarMain></DrawerNavbarMain>
            <SPackingListCoupangBody
                salesRateDataList={salesRateDataList}
                fileFormData={fileFormData}

                __handleEventControl={__handleEventControl}
            ></SPackingListCoupangBody>
        </>
    );
}

export default SPackingListCoupangMain;
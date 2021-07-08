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
                        console.log(err);
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
                await __handleDataConnect().postReadCoupangExcel();
            },
        }
    }

    return (
        <>
            <DrawerNavbarMain></DrawerNavbarMain>
            <SPackingListCoupangBody
                salesRateDataList = {salesRateDataList}

                __handleEventControl = {__handleEventControl}
            ></SPackingListCoupangBody>
        </>
    );
}

export default SPackingListCoupangMain;
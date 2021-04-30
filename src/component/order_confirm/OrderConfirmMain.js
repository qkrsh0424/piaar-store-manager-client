import axios from 'axios';
import { useEffect, useState } from 'react';

// component
import DrawerNavbarMain from '../nav/DrawerNavbarMain';
import OrderConfirmBodyComponent from './OrderConfirmBodyComponent';

const OrderConfirmMain = () => {
    const [fileFormData, setFileFormData] = useState(null);
    const [orderConfirmData, setOrderConfirmData] = useState(null);

    const __handleDataConnect = () => {
        return {
            postReadExcel: async function () {
                await axios.post(`${process.env.REACT_APP_API_HOST}/api/excel/order-confirm/read`, fileFormData)
                    .then(res => {
                        console.log(res);
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setOrderConfirmData(res.data.data);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
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
            {orderConfirmData ?
                <OrderConfirmBodyComponent
                    orderConfirmData={orderConfirmData}

                    __handleEventControl={__handleEventControl}
                ></OrderConfirmBodyComponent>
                :
                <></>
            }
        </>
    );
}

export default OrderConfirmMain;
import { useState } from "react";
import { salesPerformanceDataConnect } from "../../../../data_connect/salesPerformanceDataConnect";

export default function useProductSalesPerformanceHook(props) {
    const [productPerformance, setProductPerformance] = useState(null);
    const [optionPerformance, setOptionPerformance] = useState(null);

    const reqSearchBestProductPerformance = async (body) => {
        await salesPerformanceDataConnect().searchBestProductPerformance(body)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setProductPerformance(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const reqSearchBestOptionPerformance = async (body) => {
        await salesPerformanceDataConnect().searchBestOptionPerformance(body)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setOptionPerformance(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    return {
        productPerformance,
        optionPerformance,
        reqSearchBestProductPerformance,
        reqSearchBestOptionPerformance
    }
}
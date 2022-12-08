import { useState } from "react";
import { salesPerformanceDataConnect } from "../../../../../data_connect/salesPerformanceDataConnect";

export default function useTotalPayAmountHook(props) {
    const [totalPayAmount, setTotalPayAmount] = useState(null);

    const reqSearchTotalPayAmount = async (params) => {
        await salesPerformanceDataConnect().searchTotalAmount(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    console.log(res.data.data);
                    setTotalPayAmount(res.data.data);
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
        totalPayAmount,
        reqSearchTotalPayAmount
    }
}
import { useState } from "react";
import { salesPerformanceDataConnect } from "../../../../../data_connect/salesPerformanceDataConnect";

export default function usePayAmountDayOfWeekHook(props) {
    const [totalPayAmount, setTotalPayAmount] = useState(null);

    const reqSearchPayAmountDayOfWeek = async (params) => {
        await salesPerformanceDataConnect().searchPayAmountDayOfWeek(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
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
        reqSearchPayAmountDayOfWeek
    }
}
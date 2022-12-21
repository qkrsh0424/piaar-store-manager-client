import { useState } from "react";
import { salesPerformanceDataConnect } from "../../../../../data_connect/salesPerformanceDataConnect";

export default function useSalesChannelPayAmountHook(props) {
    const [payAmount, setPayAmount] = useState(null);

    const reqSearchSalesChannelPayAmount = async (params) => {
        await salesPerformanceDataConnect().searchSalesChannelPayAmount(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setPayAmount(res.data.data);
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
        payAmount,
        reqSearchSalesChannelPayAmount
    }
}
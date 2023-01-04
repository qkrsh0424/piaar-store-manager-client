import { useState } from "react";
import { salesPerformanceDataConnect } from "../../../../data_connect/salesPerformanceDataConnect";

export default function useChannelSalesPerformanceHook(props) {
    const [performance, setPerformance] = useState(null);

    const reqSearchChannelPerformance = async (body) => {
        await salesPerformanceDataConnect().searchChannelPerformance(body)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setPerformance(res.data.data);
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
        performance,
        reqSearchChannelPerformance
    }
}
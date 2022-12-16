import { useState } from "react";
import { salesPerformanceDataConnect } from "../../../../../data_connect/salesPerformanceDataConnect";

export default function useSummaryTableHook(props) {
    const [summaryData, setSummaryData] = useState(null);

    const reqSearchSummaryData = async (params) => {
        await salesPerformanceDataConnect().searchSummaryData(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setSummaryData(res.data.data);
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

    const onActionResetSummaryData = () => {
        setSummaryData(null);
    }

    return {
        summaryData,
        reqSearchSummaryData,
        onActionResetSummaryData
    }
}
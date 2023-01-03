import { useState } from "react";
import { salesPerformanceDataConnect } from "../../../../data_connect/salesPerformanceDataConnect";

export default function useSalesPerformanceItemHook() {
    const [dashboard, setDashboard] = useState(null);
    const [performance, setPerformance] = useState(null);

    const reqSearchDashboard = async (params) => {
        await salesPerformanceDataConnect().searchDashboard(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setDashboard(res.data.data);
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

    const reqSearchPerformance = async (params) => {
        await salesPerformanceDataConnect().searchTotalPerformance(params)
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
        dashboard,
        performance,
        reqSearchDashboard,
        reqSearchPerformance
    }
}
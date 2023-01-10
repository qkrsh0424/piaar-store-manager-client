import { useState } from "react";
import { salesPerformanceDataConnect } from "../../../../data_connect/salesPerformanceDataConnect";

export default function useSalesPerformanceItemHook() {
    const [dashboard, setDashboard] = useState(null);
    const [performance, setPerformance] = useState(null);
    const [lastMonthPerformance, setLastMonthPerformance] = useState(null);
    const [channelPerformance, setChannelPerformance] = useState(null);

    const reqSearchDashboard = async (body) => {
        await salesPerformanceDataConnect().searchDashboard(body)
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

    const reqSearchPerformance = async (body) => {
        await salesPerformanceDataConnect().searchTotalPerformance(body)
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

    const reqSearchLastMonthPerformance = async (body) => {
        await salesPerformanceDataConnect().searchTotalPerformance(body)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setLastMonthPerformance(res.data.data);
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

    const reqSearchChannelPerformance = async (body) => {
        await salesPerformanceDataConnect().searchChannelPerformance(body)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setChannelPerformance(res.data.data);
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
        lastMonthPerformance,
        channelPerformance,

        reqSearchDashboard,
        reqSearchPerformance,
        reqSearchLastMonthPerformance,
        reqSearchChannelPerformance
    }
}
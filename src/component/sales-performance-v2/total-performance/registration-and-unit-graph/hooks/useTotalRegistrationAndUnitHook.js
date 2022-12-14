import { useState } from "react";
import { salesPerformanceDataConnect } from "../../../../../data_connect/salesPerformanceDataConnect";

export default function useTotalRegistrationAndUnitHook(props) {
    const [totalRegistrationAndUnit, setTotalRegistrationAndUnit] = useState(null);

    const reqSearchTotalRegistrationAndUnit = async (params) => {
        await salesPerformanceDataConnect().searchRegistrationAndUnit(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setTotalRegistrationAndUnit(res.data.data);
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
        totalRegistrationAndUnit,
        reqSearchTotalRegistrationAndUnit
    }
}

import { useState } from "react"
import { salesPerformanceDataConnect } from "../../../../data_connect/salesPerformanceDataConnect";

export default function useChannelPerformanceHook () {
    const [payAmount, setPayAmount] = useState(null);
    const [registrationAndUnit, setRegistrationAndUnit] = useState(null);
    const [dayOfWeekPayAmount, setDayOfWeekPayAmount] = useState(null);
    const [productPayAmount, setProductPayAmount] = useState(null);

    const reqSearchPayAmount = async (params) => {
        await salesPerformanceDataConnect().searchPayAmountByChannel(params)
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

    const reqSearchRegistrationAndUnit = async (params) => {
        await salesPerformanceDataConnect().searchRegistrationAndUnitByChannel(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setRegistrationAndUnit(res.data.data);
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

    const reqSearchDayOfWeekPayAmount = async (params) => {
        await salesPerformanceDataConnect().searchPayAmountDayOfWeekByChannel(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setDayOfWeekPayAmount(res.data.data);
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

    const reqSearchProductPayAmount = async (params) => {
        await salesPerformanceDataConnect().searchProductPayAmountByChannel(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    console.log(res.data.data);
                    setProductPayAmount(res.data.data);
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
        registrationAndUnit,
        dayOfWeekPayAmount,
        productPayAmount,
        reqSearchPayAmount,
        reqSearchRegistrationAndUnit,
        reqSearchDayOfWeekPayAmount,
        reqSearchProductPayAmount
    }
}
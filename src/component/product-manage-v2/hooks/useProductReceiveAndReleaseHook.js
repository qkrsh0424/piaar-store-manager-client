import { useEffect, useState } from "react";
import { productOptionDataConnect } from "../../../data_connect/productOptionDataConnect";
import { productReceiveDataConnect } from "../../../data_connect/productReceiveDataConnect";
import { productReleaseDataConnect } from "../../../data_connect/productReleaseDataConnect";
import { getEndDate, getStartDate } from "../../../utils/dateFormatUtils";

export default function useProductReceiveAndReleaseHook(props) {
    const [originOptionReceiveStatus, setOriginOptionReceiveStatus] = useState(null);
    const [originOptionReleaseStatus, setOriginOptionReleaseStatus] = useState(null);

    const [optionReceiveStatus, setOptionReceiveStatus] = useState(null);
    const [optionReleaseStatus, setOptionReleaseStatus] = useState(null);

    const [modifyingId, setModifyingId] = useState(null);

    useEffect(() => {
        async function fetchInit() {
            await reqSearchProductReceiveAndRelease();
        }

        fetchInit();
    }, [])

    const reqSearchProductReceiveAndRelease = async () => {
        let params = {
            startDate: props.selectedDateRange.startDate ? getStartDate(props.selectedDateRange.startDate) : null,
            endDate: props.selectedDateRange.endDate ? getEndDate(props.selectedDateRange.endDate) : null,
        }

        await productOptionDataConnect().searchBatchStockStatus(props.optionIds, params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    let resData = res.data.data;
                    setOptionReceiveStatus(resData.productReceive);
                    setOptionReleaseStatus(resData.productRelease);

                    setOriginOptionReceiveStatus(resData.productReceive);
                    setOriginOptionReleaseStatus(resData.productRelease);
                }
            })
            .catch(err => {
                let res = err.response;
                if(res?.status === 500) {
                    alert('undefined error.');
                    return;
                }
                alert(res?.data?.memo);
            })
    }

    const reqModifyReceiveMemo = async (data) => {
        await productReceiveDataConnect().putOne(data)
            .catch(err => {
                let res = err.response;
                if(res?.status === 500) {
                    alert('undefined error.');
                    return;
                }
                alert(res?.data?.memo);
            })
    }

    const reqModifyReleaseMemo = async (data) => {
        await productReleaseDataConnect().putOne(data)
            .catch(err => {
                let res = err.response;
                if(res?.status === 500) {
                    alert('undefined error.');
                    return;
                }
                alert(res?.data?.memo);
            })
    }

    const onChangeReceiveValueOfName = (e, receiveId) => {
        let name = e.target.name;
        let value = e.target.value;

        let data = optionReceiveStatus.map(r => {
            return (r.productReceive.id === receiveId) ?
                {
                    ...r,
                    productReceive: {
                        ...r.productReceive,
                        [name]: value
                    }
                }
                :
                r
                ;
        })
        setOptionReceiveStatus(data);
    }

    const onChangeReleaseValueOfName = (e, releaseId) => {
        let name = e.target.name;
        let value = e.target.value;

        let data = optionReleaseStatus.map(r => {
            return (r.productRelease.id === releaseId) ?
                {
                    ...r,
                    productRelease: {
                        ...r.productRelease,
                        [name]: value
                    }
                }
                :
                r
                ;
        })
        setOptionReleaseStatus(data);
    }

    const onActionSetModifyingId = (id) => {
        if(modifyingId) {
            // 현재 수정중인 데이터를 저장하지 않는다면, 기존 데이터로 초기화 후 다른 데이터의 id를 modifyingId로 설정
            if(window.confirm('현재 수정중인 데이터는 저장되지 않습니다. 다른 데이터를 수정하시겠습니까?')) {
                setOptionReceiveStatus([...originOptionReceiveStatus]);
                setOptionReleaseStatus([...originOptionReleaseStatus]);
            }else {
                return;
            }
        }
        setModifyingId(id);


    }

    const onSubmitModifyReceiveMemo = async (receiveId) => {
        let data = optionReceiveStatus.filter(r => r.productReceive.id === receiveId)[0]?.productReceive;
        let originData = originOptionReceiveStatus.filter(r => r.productReceive.id === receiveId)[0]?.productReceive;

        if(JSON.stringify(data) !== JSON.stringify(originData)) {
            await reqModifyReceiveMemo(data);
            await reqSearchProductReceiveAndRelease();
        }

        setModifyingId(null);
    }

    const onSubmitModifyReleaseMemo = async (releaseId) => {
        let data = optionReleaseStatus.filter(r => r.productRelease.id === releaseId)[0]?.productRelease;
        let originData = originOptionReleaseStatus.filter(r => r.productRelease.id === releaseId)[0]?.productRelease;

        if(JSON.stringify(data) !== JSON.stringify(originData)) {
            await reqModifyReleaseMemo(data);
            await reqSearchProductReceiveAndRelease();
        }

        setModifyingId(null);
    }

    
    return {
        optionReceiveStatus,
        optionReleaseStatus,
        modifyingId,

        reqSearchProductReceiveAndRelease,
        onChangeReceiveValueOfName,
        onChangeReleaseValueOfName,
        onActionSetModifyingId,
        onSubmitModifyReceiveMemo,
        onSubmitModifyReleaseMemo
    }
}
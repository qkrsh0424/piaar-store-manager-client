import { useCallback } from "react";
import { useState } from "react";
import { productReleaseDataConnect } from "../../../../../../data_connect/productReleaseDataConnect";

export default function useProductReleaseHook (props) {
    const [productRelease, setProductRelease] = useState(null);
    const [modifyingReleaseData, setModifyingReleaseData] = useState(null);

    const onActionResetData = useCallback(() => {
        setProductRelease(null);
        setModifyingReleaseData(null);
    })

    const reqSearchBatchByOptionIds = async (optionIds, params) => {
        await productReleaseDataConnect().searchBatchByOptionIds(optionIds, params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setProductRelease(res.data.data);
                    setModifyingReleaseData(null);
                }
            })
            .catch(err => {
                onActionResetData();

                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }
                alert(res?.data?.memo);
            })
    }

    const reqModifyReleaseMemo = async () => {
        let body = {
            id: modifyingReleaseData.id,
            memo: modifyingReleaseData.memo || ''
        }
        await productReleaseDataConnect().updateOne(body)
            .catch(err => {
                let res = err.response;
                if(res?.status === 500) {
                    alert('undefined error.');
                    return;
                }
                alert(res?.data?.memo);
            })
    }

    const onChangeValueOfNameById = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setModifyingReleaseData({
            ...modifyingReleaseData,
            [name]: value
        })
    }

    const onActionSetModifyingReleaseData = (id) => {
        if(modifyingReleaseData && !window.confirm('현재 작업중인 내용을 저장하지 않고, 선택한 데이터를 수정하시겠습니까?')) {
            return;
        }
        let data = productRelease.filter(r => r.productRelease.id === id)[0]?.productRelease;
        setModifyingReleaseData(data);
    }

    return {
        productRelease,
        modifyingReleaseData,

        reqSearchBatchByOptionIds,
        onChangeValueOfNameById,
        onActionSetModifyingReleaseData,
        reqModifyReleaseMemo
    }
}
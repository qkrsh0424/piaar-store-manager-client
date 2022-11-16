import { useState } from "react";
import { productReceiveDataConnect } from "../../../../../../data_connect/productReceiveDataConnect";

export default function useProductReceiveHook () {
    const [productReceive, setProductReceive] = useState(null);
    const [modifyingReceiveData, setModifyingReceiveData] = useState(null);

    const onActionResetData = () => {
        setProductReceive(null);
        setModifyingReceiveData(null);
    }

    const reqSearchBatchByOptionIds = async (optionIds, params) => {
        await productReceiveDataConnect().searchBatchByOptionIds(optionIds, params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setProductReceive(res.data.data);
                    setModifyingReceiveData(null);
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

    const reqModifyReceiveMemo = async () => {
        let body = {
            id: modifyingReceiveData.id,
            memo: modifyingReceiveData.memo || ''
        }
        await productReceiveDataConnect().updateOne(body)
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

        setModifyingReceiveData({
            ...modifyingReceiveData,
            [name]: value
        })
    }

    const onActionSetModifyingReceiveData = (id) => {
        if(modifyingReceiveData && !window.confirm('현재 작업중인 내용을 저장하지 않고, 선택한 데이터를 수정하시겠습니까?')) {
            return;
        }
        let data = productReceive.filter(r => r.productReceive.id === id)[0]?.productReceive;
        setModifyingReceiveData(data);
    }

    return {
        productReceive,
        modifyingReceiveData,

        reqSearchBatchByOptionIds,
        onChangeValueOfNameById,
        onActionSetModifyingReceiveData,
        reqModifyReceiveMemo
    }
}
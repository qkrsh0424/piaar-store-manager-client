import { useState } from "react";
import { erpOrderItemDataConnect } from "../../../../data_connect/erpOrderItemDataConnect";

export default function useErpOrderItemHook() {
    const [itemPages, setItemPages] = useState(null);

    const reqSearchPerformanceItems = async (body, params) => {
        await erpOrderItemDataConnect().searchPerformance(body, params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setItemPages(res.data.data);
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

    const onActionResetItems = () => {
        setItemPages(null);
    }

    return {
        itemPages,
        reqSearchPerformanceItems,
        onActionResetItems
    }
}
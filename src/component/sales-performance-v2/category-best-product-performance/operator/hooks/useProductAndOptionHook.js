import { useState } from "react";
import { productOptionDataConnect } from "../../../../../data_connect/productOptionDataConnect";

export default function useProductAndOptionHook () {
    const [productAndOptions, setProductAndOptions] = useState(null);

    const reqSearchAllRelatedProduct = async () => {
        await productOptionDataConnect().searchAllRelatedProduct()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setProductAndOptions(res.data.data);
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
        productAndOptions,
        reqSearchAllRelatedProduct
    }
}
import { useState } from "react"
import { productOptionDataConnect } from "../../../../../../data_connect/productOptionDataConnect";

export default function useProductOptionsSearchHook () {
    const [productOptions, setProductOptions] = useState(null);

    const reqSearchAllM2OJ = async () => {
        await productOptionDataConnect().searchAllM2OJ()
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    setProductOptions(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                let message = res?.data.memo;
                if (res?.status === 500) {
                    message = 'undefined error.';
                }

                throw new Error(message);
            })
    }

    return {
        productOptions,

        reqSearchAllM2OJ
    }
}
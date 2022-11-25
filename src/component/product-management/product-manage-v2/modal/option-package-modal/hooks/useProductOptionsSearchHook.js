import { useState } from "react"
import { productOptionDataConnect } from "../../../../../../data_connect/productOptionDataConnect";

export default function useProductOptionsSearchHook () {
    const [productOptions, setProductOptions] = useState(null);

    const searchAllRelatedProduct = async () => {
        await productOptionDataConnect().searchAllRelatedProduct()
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

        searchAllRelatedProduct
    }
}
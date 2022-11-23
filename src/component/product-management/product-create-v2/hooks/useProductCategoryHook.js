import { useState } from "react"
import { productCategoryDataConnect } from "../../../../data_connect/productCategoryDataConnect";

export default function useProductCategoryHook(props) {
    const [productCategoryList, setProductCategoryList] = useState(null);

    const reqSearchAllProductCategory = async () => {
        await productCategoryDataConnect().searchAll()
            .then(res => {
                if(res.status === 200 && res.data && res.data.message === 'success') {
                    setProductCategoryList(res.data.data);
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
        productCategoryList,

        reqSearchAllProductCategory
    }
}
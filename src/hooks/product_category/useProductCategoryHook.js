import { useEffect } from "react";
import { useState } from "react"
import { productCategoryDataConnect } from "../../data_connect/productCategoryDataConnect";

export default function useProductCategoryHook(props) {
    const [productCategoryList, setProductCategoryList] = useState(null);

    useEffect(() => {
        async function fetchInit() {
            await reqSearchAllProductCategory();
        }

        fetchInit();
    }, [])

    const reqSearchAllProductCategory = async () => {
        await productCategoryDataConnect().searchList()
            .then(res => {
                if(res.status === 200 && res.data && res.data.message === 'success') {
                    setProductCategoryList(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    return {
        productCategoryList
    }
}
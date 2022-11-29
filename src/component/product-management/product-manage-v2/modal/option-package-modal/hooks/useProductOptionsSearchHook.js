import { useState } from "react"
import { productOptionDataConnect } from "../../../../../../data_connect/productOptionDataConnect";

export default function useProductOptionsSearchHook () {
    const [productOptions, setProductOptions] = useState(null);

    const searchAllRelatedProduct = async () => {
        await productOptionDataConnect().searchAllRelatedProduct()
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    // 패키지상품으로 등록된 애들은 제외하고 반환
                    // 패키지상품은 패키지구성상품 등록 제한
                    let unpakcageOptions = (res.data.data).filter(r => r.option.packageYn === 'n');
                    setProductOptions(unpakcageOptions);
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
import { useState } from "react";
import { productDataConnect } from "../../../../data_connect/productDataConnect";

export default function useProductHook () {
    const [products, setProducts] = useState(null);

    const reqSearchAll = async () => {
        await productDataConnect().searchAll()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setProducts(res.data.data);
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
        products,
        reqSearchAll
    }
}
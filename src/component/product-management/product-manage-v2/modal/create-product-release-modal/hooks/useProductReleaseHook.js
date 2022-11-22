import { useState } from "react";
import { productReleaseDataConnect } from "../../../../../../data_connect/productReleaseDataConnect";
import { isNumberFormat } from "../../../../../../utils/regexUtils";

export default function useProductReleaseHook () {
    const [productRelease, setProductRelease] = useState(null);

    const reqCreateProductRelease = async (data, snackbarOpen) => {
        await productReleaseDataConnect().createBatch(data)
            .then(res => {
                if(res.status === 200) {
                    snackbarOpen(res.data.memo);
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

    const onActionInitReleaseData = (data) => {
        setProductRelease(data);
    }

    const onChangeValueOfNameByIdx = (e, idx) => {
        let name = e.target.name;
        let value = e.target.value;

        let updatedProductRelease = productRelease.map((r, index) => {
            if (index === idx) {
                return {
                    ...r,
                    [name]: value
                }
            }
            else {
                return r;
            }
        })

        setProductRelease(updatedProductRelease);
    }

    const onChangeBatchValueOfName = (data) => {
        let name = data.name;
        let value = data.value;

        let updatedProductRelease = productRelease.map(r => {
            return {
                ...r,
                [name]: value
            }
        })

        setProductRelease(updatedProductRelease);
    }

    const checkCreateFormData = () => {
        for(let i = 0; i < productRelease.length; i++) {
            let data = productRelease[i];

            if(data.releaseUnit < 1) {
                throw new Error('[수량]은 0보다 큰 수를 입력해주세요.')
            }
            
            if(data.releaseUnit && !isNumberFormat(data.releaseUnit)) {
                throw new Error('[수량]은 숫자만 입력해 주세요.')
            }
        }
    }

    return {
        productRelease,

        onChangeValueOfNameByIdx,
        onChangeBatchValueOfName,
        checkCreateFormData,
        reqCreateProductRelease,
        onActionInitReleaseData
    }
}
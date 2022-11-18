import { useState } from "react";
import { productReceiveDataConnect } from "../../../../../../data_connect/productReceiveDataConnect";
import { isNumberFormat } from "../../../../../../utils/regexUtils";

export default function useProductReceiveHook () {
    const [productReceive, setProductReceive] = useState(null);
    
    const reqCreateProductReceive = async (data) => {
        await productReceiveDataConnect().createBatch(data)
            .then(res => {
                if(res.status === 200) {
                    alert(res.data.memo);
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

    const onActionInitReceiveData = (data) => {
        setProductReceive(data);
    }
    
    const onChangeValueOfNameByIdx = (e, idx) => {
        let name = e.target.name;
        let value = e.target.value;

        let updatedProductReceive = productReceive.map((r, index) => {
            if (index === idx) {
                return {
                    ...r,
                    [name]: value
                }
            } else {
                return r
            }
        })
        setProductReceive(updatedProductReceive);
    }

    const onChangeBatchValueOfName = (data) => {
        let name = data.name;
        let value = data.value;

        let updatedProductReceive = productReceive.map(r => {
            return {
                ...r,
                [name]: value
            }
        })

        setProductReceive(updatedProductReceive);
    }

    const checkCreateFormData = () => {
        for(let i = 0; i < productReceive.length; i++) {
            let data = productReceive[i];

            if(data.receiveUnit < 1) {
                throw new Error('[수량]은 0보다 큰 수를 입력해주세요.')
            }

            if(data.receiveUnit && !isNumberFormat(data.receiveUnit)) {
                throw new Error('[수량]은 숫자만 입력해 주세요.')
            }

        }
    }

    return {
        productReceive,

        reqCreateProductReceive,
        onChangeValueOfNameByIdx,
        onChangeBatchValueOfName,
        checkCreateFormData,
        onActionInitReceiveData
    }
}
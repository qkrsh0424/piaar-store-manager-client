import { useEffect } from "react";
import { useState } from "react";
import { isNumberFormat } from "../../../../utils/regexUtils";

export default function useProductReceiveHook (props) {
    const [productReceive, setProductReceive] = useState(null);

    useEffect(() => {
        if(productReceive) {
            return;
        }

        onActionInitData(props.productReceive);
    }, [props.productReceive]);

    const onActionInitData = (initData) => {
        setProductReceive(initData);
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

        onChangeValueOfNameByIdx,
        onChangeBatchValueOfName,
        checkCreateFormData
    }
}
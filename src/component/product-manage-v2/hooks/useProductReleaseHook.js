import { useEffect } from "react";
import { useState } from "react";
import { isNumberFormat } from "../../../utils/regexUtils";

export default function useProductReleaseHook (props) {
    const [productRelease, setProductRelease] = useState(null);

    useEffect(() => {
        if(productRelease) {
            return;
        }

        onActionInitData(props.productRelease);
    }, [props.productRelease]);

    const onActionInitData = (initData) => {
        setProductRelease(initData);
    }

    const onChangeValueOfNameByIdx = (e, idx) => {
        let name = e.target.name;
        let value = e.target.value;

        let updatedProductRelease = productRelease.map((r, index) => {
            return (index === idx) ? 
                {
                    ...r,
                    [name]: value
                }
                :
                r
                ;
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
        checkCreateFormData
    }
}
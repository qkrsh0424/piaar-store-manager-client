import { useEffect } from "react";
import { useState } from "react";

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

    return {
        productRelease,

        onChangeValueOfNameByIdx,
        onChangeBatchValueOfName
    }
}
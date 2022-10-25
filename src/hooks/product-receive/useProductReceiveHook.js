import { useEffect } from "react";
import { useState } from "react";

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
            return (index === idx) ? 
                {
                    ...r,
                    [name]: value
                }
                :
                r
                ;
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

    return {
        productReceive,

        onChangeValueOfNameByIdx,
        onChangeBatchValueOfName
    }
}
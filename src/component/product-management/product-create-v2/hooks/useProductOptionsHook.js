import { useCallback } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { isNumberFormat } from "../../../../utils/regexUtils";

// id 제거
const option = {
    defaultName: '',
    managementName: '',
    salesPrice: 0,
    totalPurchasePrice: 0,
    releaseLocation: '',
    status: '',
    memo: '',
    safetyStockUnit: 0,
    productCid: null,
    productId: null,
}

export default function useProductOptionsHook (props) {
    const [options, setOptions] = useState([]);

    const onActionResetData = useCallback(() =>
        setOptions([])
    );

    const onActionUpdateOptions = (data) => {
        setOptions(data);
    }

    const onChangeValueOfNameById = (e, id) => {
        let name = e.target.name;
        let value = e.target.value;

        let updatedOptions = options.map(r => {
            return (r.id === id) ?
                {
                    ...r,
                    [name]: value
                }
                :
                r
                ;
        })

        setOptions(updatedOptions);
    }

    const onActionAddData = (e) => {
        e.preventDefault();

        let newData = {
            ...option,
            id: uuidv4()
        }
        setOptions([...options, newData])
    }

    const onActionCopyData = (data) => {
        let copyData = {
            ...data,
            cid: null,
            id: uuidv4()
        }
        setOptions([...options, copyData])
    }

    const onActionDeleteById = (optionId) => {
        let updatedOptions = options.filter(r => r.id !== optionId);
        setOptions(updatedOptions);
    }

    const checkCreateFormData = () => {
        if (options.length === 0) {
            throw new Error('[옵션] 상품의 옵션을 1개 이상 등록해 주세요.');
        }

        for (let i = 0; i < options.length; i++) {
            let option = options[i];

            if (option.defaultName == '' || !option.defaultName) {
                throw new Error('[옵션] 옵션명을 확인해 주세요.')
            }
            
            if(option.salesPrice && !isNumberFormat(option.salesPrice)) {
                throw new Error('[옵션] 판매가에 숫자만 입력해 주세요.')
            }

            if(option.totalPurchasePrice && !isNumberFormat(option.totalPurchasePrice)) {
                throw new Error('[옵션] 매입총합계에 숫자만 입력해 주세요.')
            }

            if(option.safetyStockUnit && !isNumberFormat(option.safetyStockUnit)) {
                throw new Error('[옵션] 안재재고수량에 숫자만 입력해 주세요.')
            }
        }
    }

    return {
        options,

        onActionAddData,
        onActionCopyData,
        onActionDeleteById,
        onChangeValueOfNameById,
        onActionUpdateOptions,
        checkCreateFormData,
        onActionResetData
    }
}
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { productOptionDataConnect } from "../../../../data_connect/productOptionDataConnect";
import useRouterHook from "../../../../hooks/router/useRouterHook";
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

export default function useProductOptionsHook () {
    const [originOptions, setOriginOptions] = useState([]);
    const [options, setOptions] = useState([]);

    const {
        navigatePrevPage
    } = useRouterHook();

    const reqSearchBatchByProductId = async (id) => {
        await productOptionDataConnect().searchBatchByProductId(id)
            .then(res => {
                if(res.status === 200 && res.data && res.data.message === 'success'){
                    setOptions(res.data.data);
                    setOriginOptions(res.data.data);
                }
            })
    }

    const reqModifyBatch = async (productId, navbarOpen) => {
        await productOptionDataConnect().updateBatch(productId, options)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    navbarOpen();
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

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

    const onActionDeleteById = (e, optionId) => {
        e.stopPropagation();

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

    const onActionResetOriginData = () => {
        setOptions([...originOptions]);
    }

    return {
        options,

        onActionAddData,
        onActionDeleteById,
        onChangeValueOfNameById,
        onActionUpdateOptions,
        checkCreateFormData,
        reqSearchBatchByProductId,
        reqModifyBatch,
        onActionResetOriginData
    }
}
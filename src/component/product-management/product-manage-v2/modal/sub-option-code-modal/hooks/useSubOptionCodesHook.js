import { useCallback, useState } from "react";
import { subOptionCodeDataConnect } from "../../../../../../data_connect/subOptionCodeDataConnect";

export default function useSubOptionCodesHook() {
    const [subOptionCodes, setSubOptionCodes] = useState([]);

    const [modifyingSubOption, setModifyingSubOption] = useState(null);

    const onActionResetData = useCallback(() => {
        setSubOptionCodes([]);
        setModifyingSubOption(null);
    })

    const reqSearchBatchSubOptionCodes = async (optionId) => {
        await subOptionCodeDataConnect().searchBatchByProductOptionId(optionId)
            .then(res => {
                if(res.status === 200 && res.data && res.data.message === 'success') {
                    setSubOptionCodes(res.data.data);
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

    const reqDeleteOne = async (id) => {
        await subOptionCodeDataConnect().deleteOne(id)
            .catch(err => {
                let res = err.response;
                let message = res?.data.memo;
                if (res?.status === 500) {
                    message = 'undefined error.';
                }

                throw new Error(message);
            })
    }

    const reqCreateOne = async () => {
        await subOptionCodeDataConnect().postOne(modifyingSubOption)
            .then(res => {
                if(res.status === 200 && res.data && res.data.message === 'success') {
                    onActionResetData();
                }
            })
            .catch(err =>{
                let res = err.response;
                let message = res?.data.memo;
                if (res?.status === 500) {
                    message = 'undefined error.';
                }

                throw new Error(message);
            })
    }

    const reqModifyOne = async () => {
        await subOptionCodeDataConnect().putOne(modifyingSubOption)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    onActionResetData();
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

    const onActionAddData = (data) => {
        setModifyingSubOption(data);
    }

    const checkSaveForm = () => {
        if (modifyingSubOption.subOptionCode === '' || !modifyingSubOption.subOptionCode) {
            throw new Error('대체코드는 공백으로 생성할 수 없습니다.')
        }

        if (modifyingSubOption.productOptionId === '' || !modifyingSubOption.productOptionId) {
            throw new Error('상품옵션정보가 올바르지 않습니다.')
        }

        // if (modifyingSubOption.productOptionCode === '' || !modifyingSubOption.productOptionCode) {
        //     throw new Error('상품옵션정보가 올바르지 않습니다.')
        // }
    }

    const onChangeValueOfName = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setModifyingSubOption({
            ...modifyingSubOption,
            [name]: value
        });
    }

    const onChangeSelectedModifyingData = (subOptionId) => {
        let data = subOptionCodes.filter(r => r.id === subOptionId)[0];
        setModifyingSubOption(data);
    }

    const onActionDeleteModifyingData = () => {
        setModifyingSubOption(null);
    }

    return {
        subOptionCodes,
        modifyingSubOption,

        reqModifyOne,
        reqCreateOne,
        reqDeleteOne,
        onActionDeleteModifyingData,
        checkSaveForm,
        onChangeSelectedModifyingData,
        reqSearchBatchSubOptionCodes,
        onChangeValueOfName,
        onActionAddData
    }
}
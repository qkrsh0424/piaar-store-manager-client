import { useCallback, useState } from "react";
import { subOptionCodeDataConnect } from "../../../../../../data_connect/subOptionCodeDataConnect";

export default function useSubOptionCodesHookV2() {
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
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const reqDeleteOne = async (id) => {
        await subOptionCodeDataConnect().deleteOne(id)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
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
                if(res?.status === 500) {
                    alert('undefined error.');
                    return;
                }
                
                alert(res?.data.memo);
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
                if(res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const onActionAddData = (data) => {
        if(modifyingSubOption) {
            alert('수정중인 데이터를 먼저 완료해주세요.');
            return;
        }

        setModifyingSubOption(data);
    }

    const checkSaveForm = () => {
        if (modifyingSubOption.subOptionCode === '' || !modifyingSubOption.subOptionCode) {
            throw new Error('대체코드는 공백으로 생성할 수 없습니다.')
        }

        if (modifyingSubOption.productOptionId === '' || !modifyingSubOption.productOptionId) {
            throw new Error('상품옵션정보가 올바르지 않습니다.')
        }

        if (modifyingSubOption.productOptionCode === '' || !modifyingSubOption.productOptionCode) {
            throw new Error('상품옵션정보가 올바르지 않습니다.')
        }
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
        if(modifyingSubOption) {
            alert('수정중인 데이터를 먼저 완료해주세요.');
            return;
        }

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
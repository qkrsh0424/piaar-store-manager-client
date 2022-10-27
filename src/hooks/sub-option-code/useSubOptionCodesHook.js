import { useState } from "react";
import { useEffect } from "react";
import { subOptionCodeDataConnect } from "../../data_connect/subOptionCodeDataConnect";

export default function useSubOptionCodesHook(props) {
    const [subOptionCodes, setSubOptionCodes] = useState([]);

    useEffect(() => {
        async function fetchInit() {
            await reqSearchBatchSubOptionCodes(props.option.id);
        }

        fetchInit();
    }, [])

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

    const reqDeleteSubOptionCode = async (subOptionId) => {
        await subOptionCodeDataConnect().deleteOne(subOptionId)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqCreateSubOptionCode = async (data) => {
        await subOptionCodeDataConnect().postOne(data)
            .catch(err =>{
                let res = err.response;
                if(res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqModifySubOptionCode = async (data) => {
        await subOptionCodeDataConnect().putOne(data)
            .catch(err => {
                let res = err.response;
                if(res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const onActionAddData = () => {
        let data = {
            subOptionCode: '',
            memo: '',
            productOptionId: props.option.id,
            productOptionCode: props.option.code
        }

        let updatedSubOptionCodes = subOptionCodes.concat(data);
        setSubOptionCodes(updatedSubOptionCodes);        
    }

    const onActionDeleteData = (idx) => {
        let result = subOptionCodes.filter((r, index) => index !== idx);
        setSubOptionCodes(result);
    }

    const onActionDeleteSavedData = async (subOptionId) => {
        await reqDeleteSubOptionCode(subOptionId);
        await reqSearchBatchSubOptionCodes(props.option.id);
    }

    const onActionCreateData = async (idx) => {
        let data = subOptionCodes.filter((r, index) => index === idx)[0];
        await __reqCreateSubOptionCode(data);
        // await reqSearchBatchSubOptionCodes(props.option.id);
    }
    
    const onActionModifyData= async (idx) => {
        let data = subOptionCodes.filter((r, index) => index === idx)[0];
        await __reqModifySubOptionCode(data);
        // await reqSearchBatchSubOptionCodes(props.option.id);
    }

    const checkSaveForm = (data) => {
        if (data.subOptionCode === '' || !data.subOptionCode) {
            throw new Error('대체코드는 공백으로 생성할 수 없습니다.')
        }
    }

    const onChangeValueOfNameByIdx = (e, idx) => {
        let name = e.target.name;
        let value = e.target.value;

        let updatedSubOptionCodes = subOptionCodes.map((r, index) => {
            if(index === idx) {
                return {
                    ...r,
                    [name]: value
                }
            }else {
                return r;
            }
        })

        setSubOptionCodes(updatedSubOptionCodes);
    }

    return {
        subOptionCodes,

        onActionAddData,
        onActionDeleteData,
        onActionDeleteSavedData,
        onActionCreateData,
        onActionModifyData,
        onChangeValueOfNameByIdx,
        checkSaveForm
    }
}
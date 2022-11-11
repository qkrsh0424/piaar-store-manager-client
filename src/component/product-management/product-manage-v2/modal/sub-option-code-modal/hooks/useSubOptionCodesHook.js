import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { subOptionCodeDataConnect } from "../../../../../../data_connect/subOptionCodeDataConnect";

export default function useSubOptionCodesHook(props) {
    const [subOptionCodes, setSubOptionCodes] = useState([]);
    const [originSubOptionCodes, setOriginSubOptionCodes] = useState(null);
    
    const [modifyingId, setModifyingId] = useState(null);


    const reqSearchBatchSubOptionCodes = async (optionId) => {
        await subOptionCodeDataConnect().searchBatchByProductOptionId(optionId)
            .then(res => {
                if(res.status === 200 && res.data && res.data.message === 'success') {
                    setOriginSubOptionCodes(res.data.data);
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

    const reqDeleteSubOptionCode = async (id) => {
        await subOptionCodeDataConnect().deleteOne(id)
            .then(res => {
                if(res.status === 200 && res.data && res.data.message === 'success') {
                    let originData = originSubOptionCodes.filter(r => r.id !== id);
                    let data = subOptionCodes.filter(r => r.id !== id);
                    setOriginSubOptionCodes(originData);
                    setSubOptionCodes(data);
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

    const reqCreateSubOptionCode = async (data) => {
        await subOptionCodeDataConnect().postOne(data)
            .then(res => {
                if(res.status === 200 && res.data && res.data.message === 'success') {
                    // 정상적으로 생성된다면 modifyingId를 초기화
                    setModifyingId(null);
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

    const reqModifySubOptionCode = async (data) => {
        await subOptionCodeDataConnect().putOne(data)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    // 정상적으로 생성된다면 modifyingId를 초기화
                    setModifyingId(null);
                    reqSearchBatchSubOptionCodes(props.option.id);
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

    const onActionAddData = () => {
        if(modifyingId) {
            alert('수정중인 데이터를 먼저 완료해주세요.');
            return;
        }

        let data = {
            id: uuidv4(),
            subOptionCode: '',
            memo: '',
            productOptionId: props.option.id,
            productOptionCode: props.option.code
        }

        let updatedSubOptionCodes = subOptionCodes.concat(data);
        setSubOptionCodes(updatedSubOptionCodes);
        setModifyingId(data.id);
    }

    // 기존에 생성된 데이터라면 삭제 api 요청, 그렇지 않다면 client에서 처리
    const onActionDeleteData = async (id) => {
        if(originSubOptionCodes.some(r => r.id === id)) {
            await reqDeleteSubOptionCode(id);
        }else {
            let result = subOptionCodes.filter(r => r.id !== id);
            setSubOptionCodes(result);
        }

        if(id === modifyingId) {
            setModifyingId(null);
        }
    }

    const onActionCreateOrModify = async (id) => {
        let data = subOptionCodes.filter(r => r.id === id)[0];

        // 기존에 존재하는 데이터면 수정 요청, 새로 생성한 데이터면 생성 요청
        if(originSubOptionCodes.some(r => r.id === id)) {
            // modify
            await reqModifySubOptionCode(data);
        } else {
            // create
            await reqCreateSubOptionCode(data);
            // await reqSearchBatchSubOptionCodes(props.option.id);
        }
    }

    const checkSaveForm = (data) => {
        if (data.subOptionCode === '' || !data.subOptionCode) {
            throw new Error('대체코드는 공백으로 생성할 수 없습니다.')
        }

        if (data.productOptionId === '' || !data.productOptionId) {
            throw new Error('상품옵션정보가 올바르지 않습니다.')
        }

        if (data.productOptionCode === '' || !data.productOptionCode) {
            throw new Error('상품옵션정보가 올바르지 않습니다.')
        }
    }

    const onChangeValueOfNameByIds = (e, id) => {
        let name = e.target.name;
        let value = e.target.value;

        let updatedSubOptionCodes = subOptionCodes.map(r => {
            if(r.id === id) {
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

    const onActionAddModifyingId = (id) => {
        if(modifyingId) {
            alert('수정중인 데이터를 먼저 완료해주세요.');
            return;
        }

        setModifyingId(id);
    }

    return {
        subOptionCodes,
        modifyingId,

        onActionAddData,
        onActionDeleteData,
        onActionCreateOrModify,
        onChangeValueOfNameByIds,
        checkSaveForm,
        onActionAddModifyingId,
        reqSearchBatchSubOptionCodes
    }
}
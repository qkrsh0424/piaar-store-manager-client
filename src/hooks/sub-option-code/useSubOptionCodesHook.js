import { useState } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { subOptionCodeDataConnect } from "../../data_connect/subOptionCodeDataConnect";

export default function useSubOptionCodesHook(props) {
    const [subOptionCodes, setSubOptionCodes] = useState([]);
    const [originSubOptionCodes, setOriginSubOptionCodes] = useState(null);

    const [modifyingIds, setModifyingIds] = useState([]);

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
                    let ids = modifyingIds.filter(modifyingId => modifyingId !== data.id);
                    setModifyingIds(ids);
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
                    let ids = modifyingIds.filter(modifyingId => modifyingId !== data.id);
                    setModifyingIds(ids);
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
        let data = {
            id: uuidv4(),
            subOptionCode: '',
            memo: '',
            productOptionId: props.option.id,
            productOptionCode: props.option.code
        }

        let updatedSubOptionCodes = subOptionCodes.concat(data);
        let updatedModifyingIds = modifyingIds.concat(data.id);
        setSubOptionCodes(updatedSubOptionCodes);
        setModifyingIds(updatedModifyingIds);
    }

    // 기존에 생성된 데이터라면 삭제 api 요청, 그렇지 않다면 client에서 처리
    const onActionDeleteData = async (id) => {
        if(originSubOptionCodes.some(r => r.id === id)) {
            await reqDeleteSubOptionCode(id);
        }else {
            let result = subOptionCodes.filter(r => r.id !== id);
            setSubOptionCodes(result);
        }

        let updatedIds = modifyingIds.filter(modifyId => modifyId !== id);
        setModifyingIds(updatedIds);
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
            await reqSearchBatchSubOptionCodes(props.option.id);
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
        let updatedIds = modifyingIds.concat(id);
        setModifyingIds(updatedIds);
    }

    return {
        subOptionCodes,
        modifyingIds,

        onActionAddData,
        onActionDeleteData,
        onActionCreateOrModify,
        onChangeValueOfNameByIds,
        checkSaveForm,
        onActionAddModifyingId
    }
}
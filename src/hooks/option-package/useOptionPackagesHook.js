import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { optionPackageDataConnect } from "../../data_connect/optionPackageDataConnect";

export default function useOptionPackagesHook(props) {
    const [originOptionPackages, setOriginOptionPackages] = useState([]);
    const [optionPackages, setOptionPackages] = useState([]);

    useEffect(() => {
        async function fetchInit() {
            await reqSearchOptionPackages(props.option.id);
        }

        fetchInit();
    }, [])

    const reqSearchOptionPackages = async (optionId) => {
        await optionPackageDataConnect().searchBatchByParentOptionId(optionId)
            .then(res => {
                if(res.status === 200 && res.data && res.data.message === 'success') {
                    setOriginOptionPackages(res.data.data);
                    setOptionPackages(res.data.data);
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

    const reqDeleteAndCreateOptionPackages = async (parentOptionId) => {
        await optionPackageDataConnect().deleteAndCreateBatch(parentOptionId, optionPackages)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    alert('정상적으로 완료되었습니다.');
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

    const onActionAddData = (data) => {
        let addData = {
            id: uuidv4(),
            packageUnit: 0,
            originOptionCode: data.option.code,
            originOptionId: data.option.id,
            originOptionCid: data.option.cid,
            originOptionDefaultName: data.option.defaultName,
            parentOptionId: props.option.id
        }

        let updatedOptionPackages = optionPackages.concat(addData);
        setOptionPackages(updatedOptionPackages);
    }

    const onChangeValueOfName = (e, id) => {
        let name = e.target.name;
        let value = e.target.value;

        let updatedOptionPackages = optionPackages.map(r => {
            if(r.id === id) {
                return {
                    ...r,
                    [name]: value
                }
            }else {
                return r;
            }
        })

        setOptionPackages(updatedOptionPackages);
    }

    const onActionDeleteData = (id) => {
        let data = optionPackages.filter(r => r.id !== id);
        setOptionPackages(data);
    }

    const onActionResetData = () => {
        if(!window.confirm('기존 패키지 구성으로 초기화하시겠습니까?\n(현재 변경된 내역은 저장되지 않습니다.)')) {
            return;
        }

        setOptionPackages([...originOptionPackages]);
    }

    const onSumbitCreateData = (parentOptionId) => {
        if(JSON.stringify(originOptionPackages) === JSON.stringify(optionPackages)) {
            return;
        }
        
        reqDeleteAndCreateOptionPackages(parentOptionId);
    }

    const checkSaveForm = () => {
        optionPackages.forEach(r => {
            if(r.originOptionCode === '' || !r.originOptionCode) {
                throw new Error('선택된 구성옵션 중 올바르지 않은 데이터가 존재합니다.');
            }

            if(r.originOptionId === '' || !r.originOptionId) {
                throw new Error('선택된 구성옵션 중 올바르지 않은 데이터가 존재합니다.');
            }

            if(r.originOptionDefaultName === '' || !r.originOptionDefaultName) {
                throw new Error('선택된 구성옵션 중 올바르지 않은 데이터가 존재합니다.');
            }

            if(r.parentOptionId === '' || !r.parentOptionId) {
                throw new Error('선택된 구성옵션 중 올바르지 않은 데이터가 존재합니다.');
            }

            if(r.packageUnit === '' || !r.packageUnit || r.packageUnit < 0) {
                throw new Error('구성 옵션의 수량은 0보다 큰 값이어야 합니다.');
            }
        })
    }

    return {
        optionPackages,

        onActionAddData,
        onActionDeleteData,
        onChangeValueOfName,
        onSumbitCreateData,
        onActionResetData,
        checkSaveForm
    }

} 

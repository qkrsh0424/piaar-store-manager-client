import { useEffect } from "react";
import { useState } from "react";
import { optionPackageDataConnect } from "../../../../../../data_connect/optionPackageDataConnect";
import { isNumberFormat } from "../../../../../../utils/regexUtils";

export default function useOptionPackagesHook() {
    const [originOptionPackages, setOriginOptionPackages] = useState([]);
    const [optionPackages, setOptionPackages] = useState([]);
    const [totalPackageUnit, setTotalPackageUnit] = useState(0);

    useEffect(() => {
        if(!optionPackages) {
            return;
        }

        onActionSumTotalUnit();
    }, [optionPackages])

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
                    alert('완료되었습니다.');
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
        let updatedOptionPackages = optionPackages.concat({...data});
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

    const onActionResetData = (e) => {
        e.preventDefault();
        
        if(!window.confirm('기존 패키지 구성으로 초기화하시겠습니까?\n(현재 변경된 내역은 저장되지 않습니다.)')) {
            return;
        }
        setOptionPackages([...originOptionPackages]);
    }

    const onSumbitCreateData = async (parentOptionId) => {
        if(JSON.stringify(originOptionPackages) === JSON.stringify(optionPackages)) {
            return;
        }
        
        await reqDeleteAndCreateOptionPackages(parentOptionId);
    }

    const checkSaveForm = () => {
        optionPackages.forEach(r => {
            if(r.originOptionId === '' || !r.originOptionId) {
                throw new Error('선택된 구성옵션 중 올바르지 않은 데이터가 존재합니다.');
            }
            if(r.parentOptionId === '' || !r.parentOptionId) {
                throw new Error('선택된 구성옵션 중 올바르지 않은 데이터가 존재합니다.');
            }
            if(r.packageUnit && !isNumberFormat(r.packageUnit)) {
                throw new Error('[수량]은 숫자만 입력해 주세요.');
            }
            if(r.packageUnit === '' || !r.packageUnit || r.packageUnit < 0) {
                throw new Error('구성 옵션의 수량은 0보다 큰 값이어야 합니다.');
            }
        })
    }
    
    const onActionSumTotalUnit = () => {
        let totalUnit = optionPackages.reduce((sum, r) => parseInt(sum) + parseInt(r.packageUnit), 0) || 0;
        setTotalPackageUnit(totalUnit);
    }

    return {
        optionPackages,
        totalPackageUnit,

        reqSearchOptionPackages,
        onActionAddData,
        onActionDeleteData,
        onChangeValueOfName,
        onSumbitCreateData,
        onActionResetData,
        checkSaveForm
    }
} 

import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { checkNumberFormat } from "../../../utils/regexUtils";
import valueUtils from "../../../utils/valueUtils";

const option = {
    defaultName: '',
    managementName: '',
    salesPrice: '',
    totalPurchasePrice: '',
    status: '',
    releaseLocation: '',
    safetyStockUnit: '',
    productCid: null,
    productId: null
}
export default function useProductOptionBatchRegHook(props) {
    const [productOptionBatchReg, setProductOptionBatchReg] = useState({...option});

    const onChangeValueOfName = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setProductOptionBatchReg({
            ...productOptionBatchReg,
            [name]: value
        })
    }

    const returnConvertedOptions = () => {
        let defaultNameList = valueUtils.trimAndSplit(productOptionBatchReg.defaultName, ',');
        let managementNameList = valueUtils.trimAndSplit(productOptionBatchReg.managementName, ',');
        let salesPriceList = valueUtils.trimAndSplit(productOptionBatchReg.salesPrice, ',');
        let totalPurchasePriceList = valueUtils.trimAndSplit(productOptionBatchReg.totalPurchasePrice, ',');
        let statusList = valueUtils.trimAndSplit(productOptionBatchReg.status, ',');
        let releaseLocationList = valueUtils.trimAndSplit(productOptionBatchReg.releaseLocation, ',');
        let safetyStockUnitList = valueUtils.trimAndSplit(productOptionBatchReg.safetyStockUnit, ',');

        try {
            let addOptionList = [];
            for (var i = 0; i < defaultNameList.length; i++) {
                if (defaultNameList[i] === '' || !defaultNameList[i]) {
                    throw Error('일괄 등록 시 옵션명은 필수값입니다. (빈 값 허용하지 않음)');
                }

                if (salesPriceList[i] && !checkNumberFormat(salesPriceList[i])) {
                    throw Error('판매가에 숫자만 입력해주세요.');
                }

                if (totalPurchasePriceList[i] && !checkNumberFormat(totalPurchasePriceList[i])) {
                    throw Error('매입총합계에 숫자만 입력해주세요.');
                }

                if (safetyStockUnitList[i] && !checkNumberFormat(safetyStockUnitList[i])) {
                    throw Error('안전재고에 숫자만 입력해주세요.');
                }

                let addOption = {
                    id: uuidv4(),
                    defaultName: defaultNameList[i],
                    managementName: managementNameList[i] || '',
                    salesPrice: salesPriceList[i] || 0,
                    totalPurchasePrice: totalPurchasePriceList[i] || 0,
                    status: statusList[i] || '',
                    releaseLocation: releaseLocationList[i] || '',
                    safetyStockUnit: safetyStockUnitList[i] || 0
                }

                addOptionList.push(addOption);
            }

            // 일괄 등록 데이터 초기화
            setProductOptionBatchReg({ ...option });
            // 생성된 옵션 데이터 반환
            return addOptionList;
        } catch (err) {
            alert(err.message);
            return;
        }
    }

    return {
        productOptionBatchReg,

        onChangeValueOfName,
        returnConvertedOptions
    }
}
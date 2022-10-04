import CategorySelectorFieldView from "./CategorySelectorField.view";
import { v4 as uuidv4 } from 'uuid';
import { Container } from "./CreateForm.styled";
import OptionInfoInputFieldView from "./OptionInfoInputField.view";
import ProductInfoInputFieldView from "./ProductInfoInputField.view";
import { useEffect } from "react";
import { useReducer } from "react";

class Product {
    constructor() {
        this.id = uuidv4();
        this.imageUrl = '';
        this.imageFileName = '';
        this.defaultName = '';
        this.managementName = '';
        this.memo = '';
        this.purchaseUrl = '';
        this.managementNumber = '';
        this.stockManagementYn = false;
        this.productCategoryCid = null;
    }

    toJSON() {
        return {
            id: this.id,
            imageUrl: this.imageUrl,
            imageFileName: this.imageFileName,
            defaultName: this.defaultName,
            managementName: this.managementName,
            memo: this.memo,
            purchaseUrl: this.purchaseUrl,
            managementNumber: this.managementNumber,
            stockManagementYn: this.stockManagementYn,
            productCategoryCid: this.productCategoryCid
        }
    }
}

class ProductOption {
    constructor(productId) {
        this.id = uuidv4();
        this.defaultName = '';
        this.managementName = '';
        this.salesPrice = 0;
        this.totalPurchasePrice = 0;
        this.status = '';
        this.releaseLocation = '';
        this.safetyStockUnit = 0;
        this.productCid = null;
        this.productId = productId;
    }

    toJSON() {
        return {
            id: this.id,
            defaultName: this.defaultName,
            managementName: this.managementName,
            salesPrice: this.salesPrice,
            totalPurchasePrice: this.totalPurchasePrice,
            status: this.status,
            releaseLocation: this.releaseLocation,
            safetyStockUnit: this.safetyStockUnit,
            productCid: this.productCid,
            productId: this.productId
        }
    }
}

const CreateFormComponent = (props) => {
    const [createProductData, dispatchCreateProductData] = useReducer(createProductDataReducer, initialCreateProductData);
    const [createOptionDataList, dispatchCreateOptionDataList] = useReducer(createOptionDataListReducer, initialCreateOptionDataList);

    const [batchRegOptionData, dispatchBatchRegOptionData] = useReducer(batchRegOptionDataReducer, initialBatchRegOptionData);

    useEffect(() => {
        let product = new Product().toJSON();
        let option = new ProductOption(product.id).toJSON(); 
        let batchDefaultOption = {
            ...option,
            salesPrice: '',
            totalPurchasePrice: '',
            safetyStockUnit: ''
        }

        dispatchCreateProductData({
            type: 'INIT_DATA',
            payload: product
        })

        dispatchCreateOptionDataList({
            type: 'INIT_DATA',
            payload: [option]
        })

        dispatchBatchRegOptionData({
            type: 'INIT_DATA',
            payload: batchDefaultOption
        })
    }, []);

    const onChangeProductInputValue = (e) => {
        dispatchCreateProductData({
            type: 'CHANGE_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const onChangeOptionInputValue = (e, optionId) => {
        let optionList = createOptionDataList.map(r => {
          if(r.id === optionId) {
            return {
                ...r,
                [e.target.name]: e.target.value
            }
          }

          return r;
        });

        dispatchCreateOptionDataList({
            type: 'INIT_DATA',
            payload: optionList
        })
    }

    const onActionAddOptionData = () => {
        let productId = createProductData?.id;
        let optionList = [...createOptionDataList, new ProductOption(productId)];

        dispatchCreateOptionDataList({
            type: 'INIT_DATA',
            payload: optionList
        })
    }

    const onActionDeleteOption = (e, optionId) => {
        e.stopPropagation();

        let optionList = createOptionDataList.filter(r => r.id !== optionId);

        if(optionList.length < 1) {
            return;
        }

        dispatchCreateOptionDataList({
            type: 'INIT_DATA',
            payload: optionList
        })
    }

    const onChangeBatchRegOptionInputValue = (e) => {
        dispatchBatchRegOptionData({
            type: 'CHANGE_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const onActionAddOptionDataList = () => {
        let defaultNameList = batchRegOptionData.defaultName?.replace(' ', '')?.split(',');
        let managementNameList = batchRegOptionData.managementName?.replace(' ', '')?.split(',');
        let salesPriceList = batchRegOptionData.salesPrice?.replace(' ', '')?.split(',');
        let totalPurchasePriceList = batchRegOptionData.totalPurchasePrice?.replace(' ', '')?.split(',');
        let statusList = batchRegOptionData.status?.replace(' ', '')?.split(',');
        let releaseLocationList = batchRegOptionData.releaseLocation?.replace(' ', '')?.split(',');
        let safetyStockUnitList = batchRegOptionData.safetyStockUnit?.replace(' ', '')?.split(',');
        
        let addOptionList = defaultNameList.map((r, idx) => {
            let option = new ProductOption(createProductData.id);
            
            return {
                ...option,
                defaultName: r,
                managementName: managementNameList[idx] || '',
                salesPrice: salesPriceList[idx] || 0,
                totalPurchasePrice: totalPurchasePriceList[idx] || 0,
                status: statusList[idx] || '',
                releaseLocation: releaseLocationList[idx] || '',
                safetyStockUnit: safetyStockUnitList[idx] || 0
            }
        });

        let createOptionList = [...createOptionDataList, ...addOptionList];
        dispatchCreateOptionDataList({
            type: 'INIT_DATA',
            payload: createOptionList
        })
    }

    return (
        <Container>
            <CategorySelectorFieldView
                categoryList={props.categoryList}

            ></CategorySelectorFieldView>

            {createProductData &&
                <ProductInfoInputFieldView
                    createProductData={createProductData}

                    onChangeProductInputValue={onChangeProductInputValue}
                ></ProductInfoInputFieldView>
            }

            {createOptionDataList && createOptionDataList.length > 0 &&
                <OptionInfoInputFieldView
                    createOptionDataList={createOptionDataList}
                    batchRegOptionData={batchRegOptionData}

                    onChangeOptionInputValue={onChangeOptionInputValue}
                    onActionAddOptionData={onActionAddOptionData}
                    onActionDeleteOption={onActionDeleteOption}
                    onChangeBatchRegOptionInputValue={onChangeBatchRegOptionInputValue}
                    onActionAddOptionDataList={onActionAddOptionDataList}
                ></OptionInfoInputFieldView>
            }
        </Container>
    )
}

export default CreateFormComponent;

const initialCreateProductData = null;
const initialCreateOptionDataList = [];
const initialBatchRegOptionData = null;

const createProductDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialCreateProductData;
        default: return initialCreateProductData;
    }
}

const createOptionDataListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialCreateOptionDataList;
        default: return initialCreateOptionDataList;
    }
}

const batchRegOptionDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialBatchRegOptionData;
        default: return initialBatchRegOptionData;
    }
}
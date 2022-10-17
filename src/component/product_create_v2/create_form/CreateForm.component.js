import CategorySelectorFieldView from "./CategorySelectorField.view";
import { v4 as uuidv4 } from 'uuid';
import { Container, PageTitleFieldWrapper } from "./CreateForm.styled";
import OptionInfoInputFieldView from "./OptionInfoInputField.view";
import ProductInfoInputFieldView from "./ProductInfoInputField.view";
import { useEffect } from "react";
import { useReducer } from "react";
import { useImageFileUploaderHook } from "../../../hooks/uploader/useImageFileUploaderHook";
import CreateButtonFieldView from "./CreateButtonField.view";
import { useLocation, useNavigate } from "react-router-dom";
import valueUtils from "../../../utils/valueUtils";
import { checkNumberFormat } from "../../../utils/regexUtils";
import { useState } from "react";
import CommonModalComponent from "../../module/modal/CommonModalComponent";
import CreateOptionDefaultNameModalComponent from "../create_option_default_name_modal/CreateOptionDefaultNameModal.component";

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
        this.stockManagement = false;
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
            stockManagement: this.stockManagement,
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

function PageTitleFieldView({ title }) {
    return (
        <PageTitleFieldWrapper>
            <div>{title}</div>
        </PageTitleFieldWrapper>
    )
}

const CreateFormComponent = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [createProductData, dispatchCreateProductData] = useReducer(createProductDataReducer, initialCreateProductData);
    const [createOptionDataList, dispatchCreateOptionDataList] = useReducer(createOptionDataListReducer, initialCreateOptionDataList);

    const [batchRegOptionData, dispatchBatchRegOptionData] = useReducer(batchRegOptionDataReducer, initialBatchRegOptionData);
 
    const [slideDownEffect, dispatchSlideDownEffect] = useReducer(slideDownEffectReducer, initialSlideDownEffect);

    const [optionDefaultNameCreateModalOpen, setOptionDefaultNameCreateModalOpen] = useState(false);

    const {
        __reqUploadImageFile: __reqUploadImageFile
    } = useImageFileUploaderHook();

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

    const onActionAddOptionData = (e) => {
        e.preventDefault();

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

    const onActionAddOptionDataList = (e) => {
        e.preventDefault();

        let defaultNameList = valueUtils.trimAndSplit(batchRegOptionData.defaultName, ',');
        let managementNameList = valueUtils.trimAndSplit(batchRegOptionData.managementName, ',');
        let salesPriceList = valueUtils.trimAndSplit(batchRegOptionData.salesPrice, ',');
        let totalPurchasePriceList = valueUtils.trimAndSplit(batchRegOptionData.totalPurchasePrice, ',');
        let statusList = valueUtils.trimAndSplit(batchRegOptionData.status, ',');
        let releaseLocationList = valueUtils.trimAndSplit(batchRegOptionData.releaseLocation, ',');
        let safetyStockUnitList = valueUtils.trimAndSplit(batchRegOptionData.safetyStockUnit, ',');
        
        let addOptionList = [];
        let option = new ProductOption(createProductData.id);

        for(var i = 0; i < defaultNameList.length; i++) {
            if(defaultNameList[i] === '' || defaultNameList[i] === null || defaultNameList[i] === undefined) {
                alert('일괄 등록 시 옵션명은 필수값입니다. (빈 값 허용하지 않음)');
                return;
            }

            if(salesPriceList[i] && !checkNumberFormat(salesPriceList[i])){
                alert('판매가에 숫자만 입력해주세요.');
                return;
            }

            if(totalPurchasePriceList[i] && !checkNumberFormat(totalPurchasePriceList[i])){
                alert('매입총합계에 숫자만 입력해주세요.');
                return;
            }

            if(safetyStockUnitList[i] && !checkNumberFormat(safetyStockUnitList[i])){
                alert('안전재고에 숫자만 입력해주세요.');
                return;
            }

            let addOption = {
                ...option,
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

        let createOptionList = [...createOptionDataList, ...addOptionList];
        dispatchCreateOptionDataList({
            type: 'INIT_DATA',
            payload: createOptionList
        })

        // batchRegOption 값 초기화
        let batchDefaultOption = {
            ...option,
            salesPrice: '',
            totalPurchasePrice: '',
            safetyStockUnit: ''
        }

        dispatchBatchRegOptionData({ 
            type: 'INIT_DATA',
            payload: batchDefaultOption 
        })
    }

    const onActionSlideEffectControl = (e, target) => {
        e.stopPropagation();
        let targetValue = slideDownEffect[target];

        dispatchSlideDownEffect({
            type: 'CHANGE_DATA',
            payload: {
                name: target,
                value: !targetValue
            }
        })
    }

    const onActionUploadProductImageFile = async (e) => {
        e.preventDefault();

        if(e.target.files.length == 0) return;

        props.onActionOpenBackdrop();
        let imageInfo = await __reqUploadImageFile(e);
        props.onActionCloseBackdrop();

        dispatchCreateProductData({
            type: 'CHANGE_DATA',
            payload: {
                name : "imageFileName",
                value: imageInfo.imageFileName
            }
        });

        dispatchCreateProductData({
            type: 'CHANGE_DATA',
            payload: {
                name : "imageUrl",
                value: imageInfo.imageUrl
            }
        });
    }

    const onActionRemoveImage = () => {
        dispatchCreateProductData({
            type: 'CHANGE_DATA',
            payload: {
                name : 'imageFileName',
                value: ''
            }
        });

        dispatchCreateProductData({
            type: 'CHANGE_DATA',
            payload: {
                name : 'imageUrl',
                value: ''
            }
        });
    }

    const onActionChangeStockManagement = (e) => {
        e.preventDefault();

        let stockManagement = createProductData.stockManagement;
        dispatchCreateProductData({
            type: 'CHANGE_DATA',
            payload: {
                name: 'stockManagement',
                value: !stockManagement
            }
        })
    }

    const onActionCancelCreateProduct = () => {
        navigate(location.state.routerUrl);
    }

    const onSumbitCreateProductAndOption = (e) =>  {
        e.preventDefault();

        if(!checkFormData()) {
            return;
        }

        let body = {
            product: createProductData,
            options: createOptionDataList
        }
        props._onSubmit_createProductAndOptions(body);
    }

    const checkFormData = () => {
        if (createProductData.productCategoryCid === null) {
            alert('[카테고리] 상품의 카테고리를 한번더 확인해 주세요.')
            return false;
        }

        if (createProductData.defaultName === '' || createProductData.defaultName === null || createProductData.defaultName === undefined) {
            alert('[상품] 상품명을 한번더 확인해 주세요.')
            return false;
        }

        if (createOptionDataList.length === 0) {
            alert('[옵션] 상품의 옵션을 1개 이상 등록해 주세요.');
            return false;
        }

        for (let i = 0; i < createOptionDataList.length; i++) {
            let option = createOptionDataList[i];

            if (option.defaultName == '' || option.defaultName == null || option.defaultName == undefined) {
                alert('[옵션] 옵션명을 한번더 확인해 주세요.')
                return false;
            }

            if(option.salesPrice && !checkNumberFormat(option.salesPrice)) {
                alert('[옵션] 판매가에 숫자만 입력해 주세요.')
                return false;
            }

            if(option.totalPurchasePrice && !checkNumberFormat(option.totalPurchasePrice)) {
                alert('[옵션] 매입총합계에 숫자만 입력해 주세요.')
                return false;
            }

            if(option.safetyStockUnit && !checkNumberFormat(option.safetyStockUnit)) {
                alert('[옵션] 안재재고수량에 숫자만 입력해 주세요.')
                return false;
            }
        }

        return true;
    }

    const onActionOpenOptionDefaultNameCreateModal = (e) => {
        e.stopPropagation();

        setOptionDefaultNameCreateModalOpen(true);
    }

    const onActionCloseOptionDefaultNameCreateModal = () => {
        setOptionDefaultNameCreateModalOpen(false);
    }

    const onChangeBatchRegOptionDefaultNameInputValue = (data) => {
        let batchRegOptionDefaultName = batchRegOptionData.defaultName ? (batchRegOptionData.defaultName + ',' + data) : data;
        dispatchBatchRegOptionData({
            type: 'CHANGE_DATA',
            payload: {
                name: 'defaultName',
                value: batchRegOptionDefaultName
            }
        })
    }

    const onChangeOrderWithDragAndDrop = (result) => {
        if(!result.destination) {
            return;
        }

        const newOrderList = valueUtils.reorder(
            createOptionDataList,
            result.source.index,
            result.destination.index
        )

        dispatchCreateOptionDataList({
            type: 'INIT_DATA',
            payload: newOrderList
        })
    }

    return (
        <Container>
            <PageTitleFieldView title={'상품 등록'} />

            <form onSubmit={onSumbitCreateProductAndOption}>
                <CategorySelectorFieldView
                    categoryList={props.categoryList}
                    createProductData={createProductData}
                    slideDownEffect={slideDownEffect}

                    onChangeProductInputValue={onChangeProductInputValue}
                    onActionSlideEffectControl={(e) => onActionSlideEffectControl(e, 'category')}
                ></CategorySelectorFieldView>

                {createProductData &&
                    <ProductInfoInputFieldView
                        createProductData={createProductData}
                        slideDownEffect={slideDownEffect}

                        onChangeProductInputValue={onChangeProductInputValue}
                        onActionSlideEffectControl={(e) => onActionSlideEffectControl(e, 'product')}
                        onActionUploadProductImageFile={onActionUploadProductImageFile}
                        onActionRemoveImage={onActionRemoveImage}
                        onActionChangeStockManagement={onActionChangeStockManagement}
                    ></ProductInfoInputFieldView>
                }

                {createOptionDataList && batchRegOptionData &&
                    <OptionInfoInputFieldView
                        createOptionDataList={createOptionDataList}
                        batchRegOptionData={batchRegOptionData}
                        slideDownEffect={slideDownEffect}

                        onChangeOptionInputValue={onChangeOptionInputValue}
                        onActionAddOptionData={onActionAddOptionData}
                        onActionDeleteOption={onActionDeleteOption}
                        onChangeBatchRegOptionInputValue={onChangeBatchRegOptionInputValue}
                        onActionAddOptionDataList={onActionAddOptionDataList}
                        onActionSlideEffectControl={(e) => onActionSlideEffectControl(e, 'option')}
                        onActionOpenOptionDefaultNameCreateModal={onActionOpenOptionDefaultNameCreateModal}
                        onChangeOrderWithDragAndDrop={onChangeOrderWithDragAndDrop}
                    ></OptionInfoInputFieldView>
                }

                <CreateButtonFieldView
                    onActionCancelCreateProduct={onActionCancelCreateProduct}
                ></CreateButtonFieldView>
            </form>

            <CommonModalComponent
                open={optionDefaultNameCreateModalOpen}
                maxWidth={'sm'}
                fullWidth={true}

                onClose={onActionCloseOptionDefaultNameCreateModal}
            >
                <CreateOptionDefaultNameModalComponent
                    onActionCloseOptionDefaultNameCreateModal={onActionCloseOptionDefaultNameCreateModal}
                    onChangeBatchRegOptionDefaultNameInputValue={onChangeBatchRegOptionDefaultNameInputValue}
                ></CreateOptionDefaultNameModalComponent>
            </CommonModalComponent>
        </Container>
    )
}

export default CreateFormComponent;

const initialCreateProductData = null;
const initialCreateOptionDataList = [];
const initialBatchRegOptionData = null;
const initialSlideDownEffect = {
    category: false,
    product: false,
    option: false
}

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

const slideDownEffectReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialSlideDownEffect;
        default: return initialSlideDownEffect;
    }
}
import { useState, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components'; 

import { productCategoryDataConnect } from '../../data_connect/productCategoryDataConnect';
import { productDataConnect } from '../../data_connect/productDataConnect';
import { useBackdropHook, BackdropHookComponent } from '../../hooks/backdrop/useBackdropHook';
import ProductCreateFormComponent from './ProductCreateForm.component';
import { generateOptionManagementCode, generateProdCode } from '../../utils/keyGeneratorUtils'
import { productOptionDataConnect } from '../../data_connect/productOptionDataConnect';
import { useLocation, useNavigate } from 'react-router-dom';

const Container = styled.div`
`;

class Product {
    constructor(code = '', optionDefaultName = '', optionManagementName = '') {
        this.id = uuidv4();
        this.code = code;
        this.manufacturingCode = '';
        this.naverProductCode = '';
        this.defaultName = '';
        this.managementName = '';
        this.imageUrl = '';
        this.imageFileName = '';
        this.memo = '';
        this.hsCode = '';
        this.style = '';
        this.tariffRate = 0;
        this.defaultWidth = 0;
        this.defaultLength = 0;
        this.defaultHeight = 0;
        this.defaultQuantity = 0;
        this.defaultWeight = 0;
        this.defaultTotalPurchasePrice = 0;
        this.stockManagement = false;
        this.productCategoryCid = null;
        this.productOptions = [
            new ProductOption(this.id, generateOptionManagementCode(), optionDefaultName, optionManagementName).toJSON()
        ]
    }

    toJSON() {
        return {
            id: this.id,
            code: this.code,
            manufacturingCode: this.manufacturingCode,
            naverProductCode: this.naverProductCode,
            defaultName: this.defaultName,
            managementName: this.managementName,
            imageUrl: this.imageUrl,
            imageFileName: this.imageFileName,
            memo: this.memo,
            hsCode: this.hsCode,
            style: this.style,
            tariffRate: this.tariffRate,
            defaultWidth: this.defaultWidth,
            defaultLength: this.defaultLength,
            defaultHeight: this.defaultHeight,
            defaultQuantity: this.defaultQuantity,
            defaultWeight: this.defaultWeight,
            defaultTotalPurchasePrice: this.defaultTotalPurchasePrice,
            stockManagement: this.stockManagement,
            productCategoryCid: this.productCategoryCid,
            productOptions: this.productOptions
        }
    }
}

class ProductOption {
    constructor(productId, code = '', optionDefaultName = '', optionManagementName = '') {
        this.id = uuidv4();
        this.code = code;
        this.defaultName = optionDefaultName;
        this.managementName = optionManagementName;
        this.nosUniqueCode = '';
        this.salesPrice = 0;
        this.stockUnit = 0;
        this.status = '준비중';
        this.memo = '';
        this.imageUrl = '';
        this.imageFileName = '';
        this.color = '';
        this.unitCny = '';
        this.unitKrw = '';
        this.totalPurchasePrice = 0;
        this.packageYn = 'n';
        this.productCid = null;
        this.productId = productId;
    }

    toJSON() {
        return {
            id: this.id,
            code: this.code,
            defaultName: this.defaultName,
            managementName: this.managementName,
            nosUniqueCode: this.nosUniqueCode,
            salesPrice: this.salesPrice,
            stockUnit: this.stockUnit,
            status: this.status,
            memo: this.memo,
            imageUrl: this.imageUrl,
            imageFileName: this.imageFileName,
            color: this.color,
            unitCny: this.unitCny,
            unitKrw: this.unitKrw,
            totalPurchasePrice: this.totalPurchasePrice,
            packageYn: this.packageYn,
            productCid: this.productCid,
            productId: this.productId
        }
    }
}

class OptionPackage {
    constructor(parentOptionId) {
        this.id = uuidv4();
        this.packageUnit = 0;
        this.originOptionCode = '';
        this.originOptionCid = null;
        this.originOptionId = '';
        this.parentOptionId = parentOptionId;
    }

    toJSON() {
        return {
            id: this.id,
            packageUnit: this.packageUnit,
            originOptionCode: this.originOptionCode,
            originOptionCid: this.originOptionCid,
            originOptionId: this.originOptionId,
            parentOptionId: this.parentOptionId,
        }
    }
}

const ProductCreateComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [categoryList, setCategoryList] = useState(null);
    const [optionList, setOptionList] = useState(null);
    const [createProductData, dispatchCreateProductData] = useReducer(createProductDataReducer, initialCreateProductData);
    const [isSubmit, setIsSubmit] = useState(false);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(() => {
        async function fetchInit() {
            await __reqSearchProductCategory();
            await __reqSearchProductOption();
        }
        fetchInit();
    }, []);

    const __reqSearchProductCategory = async () => {
        await productCategoryDataConnect().searchList()
            .then(res => {
                if(res.status === 200 && res.data && res.data.message === 'success') {
                    setCategoryList(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const __reqUploadProdImageFile = async (e) => {
        await productDataConnect().postUploadImageFileToCloud(e)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    let imageData = res.data.data[0];

                    dispatchCreateProductData({
                        type: 'CHANGE_DATA',
                        payload: {
                            name : "imageFileName",
                            value: imageData.fileName
                        }
                    });

                    dispatchCreateProductData({
                        type: 'CHANGE_DATA',
                        payload: {
                            name : "imageUrl",
                            value: imageData.fileUploadUri
                        }
                    });
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const __reqUploadOptionImageFile = async (e, optionId) => {
        await productDataConnect().postUploadImageFileToCloud(e)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    let imageData = res.data.data[0];

                    let optionDataList = createProductData?.productOptions;
                    optionDataList = optionDataList?.map(option => {
                        if (option.id === optionId) {
                            return {
                                ...option,
                                imageFileName: imageData.fileName,
                                imageUrl: imageData.fileUploadUri
                            }
                        } else {
                            return option;
                        }
                    });

                    dispatchCreateProductData({
                        type: 'SET_OPTION',
                        payload: optionDataList
                    });
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const __reqCreateProductAndOptions = async () => {
        await productDataConnect().postCreate(createProductData)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    navigate(location.state.prevUrl);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const __reqSearchProductOption = async () => {
        await productOptionDataConnect().getList()
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    setOptionList(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const _onSubmit_uploadProdImageFile = async (e) => {
        onActionOpenBackdrop();
        await __reqUploadProdImageFile(e);
        onActionCloseBackdrop();
    }

    const _onSubmit_uploadOptionImageFile = async (e, optionId) => {
        onActionOpenBackdrop();
        await __reqUploadOptionImageFile(e, optionId);
        onActionCloseBackdrop();
    }

    const _onSubmit_createProductAndOptions = async () => {
        if(!isSubmit){
            setIsSubmit(true);
            await __reqCreateProductAndOptions();
            setIsSubmit(false);
        }
    }

    const _onAction_createProductOption = () => {
        let data = createProductData.productOptions;
        data.push(new ProductOption(createProductData.id, generateOptionManagementCode()).toJSON());

        dispatchCreateProductData({
            type: 'SET_OPTION',
            payload: data
        });
    }

    const _onAction_stockReflectedSelector = () => {
        let stockManagement = !createProductData.stockManagement;

        dispatchCreateProductData({
            type: 'CHANGE_DATA',
            payload: {
                name: "stockManagement",
                value: stockManagement
            }
        });
    }

    const _onAction_selectProductCategory = (categoryCid) => {
        dispatchCreateProductData({
            type: 'CHANGE_DATA',
            payload: {
                name: "productCategoryCid",
                value: categoryCid
            }
        });
    }

    const _onAction_changeProductInputValue = (target) => {
        const {name, value} = target;

        dispatchCreateProductData({
            type: 'CHANGE_DATA',
            payload: {
                name,
                value
            }
        });
    }

    const _onAction_deleteProductOption = (optionId) => {
        let productOptions = createProductData.productOptions?.filter(option => option.id !== optionId);;

        dispatchCreateProductData({
            type: 'SET_OPTION',
            payload: productOptions
        });
    }

    const _onAction_changeProductOption = (option) => {
        dispatchCreateProductData({
            type: 'SET_OPTION',
            payload: option
        });
    }

    const _onAction_createOptionPackage = (optionId) => {
        let optionData = createProductData.productOptions.filter(r => r.id === optionId)[0];
        
        let packageList = optionData.optionPackages ?? [];

        optionData = {
            ...optionData,
            optionPackages: packageList
        }

        let data = optionData.optionPackages;
        data.push(new OptionPackage(optionData.id).toJSON());

        let addData = createProductData.productOptions.map(r => {
            if(r.id === optionId) {
                return{
                    ...r,
                    packageYn: 'y',
                    optionPackages: data
                }
            }else{
                return r;
            }
        });

        dispatchCreateProductData({
            type: 'SET_OPTION',
            payload: addData
        });
    }

    const _onAction_changeOptionPackage = (optionId, optionPackages) => {
        let data = optionPackages.map(r => {
            optionList.forEach(option => {
                if(r.originOptionId === option.id) {
                    r = {
                        ...r,
                        originOptionCode: option.code,
                        originOptionCid: option.cid
                    }
                }
            });
            return r;
        });

        let changedData = createProductData.productOptions.map(r => {
            if(r.id === optionId) {
                return {
                    ...r,
                    optionPackages: data
                }
            }else {
                return r;
            }
        });

        dispatchCreateProductData({
            type: 'SET_OPTION',
            payload: changedData
        });
    }

    const _onAction_deleteOptionPakcage = (optionId, packageId) => {
        let changedData = createProductData.productOptions.map(option => {
            if(option.id === optionId) {
                let data = option.optionPackages?.filter(r => r.id !== packageId);
                if(data.length === 0) {
                    delete option.optionPackages;
                    option = {
                        ...option,
                        packageYn: 'n'
                    }
                    return option;
                }else{
                    return{
                        ...option,
                        optionPackages: data
                    }
                }
            }else {
                return option;
            }
        });

        dispatchCreateProductData({
            type: 'SET_OPTION',
            payload: changedData
        });
    }

    return (
        <Container>
            <ProductCreateFormComponent
                createProductData={createProductData}
                categoryList={categoryList}
                optionList={optionList}
                isSubmit={isSubmit}

                _onAction_stockReflectedSelector={() => _onAction_stockReflectedSelector()}
                _onAction_selectProductCategory={(categoryCid) => _onAction_selectProductCategory(categoryCid)}
                _onSubmit_uploadProdImageFile={(e) => _onSubmit_uploadProdImageFile(e)}
                _onSubmit_uploadOptionImageFile={(e, optionId) => _onSubmit_uploadOptionImageFile(e, optionId)}
                _onAction_createProductOption={() => _onAction_createProductOption()}
                _onAction_changeProductInputValue={(e) => _onAction_changeProductInputValue(e)}
                _onAction_deleteProductOption={(optionId) => _onAction_deleteProductOption(optionId)}
                _onAction_changeProductOption={(option) => _onAction_changeProductOption(option)}
                _onSubmit_createProductAndOptions={() => _onSubmit_createProductAndOptions()}
                _onAction_createOptionPackage={(optionId) => _onAction_createOptionPackage(optionId)}
                _onAction_changeOptionPackage={(optionId, optionPackages) => _onAction_changeOptionPackage(optionId, optionPackages)}
                _onAction_deleteOptionPakcage={(optionId, packageId) => _onAction_deleteOptionPakcage(optionId, packageId)}
            ></ProductCreateFormComponent>

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default ProductCreateComponent;

const initialCreateProductData = new Product(generateProdCode(), '단일상품', '단일상품').toJSON();

const createProductDataReducer = (state, action) => {
    switch(action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name] : action.payload.value
            }
        case 'SET_OPTION':
            return {
                ...state,
                productOptions: action.payload
            }
        case 'CLEAR':
            return initialCreateProductData;
        default: return initialCreateProductData;
    }
}
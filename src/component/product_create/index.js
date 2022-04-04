import { useState, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components'; 

import { productCategoryDataConnect } from '../../data_connect/productCategoryDataConnect';
import { productDataConnect } from '../../data_connect/productDataConnect';
import CategorySelectorComponent from './category-selector/CategorySelector.component';
import HeaderComponent from './header/Header.component';
import ProductInfoInputComponent from './product-info-input/ProductInfoInput.component';
import { useBackdropHook, BackdropHookComponent } from '../../hooks/backdrop/useBackdropHook';
import OptionInfoInputComponent from './option-info-input/OptionInfoInput.component';

class Product {
    constructor(optionDefaultName = '', optionManagementName = '') {
        this.id = uuidv4();
        this.code = '';
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
            new ProductOption(this.id, optionDefaultName, optionManagementName).toJSON()
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
    constructor(productId, optionDefaultName = '', optionManagementName = '') {
        this.id = uuidv4();
        this.code = '';
        this.defaultName = optionDefaultName;
        this.managementName = optionManagementName;
        this.salesPrice = 0;
        this.totalPurchasePrice = 0;
        this.stockUnit = 0;
        this.status = '준비중';
        this.memo = '';
        this.imageUrl = '';
        this.imageFileName = '';
        this.color = '';
        this.unit_cny = '';
        this.unit_krw = '';
        this.totalPurchasePrice = 0;
        this.productCid = null;
        this.productId = productId;
    }

    toJSON() {
        return {
            id: this.id,
            code: this.code,
            defaultName: this.defaultName,
            managementName: this.managementName,
            salesPrice: this.salesPrice,
            totalPurchasePrice: this.totalPurchasePrice,
            stockUnit: this.stockUnit,
            status: this.status,
            memo: this.memo,
            imageUrl: this.imageUrl,
            imageFileName: this.imageFileName,
            color: this.color,
            unitCny: this.unitCny,
            unitKrw: this.unitKrw,
            totalPurchasePrice: this.totalPurchasePrice,
            productCid: this.productCid,
            productId: this.productId
        }
    }
}

const Container = styled.div`
    margin-top: 80px;
    margin-bottom: 120px;
    padding-bottom: 100px;

    animation: scaleOutToIn 0.8s;
    -moz-animation: scaleOutToIn 0.8s; /* Firefox */
    -webkit-animation: scaleOutToIn 0.8s; /* Safari and Chrome */
    -o-animation: scaleOutToIn 0.8s; /* Opera */

    background:white;
    border: 1px solid #4360A3C9;
    border-radius: 5px;
    padding-bottom: 15px;
`;

const ProductCreateComponent = () => {
    const [categoryList, setCategoryList] = useState(null);
    const [createProductData, dispatchCreateProductData] = useReducer(createProductDataReducer, initialCreateProductData);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(async () => {
        await __reqSearchProductCategory();
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
                        type: 'SET_DATA',
                        payload: {
                            productOptions: optionDataList
                        }
                    });
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

    const _onAction_createProductOption = () => {
        return new ProductOption(createProductData.id).toJSON();
    }

    const _onAction_stockReflectedSelector = () => {
        let stockManagement = !createProductData.stockManagement;

        dispatchCreateProductData({
            type: 'CHANGE_DATA',
            payload: {
                name: "stockManagement",
                value: stockManagement
            }
        })
    }

    const _onAction_selectProductCategory = (categoryCid) => {
        dispatchCreateProductData({
            type: 'CHANGE_DATA',
            payload: {
                name: "productCategoryCid",
                value: categoryCid
            }
        })
    }

    return (
        <Container className="container">
            {/* <TopLayerComponent
            ></TopLayerComponent> */}
            
            <HeaderComponent
                createProductData={createProductData}

                _onAction_stockReflectedSelector={() => _onAction_stockReflectedSelector()}
            ></HeaderComponent>

            <CategorySelectorComponent
                createProductData={createProductData}
                categoryList={categoryList}

                _onAction_selectProductCategory={(categoryCid) => _onAction_selectProductCategory(categoryCid)}
            ></CategorySelectorComponent>

            <ProductInfoInputComponent
                createProductData={createProductData}

                _onSubmit_uploadProdImageFile={(e) => _onSubmit_uploadProdImageFile(e)}
            ></ProductInfoInputComponent>

            <OptionInfoInputComponent
                createProductData={createProductData}

                _onSubmit_uploadOptionImageFile={(e, optionId) => _onSubmit_uploadOptionImageFile(e, optionId)}
                _onAction_createProductOption={() => _onAction_createProductOption()}
                ProductOption={ProductOption}
            ></OptionInfoInputComponent>

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default ProductCreateComponent;

const initialCreateProductData = new Product('단일상품', '단일상품').toJSON();

const createProductDataReducer = (state, action) => {
    switch(action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA' :
            return {
                ...state,
                [action.payload.name] : action.payload.value
            }
        case 'CLEAR':
            return initialCreateProductData;
        default: return initialCreateProductData;
    }
}
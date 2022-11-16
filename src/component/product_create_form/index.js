import { useState, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components'; 

import { productCategoryDataConnect } from '../../data_connect/productCategoryDataConnect';
import { productDataConnect } from '../../data_connect/productDataConnect';
import { useBackdropHook, BackdropHookComponent } from '../../hooks/backdrop/useBackdropHook';
import ProductCreateFormComponent from './ProductCreateForm.component';
import { productOptionDataConnect } from '../../data_connect/productOptionDataConnect';
import { useLocation, useNavigate } from 'react-router-dom';

const Container = styled.div`
`;

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
        this.purchaseUrl = '';
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
            purchaseUrl: this.purchaseUrl,
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
        this.safetyStockUnit = 0;
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
            safetyStockUnit: this.safetyStockUnit,
            productCid: this.productCid,
            productId: this.productId
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
        dispatchCreateProductData({
            type: 'SET_DATA',
            payload: new Product('단일상품', '단일상품').toJSON()
        });
    }, []);

    useEffect(() => {
        async function fetchInit() {
            await __reqSearchProductCategory();
            await __reqSearchProductOption();
        }
        fetchInit();
    }, []);

    const __reqSearchProductCategory = async () => {
        await productCategoryDataConnect().searchAll()
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

    const __reqCreateProductAndOptions = async (data) => {
        await productDataConnect().postCreate(data)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    navigate(location.state.routerUrl);
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

    const _onSubmit_createProductAndOptions = async (data) => {
        if(!isSubmit){
            setIsSubmit(true);
            await __reqCreateProductAndOptions(data);
            setIsSubmit(false);
        }
    }

    return (
        createProductData && 
        <Container>
            <ProductCreateFormComponent
                createProductData={createProductData}
                categoryList={categoryList}
                optionList={optionList}
                isSubmit={isSubmit}

                onActionOpenBackdrop={onActionOpenBackdrop}
                onActionCloseBackdrop={onActionCloseBackdrop}
                _onSubmit_createProductAndOptions={(data) => _onSubmit_createProductAndOptions(data)}
            ></ProductCreateFormComponent>
            
            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default ProductCreateComponent; 

const initialCreateProductData = null;

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
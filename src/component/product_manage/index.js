import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { optionPackageDataConnect } from '../../data_connect/optionPackageDataConnect';
import { productCategoryDataConnect } from '../../data_connect/productCategoryDataConnect';
import { productDataConnect } from '../../data_connect/productDataConnect';
import { productDetailPageDataConnect } from '../../data_connect/productDetailPageDataConnect';
import { productOptionDataConnect } from '../../data_connect/productOptionDataConnect';
import { productReceiveDataConnect } from '../../data_connect/productReceiveDataConnect';
import { productReleaseDataConnect } from '../../data_connect/productReleaseDataConnect';
import { subOptionCodeDataConnect } from '../../data_connect/subOptionCodeDataConnect';

import { useBackdropHook, BackdropHookComponent } from '../../hooks/backdrop/useBackdropHook';
import { getEndDate, getStartDate } from '../../utils/dateFormatUtils';
import ProductManageNavComponent from './product-manage-nav/ProductManageNav.component';
import ProductManageTableComponent from './product-manage-table/ProductManageTable.component';
import SelectorComponent from './selector/Selector.component';

const Container = styled.div`
    overflow:hidden;
    padding-bottom: 80px;
`;

const ProductManageComponent = () => {
    const [categoryList, setCategoryList] = useState(null);
    const [productList, setProductList] = useState(null);
    const [optionList, setOptionList] = useState(null);

    const [selectedCategoryId, setSelectedCategoryId] = useState('total');
    const [selectedProductId, setSelectedProductId] = useState('total');

    const [productViewList, setProductViewList] = useState(null);
    const [stockStatusList, setStockStatusList] = useState(null);
    const [optionPackage, setOptionPackage] = useState(null);

    const [checkedOptionList, setCheckedOptionList] = useState([]);

    const [submitCheck, dispatchSubmitCheck] = useReducer(submitCheckReducer, initialSubmitCheck);
    const [dataChangedTrigger, setDataChangedTrigger] = useState(false);

    const [optionReceiveStatusData, setOptionReceiveStatusData] = useState(null);
    const [optionReleaseStatusData, setOptionReleaseStatusData] = useState(null);

    const [subOptionCodeData, setSubOptionCodeData] = useState(null);
    const [productDetailPageDataList, setProductDetailPageDataList] = useState(null);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await __reqSearchCategoryList();
            await __reqSearchProductListFj();
            await __reqSearchOptionList();
            onActionCloseBackdrop();

            dispatchSubmitCheck({
                type: 'INIT_DATA',
                payload: {
                    isSubmit: false
                }
            });
        }

        fetchInit();
    }, []);

    // 데이터 생성, 수정, 삭제 시 즉시 반영
    useEffect(() => {
        async function searchAll() {
            if (dataChangedTrigger) {
                onActionOpenBackdrop();
                await __reqSearchProductListFj();
                await __reqSearchOptionList();
                onActionCloseBackdrop();
            }
            setDataChangedTrigger(false);
        }
        searchAll();
    }, [dataChangedTrigger]);

    useEffect(() => {
        if(!(selectedCategoryId && selectedProductId)) {
            return;
        }

        if(!productList) {
            return;
        }

        let viewData = productList;
        if (selectedCategoryId !== 'total') {
            viewData = productList.filter(r => r.category.id === selectedCategoryId);
        }
        if(selectedProductId !== 'total') {
            viewData = viewData.filter(r => r.product.id === selectedProductId);
        }

        setProductViewList(viewData);
    }, [productList, selectedCategoryId, selectedProductId])

    useEffect(() => {
        if(!selectedCategoryId) {
            return;
        }

        setSelectedProductId('total');
    }, [selectedCategoryId]);

    const __reqSearchProductListFj = async () => {
        await productDataConnect().getStockListFj()
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    setProductList(res.data.data);
                    setProductViewList(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }
                
                alert(res?.data.memo);
            });
    }

    const __reqSearchOptionList = async () => {
        await productOptionDataConnect().getList()
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    setOptionList(res.data.data);
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

    const __reqSearchCategoryList = async () => {
        await productCategoryDataConnect().searchList()
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    setCategoryList(res.data.data);
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

    const __reqModifyProduct = async function (productModifyData) {
        await productDataConnect().putOne(productModifyData)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    alert('정상적으로 수정되었습니다.');
                    setDataChangedTrigger(true);
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

    const __reqDeleteProduct = async (productCid) => {
        await productDataConnect().deleteOne(productCid)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    alert('정상적으로 삭제되었습니다.');
                    setDataChangedTrigger(true);
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

    const __reqCreateOption = async function (createOptionData) {
        await productOptionDataConnect().postOptionAndPackages(createOptionData)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    alert('해당 옵션이 정상적으로 추가되었습니다.');
                    setDataChangedTrigger(true);
                }
            })
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }
                
                alert(res?.data.memo);
            });
    }

    const __reqModifyOption = async function (modifyOptionData) {
        await productOptionDataConnect().putOptionAndPackages(modifyOptionData)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    alert('정상적으로 수정되었습니다.');
                    setDataChangedTrigger(true);
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

    const __reqSearchOptionPackage = async (optionId) => {
        await optionPackageDataConnect().searchListByParentOptionId(optionId)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    setOptionPackage(res.data.data);
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

    const __reqDeleteProductOption = async (productCid) => {
        await productOptionDataConnect().deleteOne(productCid)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    alert('정상적으로 삭제되었습니다.');
                    setDataChangedTrigger(true);
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

    const __reqSearchStockStatus = async (optionCid) => {
        await productOptionDataConnect().searchStockStatus(optionCid)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    setStockStatusList(res.data.data);
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

    const __reqModifyReceiveMemo = async (data) => {
        await productReceiveDataConnect().putOne(data)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    __reqSearchStockStatus(data.productOptionCid);
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

    const __reqModifyReleaseMemo = async (data) => {
        await productReleaseDataConnect().putOne(data)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    __reqSearchStockStatus(data.productOptionCid);
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

    const __reqCreateProductReleaseList = async (data) => {
        await productReleaseDataConnect().postList(data)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    alert('출고등록 되었습니다.');
                    setDataChangedTrigger(true);
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
    
    const __reqCreateProductReceiveList = async (data) => {
        await productReceiveDataConnect().postList(data)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    alert('입고등록 되었습니다.');
                    setDataChangedTrigger(true);
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

    const __reqSearchReceiveAndRelease = async (startDate, endDate) => {
        var start = startDate ? getStartDate(new Date(startDate)) : null;
        var end = endDate ? getEndDate(new Date(endDate)) : null;

        await productOptionDataConnect().searchListStockStatus(start, end)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setOptionReceiveStatusData(res.data.data.productReceive);
                    setOptionReleaseStatusData(res.data.data.productRelease);
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

    const __reqDeleteSubOptionCode = async (subOptionId) => {
        await subOptionCodeDataConnect().deleteOne(subOptionId)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    alert('정상적으로 삭제되었습니다.');
                    setDataChangedTrigger(true);
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

    const __reqSearchProductDetailPage = async (productId) => {
        await productDetailPageDataConnect().searchBatch(productId)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    setProductDetailPageDataList(res.data.data);
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

    const __reqCreateProductDetailPage = async (data) => {
        await productDetailPageDataConnect().createOne(data)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqDeleteProductDetailPage = async (pageId) => {
        await productDetailPageDataConnect().deleteOne(pageId)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    alert('정상적으로 삭제되었습니다.');
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

    const __reqModifyProductDetailPage = async (data) => {
        await productDetailPageDataConnect().updateOne(data)
            .then(res => {
                if (res.status == 200 && res.data.message == 'success') {
                    alert('정상적으로 수정되었습니다.');
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

    const __reqChangeProduct = async function (product) {
        await productDataConnect().patchOne(product)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    alert('정상적으로 저장되었습니다.');
                    setDataChangedTrigger(true);
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

    const _onAction_changeCategory = (categoryId) => {
        setSelectedCategoryId(categoryId);
    }

    const _onAction_changeProduct = (productId) => {
        setSelectedProductId(productId);
    }

    const _onSubmit_modifyProduct = async (modifyProductData) => {
        onActionOpenBackdrop();
        dispatchSubmitCheck({ 
            type: 'SET_IS_SUBMIT',
            payload: true
        });
        await __reqModifyProduct(modifyProductData);
        onActionCloseBackdrop();
        dispatchSubmitCheck({ 
            type: 'SET_IS_SUBMIT',
            payload: false
        });
    }

    const _onSubmit_deleteProduct = async (productCid) => {
        await __reqDeleteProduct(productCid);
    }

    const _onSubmit_createProductOption = async (createOptionData) => {
        onActionOpenBackdrop();
        dispatchSubmitCheck({ 
            type: 'SET_IS_SUBMIT',
            payload: true
        });
        await __reqCreateOption(createOptionData);
        onActionCloseBackdrop();
        dispatchSubmitCheck({ 
            type: 'SET_IS_SUBMIT',
            payload: false
        });
    }

    const _onSubmit_modifyProductOption = async (modifyOptionData) => {
        onActionOpenBackdrop();
        dispatchSubmitCheck({ 
            type: 'SET_IS_SUBMIT',
            payload: true
        });
        await __reqModifyOption(modifyOptionData);
        onActionCloseBackdrop();
        dispatchSubmitCheck({ 
            type: 'SET_IS_SUBMIT',
            payload: false
        });
    }

    const _onAction_searchOptionPackage = async (optionId) => {
        await __reqSearchOptionPackage(optionId);
    }

    const _onSubmit_deleteProductOption = async (optionCid) => {
        await __reqDeleteProductOption(optionCid);
    }

    const _onAction_searchStockStatus = async (optionCid) => {
        await __reqSearchStockStatus(optionCid);
    }

    const _onAction_modifyReceiveMemo = async (data) => {
        await __reqModifyReceiveMemo(data);
    }

    const _onAction_modifyReleaseMemo = async (data) => {
        await __reqModifyReleaseMemo(data);
    }

    const _onAction_checkOneTr = (optionId) => {
        if(checkedOptionList.includes(optionId)){
            setCheckedOptionList(checkedOptionList.filter(r => r !== optionId));
        }else{
            setCheckedOptionList(checkedOptionList.concat(optionId));
        }
    }

    const _onAction_checkAll = () => {
        if (_onAction_isCheckedAll()) {
            setCheckedOptionList([])
        } else {
            let optionIdList = optionList?.map(r => r.id);
            setCheckedOptionList(optionIdList);
        }
    }

    const _onAction_isCheckedAll = () => {
        let optionIdList = optionList?.map(r => r.id).sort();
        checkedOptionList.sort();
        return JSON.stringify(optionIdList) === JSON.stringify(checkedOptionList);
    }

    const _onAction_isChecked = (optionId) => {
        return checkedOptionList.includes(optionId);
    }

    const _onSubmit_createProductReleaseList = async (data) => {
        onActionOpenBackdrop();
        dispatchSubmitCheck({ 
            type: 'SET_IS_SUBMIT',
            payload: true
        });
        await __reqCreateProductReleaseList(data);
        onActionCloseBackdrop();
        dispatchSubmitCheck({ 
            type: 'SET_IS_SUBMIT',
            payload: false
        });
    }

    const _onSubmit_createProductReceiveList = async (data) => {
        onActionOpenBackdrop();
        dispatchSubmitCheck({ 
            type: 'SET_IS_SUBMIT',
            payload: true
        });
        await __reqCreateProductReceiveList(data);
        onActionCloseBackdrop();
        dispatchSubmitCheck({ 
            type: 'SET_IS_SUBMIT',
            payload: false
        });
    }

    const _onAction_searchReceiveAndRelease = async (date) => {
        onActionOpenBackdrop();
        await __reqSearchReceiveAndRelease(date.startDate, date.endDate);
        onActionCloseBackdrop();
    }

    const _onAction_deleteSubOptionCode = async (subOptionId) => {
        onActionOpenBackdrop();
        await __reqDeleteSubOptionCode(subOptionId);
        onActionCloseBackdrop();
    }

    const _onAction_searchProductDetailPage = async (productId) => {
        onActionOpenBackdrop();
        await __reqSearchProductDetailPage(productId);
        onActionCloseBackdrop();
    }

    const _onSubmit_createProductDetailPage = async (data) => {
        onActionOpenBackdrop();
        await __reqCreateProductDetailPage(data);
        await __reqSearchProductDetailPage(data.productId);
        onActionCloseBackdrop();
    }

    const _onSubmit_modifyProductDetailPage = async (data) => {
        onActionOpenBackdrop();
        await __reqModifyProductDetailPage(data);
        await __reqSearchProductDetailPage(data.productId);
        onActionCloseBackdrop();
    }

    const _onAction_deleteProductDetailPage = async (data) => {
        onActionOpenBackdrop();
        await __reqDeleteProductDetailPage(data.id);
        await __reqSearchProductDetailPage(data.productId);
        onActionCloseBackdrop();
    }

    const _onAction_updateProductDetailPageOfSelectedProduct = async (detailPage) => {
        onActionOpenBackdrop();
        let data = {
            id: detailPage.productId,
            productDetailPageId: detailPage.id
        }
        await __reqChangeProduct(data);
        onActionCloseBackdrop();
    }

    return (
        <Container>
            <SelectorComponent
                selectedCategoryId={selectedCategoryId}
                categoryList={categoryList}
                productList={productList}
                // productViewList={productViewList}
                selectedProductId={selectedProductId}

                _onAction_changeCategory={(categoryId) => _onAction_changeCategory(categoryId)}
                _onAction_changeProduct={(productId) => _onAction_changeProduct(productId)}
            ></SelectorComponent>

            <ProductManageTableComponent
                productViewList={productViewList}
                categoryList={categoryList}
                optionList={optionList}
                submitCheck={submitCheck}
                optionPackage={optionPackage}
                stockStatusList={stockStatusList}
                subOptionCodeData={subOptionCodeData}
                productDetailPageDataList={productDetailPageDataList}

                onActionOpenBackdrop={onActionOpenBackdrop}
                onActionCloseBackdrop={onActionCloseBackdrop}
                _onSubmit_modifyProduct={(productData) => _onSubmit_modifyProduct(productData)}
                _onSubmit_deleteProduct={(productCid) => _onSubmit_deleteProduct(productCid)}
                _onSubmit_createProductOption={(optionData) => _onSubmit_createProductOption(optionData)}
                _onSubmit_modifyProductOption={(optionData) => _onSubmit_modifyProductOption(optionData)}
                _onAction_searchOptionPackage={(optionId) => _onAction_searchOptionPackage(optionId)}
                _onSubmit_deleteProductOption={(optionCid) => _onSubmit_deleteProductOption(optionCid)}
                _onAction_searchStockStatus={(optionCid) => _onAction_searchStockStatus(optionCid)}
                _onAction_modifyReceiveMemo={(data) => _onAction_modifyReceiveMemo(data)}
                _onAction_modifyReleaseMemo={(data) => _onAction_modifyReleaseMemo(data)}
                _onAction_checkOneTr={(optionId) => _onAction_checkOneTr(optionId)}
                _onAction_checkAll={() => _onAction_checkAll()}
                _onAction_isCheckedAll={() => _onAction_isCheckedAll()}
                _onAction_isChecked={(optionId) => _onAction_isChecked(optionId)}
                _onAction_deleteSubOptionCode={(subOptionId) => _onAction_deleteSubOptionCode(subOptionId)}
                _onAction_searchProductDetailPage={_onAction_searchProductDetailPage}
                _onSubmit_createProductDetailPage={_onSubmit_createProductDetailPage}
                _onSubmit_modifyProductDetailPage={_onSubmit_modifyProductDetailPage}
                _onAction_deleteProductDetailPage={_onAction_deleteProductDetailPage}
                _onAction_updateProductDetailPageOfSelectedProduct={_onAction_updateProductDetailPageOfSelectedProduct}
            ></ProductManageTableComponent>

            <ProductManageNavComponent
                productViewList={productViewList}
                checkedOptionList={checkedOptionList}
                submitCheck={submitCheck}
                optionReceiveStatusData={optionReceiveStatusData}
                optionReleaseStatusData={optionReleaseStatusData}

                _onSubmit_createProductReleaseList={(data) => _onSubmit_createProductReleaseList(data)}
                _onSubmit_createProductReceiveList={(data) => _onSubmit_createProductReceiveList(data)}
                _onAction_searchReceiveAndRelease={(date) => _onAction_searchReceiveAndRelease(date)}
            ></ProductManageNavComponent>

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default ProductManageComponent;

const initialSubmitCheck = null;

const submitCheckReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload
        case 'SET_IS_SUBMIT':
            return {
                ...state,
                isSubmit: action.payload
            };
        case 'CLEAR':
            return null;
        default: return { ...state };
    }
}

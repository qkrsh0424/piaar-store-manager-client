import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import qs from 'query-string';
import { useLocation } from 'react-router-dom';

import { useBackdropHook, BackdropHookComponent } from '../../hooks/backdrop/useBackdropHook';
import CategorySelectorComponent from './category-selector/CategorySelector.component';
import { productCategoryDataConnect } from '../../data_connect/productCategoryDataConnect';
import { productDataConnect } from '../../data_connect/productDataConnect';
import { productOptionDataConnect } from '../../data_connect/productOptionDataConnect';
import { productDetailDataConnect } from '../../data_connect/productDetailDataConnect';
import ItemSelectorComponent from './item-selector/ItemSelector.component';
import DetailTableComponent from './detail-table/DetailTable.component';
import { optionPackageDataConnect } from '../../data_connect/optionPackageDataConnect';

const Container = styled.div`
    background: linear-gradient(to bottom right,#f0fffa,#839edfad);
    padding-bottom: 100px;
`;

const ProductDetailComponent = () => {
    const location = useLocation();
    const query = qs.parse(location.search);

    const [categoryList, setCategoryList] = useState(null);
    const [productList, setProductList] = useState(null);
    const [optionList, setOptionList] = useState(null);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [detailList, setDetailList] = useState(null);
    const [optionPackage, setOptionPackage] = useState(null);

    const [productViewList, dispatchProductViewList] = useReducer(productViewListReducer, initialProductViewList);
    const [optionViewList, dispatchOptionViewList] = useReducer(optionViewListReducer, initialOptionViewList);
    const [detailViewList, dispatchDetailViewList] = useReducer(detailViewListReducer, initialDetailViewList);

    const [submitCheck, dispatchSubmitCheck] = useReducer(submitCheckReducer, initialSubmitCheck);
    const [dataChangedTrigger, setDataChangedTrigger] = useState(false);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await __reqSearchProductCategory();
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
                await __reqSearchProduct();
                await __reqSearchOption();
                await __reqSearchProductDetail();
            }
            setDataChangedTrigger(false);
        }
        searchAll();
    }, [dataChangedTrigger]);

    // 카테고리 처음 선택 시
    useEffect(() => {
        async function searchProduct() {
            if(productList) {
                return;
            }
    
            if(query.categoryCid !== '0' && !query.categoryCid) {
                return;
            }
    
            await __reqSearchProduct();
        }
        searchProduct();
    }, [query.categoryCid]);

    // 상품 처음 선택 시
    useEffect(() => {
        async function searchOption() {
            if (optionList) {
                return;
            }

            if (query.productCid !== '0' && !query.productCid) {
                return;
            }

            await __reqSearchOption();
        }
        searchOption();
    }, [query.productCid]);

    // 옵션 처음 선택 시
    useEffect(() => {
        async function searchDetail() {

            if (detailList) {
                return;
            }

            if (query.optionCid !== '0' && !query.optionCid) {
                return;
            }

            await __reqSearchProductDetail();
        }
        searchDetail();
    }, [query.optionCid]);

    // query에 categoryCid가 변경되면 productViewList 변경
    useEffect(() => {
        if(!productList) {
            return;
        }

        if (query.categoryCid !== '0' && !query.categoryCid) {
            dispatchProductViewList({
                type: 'CLEAR'
            });
            return;
        }

        if (query.categoryCid === '0') {
            dispatchProductViewList({
                type: 'SET_DATA',
                payload: productList
            });
        } else if (query.categoryCid) {
            let viewList = productList.filter(r => r.productCategoryCid === parseInt(query.categoryCid));

            dispatchProductViewList({
                type: 'SET_DATA',
                payload: viewList
            });
        }
    }, [productList, query.categoryCid])

    // query에 productCid가 변경되면 optionViewList 변경
    useEffect(() => {
        if (!(optionList && productList)) {
            return;
        }

        if (query.productCid !== '0' && !query.productCid) {
            dispatchOptionViewList({
                type: 'CLEAR'
            });
            setSelectedProduct(null);
            setSelectedOption(null);
            return;
        }else {
            let viewList = optionList.filter(r => r.productCid === parseInt(query.productCid));

            dispatchOptionViewList({
                type: 'SET_DATA',
                payload: viewList
            });

            let selectedProd = productList.filter(r => r.cid === parseInt(query.productCid))[0];
            setSelectedProduct(selectedProd);
        }
    }, [optionList, productList, query.productCid])

    // query에 optionCid가 변경되면  변경
    useEffect(() => {
        if(!(detailList && optionList)) {
            return;
        }

        if (query.optionCid !== '0' && !query.optionCid) {
            dispatchDetailViewList({
                type: 'CLEAR'
            });
            setSelectedOption(null);
            return;
        }else {
            let viewList = detailList.filter(r => r.productOptionCid === parseInt(query.optionCid));

            dispatchDetailViewList({
                type: 'SET_DATA',
                payload: viewList
            });

            let selectedOpt = optionList.filter(r => r.cid === parseInt(query.optionCid))[0];
            setSelectedOption(selectedOpt);
        }
    }, [detailList, optionList, query.optionCid])


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

    const __reqSearchProduct = async () => {
        await productDataConnect().getList()
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    setProductList(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const __reqSearchOption = async () => {
        await productOptionDataConnect().getList()
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    setOptionList(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const __reqSearchProductDetail = async () => {
        await productDetailDataConnect().searchAll()
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    setDetailList(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
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
                alert(res?.data?.memo);
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
                alert(res?.data?.memo);
            })
    }

    const __reqDeleteProductDetail = async (detailId) => {
        await productDetailDataConnect().deleteOne(detailId)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    alert('정상적으로 삭제되었습니다.');
                    setDataChangedTrigger(true);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const __reqCreateProductDetail = async (detailData) => {
        await productDetailDataConnect().postOne(detailData)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    alert('해당 상품상세가 정상적으로 추가되었습니다.');
                    setDataChangedTrigger(true);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            });
    }
    
    const __reqModifyProductDetail = async (modifyDetailData) => {
        await productDetailDataConnect().putOne(modifyDetailData)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    alert('정상적으로 수정되었습니다.');
                    setDataChangedTrigger(true);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
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
                alert(res?.data?.memo);
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
                alert(res?.data?.memo);
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
                alert(res?.data?.memo);
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
                alert(res?.data?.memo);
            })
    }

    const _onSubmit_deleteProduct = async (productCid) => {
        await __reqDeleteProduct(productCid);
    }

    const _onSubmit_deleteProductOption = async (optionCid) => {
        await __reqDeleteProductOption(optionCid);
    }

    const _onSubmit_deleteProductDetail = async (detailId) => {
        await __reqDeleteProductDetail(detailId);
    }

    const _onSubmit_createProductDetail = async (detailData) => {
        await __reqCreateProductDetail(detailData);
    }

    const _onSubmit_modifyProductDetail = async (detailData) => {
        await __reqModifyProductDetail(detailData);
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

    return (
        <Container>
            <CategorySelectorComponent
                categoryList={categoryList}
            ></CategorySelectorComponent>

            <ItemSelectorComponent
                categoryList={categoryList}
                productViewList={productViewList}
                optionViewList={optionViewList}
                submitCheck={submitCheck}
                optionList={optionList}
                optionPackage={optionPackage}
                onActionOpenBackdrop={onActionOpenBackdrop}
                onActionCloseBackdrop={onActionCloseBackdrop}

                _onSubmit_deleteProduct={(productCid) => _onSubmit_deleteProduct(productCid)}
                _onSubmit_deleteProductOption={(optionCid) => _onSubmit_deleteProductOption(optionCid)}
                _onSubmit_modifyProduct={(modifyProductData) => _onSubmit_modifyProduct(modifyProductData)}
                _onSubmit_createProductOption={(createOptionData) => _onSubmit_createProductOption(createOptionData)}
                _onSubmit_modifyProductOption={(modifyOptionData) => _onSubmit_modifyProductOption(modifyOptionData)}
                _onAction_searchOptionPackage={(optionId) => _onAction_searchOptionPackage(optionId)}
            ></ItemSelectorComponent>

            <DetailTableComponent
                selectedProduct={selectedProduct}
                selectedOption={selectedOption}
                detailViewList={detailViewList}

                _onSubmit_deleteProductDetail={(detailId) => _onSubmit_deleteProductDetail(detailId)}
                _onSubmit_createProductDetail={(detailData) => _onSubmit_createProductDetail(detailData)}
                _onSubmit_modifyProductDetail={(detailData) => _onSubmit_modifyProductDetail(detailData)}
            ></DetailTableComponent>

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default ProductDetailComponent;

const initialProductViewList = null;
const initialOptionViewList = null;
const initialDetailViewList = null;
const initialSubmitCheck = null;

const productViewListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state };
    }
}

const optionViewListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state };
    }
}

const detailViewListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state };
    }
}

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
import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { optionPackageDataConnect } from '../../data_connect/optionPackageDataConnect';
import { productCategoryDataConnect } from '../../data_connect/productCategoryDataConnect';
import { productDataConnect } from '../../data_connect/productDataConnect';
import { productOptionDataConnect } from '../../data_connect/productOptionDataConnect';
import { productReceiveDataConnect } from '../../data_connect/productReceiveDataConnect';
import { productReleaseDataConnect } from '../../data_connect/productReleaseDataConnect';

import { useBackdropHook, BackdropHookComponent } from '../../hooks/backdrop/useBackdropHook';
import CategorySelectorComponent from './category-selector/CategorySelector.component';
import ProductManageNavComponent from './product-manage-nav/ProductManageNav.component';
import ProductManageTableComponent from './product-manage-table/ProductManageTable.component';

const Container = styled.div`
    overflow:hidden;
    padding-bottom: 80px;
`;

const ProductManageComponent = () => {
    const [categoryList, setCategoryList] = useState(null);
    const [productList, setProductList] = useState(null);
    const [optionList, setOptionList] = useState(null);

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [productViewList, setProductViewList] = useState(null);
    const [stockStatusList, setStockStatusList] = useState(null);
    const [optionPackage, setOptionPackage] = useState(null);

    const [checkedOptionList, setCheckedOptionList] = useState([]);

    const [uploadedImage, dispatchUploadedImage] = useReducer(uploadedImageReducer, initialUploadedImage);

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
            __reqSearchProductListFj();
            __reqSearchOptionList();
            __reqSearchCategoryList();
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
    
                dispatchUploadedImage({ type: 'CLEAR' })
            }
            setDataChangedTrigger(false);
        }
        searchAll();
    }, [dataChangedTrigger]);

    useEffect(() => {
        if(!selectedCategoryId) {
            return;
        }

        if(!productList) {
            return;
        }

        let viewData = productList;

        if (selectedCategoryId !== 'total') {
            viewData = productList.filter(r => r.category.id === selectedCategoryId);
        }

        setProductViewList(viewData);
    }, [productList, selectedCategoryId])

    const __reqSearchProductListFj = async () => {
        await productDataConnect().getStockListFj()
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    setProductList(res.data.data);
                    setProductViewList(res.data.data);
                }
            })
            .catch(err => {
                alert('undefined error. : searchProductListFj');
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
                alert('undefined error. : searchOptionList');
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
                alert('undefined error. : searchCategoryList');
            })
    }

    const __reqUploadProdImageFile = async (e) => {
        await productDataConnect().postUploadImageFileToCloud(e)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    let imageData = res.data.data[0];
                    
                    dispatchUploadedImage({
                        type: 'SET_DATA',
                        payload: {
                            imageFileName: imageData.fileName,
                            imageUrl: imageData.fileUploadUri
                        }
                    });
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

    const __reqSearchStockStatus = async (optionCid) => {
        await productOptionDataConnect().searchStockStatus(optionCid)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    setStockStatusList(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
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
                alert(res?.data?.memo);
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
                alert(res?.data?.memo);
            })
    }

    const __reqCreateProductReleaseList = async (data) => {
        await productReleaseDataConnect().postList(data)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    alert('출고등록 되었습니다.');
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }
    
    const __reqCreateProductReceiveList = async (data) => {
        await productReceiveDataConnect().postList(data)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    alert('입고등록 되었습니다.');
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const _onAction_changeCategory = (categoryId) => {
        setSelectedCategoryId(categoryId);
    }

    const _onSubmit_uploadProdImageFile = async (e) => {
        onActionOpenBackdrop();
        await __reqUploadProdImageFile(e);
        onActionCloseBackdrop();
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

    return (
        <Container>
            <CategorySelectorComponent
                categoryList={categoryList}

                _onAction_changeCategory={(categoryId) => _onAction_changeCategory(categoryId)}
            ></CategorySelectorComponent>

            <ProductManageTableComponent
                productViewList={productViewList}
                categoryList={categoryList}
                optionList={optionList}
                submitCheck={submitCheck}
                uploadedImage={uploadedImage}
                optionPackage={optionPackage}
                stockStatusList={stockStatusList}

                _onSubmit_uploadProdImageFile={(e) => _onSubmit_uploadProdImageFile(e)}
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
            ></ProductManageTableComponent>

            <ProductManageNavComponent
                productViewList={productViewList}
                checkedOptionList={checkedOptionList}
                submitCheck={submitCheck}

                _onSubmit_createProductReleaseList={(data) => _onSubmit_createProductReleaseList(data)}
                _onSubmit_createProductReceiveList={(data) => _onSubmit_createProductReceiveList(data)}
            ></ProductManageNavComponent>
        </Container>
    )
}

export default ProductManageComponent;

const initialUploadedImage = null;
const initialSubmitCheck = null;

const uploadedImageReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                imageFileName: action.payload.imageFileName,
                imageUrl: action.payload.imageUrl
            };
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

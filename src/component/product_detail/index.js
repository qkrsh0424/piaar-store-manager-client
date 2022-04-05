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

const Container = styled.div`
    background: linear-gradient(to bottom right,#f0fffa,#839edfad);
    padding-bottom: 100px;
`;

const ProductDetailComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);

    const [categoryList, setCategoryList] = useState(null);
    const [productList, setProductList] = useState(null);
    const [optionList, setOptionList] = useState(null);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [detailList, setDetailList] = useState(null);

    const [productViewList, dispatchProductViewList] = useReducer(productViewListReducer, initialProductViewList);
    const [optionViewList, dispatchOptionViewList] = useReducer(optionViewListReducer, initialOptionViewList);
    const [detailViewList, dispatchDetailViewList] = useReducer(detailViewListReducer, initialDetailViewList);

    const [uploadedImage, dispatchUploadedImage] = useReducer(uploadedImageReducer, initialUploadedImage);

    const [dataChangedTrigger, setDataChangedTrigger] = useState(false);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(async () => {
        onActionOpenBackdrop();
        await __reqSearchProductCategory();
        onActionCloseBackdrop();
    }, []);

    // 데이터 생성, 수정, 삭제 시 즉시 반영
    useEffect(async () => {
        if (dataChangedTrigger) {
            await __reqSearchProduct();
            await __reqSearchOption();
            await __reqSearchProductDetail();
        }
        setDataChangedTrigger(false);
    }, [dataChangedTrigger]);

    // 카테고리 처음 선택 시
    useEffect(async () => {
        if(productList) {
            return;
        }

        if(query.categoryCid !== '0' && !query.categoryCid) {
            return;
        }

        await __reqSearchProduct();
    }, [query.categoryCid]);

    // 상품 처음 선택 시
    useEffect(async () => {
        if(optionList) {
            return;
        }

        if(query.productCid !== '0' && !query.productCid) {
            return;
        }

        await __reqSearchOption();
    }, [query.productCid]);

    // 옵션 처음 선택 시
    useEffect(async () => {
        if(detailList) {
            return;
        }

        if(query.optionCid !== '0' && !query.optionCid) {
            return;
        }

        await __reqSearchProductDetail();
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

    const __reqDeleteProductDetail = async (detailCid) => {
        await productDetailDataConnect().deleteOne(detailCid)
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
                    // setIsObjectSubmitted({
                    //     ...isObjectSubmitted,
                    //     detailAdd: false
                    // });
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

                if (res.status === 401) {
                    alert('접근 권한이 없습니다.')
                } else {
                    alert('undefined error. : changeProductOne');
                }
            })
    }

    const _onSubmit_deleteProduct = async (productCid) => {
        await __reqDeleteProduct(productCid);
    }

    const _onSubmit_deleteProductOption = async (optionCid) => {
        await __reqDeleteProductOption(optionCid);
    }

    const _onSubmit_deleteProductDetail = async (detailCid) => {
        await __reqDeleteProductDetail(detailCid);
    }

    const _onSubmit_createProductDetail = async (detailData) => {
        await __reqCreateProductDetail(detailData);
    }

    const _onSubmit_modifyProductDetail = async (detailData) => {
        await __reqModifyProductDetail(detailData);
    }

    const _onSubmit_uploadProdImageFile = async (e) => {
        onActionOpenBackdrop();
        await __reqUploadProdImageFile(e);
        onActionCloseBackdrop();
    }

    const _onSubmit_modifyProduct = async (modifyProductData) => {
        onActionOpenBackdrop();
        await __reqModifyProduct(modifyProductData);
        onActionCloseBackdrop();
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
                uploadedImage={uploadedImage}

                _onSubmit_deleteProduct={(productCid) => _onSubmit_deleteProduct(productCid)}
                _onSubmit_deleteProductOption={(optionCid) => _onSubmit_deleteProductOption(optionCid)}
                _onSubmit_uploadProdImageFile={(e) => _onSubmit_uploadProdImageFile(e)}
                _onSubmit_modifyProduct={(modifyProductData) => _onSubmit_modifyProduct(modifyProductData)}
            ></ItemSelectorComponent>

            <DetailTableComponent
                selectedProduct={selectedProduct}
                selectedOption={selectedOption}
                detailViewList={detailViewList}

                _onSubmit_deleteProductDetail={(detailCid) => _onSubmit_deleteProductDetail(detailCid)}
                _onSubmit_createProductDetail={(detailData) => _onSubmit_createProductDetail(detailData)}
                _onSubmit_modifyProductDetail={(detailData) => _onSubmit_modifyProductDetail(detailData)}
            ></DetailTableComponent>
        </Container>
    )
}

export default ProductDetailComponent;

const initialProductViewList = null;
const initialOptionViewList = null;
const initialDetailViewList = null;
const initialUploadedImage = null;

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
import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import qs from 'query-string';
import { useLocation } from 'react-router-dom';

import CategorySelectorComponent from './category-selector/CategorySelector.component';
import { productCategoryDataConnect } from '../../data_connect/productCategoryDataConnect';
import { productDataConnect } from '../../data_connect/productDataConnect';
import { productOptionDataConnect } from '../../data_connect/productOptionDataConnect';
import { productDetailDataConnect } from '../../data_connect/productDetailDataConnect';
import ItemSelectorComponent from './item-selector/ItemSelector.component';
import DetailTableComponent from './detail-table/DetailTable.component';

const Container = styled.div`
    background: linear-gradient(to bottom right, #f0fcff, #dce3f6);
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

    const [dataChangedTrigger, setDataChangedTrigger] = useState(false);

    useEffect(async () => {
        await _reqSearchProductCategory();
    }, []);

    // 데이터 생성, 수정, 삭제 시 즉시 반영
    useEffect(async () => {
        if (dataChangedTrigger) {
            await _reqSearchProduct();
            await _reqSearchOption();
            await _reqSearchProductDetail();
        }
        setDataChangedTrigger(false);
    }, [dataChangedTrigger]);

    // 카테고리 처음 선택 시
    useEffect(async () => {
        if(productList) {
            return;
        }

        if(query.categoryCid != '0' && !query.categoryCid) {
            return;
        }

        await _reqSearchProduct();
    }, [query.categoryCid]);

    // 상품 처음 선택 시
    useEffect(async () => {
        if(optionList) {
            return;
        }

        if(query.productCid != '0' && !query.productCid) {
            return;
        }

        await _reqSearchOption();
    }, [query.productCid]);

    // 옵션 처음 선택 시
    useEffect(async () => {
        if(detailList) {
            return;
        }

        if(query.optionCid != '0' && !query.optionCid) {
            return;
        }

        await _reqSearchProductDetail();
    }, [query.optionCid]);

    // 새로고침 시
    useEffect(() => {
        if(!productList){
            return;
        }
        
        if(query.categoryCid === '0') {
            dispatchProductViewList({
                type: 'SET_DATA',
                payload: productList
            });
        }else if(query.categoryCid) {
            let viewList = productList.filter(r => r.productCategoryCid === parseInt(query.categoryCid));
            
            dispatchProductViewList({
                type: 'SET_DATA',
                payload: viewList
            }); 
        }
    }, [productList, query.categoryCid]);

    // 새로고침 시
    useEffect(() => {
        if(!(optionList && productViewList)) {
            return;
        }

        if(query.productCid !== '0' && !query.productCid) {
            dispatchOptionViewList({
                type: 'CLEAR'
            });
            return;
        }

        if(query.productCid) {
            let viewList = optionList.filter(r => r.productCid === parseInt(query.productCid));
            
            dispatchOptionViewList({
                type: 'SET_DATA',
                payload: viewList
            });

            let selectedProd = productList.filter(r => r.cid === parseInt(query.productCid))[0];
            setSelectedProduct(selectedProd);
        }
    }, [optionList, productViewList, query.productCid]);

    // 새로고침 시
    useEffect(() => {
        if(!(optionList && detailList)) {
            return;
        }

        if(query.optionCid !== '0' && !query.optionCid) {
            dispatchDetailViewList({
                type: 'CLEAR'
            });
            return;
        }

        if(query.optionCid) {
            let viewList = detailList.filter(r => r.productOptionCid === parseInt(query.optionCid));

            dispatchDetailViewList({
                type: 'SET_DATA',
                payload: viewList
            });

            let selectedOpt = optionList.filter(r => r.cid === parseInt(query.optionCid))[0];
            setSelectedOption(selectedOpt);
        }
    }, [optionList, detailList, query.optionCid]);

    const _reqSearchProductCategory = async () => {
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

    const _reqSearchProduct = async () => {
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

    const _reqSearchOption = async () => {
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

    const _reqSearchProductDetail = async () => {
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

    const _onSubmit_deleteProduct = async (productCid) => {
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

    const _onSubmit_deleteProductOption = async (productCid) => {
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

    const _onSubmit_deleteProductDetail = async (detailCid) => {
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

    const _onSubmit_createProductDetail = async (detailData) => {
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
    
    const _onSubmit_modifyProductDetail = async (modifyDetailData) => {
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

    return (
        <Container>
            <CategorySelectorComponent
                categoryList={categoryList}
            ></CategorySelectorComponent>

            <ItemSelectorComponent
                categoryList={categoryList}
                productViewList={productViewList}
                optionViewList={optionViewList}

                _onSubmit_deleteProduct={(productCid) => _onSubmit_deleteProduct(productCid)}
                _onSubmit_deleteProductOption={(optionCid) => _onSubmit_deleteProductOption(optionCid)}
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
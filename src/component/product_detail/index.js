import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import qs from 'query-string';
import { useLocation } from 'react-router-dom';

import CategorySelectorComponent from './category-selector/CategorySelector.component';
import { productCategoryDataConnect } from '../../data_connect/productCategoryDataConnect';
import { productDataConnect } from '../../data_connect/productDataConnect';
import { productOptionDataConnect } from '../../data_connect/productOptionDataConnect';
import ItemSelectorComponent from './item-selector/ItemSelector.component';
import DetailTableComponent from './detail-table/DetailTable.component';

const Container = styled.div`
    padding: 2%;
    background: linear-gradient(to bottom right, #f0fcff, #dce3f6);
`;

const ProductDetailComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);

    const [categoryList, setCategoryList] = useState(null);
    const [productList, setProductList] = useState(null);
    const [optionList, setOptionList] = useState(null);

    const [productViewList, dispatchProductViewList] = useReducer(productViewListReducer, initialProductViewList);
    const [optionViewList, dispatchOptionViewList] = useReducer(optionViewListReducer, initialOptionViewList);

    // const [dataChangedTrigger, setDataChangedTrigger] = useState(false);

    useEffect(async () => {
        await _reqSearchProductCategory();
    }, []);

    // 데이터 생성, 수정, 삭제 시 즉시 반영
    // useEffect(() => {
    //     if (dataChangedTrigger) {
    //         if (query.categoryCid === '0') {
    //             _reqSearchProduct();
    //         }else if(query.categoryCid) {
    //             // productList.filter(r => r.)
    //             console.log(productList);
    //         }

    //         // if (params.productCid) {
    //         //     __handleDataConnect().searchOptionListByProduct(params.productCid);
    //         // }

    //         // if (params.optionCid) {
    //         //     __handleDataConnect().searchDetailListByOption(params.optionCid);
    //         // }
    //     }
    //     setDataChangedTrigger(false);
    // }, [dataChangedTrigger]);

    useEffect(async () => {
        if(productList) {
            return;
        }

        await _reqSearchProduct();
        await _reqSearchOption();
    }, []);

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

    useEffect(() => {
        if(!optionList) {
            return;
        }

        if(query.productCid !== '0' && !query.productCid) {
            dispatchOptionViewList({
                type: 'CLEAR'
            });
            return;
        }

        if (query.productCid) {
            let viewList = optionList.filter(r => r.productCid === parseInt(query.productCid));
            
            dispatchOptionViewList({
                type: 'SET_DATA',
                payload: viewList
            });
        }
    }, [optionList, query.productCid]);

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

    const _onSubmit_deleteProduct = async (productCid) => {
        await productDataConnect().deleteOne(productCid)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    alert('상품이 정상적으로 삭제되었습니다.')
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
                    alert('상품이 정상적으로 삭제되었습니다.')
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
                selectedDetail={selectedDetail}
            ></DetailTableComponent>
        </Container>
    )
}

export default ProductDetailComponent;

const initialProductViewList = null;
const initialOptionViewList = null;

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
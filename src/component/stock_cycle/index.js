import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { productCategoryDataConnect } from "../../data_connect/productCategoryDataConnect";
import { productDataConnect } from "../../data_connect/productDataConnect";
import { productOptionDataConnect } from "../../data_connect/productOptionDataConnect";
import OptionStockCycleComponent from "./option-stock-cycle/OptionStockCycle.component";
import ProductInfoComponent from "./product-info/ProductInfo.component";
import SelectorComponent from "./selector/Selector.component";

const Container = styled.div`
    .body-wrapper {
        display: flex;
    }
`;

// TODO :: backdrop 추가
const StockCycleComponent = (props) => {
    const [categoryList, setCategoryList] = useState(null);
    const [productList, setProductList] = useState(null);

    const [stockData, setStockData] = useState(null);

    const [selectedCategory, dispatchSelectedCategory] = useReducer(selectedCategoryReducer, initialSelectedCategory);
    const [selectedProduct, dispatchSelectedProduct] = useReducer(selectedProductReducer, initialSelectedProduct);

    useEffect(() => {
        async function fetchInit() {
            await __reqSearchCategoryList();
            await __reqSearchProductListFj();
        }
        
        fetchInit();
    }, [])

    useEffect(() => {
        async function searchReceiveAndRelease() {
            await __reqSearchProductReceiveAndReleaseData();
        }

        if(!selectedProduct || selectedProduct === 'total') {
            return;
        }
        searchReceiveAndRelease();
    }, [selectedProduct])

    const __reqSearchCategoryList = async () => {
        await productCategoryDataConnect().searchList()
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    setCategoryList(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const __reqSearchProductListFj = async () => {
        await productDataConnect().getStockListFj()
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    setProductList(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            });
    }

    const __reqSearchProductReceiveAndReleaseData = async () => {
        await productOptionDataConnect().searchStockStatusByProduct(selectedProduct.product?.cid)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    setStockData(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            });
    }

    const _onAction_changeSelectedCategory = (e) => {
        let category = categoryList.filter(r => r.id === e.target.value)[0];

        if(category) {
            dispatchSelectedCategory({
                type: 'INIT_DATA',
                payload: category
            })
        }else {
            dispatchSelectedCategory({
                type: 'CLEAR'
            })
        }

        dispatchSelectedProduct({
            type: 'INIT_DATA',
            payload: 'total'
        })
    }

    const _onAction_changeSelectedProduct = (e) => {
        let product = productList.filter(r => r.product.id === e.target.value)[0];

        if(product) {
            dispatchSelectedProduct({
                type: 'INIT_DATA',
                payload: product
            })
        }else {
            dispatchSelectedProduct({
                type: 'CLEAR'
            })
        }

    }

    return(
        <Container>
            <SelectorComponent
                categoryList={categoryList}
                productList={productList}
                selectedCategory={selectedCategory}
                selectedProduct={selectedProduct}

                _onAction_changeSelectedCategory={_onAction_changeSelectedCategory}
                _onAction_changeSelectedProduct={_onAction_changeSelectedProduct}
            ></SelectorComponent>

            {selectedProduct !== 'total' &&
                <div className='body-wrapper'>
                    <ProductInfoComponent
                        selectedProduct={selectedProduct}
                    ></ProductInfoComponent>

                    <OptionStockCycleComponent
                        selectedProduct={selectedProduct}
                        stockData={stockData}
                    ></OptionStockCycleComponent>
                </div>
            }
        </Container>
    )
}

export default StockCycleComponent;

const initialSelectedCategory = 'total';
const initialSelectedProduct = 'total';

const selectedCategoryReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSelectedCategory;
        default: return { ...state };
    }
}

const selectedProductReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSelectedProduct;
        default: return { ...state };
    }
}
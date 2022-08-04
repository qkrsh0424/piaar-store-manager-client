import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { productCategoryDataConnect } from "../../data_connect/productCategoryDataConnect";
import { productDataConnect } from "../../data_connect/productDataConnect";
import { productOptionDataConnect } from "../../data_connect/productOptionDataConnect";
import { getEndDate } from "../../utils/dateFormatUtils";
import { BackdropHookComponent, useBackdropHook } from '../../hooks/backdrop/useBackdropHook';
import OptionStockCycleComponent from "./option-stock-cycle/OptionStockCycle.component";
import ProductInfoComponent from "./product-info/ProductInfo.component";
import SelectorComponent from "./selector/Selector.component";

const Container = styled.div`
    .body-wrapper {
        display: flex;
    }
`;

const StockCycleComponent = (props) => {
    const [categoryList, setCategoryList] = useState(null);
    const [productList, setProductList] = useState(null);

    const [selectedCategory, dispatchSelectedCategory] = useReducer(selectedCategoryReducer, initialSelectedCategory);
    const [selectedProduct, dispatchSelectedProduct] = useReducer(selectedProductReducer, initialSelectedProduct);

    const [stockCycle, dispatchStockCycle] = useReducer(stockCycleReducer, initialStockCycle);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(() => {
        async function fetchInit() {
            await __reqSearchCategoryList();
            await __reqSearchProductListFj();
        }
        
        onActionOpenBackdrop();
        fetchInit();
        onActionCloseBackdrop();
    }, [])

    useEffect(() => {
        async function searchReceiveAndRelease() {
            let searchEndDate = getEndDate(new Date());
            let productCid = selectedProduct.product?.cid;

            let params = {
                searchEndDate,
                productCid
            }
            await __reqSearchOptionStockCycle(params);
        }

        if(!selectedProduct || selectedProduct === 'total') {
            return;
        }

        onActionOpenBackdrop();
        searchReceiveAndRelease();
        onActionCloseBackdrop();
    }, [selectedProduct])

    const __reqSearchCategoryList = async () => {
        await productCategoryDataConnect().searchList()
            .then(res => {
                if (res.status === 200 && res.data && res.data.message == 'success') {
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

    const __reqSearchProductListFj = async () => {
        await productDataConnect().getListFj()
            .then(res => {
                if (res.status === 200 && res.data && res.data.message == 'success') {
                    setProductList(res.data.data);
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

    const __reqSearchOptionStockCycle = async (params) => {
        await productOptionDataConnect().searchStockCycle(params)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message == 'success') {
                    dispatchStockCycle({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    })
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

        dispatchSelectedProduct({ type: 'CLEAR' });
        // 재고주기 초기화
        dispatchStockCycle({type: 'CLEAR'});
    }

    const _onAction_changeSelectedProduct = (e) => {
        let product = productList.filter(r => r.product.id === e.target.value)[0];

        if(product) {
            dispatchSelectedProduct({
                type: 'INIT_DATA',
                payload: product
            })
        }else {
            dispatchSelectedProduct({ type: 'CLEAR' })
        }

        // 재고주기 초기화
        dispatchStockCycle({type: 'CLEAR'});
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
                        stockCycle={stockCycle}
                    ></OptionStockCycleComponent>
                </div>
            }

            {/* Backdrop Loading */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default StockCycleComponent;

const initialSelectedCategory = 'total';
const initialSelectedProduct = 'total';
const initialStockCycle = null;

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

const stockCycleReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialStockCycle;
        default: return { ...state };
    }
}
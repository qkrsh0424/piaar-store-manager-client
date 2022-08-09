import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { productCategoryDataConnect } from "../../data_connect/productCategoryDataConnect";
import { productDataConnect } from "../../data_connect/productDataConnect";
import { productOptionDataConnect } from "../../data_connect/productOptionDataConnect";
import { getEndDate } from "../../utils/dateFormatUtils";
import { BackdropHookComponent, useBackdropHook } from '../../hooks/backdrop/useBackdropHook';
import SelectorComponent from "./selector/Selector.component";
import OptionStockCycleComponent from "./option-stock-cycle/OptionStockCycle.component";

const Container = styled.div`
`;

const StockCycleComponent = (props) => {
    const [categoryList, setCategoryList] = useState(null);
    const [productList, setProductList] = useState(null);

    const [selectedCategory, dispatchSelectedCategory] = useReducer(selectedCategoryReducer, initialSelectedCategory);
    const [selectedProduct, dispatchSelectedProduct] = useReducer(selectedProductReducer, initialSelectedProduct);

    const [stockCycle, dispatchStockCycle] = useReducer(stockCycleReducer, initialStockCycle);
    const [viewStockCycle, dispatchViewStockCycle] = useReducer(viewStockCycleReducer, initialViewStockCycle);

    const [hideNonReleaseOption, setHideNonReleaseOption] = useState(true);
    const [showOutOfStockOption, setShowOutOfStockOption] = useState(false);

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
                    dispatchViewStockCycle({
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

    const _onAction_changeSelectedCategory = async (e) => {
        let category = categoryList.filter(r => r.id === e.target.value)[0];

        if(category) {
            dispatchSelectedCategory({
                type: 'INIT_DATA',
                payload: category
            })

            let product = productList.filter(r => r.category.cid === category.cid);
            dispatchSelectedProduct({
                type: 'INIT_DATA',
                payload: product
            })

            let searchEndDate = getEndDate(new Date());
            let categoryCid = category.cid;

            let params = {
                searchEndDate,
                categoryCid
            }

            onActionOpenBackdrop();
            await __reqSearchOptionStockCycle(params);
            onActionCloseBackdrop();
        }else {
            dispatchSelectedCategory({ type: 'CLEAR' })
            dispatchSelectedProduct({ type: 'CLEAR' });
            dispatchViewStockCycle({type: 'CLEAR'});
        }
    }

    const _onAction_changeSelectedProduct = (e) => {

        if(selectedCategory === 'total') {
            alert('카테고리를 먼저 선택해주세요.');
            return;
        }

        let product = productList.filter(r => r.product.id === e.target.value);
        let cycle = [...stockCycle];

        if(product.length > 0) {
            dispatchSelectedProduct({
                type: 'INIT_DATA',
                payload: product
            })

            cycle = cycle.filter(r => r.productId === product[0]?.product.id);
        }else {
            let product = productList.filter(r => r.category.cid === selectedCategory.cid);
            dispatchSelectedProduct({
                type: 'INIT_DATA',
                payload: product
            })
        }

        dispatchViewStockCycle({
            type: 'INIT_DATA',
            payload: cycle
        })
    }

    const _onAction_changeHideNonReleaseOpiton = () => {
        setHideNonReleaseOption(!hideNonReleaseOption);
    }

    const _onAction_changeShowOutOfStockOption = () => {
        setShowOutOfStockOption(!showOutOfStockOption);
    }

    return(
        <Container>
            <SelectorComponent
                categoryList={categoryList}
                productList={productList}
                selectedCategory={selectedCategory}
                selectedProduct={selectedProduct}

                hideNonReleaseOption={hideNonReleaseOption}
                showOutOfStockOption={showOutOfStockOption}

                _onAction_changeSelectedCategory={_onAction_changeSelectedCategory}
                _onAction_changeSelectedProduct={_onAction_changeSelectedProduct}

                _onAction_changeHideNonReleaseOpiton={_onAction_changeHideNonReleaseOpiton}
                _onAction_changeShowOutOfStockOption={_onAction_changeShowOutOfStockOption}
            ></SelectorComponent>

            {selectedCategory !== 'total' && 
                <div className='body-wrapper'>
                    <OptionStockCycleComponent
                        selectedProduct={selectedProduct}
                        viewStockCycle={viewStockCycle}

                        hideNonReleaseOption={hideNonReleaseOption}
                        showOutOfStockOption={showOutOfStockOption}
                    ></OptionStockCycleComponent>
                </div>
            }
            
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
const initialViewStockCycle = null;

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

const viewStockCycleReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialViewStockCycle;
        default: return { ...state };
    }
}
import { useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import qs from 'query-string';
import { erpOrderItemDataConnect } from '../../data_connect/erpOrderItemDataConnect';

import { useBackdropHook, BackdropHookComponent } from '../../hooks/backdrop/useBackdropHook';
import { getEndDate, getStartDate } from '../../utils/dateFormatUtils';
import SalesPerformanceGraphComponent from './sales-performance-graph/SalesPerformanceGraph.component';
import SearchOperatorComponent from './search-operator/SearchOperator.component';
import _ from 'lodash';
import { productCategoryDataConnect } from '../../data_connect/productCategoryDataConnect';
import { productDataConnect } from '../../data_connect/productDataConnect';

const Container = styled.div`
`;

const SalesPerformanceComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);

    const [erpItemData, dispatchErpItemData] = useReducer(erpItemDataReducer, initialErpItemData);
    const [analysisDateRange, dispatchAnalysisDateRange] = useReducer(analysisDateRangeReducer, initialAnalysisDateRange);
    const [categoryList, dispatchCategoryList] = useReducer(categoryListReducer, initialCategoryList);
    const [productList, dispatchProductList] = useReducer(productListReducer, initialProductList);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(() => {
        if(!location.search) {
            return;
        }

        async function fetchInit() {
            onActionOpenBackdrop();
            await __reqSearchErpOrderItem();
            onActionCloseBackdrop();
        }

        async function fetchProduct() {
            onActionOpenBackdrop();
            await __reqSearchProductCategory();
            await __reqSearchProduct();
            onActionCloseBackdrop();
        }

        fetchInit();

        if(query.searchItem === 'product') {
            fetchProduct();
        }
    }, [location.search])

    const __reqSearchErpOrderItem = async () => {
        let startDate = query.startDate ? getStartDate(query.startDate) : null;
        let endDate = query.endDate ? getEndDate(query.endDate) : null;
        let periodType = 'channelOrderDate';

        let params = {
            startDate: startDate,
            endDate: endDate,
            periodType: periodType
        }

        await erpOrderItemDataConnect().searchAll(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchErpItemData({
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
            })
    }

    const __reqSearchProductCategory = async () => {
        await productCategoryDataConnect().searchList()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchCategoryList({
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
            })
    }

    const __reqSearchProduct = async () => {
        await productDataConnect().getList()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchProductList({
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
            })
    }

    const _onAction_changeDateRangeOfAnalysis = (range) => {
        dispatchAnalysisDateRange({
            type: 'INIT_DATA',
            payload: range
        })
    }

    return (
        <Container>
            <SearchOperatorComponent
                analysisDateRange={analysisDateRange}
                _onAction_changeDateRangeOfAnalysis={_onAction_changeDateRangeOfAnalysis}
            ></SearchOperatorComponent>

            <SalesPerformanceGraphComponent
                erpItemData={erpItemData}
                analysisDateRange={analysisDateRange}
                categoryList={categoryList}
                productList={productList}
            ></SalesPerformanceGraphComponent>

            {/* Backdrop Loading */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default SalesPerformanceComponent;

const initialErpItemData = null;
const initialAnalysisDateRange = 'date';
const initialCategoryList = null;
const initialProductList = null;

const erpItemDataReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialErpItemData;
        default:
            return state;
    }
}

const analysisDateRangeReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialAnalysisDateRange;
        default:
            return state;
    }
}

const categoryListReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialCategoryList;
        default:
            return state;
    }
}

const productListReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialProductList;
        default:
            return state;
    }
}
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import qs from 'query-string';
import { erpOrderItemDataConnect } from '../../data_connect/erpOrderItemDataConnect';

import { useBackdropHook, BackdropHookComponent } from '../../hooks/backdrop/useBackdropHook';
import { getEndDate, getStartDate } from '../../utils/dateFormatUtils';
import SearchOperatorComponent from './search-operator/SearchOperator.component';
import _ from 'lodash';
import { productCategoryDataConnect } from '../../data_connect/productCategoryDataConnect';
import { productDataConnect } from '../../data_connect/productDataConnect';
import SalesRevenueGraphComponent from './sales-revenue-graph/SalesRevenueGraph.component';
import ProductSalesRevenueGraphComponent from './product-sales-revenue-graph/ProductSalesRevenueGraph.component';
import SalesRegistrationAndUnitGraphComponent from './sales-registration-and-unit-graph/SalesRegistrationAndUnitGraph.component';
import SalesRevenueByWeekGraphComponent from './sales-revenue-by-week-graph/SalesRevenueByWeekGraph.component';
import SalesRevenueDetailTableComponent from './sales-revenue-detail-table/SalesRevenueDetailTable.component';

const Container = styled.div`
`;

const SalesPerformanceComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);
    const navigate = useNavigate();

    const [erpItemData, dispatchErpItemData] = useReducer(erpItemDataReducer, initialErpItemData);
    const [analysisDateRange, dispatchAnalysisDateRange] = useReducer(analysisDateRangeReducer, initialAnalysisDateRange);
    const [categoryList, dispatchCategoryList] = useReducer(categoryListReducer, initialCategoryList);
    const [productList, dispatchProductList] = useReducer(productListReducer, initialProductList);

    const [searchItem, dispatchSearchItem] = useReducer(searchItemReducer, initialSearchItem);
    const [hideOrderGraph, setHideOrderGraph] = useState(true);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(() => {
       let data = (query.searchItem || searchItem) ?? 'total';

        dispatchSearchItem({
            type: 'INIT_DATA',
            payload: data
        })
    },[])

    useEffect(() => {
        if(!location.search) {
            return;
        }

        async function fetchProduct() {
            onActionOpenBackdrop();
            await __reqSearchProductCategory();
            await __reqSearchProduct();
            onActionCloseBackdrop();
        }

        if(query.searchItem === 'product') {
            fetchProduct();
        }
    }, [location.search])

    useEffect(() => {
        if(!location.search) {
            return;
        }

        if(!(query.startDate && query.endDate)) {
            return;
        }

        async function fetchInit() {
            onActionOpenBackdrop();
            await __reqSearchErpOrderItem();
            onActionCloseBackdrop();
        }

        fetchInit();
    }, [query.startDate, query.endDate])

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

    const _onAction_changeRevenueItem = (target) => {
        query.searchItem = target;

        navigate({
            pathname: query.pathname,
            search: `?${qs.stringify(query)}`
        });

        dispatchSearchItem({
            type: 'INIT_DATA',
            payload: target
        });
    }

    const _onAction_hideSalesGraph = () => {
        setHideOrderGraph(!hideOrderGraph);
    }

    return (
        <Container>
            <SearchOperatorComponent
                analysisDateRange={analysisDateRange}
                _onAction_changeDateRangeOfAnalysis={_onAction_changeDateRangeOfAnalysis}
                
                hideOrderGraph={hideOrderGraph}
                _onAction_hideSalesGraph={_onAction_hideSalesGraph}
            ></SearchOperatorComponent>

            {/* 총 매출액 그래프 */}
            <SalesRevenueGraphComponent
                erpItemData={erpItemData}
                searchItem={searchItem}
                analysisDateRange={analysisDateRange}
                hideOrderGraph={hideOrderGraph}

                _onAction_changeRevenueItem={_onAction_changeRevenueItem}
            ></SalesRevenueGraphComponent>
            {/* 총 매출액 그래프 - 상품별 */}
            {searchItem === 'product' && 
                <ProductSalesRevenueGraphComponent
                    hideOrderGraph={hideOrderGraph}
                    erpItemData={erpItemData}
                    searchItem={searchItem}
                    analysisDateRange={analysisDateRange}
                    categoryList={categoryList}
                    productList={productList}
                ></ProductSalesRevenueGraphComponent>
            }

            {/* 총 판매건 & 수량 그래프 */}
            <SalesRegistrationAndUnitGraphComponent
                erpItemData={erpItemData}
                analysisDateRange={analysisDateRange}
                hideOrderGraph={hideOrderGraph}
            ></SalesRegistrationAndUnitGraphComponent>

            {/* 요일별 매출 그래프 */}
            <SalesRevenueByWeekGraphComponent
                erpItemData={erpItemData}
                hideOrderGraph={hideOrderGraph}
            ></SalesRevenueByWeekGraphComponent>
            
            {/* 매출액 BEST 테이블 */}
            <SalesRevenueDetailTableComponent
                erpItemData={erpItemData}
                hideOrderGraph={hideOrderGraph}
            ></SalesRevenueDetailTableComponent>

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
const initialSearchItem = 'total';

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

const searchItemReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSearchItem;
        default:
            return state;
    }
}

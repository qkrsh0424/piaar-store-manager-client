
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { productCategoryDataConnect } from '../../data_connect/productCategoryDataConnect';
import { stockAnalysisDataConnect } from '../../data_connect/stockAnalysisDataConnect';
import { BackdropHookComponent, useBackdropHook } from '../../hooks/backdrop/useBackdropHook';
import OperatorComponent from './operator/Operator.component';
import RankBoardComponent from './rank-table/RankTable.component';
import qs from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReducer } from 'react';
import AnalysisGraphComponent from './analysis-graph/AnalysisGraph.component';

const Container = styled.div`
    padding: 0 5% 5% 5%;
    overflow: auto;
    background: linear-gradient(to bottom right,#f0fffa,#839edfad);
`;

const TOTAL_CATEGORY_CID = 0;
const DEFAULT_SORT_BY = 'stockProperty';
const DEFAULT_SORT_DIRECTION = 'desc';

const StockAnalysisComponent = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = qs.parse(location.search);
    const [searchInputState, dispatchSearchInputState] = useReducer(searchInputReducer, initialSearchInputState);

    const [totalStockInfo, dispatchTotalStockInfo] = useReducer(totalStockInfoReducer, initialTotalStockInfo);
    const [stockAnalysisList, setStockAnalysisList] = useState(null);
    const [stockAnalysisViewList, setStockAnalysisViewList] = useState(null);
    const [productCategoryList, setProductCategoryList] = useState(null);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            const result = await __reqSearchStockAnalysis();
            _onAction_CalculateStockAnalysis(result);
            await __reqSearchProductCategory();
            onActionCloseBackdrop();
        }
        fetchInit();
    }, []);

    useEffect(() => {
        function initParams() {
            if(query.categoryCid !== 0 && !query.categoryCid) {
                query.categoryCid = TOTAL_CATEGORY_CID;
            }

            if(!query.sortBy) {
                query.sortBy = DEFAULT_SORT_BY
            }

            if(!query.sortDirection) {
                query.sortDirection = DEFAULT_SORT_DIRECTION;
            }

            navigate({
                pathname: query.pathname,
                search: `?${qs.stringify(query)}`
            });
        }
        initParams();
    }, []);

    useEffect(() => {
        if(!stockAnalysisList) {
            return;
        }

        if(query.categoryCid !== 0 && !query.categoryCid) {
            return;
        }

        let data = [ ...stockAnalysisList ];
        let viewData = [];

        // 카테고리 별
        if(parseInt(query.categoryCid) === 0) {
            viewData = [...data];
        }else {
            viewData = data.filter(r => r.category.cid === parseInt(query.categoryCid));
        }

        if(!(query.sortBy && query.sortDirection && searchInputState)) {
            setStockAnalysisViewList(stockAnalysisList);
            return;
        }

        // 재정렬
        _onAction_sortStockAnalysisViewData(viewData);
    }, [stockAnalysisList, query.categoryCid, query.sortBy, query.sortDirection, searchInputState])

    const _onAction_sortStockAnalysisViewData = (viewData) => {
        let data = [ ...viewData ];
        let mul = query.sortDirection === DEFAULT_SORT_DIRECTION ? -1 : 1;

        let sortData = query.sortBy.split('.');
        const SORT_DATA_START_IDX = 0;

        // 정렬
        if(sortData[SORT_DATA_START_IDX] === 'product') {
            data.sort((a, b) => (a[sortData[SORT_DATA_START_IDX]][sortData[SORT_DATA_START_IDX+1]].localeCompare(b[sortData[SORT_DATA_START_IDX]][sortData[SORT_DATA_START_IDX+1]])) * mul);
        } else if(sortData[SORT_DATA_START_IDX] === 'option') {
            if(sortData[SORT_DATA_START_IDX+1] === 'totalPurchasePrice') {
                data.sort((a, b) => (a[sortData[SORT_DATA_START_IDX]][sortData[SORT_DATA_START_IDX+1]] - b[sortData[SORT_DATA_START_IDX]][sortData[SORT_DATA_START_IDX+1]]) * mul);
            }else {
                data.sort((a, b) => (a[sortData[SORT_DATA_START_IDX]][sortData[SORT_DATA_START_IDX+1]].localeCompare(b[sortData[SORT_DATA_START_IDX]][sortData[SORT_DATA_START_IDX+1]])) * mul);
            }
        } else {
            data.sort((a, b) => (a[sortData[SORT_DATA_START_IDX]] - b[sortData[SORT_DATA_START_IDX]]) * mul);
        }

        // 검색
        if (searchInputState?.searchColumn !== 'total') {
            if (searchInputState?.searchValue) {
                switch (searchInputState.searchColumn) {
                    case 'productDefaultName':
                        data = data.filter(r => (r.product.defaultName).includes(searchInputState?.searchValue));
                        break;
                    case 'optionDefaultName':
                        data = data.filter(r => (r.option.defaultName).includes(searchInputState?.searchValue));
                        break;
                    case 'optionCode':
                        data = data.filter(r => (r.option.code).includes(searchInputState?.searchValue));
                        break;
                }
            }
        }

        // 총 재고자산을 구한다.
        let totalStockProperty = 0;
        let totalStockSumUnit = 0;
        let totalEstimatedSalesPrice = 0;

        data.forEach(r => {
            totalStockProperty += r.stockProperty;
            totalStockSumUnit += r.stockSumUnit;
            totalEstimatedSalesPrice = r.estimatedSalesPrice;
        });

        let totalStockInfo = {
            totalStockProperty,
            totalStockSumUnit,
            totalEstimatedSalesPrice
        }

        dispatchTotalStockInfo({
            type: 'SET_DATA',
            payload: totalStockInfo
        });

        setStockAnalysisViewList(data);
    }

    const __reqSearchStockAnalysis = async () => {
        return await stockAnalysisDataConnect().searchAll()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    return res.data.data;
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const __reqSearchProductCategory = async () => {
        await productCategoryDataConnect().searchList()
            .then(res => {
                if(res.status === 200 && res.data && res.data.message === 'success') {
                    setProductCategoryList(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const _onAction_CalculateStockAnalysis = (data) => {
        let stockAnalysis = data.map(r => {
            let stockProperty = 0;
            let estimatedSalesPrice = 0;

            if(r.stockSumUnit > 0) {
                stockProperty = r.option.totalPurchasePrice * r.stockSumUnit;   // 재고자산
                estimatedSalesPrice = r.option.salesPrice * r.stockSumUnit;      // 예상판매매출액
            }
            return {
                ...r,
                stockProperty,
                estimatedSalesPrice
            }
        });
        
        setStockAnalysisList(stockAnalysis);
    }

    const _onAction_changeSearchInput = (searchInput) => {
        dispatchSearchInputState({
            type: 'SET_DATA',
            payload: searchInput
        });
    }

    return (
        <Container>
            <AnalysisGraphComponent
                stockAnalysisViewList={stockAnalysisViewList}
                totalStockInfo={totalStockInfo}
            ></AnalysisGraphComponent>

            <OperatorComponent
                productCategoryList={productCategoryList}
                searchInputState={searchInputState}

                _onAction_changeSearchInput={(searchInput) => _onAction_changeSearchInput(searchInput)}
            ></OperatorComponent>

            <RankBoardComponent
                stockAnalysisViewList={stockAnalysisViewList}
                totalStockInfo={totalStockInfo}
            ></RankBoardComponent>

            {/* Backdrop Loading */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default StockAnalysisComponent;

const initialSearchInputState = {
    searchColumn: 'total',
    searchValue: ''
};
const initialTotalStockInfo = null;

const searchInputReducer = (state, action) => {
    switch(action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSearchInputState;
        default: return { ...state }
    }
}

const totalStockInfoReducer = (state, action) => {
    switch(action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialTotalStockInfo;
        default: return { ...state }
    }
}
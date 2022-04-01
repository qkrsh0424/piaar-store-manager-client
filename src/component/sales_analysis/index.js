import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';

import OperatorComponent from "./operator/Operator.component";
import RankBoardComponent from "./rank-table/RankTable.component";
import { salesAnalysisDataConnect } from '../../data_connect/salesAnalysisDataConnect';
import { getStartDate, getEndDate } from '../../handler/dateHandler';
import { useBackdropHook, BackdropHookComponent } from '../../hooks/backdrop/useBackdropHook';
import { productCategoryDataConnect } from '../../data_connect/productCategoryDataConnect';

const Container = styled.div`
    padding: 0 5% 5% 5%;
    overflow: auto;
    background: linear-gradient(to bottom right,#f0fffa,#839edfad);
`;

const SalesAnalysisComponent = (props) => {
    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const [salesAnalysisItems, setSalesAnalysisItems] = useState(null);
    const [productCategoryList, setProductCategoryList] = useState(null);
    const [salesAnalysisViewItems, setSalesAnalysisViewItems] = useState(null);
    const [searchInfoState, dispatchSearchInfoState] = useReducer(searchInfoReducer, initialSearchInfoState);
    const [searchInputState, dispatchSearchInputState] = useReducer(searchInputReducer, initialSearchInputState);

    useEffect(async () => {
        await __reqSearchSalesAnalysis(new Date(), new Date());
        await _reqSearchProductCategory();

        dispatchSearchInfoState({
            type: 'INIT_DATA'
        })

        dispatchSearchInputState({
            type: 'INIT_DATA'
        })
    }, []);

    useEffect(() => {
        if(!(searchInfoState && salesAnalysisItems && searchInputState)) {
            return;
        }

        _onAction_searchSalesAnalysisViewItem();
    }, [searchInfoState, salesAnalysisItems, searchInputState]);

    const __reqSearchSalesAnalysis = async (startDate, endDate) => {
        var start = startDate ? new Date(getStartDate(startDate)).toUTCString() : null;
        var end = endDate ? new Date(getEndDate(endDate)).toUTCString() : null;

        await salesAnalysisDataConnect().searchAll(start, end)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setSalesAnalysisItems(res.data.data);
                }
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    const _reqSearchProductCategory = async () => {
        await productCategoryDataConnect().searchList()
            .then(res => {
                if(res.status === 200 && res.data && res.data.message === 'success') {
                    setProductCategoryList(res.data.data);
                }
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    const _onSubmit_searchSalesAnalysis = async (startDate, endDate) => {
        onActionOpenBackdrop();
        await __reqSearchSalesAnalysis(startDate, endDate);
        onActionCloseBackdrop();
    }

    const _onAction_searchSalesAnalysisViewItem = () => {
        let selectedData = salesAnalysisItems;

        // 카테고리 정렬
        if (searchInfoState?.categoryName !== 'total') {
            selectedData = selectedData?.filter(r => r.categoryName === searchInfoState?.categoryName);
        } else {
            selectedData = selectedData?.filter(r => r);
        }

        // 랭킹 기준 - 스토어별 정렬
        if (searchInfoState?.criterion === 'unit') {
            selectedData?.sort((a, b) => b[searchInfoState.storeSalesUnit] - a[searchInfoState.storeSalesUnit]);
        } else if (searchInfoState?.criterion === 'revenue') {
            selectedData?.sort((a, b) => (b[searchInfoState.storeSalesUnit] * b.salesOptionPrice) - (a[searchInfoState.storeSalesUnit] * a.salesOptionPrice));
        }

        if (searchInputState?.searchColumn !== 'total') {
            if (searchInputState?.searchValue) {
                selectedData = selectedData.filter(r => r[searchInputState?.searchColumn].includes(searchInputState?.searchValue));
            }
        }

        setSalesAnalysisViewItems(selectedData);
    }

    const _onAction_changeSearchInfo = (searchInfo) => {
        dispatchSearchInfoState({
            type: 'SET_DATA',
            payload: searchInfo
        });
    }

    const _onAction_changeSearchInput = (searchInput) => {
        dispatchSearchInputState({
            type: 'SET_DATA',
            payload: searchInput
        });
    }

    return (
        <Container>
            <OperatorComponent
                productCategoryList={productCategoryList}
                searchInputState={searchInputState}

                _onAction_changeSearchInfo={(searchInfo) => _onAction_changeSearchInfo(searchInfo)}
                _onAction_changeSearchInput={(searchInput) => _onAction_changeSearchInput(searchInput)}
                _onSubmit_searchSalesAnalysis={(start, end) => _onSubmit_searchSalesAnalysis(start, end)}
            >   
            </OperatorComponent>

            <RankBoardComponent
                searchInfoState={searchInfoState}
                salesAnalysisViewItems={salesAnalysisViewItems}
            >
            </RankBoardComponent>

            {/* Backdrop Loading */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default SalesAnalysisComponent;

const initialSearchInfoState = null;
const initialSearchInputState = null;

const searchInfoReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return { ...state,
                storeName : 'total',
                storeSalesUnit: 'totalSalesUnit',
                categoryName: 'total',
                criterion: 'unit'
            }
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}

const searchInputReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return { ...state,
                searchColumn: 'total',
                searchValue: ''
            }
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}
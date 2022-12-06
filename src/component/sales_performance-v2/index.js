import { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';

import { useBackdropHook, BackdropHookComponent } from '../../hooks/backdrop/useBackdropHook';
import { getEndDate, getStartDate } from '../../utils/dateFormatUtils';
import _ from 'lodash';
import useRouterHook from '../../hooks/router/useRouterHook';
import useSalesPerformanceItemHook from './hooks/useSalesPerformanceHook';

const Container = styled.div`
`;

const SalesPerformanceComponentV2 = (props) => {
    
    const {
        location,
        query,
        navigateUrl
    } = useRouterHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        dashboard,
        reqSearchDashboard: reqSearchSalesPerformanceDashboard
    } = useSalesPerformanceItemHook();

    useEffect(() => {
        async function fetchInit() {
            let startDate = query.startDate ? getStartDate(query.startDate) : null;
            let endDate = query.endDate ? getEndDate(query.endDate) : null;
            let periodType = 'channelOrderDate';
            let matchedCode = 'optionCode';

            let params = {
                startDate: startDate,
                endDate: endDate,
                periodType: periodType,
                matchedCode: matchedCode
            }

            onActionOpenBackdrop();
            await reqSearchSalesPerformanceDashboard(params);
            onActionCloseBackdrop();
        }

        fetchInit();
    }, []);

    return (
        <Container>

            {/* Backdrop Loading */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default SalesPerformanceComponentV2;

const initialErpItemData = null;
const initialErpItemGraphData = null;
const initialAnalysisDateRange = 'date';
const initialCategoryList = null;
const initialProductList = null;
const initialSearchItem = 'total';
const initialGraphSearchParam = null;

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

const erpItemGraphDataReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialErpItemGraphData;
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

const graphSearchParamReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialGraphSearchParam;
        default:
            return state;
    }
}

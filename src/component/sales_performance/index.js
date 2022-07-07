import { useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import qs from 'query-string';
import { erpOrderItemDataConnect } from '../../data_connect/erpOrderItemDataConnect';

import { useBackdropHook, BackdropHookComponent } from '../../hooks/backdrop/useBackdropHook';
import { getEndDate, getStartDate } from '../../utils/dateFormatUtils';
import SalesPerformanceGraphComponent from './sales-performance-graph/SalesPerformanceGraph.component';
import SearchOperatorComponent from './search-operator/SearchOperator.component';

const Container = styled.div`
`;

const SalesPerformanceComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);

    const [erpItemData, dispatchErpItemData] = useReducer(erpItemDataReducer, initialErpItemData);
    const [searchItem, dispatchSearchItem] = useReducer(searchItemReducer, initialSearchItem);

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

        fetchInit();
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

    const _onAction_changeSearchItem = (item) => {
        dispatchSearchItem({
            type: 'INIT_DATA',
            payload: item
        })
    }

    return (
        <Container>
            <SearchOperatorComponent
                _onAction_changeSearchItem={_onAction_changeSearchItem}
            ></SearchOperatorComponent>

            <SalesPerformanceGraphComponent
                searchItem={searchItem}
                erpItemData={erpItemData}
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

const searchItemReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSearchItem;
        default:
            return state;
    }
}

import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { erpOrderItemDataConnect } from '../../data_connect/erpOrderItemDataConnect';

import { useBackdropHook, BackdropHookComponent } from '../../hooks/backdrop/useBackdropHook';
import SalesPerformanceGraphComponent from './sales-performance-graph/SalesPerformanceGraph.component';

const Container = styled.div`
`;

const SalesPerformanceComponent = (props) => {
    const [erpItemData, dispatchErpItemData] = useReducer(erpItemDataReducer, initialErpItemData);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await __reqSearchErpOrderItem();
            onActionCloseBackdrop();
        }

        fetchInit();
    }, [])

    const __reqSearchErpOrderItem = async () => {
        // let startDate = query.startDate ? getStartDate(query.startDate) : null;
        // let endDate = query.endDate ? getEndDate(query.endDate) : null;
        // let periodType = 'registration';

        // let params = {
        //     startDate: startDate,
        //     endDate: endDate,
        //     periodType: periodType
        // }
        await erpOrderItemDataConnect().searchAll()
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

    return (
        <Container>
            <SalesPerformanceGraphComponent
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

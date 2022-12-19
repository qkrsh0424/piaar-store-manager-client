import styled from 'styled-components';

import _ from 'lodash';
import OperatorComponent from './operator/Operator.component';
import PayAmountGraphComponent from './pay-amount-graph/PayAmountGraph.component';
import { useState } from 'react';
import { salesPerformanceDataConnect } from '../../../data_connect/salesPerformanceDataConnect';
import { erpOrderItemDataConnect } from '../../../data_connect/erpOrderItemDataConnect';
import { useEffect } from 'react';
import { getEndDate, getStartDate } from '../../../utils/dateFormatUtils';
import useRouterHook from '../../../hooks/router/useRouterHook';
import { BackdropHookComponent, useBackdropHook } from '../../../hooks/backdrop/useBackdropHook';
import ChannelSelectorComponent from './channel-selector/ChannelSelector.component';

const Container = styled.div`
    height: 100%;
    padding: 60px 30px 150px 230px;
    margin: 0 auto;
    transition: all 0.5s;

    padding-left: ${props=> !props.navbarOpen && '30px'};

    @media screen and (max-width: 768px) {
        padding-left: 30px !important;
    }
`;

function PageTitleFieldView({ title }) {
    return (
        <div>
            <div className='page-title'>{title}</div>
        </div>
    )
}

const SalesChannelPerformanceComponent = (props) => {
    const [salesChannel, setSalesChannel] = useState(null);

    const {
        query,
        location
    } = useRouterHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(() => {
        async function fetchInit() {
            let startDate = query.startDate ? getStartDate(query.startDate) : null;
            let endDate = query.endDate ? getEndDate(query.endDate) : null;
            let periodType = 'channelOrderDate';

            let params = {
                startDate,
                endDate,
                periodType
            }
            onActionOpenBackdrop();
            await __handle.req.searchSalesChannel(params);
            onActionCloseBackdrop();
        }

        if (!(query.startDate && query.endDate)) {
            setSalesChannel(null);
            return;
        }
        fetchInit();
    }, [location])

    const __handle = {
        req: {
            searchSalesChannel: async (params) => {
                await erpOrderItemDataConnect().searchSalesChannel(params)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            setSalesChannel(res.data.data);
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
        }
    }

    return (
        <>
            <Container navbarOpen={props.navbarOpen}>
                <PageTitleFieldView title={'판매스토어 성과'} />

                <OperatorComponent />

                <PayAmountGraphComponent
                    salesChannel={salesChannel}
                />

                <ChannelSelectorComponent
                    salesChannel={salesChannel}
                />
                {/* <RegistrationAndUnitGraphComponent />
            <PayAmountDayOfWeekGraphComponent />
            <SummaryTableComponent /> */}
            </Container>

            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    )
}

export default SalesChannelPerformanceComponent;

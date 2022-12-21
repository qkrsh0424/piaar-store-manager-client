import styled from 'styled-components';

import _ from 'lodash';
import OperatorComponent from './operator/Operator.component';
import { useState } from 'react';
import { erpOrderItemDataConnect } from '../../../data_connect/erpOrderItemDataConnect';
import { useEffect } from 'react';
import { getEndDate, getStartDate } from '../../../utils/dateFormatUtils';
import useRouterHook from '../../../hooks/router/useRouterHook';
import { BackdropHookComponent, useBackdropHook } from '../../../hooks/backdrop/useBackdropHook';
import ChannelSelectorComponent from './channel-selector/ChannelSelector.component';
import useChannelPerformanceHook from './hooks/useChannelPerformanceHook';
import PayAmountGraphComponent from './pay-amount-graph/PayAmountGraph.component';
import RegistrationAndUnitGraphComponent from './registration-and-unit-graph/RegistrationAndUnitGraph.component';
import PayAmountDayOfWeekGraphComponent from './pay-amount-day-of-week-graph/PayAmountDayOfWeekGraph.component';
import SearchOperatorComponent from './search-operator/SearchOperator.component';

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
    const [selectedChannel, setSelectedChannel] = useState(null);

    const {
        query,
        location
    } = useRouterHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        payAmount: channelPayAmount,
        registrationAndUnit: channelRegistrationAndUnit,
        dayOfWeekPayAmount: channelDayOfWeekPayAmount,
        reqSearchPayAmount: reqSearchPayAmountByChannel,
        reqSearchRegistrationAndUnit: reqSearchRegistrationAndUnitByChannel,
        reqDayOfWeekPayAmount: reqDayOfWeekPayAmountByChannel
    } = useChannelPerformanceHook();

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
                            let data = [...res.data.data].sort();
                            setSalesChannel(data);
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
            },
        },
        action: {
            searchChannelPerformance: async (params) => {
                onActionOpenBackdrop();
                await reqSearchPayAmountByChannel(params);
                await reqSearchRegistrationAndUnitByChannel(params);
                await reqDayOfWeekPayAmountByChannel(params);
                onActionCloseBackdrop();
            },
            searchChannelPayAmount: async (params) => {
                onActionOpenBackdrop();
                await reqSearchPayAmountByChannel(params);
                onActionCloseBackdrop();
            },
            searchChannelRegistrationAndUnit: async (params) => {
                onActionOpenBackdrop();
                await reqSearchRegistrationAndUnitByChannel(params);
                onActionCloseBackdrop();
            },
            updateSelectedChannel: (selectedChannel) => {
                setSelectedChannel([...selectedChannel]);
            }
        }
    }

    return (
        <>
            <Container navbarOpen={props.navbarOpen}>
                <PageTitleFieldView title={'판매스토어 성과'} />

                <OperatorComponent

                />

                {/* <PayAmountGraphComponent
                    salesChannel={salesChannel}
                /> */}

                <ChannelSelectorComponent
                    salesChannel={salesChannel}
                    onActionSearchChannelPerformance={__handle.action.searchChannelPerformance}
                    onActionUpdateSelectedChannel={__handle.action.updateSelectedChannel}
                />

                <PayAmountGraphComponent
                    salesChannel={salesChannel}
                    selectedChannel={selectedChannel}
                    payAmount={channelPayAmount}

                    onActionSearchChannelPayAmount={__handle.action.searchChannelPayAmount}
                />

                <RegistrationAndUnitGraphComponent
                    salesChannel={salesChannel}
                    selectedChannel={selectedChannel}
                    registrationAndUnit={channelRegistrationAndUnit}

                    onActionSearchChannelRegistrationAndUnit={__handle.action.searchChannelRegistrationAndUnit}
                />

                <PayAmountDayOfWeekGraphComponent
                    salesChannel={salesChannel}
                    selectedChannel={selectedChannel}
                    dayOfWeekPayAmount={channelDayOfWeekPayAmount}
                />

                <SearchOperatorComponent
                    
                />
            </Container>

            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    )
}

export default SalesChannelPerformanceComponent;

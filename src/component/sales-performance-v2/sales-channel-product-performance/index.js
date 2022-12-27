import styled from 'styled-components';

import _ from 'lodash';
import OperatorComponent from './operator/Operator.component';
import { useState } from 'react';
import { useEffect } from 'react';
import { getEndDate, getStartDate } from '../../../utils/dateFormatUtils';
import useRouterHook from '../../../hooks/router/useRouterHook';
import { BackdropHookComponent, useBackdropHook } from '../../../hooks/backdrop/useBackdropHook';
import ChannelSelectorComponent from './channel-selector/ChannelSelector.component';
import GraphOperatorComponent from './graph-operator/GraphOperator.component';
import useChannelSalesPerformanceHook from './hooks/useChannelSalesPerformanceHook';
import PayAmountGraphComponent from './pay-amount-graph/PayAmountGraph.component';
import RegistrationAndUnitGraphComponent from './registration-and-unit-graph/RegistrationAndUnitGraph.component';
import PayAmountDayOfWeekGraphComponent from './pay-amount-day-of-week-graph/PayAmountDayOfWeekGraph.component';

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

const SalesChannelProductPerformanceComponent = (props) => {
    const [salesChannel, setSalesChannel] = useState(null);
    const [selectedChannel, setSelectedChannel] = useState(null);

    const [searchDimension, setSearchDimension] = useState('date');
    const [checkedSwitch, setCheckedSwitch] = useState(false);

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
        performance,
        reqSearchChannelPerformance
    } = useChannelSalesPerformanceHook();

    useEffect(() => {
        async function fetchInit() {
            let startDate = query.startDate ? getStartDate(query.startDate).toJSON() : null;
            let endDate = query.endDate ? getEndDate(query.endDate).toJSON() : null;
            let optionCode = query.optionCode || null;

            let params = {
                startDate,
                endDate,
                optionCode
            }

            if(!(startDate && endDate)) {
                __handle.action.clearChannel();
                return;
            }

            onActionOpenBackdrop();
            await reqSearchChannelPerformance(params);
            onActionCloseBackdrop();
        }

        if(!query.optionCode) {
            return;
        }
        fetchInit();
    }, [location])

    useEffect(() => {
        if(!performance) {
            return;
        }

        __handle.action.initChannel();
    }, [performance])

    const __handle = {
        action: {
            initChannel: () => {
                let channel = new Set([]);
                performance.forEach(r => r.performances?.forEach(r2 => {
                    channel.add(r2.salesChannel);
                }))

                let channelName = [...channel].sort();
                setSalesChannel(channelName);
                setSelectedChannel(channelName);
            },
            isCheckedOne: (channel) => {
                return selectedChannel.some(name => name === channel);
            },
            checkOne: (e, channel) => {
                e.stopPropagation();

                let data = [...selectedChannel];

                if(selectedChannel.some(name => name === channel)) {
                    data = data.filter(name => name !== channel);
                } else {
                    data.push(channel);
                }
                setSelectedChannel(data);
            },
            checkedClear: () => {
                setSelectedChannel([]);
                props.onActionUpdateSelectedChannel([]);
            },
            changeSwitch: () => {
                let checkedValue = checkedSwitch;
                setCheckedSwitch(!checkedValue);
            },
            changeDimension: (e) => {
                let value = e.target.value;
                setSearchDimension(value);
            },
            clearChannel: () => {
                setSalesChannel(null);
                setSelectedChannel(null);
            }
        }
    }

    return (
        <>
            <Container navbarOpen={props.navbarOpen}>
                <PageTitleFieldView title={'판매스토어 성과'} />

                <OperatorComponent />

                <ChannelSelectorComponent
                    salesChannel={salesChannel}
                    selectedChannel={selectedChannel}
                    onActionIsCheckedOne={__handle.action.isCheckedOne}
                    onActionCheckOne={__handle.action.checkOne}
                />

                <GraphOperatorComponent
                    checkedSwitch={checkedSwitch}
                    searchDimension={searchDimension}

                    onActionChangeSwitch={__handle.action.changeSwitch}
                    onActionChangeSearchDimension={__handle.action.changeDimension}
                />

                <PayAmountGraphComponent
                    salesChannel={salesChannel}
                    selectedChannel={selectedChannel}
                    searchDimension={searchDimension}
                    checkedSwitch={checkedSwitch}
                    payAmount={performance}
                />

                <RegistrationAndUnitGraphComponent
                    salesChannel={salesChannel}
                    selectedChannel={selectedChannel}
                    searchDimension={searchDimension}
                    checkedSwitch={checkedSwitch}
                    registrationAndUnit={performance}
                />

                <PayAmountDayOfWeekGraphComponent
                    salesChannel={salesChannel}
                    selectedChannel={selectedChannel}
                    dayOfWeekPayAmount={performance}
                />                
            </Container>

            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    )
}

export default SalesChannelProductPerformanceComponent;

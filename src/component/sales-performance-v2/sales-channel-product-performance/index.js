import styled from 'styled-components';

import _ from 'lodash';
import { useState } from 'react';
import { useEffect } from 'react';
import { BackdropHookComponent, useBackdropHook } from '../../../hooks/backdrop/useBackdropHook';
import ChannelSelectorComponent from './channel-selector/ChannelSelector.component';
import GraphOperatorComponent from './graph-operator/GraphOperator.component';
import useChannelSalesPerformanceHook from './hooks/useChannelSalesPerformanceHook';
import PayAmountGraphComponent from './pay-amount-graph/PayAmountGraph.component';
import RegistrationAndUnitGraphComponent from './registration-and-unit-graph/RegistrationAndUnitGraph.component';
import PayAmountDayOfWeekGraphComponent from './pay-amount-day-of-week-graph/PayAmountDayOfWeekGraph.component';
import OperatorComponent from './operator/Operator.component'

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

    const [selectedProductAndOptions, setSelectedProductAndOptions] = useState([]);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        performance,
        reqSearchChannelPerformance,
        onActionResetPerformance
    } = useChannelSalesPerformanceHook();

    useEffect(() => {
        if(!performance) {
            return;
        }

        __handle.action.initChannel();
    }, [performance])

    const __handle = {
        action: {
            resetPerformance: () => {
                onActionResetPerformance();
                __handle.action.clearChannel();
            },
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
            },
            changeSelectedOption: (data) => {
                setSelectedProductAndOptions([...data])
            }
        },
        submit: {
            searchPerformance: async (body) => {
                onActionOpenBackdrop();
                await reqSearchChannelPerformance(body);
                onActionCloseBackdrop();
            }
        }
    }

    return (
        <>
            <Container navbarOpen={props.navbarOpen}>
                <PageTitleFieldView title={'판매스토어 - 상품별 매출'} />

                <OperatorComponent
                    selectedProductAndOptions={selectedProductAndOptions}
                    onActionClearChannel={__handle.action.clearChannel}
                    onSubmitSearchPerformance={__handle.submit.searchPerformance}
                    onActionResetPerformance={__handle.action.resetPerformance}
                    onActionChangeSelectedOption={__handle.action.changeSelectedOption}
                />

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
                    selectedProductAndOptions={selectedProductAndOptions}
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

import styled from 'styled-components';

import _ from 'lodash';
import { useState } from 'react';
import { useEffect } from 'react';
import { BackdropHookComponent, useBackdropHook } from '../../../hooks/backdrop/useBackdropHook';
import ChannelSelectorComponent from './channel-selector/ChannelSelector.component';
import PayAmountGraphComponent from './pay-amount-graph/PayAmountGraph.component';
import RegistrationAndUnitGraphComponent from './registration-and-unit-graph/RegistrationAndUnitGraph.component';
import PayAmountDayOfWeekGraphComponent from './pay-amount-day-of-week-graph/PayAmountDayOfWeekGraph.component';
import GraphOperatorComponent from './graph-operator/GraphOperator.component';
import useChannelSalesPerformanceHook from './hooks/useChannelSalesPerformanceHook';
import DetailGraphSelectorModalComponent from './modal/detail-graph-selector-modal/DetailGraphSelectorModal.component';
import DateRangeSelectorComponent from '../date-range-selector/DateRangeSelector.component';
import useRouterHook from '../../../hooks/router/useRouterHook';

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
    const [searchDimension, setSearchDimension] = useState('date');
    const [checkedSwitch, setCheckedSwitch] = useState(false);

    const [salesChannel, setSalesChannel] = useState(null);
    const [selectedChannel, setSelectedChannel] = useState([]);

    const [detailGraphSelectorModalOpen, setDetailGraphSelectorModalOpen] = useState(false);
    const [detailSearchValue, setDetailSearchValue] = useState(null);

    const {
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

    // 페이지 이동 후 다시 되돌아왔을 때 초기화
    useEffect(() => {
        __handle.action.initChannel();
    }, [])

    useEffect(() => {
        if(!performance) {
            return;
        }

        __handle.action.updateChannel();
    }, [performance])

    const __handle = {
        action: {
            initChannel: () => {
                let selectedData = location.state?.salesChannels;
        
                if(selectedData) {
                    setSelectedChannel(selectedData);
                }
            },
            updateChannel: () => {
                let channel = new Set([]);
                performance.forEach(r => r.performances?.forEach(r2 => {
                    channel.add(r2.salesChannel);
                }))

                let channelName = [...channel].sort();
                setSalesChannel(channelName);

                // 이전에 선택된 스토어는 미리 선택
                let data = selectedChannel.filter(channel => channelName.includes(channel));
                setSelectedChannel(data);
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
            checkAll: (e) => {
                e.stopPropagation();
                setSelectedChannel([...salesChannel]);
            },
            checkCancelAll: (e) => {
                e.stopPropagation();
                setSelectedChannel([]);
            },
            changeSwitch: () => {
                let checkedValue = checkedSwitch;
                setCheckedSwitch(!checkedValue);
            },
            changeDimension: (e) => {
                let value = e.target.value;
                setSearchDimension(value);
            },
            openDetailGraphSelectorModal: () => {
                setDetailGraphSelectorModalOpen(true);
            },
            closeDetailGraphSelectorModal: () => {
                setDetailSearchValue(null);
                setDetailGraphSelectorModalOpen(false);
            },
            updateDetailSearchValue: (data) => {
                setDetailSearchValue(data);
            }
        },
        submit: {
            searchPerformance: async (data) => {
                let body = {
                    startDate: data.startDate,
                    endDate: data.endDate,
                    utcHourDifference: data.utcHourDifference,
                }

                onActionOpenBackdrop();
                await reqSearchChannelPerformance(body);
                onActionCloseBackdrop();
            }
        }
    }

    return (
        <>
            <Container navbarOpen={props.navbarOpen}>
                <PageTitleFieldView title={'판매스토어 - 총 매출액 & 판매 건'} />

                <ChannelSelectorComponent
                    salesChannel={salesChannel}

                    onActionIsCheckedOne={__handle.action.isCheckedOne}
                    onActionCheckOne={__handle.action.checkOne}
                    onActionCheckAll={__handle.action.checkAll}
                    onActionCheckCancelAll={__handle.action.checkCancelAll}
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

                    onActionUpdateDetailSearchValue={__handle.action.updateDetailSearchValue}
                    onActionOpenDetailGraphSelectorModal={__handle.action.openDetailGraphSelectorModal}
                />

                <RegistrationAndUnitGraphComponent
                    salesChannel={salesChannel}
                    selectedChannel={selectedChannel}
                    searchDimension={searchDimension}
                    checkedSwitch={checkedSwitch}
                    registrationAndUnit={performance}

                    onActionUpdateDetailSearchValue={__handle.action.updateDetailSearchValue}
                    onActionOpenDetailGraphSelectorModal={__handle.action.openDetailGraphSelectorModal}
                />

                <PayAmountDayOfWeekGraphComponent
                    salesChannel={salesChannel}
                    selectedChannel={selectedChannel}
                    dayOfWeekPayAmount={performance}
                />

                <DateRangeSelectorComponent
                    onSubmitSearchPerformance={__handle.submit.searchPerformance}
                />
            </Container>

            <BackdropHookComponent
                open={backdropOpen}
            />

            <DetailGraphSelectorModalComponent
                modalOpen={detailGraphSelectorModalOpen}
                detailSearchValue={detailSearchValue}

                onActionCloseModal={__handle.action.closeDetailGraphSelectorModal}
            />
        </>
    )
}

export default SalesChannelPerformanceComponent;

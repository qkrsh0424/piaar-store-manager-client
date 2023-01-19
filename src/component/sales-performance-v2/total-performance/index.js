import styled from 'styled-components';

import _ from 'lodash';
import OperatorComponent from './operator/Operator.component';
import PayAmountGraphComponent from './pay-amount-graph/PayAmountGraph.component';
import RegistrationAndUnitGraphComponent from './registration-and-unit-graph/RegistrationAndUnitGraph.component';
import PayAmountDayOfWeekGraphComponent from './pay-amount-day-of-week-graph/PayAmountDayOfWeekGraph.component';
import SummaryTableComponent from './summary-table/SummaryTable.component';
import GraphOperatorComponent from './graph-operator/GraphOperator.component';
import { useState } from 'react';
import useTotalSalesPerformanceHook from './hooks/useTotalSalesPerformanceHook';
import { BackdropHookComponent, useBackdropHook } from '../../../hooks/backdrop/useBackdropHook';
import DetailSelectorModalComponent from './modal/detail-selector-modal/DetailSelectorModal.component';

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

const TotalSalesPerformanceComponent = (props) => {
    const [searchDimension, setSearchDimension] = useState('date');
    const [checkedSwitch, setCheckedSwitch] = useState(false);

    const [detailSelectorModalOpen, setDetailSelectorModalOpen] = useState(false);
    const [detailSearchValue, setDetailSearchValue] = useState(null);

    const {
        performance,
        reqSearchTotalPerformance,
        onActionResetPerformance
    } = useTotalSalesPerformanceHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const __handle = {
        action: {
            resetPerformance: () => {
                onActionResetPerformance();
            },
            changeSwitch: () => {
                let checkedValue = checkedSwitch;
                setCheckedSwitch(!checkedValue);
            },
            changeDimension: (e) => {
                let value = e.target.value;
                setSearchDimension(value);
            },
            openDetailSelectorModal: (data) => {
                setDetailSearchValue(data);
                setDetailSelectorModalOpen(true);
            },
            closeDetailSelectorModal: () => {
                setDetailSelectorModalOpen(false);
            }
        },
        submit: {
            searchPerformance: async (body) => {
                onActionOpenBackdrop();
                await reqSearchTotalPerformance(body);
                onActionCloseBackdrop();
            }
        }
    }

    return (
        <>
            <Container navbarOpen={props.navbarOpen}>
                <PageTitleFieldView title={'전체 - 총 매출액 & 판매건'} />

                <OperatorComponent
                    onSubmitSearchPerformance={__handle.submit.searchPerformance}
                    onActionResetPerformance={__handle.action.resetPerformance}
                />

                {/* 주문데이터 표시 및 날짜검색 설정 */}
                <GraphOperatorComponent
                    searchDimension={searchDimension}
                    checkedSwitch={checkedSwitch}

                    onActionChangeSwitch={__handle.action.changeSwitch}
                    onActionChangeSearchDimension={__handle.action.changeDimension}
                />

                <PayAmountGraphComponent
                    searchDimension={searchDimension}
                    checkedSwitch={checkedSwitch}
                    performance={performance}

                    onActionOpenDetailSelectorModal={__handle.action.openDetailSelectorModal}
                />
                <RegistrationAndUnitGraphComponent
                    searchDimension={searchDimension}
                    checkedSwitch={checkedSwitch}
                    performance={performance}

                    onActionOpenDetailSelectorModal={__handle.action.openDetailSelectorModal}
                />
                <PayAmountDayOfWeekGraphComponent
                    performance={performance}
                />
                <SummaryTableComponent
                    performance={performance}
                />
            </Container>

            <BackdropHookComponent
                open={backdropOpen}
            />

            <DetailSelectorModalComponent
                modalOpen={detailSelectorModalOpen}
                detailSearchValue={detailSearchValue}

                onActionCloseModal={__handle.action.closeDetailSelectorModal}
            />
        </>
    )
}

export default TotalSalesPerformanceComponent;

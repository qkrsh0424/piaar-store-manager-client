import styled from 'styled-components';

import _ from 'lodash';
import OperatorComponent from './operator/Operator.component';
import PayAmountGraphComponent from './pay-amount-graph/PayAmountGraph.component';
import RegistrationAndUnitGraphComponent from './registration-and-unit-graph/RegistrationAndUnitGraph.component';
import PayAmountDayOfWeekGraphComponent from './pay-amount-day-of-week-graph/PayAmountDayOfWeekGraph.component';
import SummaryTableComponent from './summary-table/SummaryTable.component';
import GraphOperatorComponent from './graph-operator/GraphOperator.component';
import { useEffect, useState } from 'react';
import useTotalSalesPerformanceHook from './hooks/useTotalSalesPerformanceHook';
import { BackdropHookComponent, useBackdropHook } from '../../../hooks/backdrop/useBackdropHook';
import { getEndDate, getStartDate, getTimeDiffWithUTC } from '../../../utils/dateFormatUtils';
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

const TotalSalesPerformanceComponent = (props) => {
    const [searchDimension, setSearchDimension] = useState('date');
    const [checkedSwitch, setCheckedSwitch] = useState(false);

    const {
        query
    } = useRouterHook();

    const {
        location
    } = useRouterHook();

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

    useEffect(() => {
        async function fetchInit() {
            let startDate = query.startDate ? getStartDate(query.startDate) : null;
            let endDate = query.endDate ? getEndDate(query.endDate) : null;
            let utcHourDifference = getTimeDiffWithUTC();

            let params = {
                startDate,
                endDate,
                utcHourDifference
            }

            if(!(startDate && endDate)) {
                onActionResetPerformance();
                return;
            }

            onActionOpenBackdrop();
            await reqSearchTotalPerformance(params);
            onActionCloseBackdrop();
        }

        fetchInit();
    }, [location])

    const __handle = {
        action: {
            changeSwitch: () => {
                let checkedValue = checkedSwitch;
                setCheckedSwitch(!checkedValue);
            },
            changeDimension: (e) => {
                let value = e.target.value;
                setSearchDimension(value);
            }
        }
    }

    return (
        <>
            <Container navbarOpen={props.navbarOpen}>
                <PageTitleFieldView title={'총 매출액 & 판매건'} />

                <OperatorComponent />

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
                />
                <RegistrationAndUnitGraphComponent
                    searchDimension={searchDimension}
                    checkedSwitch={checkedSwitch}
                    performance={performance}
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
        </>
    )
}

export default TotalSalesPerformanceComponent;

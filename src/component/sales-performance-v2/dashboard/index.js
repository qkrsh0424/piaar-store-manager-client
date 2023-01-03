import { useEffect } from 'react';
import styled from 'styled-components';

import { getStartDate, getStartDateOfMonth, getTimeDiffWithUTC, setStartDateOfPeriod } from '../../../utils/dateFormatUtils';
import _ from 'lodash';
import useRouterHook from '../../../hooks/router/useRouterHook';
import { BackdropHookComponent, useBackdropHook } from '../../../hooks/backdrop/useBackdropHook';
import DashboardComponent from './Dashboard.component';
import useSalesPerformanceItemHook from './hooks/useSalesPerformanceHook';

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

// let TODAY = new Date("2022-11-17");
let TODAY = new Date();
let YESTERDAY = setStartDateOfPeriod(TODAY, 0, 0, -1);

const SalesPerformanceDashboardComponent = (props) => {
    
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
        dashboard: dashboardData,
        performance: performanceData,
        reqSearchDashboard: reqSearchSalesPerformanceDashboard,
        reqSearchPerformance: reqSearchPerformance
    } = useSalesPerformanceItemHook();

    useEffect(() => {
        async function getDashboardPerformance() {
            // TODO :: 배포 시 new Date() 로 변경
            let prev7DaysOfToday = setStartDateOfPeriod(TODAY, 0, 0, -7);
            let prev7DaysOfYesterDay = setStartDateOfPeriod(YESTERDAY, 0, 0, -7)
        
            let searchDate = [TODAY, YESTERDAY, prev7DaysOfToday, prev7DaysOfYesterDay];
            searchDate = searchDate.map(r => getStartDate(r).toISOString()).join(",");
            
            let periodType = 'channelOrderDate';
            let matchedCode = 'optionCode';
            let utcHourDifference = getTimeDiffWithUTC();

            let params = {
                date: searchDate,
                periodType: periodType,
                matchedCode: matchedCode,
                utcHourDifference
            }

            onActionOpenBackdrop();
            await reqSearchSalesPerformanceDashboard(params);
            onActionCloseBackdrop();
        }

        // 월별 평균 매출
        async function getThisMonthPerformance() {
            let startDate = getStartDateOfMonth(TODAY);
            let endDate = YESTERDAY > TODAY ? TODAY : YESTERDAY;
            let utcHourDifference = getTimeDiffWithUTC();

            let params = {
                startDate,
                endDate,
                utcHourDifference
            }

            onActionOpenBackdrop();
            await reqSearchPerformance(params);
            onActionCloseBackdrop();
        }

        getDashboardPerformance();
        getThisMonthPerformance();
    }, [location]);

    return (
        <Container navbarOpen={props.navbarOpen}>
            <PageTitleFieldView title={'대시보드'} />

            <DashboardComponent
                dashboardData={dashboardData}
                performanceData={performanceData}
            />

            {/* Backdrop Loading */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default SalesPerformanceDashboardComponent;

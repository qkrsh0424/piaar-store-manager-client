import { useEffect } from 'react';
import styled from 'styled-components';

import { getEndDateOfMonth, getStartDate, getStartDateOfMonth, getTimeDiffWithUTC, setSubtractedDate } from '../../../utils/dateFormatUtils';
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

// const TODAY = setSubtractedDate(new Date(), 0, -1, 0);
const TODAY = new Date();
const YESTERDAY = setSubtractedDate(TODAY, 0, 0, -1);

const SalesPerformanceDashboardComponent = (props) => {
    
    const {
        location,
    } = useRouterHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        dashboard: dashboardData,
        performance: performanceData,
        lastMonthPerformance: lastMonthPerformanceData,
        channelPerformance: channelPerformance,
        reqSearchDashboard: reqSearchSalesPerformanceDashboard,
        reqSearchPerformance: reqSearchPerformance,
        reqSearchLastMonthPerformance: reqSearchLastMonthPerformance,
        reqSearchChannelPerformance: reqSearchChannelPerformance
    } = useSalesPerformanceItemHook();

    useEffect(() => {
        async function getDashboardPerformance() {
            // TODO :: 배포 시 new Date() 로 변경
            let prev7DaysOfToday = setSubtractedDate(TODAY, 0, 0, -7);
            let prev7DaysOfYesterDay = setSubtractedDate(YESTERDAY, 0, 0, -7)
        
            let searchDate = [TODAY, YESTERDAY, prev7DaysOfToday, prev7DaysOfYesterDay];
            searchDate = searchDate.map(r => getStartDate(r));
            
            let utcHourDifference = getTimeDiffWithUTC();

            let body = {
                searchDate,
                utcHourDifference
            }

            onActionOpenBackdrop();
            await reqSearchSalesPerformanceDashboard(body);
            onActionCloseBackdrop();
        }

        // 월 성과
        async function getThisMonthPerformance() {
            let startDate = getStartDateOfMonth(TODAY);
            let endDate = YESTERDAY > TODAY ? TODAY : YESTERDAY;
            let utcHourDifference = getTimeDiffWithUTC();

            let body = {
                startDate,
                endDate,
                utcHourDifference
            }

            onActionOpenBackdrop();
            await reqSearchPerformance(body);
            onActionCloseBackdrop();
        }

        // 지난달 성과
        async function getLasyMonthPerformance() {
            let lastMonth = setSubtractedDate(TODAY, 0, -1, 0);
            let startDate = getStartDateOfMonth(lastMonth);
            let endDate = getEndDateOfMonth(lastMonth);
            let utcHourDifference = getTimeDiffWithUTC();

            let body = {
                startDate,
                endDate,
                utcHourDifference
            }

            onActionOpenBackdrop();
            await reqSearchLastMonthPerformance(body);
            onActionCloseBackdrop();
        }

        // 채널별 판매성과
        async function getChannelPerformance() {
            let startDate = YESTERDAY;
            let endDate = TODAY;
            let utcHourDifference = getTimeDiffWithUTC();

            let body = {
                startDate,
                endDate,
                utcHourDifference
            }

            onActionOpenBackdrop();
            await reqSearchChannelPerformance(body);
            onActionCloseBackdrop();
        }

        getDashboardPerformance();
        getThisMonthPerformance();
        getLasyMonthPerformance();
        getChannelPerformance();
    }, [location]);

    return (
        <Container navbarOpen={props.navbarOpen}>
            <PageTitleFieldView title={'대시보드'} />

            <DashboardComponent
                dashboardData={dashboardData}
                performanceData={performanceData}
                lastMonthPerformanceData={lastMonthPerformanceData}
                channelPerformance={channelPerformance}
            />

            {/* Backdrop Loading */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default SalesPerformanceDashboardComponent;

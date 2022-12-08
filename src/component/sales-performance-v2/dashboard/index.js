import { useEffect } from 'react';
import styled from 'styled-components';

import { getStartDate, setStartDateOfPeriod } from '../../../utils/dateFormatUtils';
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

let TODAY = new Date("2022-11-17");
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
        reqSearchDashboard: reqSearchSalesPerformanceDashboard
    } = useSalesPerformanceItemHook();

    useEffect(() => {
        async function fetchInit() {
            // TODO :: 배포 시 new Date() 로 변경
            let prev7DaysOfToday = setStartDateOfPeriod(TODAY, 0, 0, -7);
            let prev7DaysOfYesterDay = setStartDateOfPeriod(YESTERDAY, 0, 0, -7)
        
            let searchDate = [TODAY, YESTERDAY, prev7DaysOfToday, prev7DaysOfYesterDay];
            searchDate = searchDate.map(r => getStartDate(r).toISOString()).join(",");
            
            let periodType = 'channelOrderDate';
            let matchedCode = 'optionCode';

            let params = {
                date: searchDate,
                periodType: periodType,
                matchedCode: matchedCode
            }

            onActionOpenBackdrop();
            await reqSearchSalesPerformanceDashboard(params);
            onActionCloseBackdrop();
        }

        fetchInit();
    }, [location]);

    return (
        <Container navbarOpen={props.navbarOpen}>
            <PageTitleFieldView title={'대시보드'} />

            <DashboardComponent
                dashboardData={dashboardData}
            />

            {/* Backdrop Loading */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default SalesPerformanceDashboardComponent;

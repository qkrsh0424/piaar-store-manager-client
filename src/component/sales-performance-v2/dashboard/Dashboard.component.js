import _ from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import { BackdropHookComponent, useBackdropHook } from "../../../hooks/backdrop/useBackdropHook";
import useRouterHook from "../../../hooks/router/useRouterHook";
import { dateToYYYYMMDD, getDayName, getEndDate, getEndDateOfMonth, getStartDate, getStartDateOfMonth, getTimeDiffWithUTC, setSubtractedDate } from "../../../utils/dateFormatUtils";
import { getTrendPercentage } from "../../../utils/numberFormatUtils";
import { Container } from "./Dashboard.styled"
import useSalesPerformanceItemHook from "./hooks/useSalesPerformanceHook";
import ChannelPerformanceFieldView from "./view/ChannelPerformanceField.view";
import ContentTextFieldView from "./view/ContentTextField.view";
import DashboardFieldView from "./view/DashboardField.view"
import SubPerformanceFieldView from "./view/SubPerformanceField.view";

// const TODAY = setSubtractedDate(new Date(), 0, -2, 0);
const TODAY = new Date();
const YESTERDAY = setSubtractedDate(TODAY, 0, 0, -1);
const PREV_7DAYS = setSubtractedDate(TODAY, 0, 0, -7);
const PREV_8DAYS = setSubtractedDate(TODAY, 0, 0, -8);

export default function DashboardComponent(props) {
    const [todayData, setTodayData] = useState(null);
    const [yesterdayData, setYesterdayData] = useState(null);
    const [monthAvgData, setMonthAvgData] = useState(null);
    const [lastMonthAvgData, setLastMonthAvgData] = useState(null);
    const [channelPerformanceData, setChannelPerformanceData] = useState(null);

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
        // 대시보드 - 오늘, -1일, -7일, -8일
        async function getDashboardPerformance() {
            let prev7DaysOfToday = setSubtractedDate(TODAY, 0, 0, -7);
            let prev7DaysOfYesterDay = setSubtractedDate(YESTERDAY, 0, 0, -7);
            
            let searchDate = [TODAY, YESTERDAY, prev7DaysOfToday, prev7DaysOfYesterDay].map(r => getStartDate(r));
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
            let startDate = getStartDate(getStartDateOfMonth(TODAY));
            let endDate = YESTERDAY > TODAY ? getEndDate(TODAY) : getEndDate(YESTERDAY);
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
        async function getLastMonthPerformance() {
            let lastMonth = setSubtractedDate(TODAY, 0, -1, 0);
            let startDate = getStartDate(getStartDateOfMonth(lastMonth));
            let endDate = getEndDate(getEndDateOfMonth(lastMonth));
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
            let startDate = getStartDate(YESTERDAY);
            let endDate = getEndDate(TODAY);
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
        getLastMonthPerformance();
        getChannelPerformance();
    }, [location]);

    useEffect(() => {
        if(!dashboardData) {
            return;
        }

        if(!performanceData) {
            return;
        }

        if(!lastMonthPerformanceData) {
            return;
        }

        if(!channelPerformance) {
            return;
        }

        __handle.action.initDashboardData2();
        __handle.action.initPerformanceData();
        __handle.action.initLastMonthPerformanceData();
        __handle.action.initChannelPerformanceData();
    }, [dashboardData, performanceData, lastMonthPerformanceData, channelPerformance])

    const __handle = {
        action: {
            initDashboardData2: () => {
                let data = dashboardData.map(r => {
                    return {
                        ...r,
                        unsalesPayAmount: r.orderPayAmount - r.salesPayAmount,
                        unsalesUnit: r.orderUnit - r.salesUnit,
                        unsalesRegistration: r.orderRegistration - r.salesRegistration
                    }
                })

                let todayData = {};
                let yesterdayData = {};
                let prev7DaysData = {};
                let prev8DaysData = {};

                data.forEach(r => {
                    switch(r.datetime) {
                        case dateToYYYYMMDD(TODAY):
                            todayData = {...r};
                            return;
                        case dateToYYYYMMDD(YESTERDAY):
                            yesterdayData = {...r};
                            return;
                        case dateToYYYYMMDD(PREV_7DAYS):
                            prev7DaysData = {...r};
                            return;
                        case dateToYYYYMMDD(PREV_8DAYS):
                            prev8DaysData = {...r};
                            return;
                    }
                });

                // view단에서 보여질 데이터 세팅
                // 1주일 전과 오늘 & 어제와 오늘 데이터 비교
                todayData = {
                    ...todayData,
                    orderPayAmountTrendByAWeekAgo: getTrendPercentage(todayData.orderPayAmount, prev7DaysData.orderPayAmount),
                    salesPayAmountTrendByAWeekAgo: getTrendPercentage(todayData.salesPayAmount, prev7DaysData.salesPayAmount),
                    unsalesPayAmountTrendByAWeekAgo: getTrendPercentage(todayData.unsalesPayAmount, prev7DaysData.unsalesPayAmount),
                    orderUnitTrendByAWeekAgo: getTrendPercentage(todayData.orderUnit, prev7DaysData.orderUnit),
                    salesUnitTrendByAWeekAgo: getTrendPercentage(todayData.salesUnit, prev7DaysData.salesUnit),
                    unsalesUnitTrendByAWeekAgo: getTrendPercentage(todayData.unsalesUnit, prev7DaysData.unsalesUnit),
                    orderRegistrationTrendByAWeekAgo: getTrendPercentage(todayData.orderRegistration, prev7DaysData.orderRegistration),
                    salesRegistrationTrendByAWeekAgo: getTrendPercentage(todayData.salesRegistration, prev7DaysData.salesRegistration),
                    unsalesRegistrationTrendByAWeekAgo: getTrendPercentage(todayData.unsalesRegistration, prev7DaysData.unsalesRegistration),
                    dayNameOfAWeekAgo: getDayName(prev7DaysData.datetime),

                    orderPayAmountTrendByYesterday: getTrendPercentage(todayData.orderPayAmount, yesterdayData.orderPayAmount),
                    salesPayAmountTrendByYesterday: getTrendPercentage(todayData.salesPayAmount, yesterdayData.salesPayAmount),
                    unsalesPayAmountTrendByYesterday: getTrendPercentage(todayData.unsalesPayAmount, yesterdayData.unsalesPayAmount),
                    orderUnitTrendByYesterday: getTrendPercentage(todayData.orderUnit, yesterdayData.orderUnit),
                    salesUnitTrendByYesterday: getTrendPercentage(todayData.salesUnit, yesterdayData.salesUnit),
                    unsalesUnitTrendByYesterday: getTrendPercentage(todayData.unsalesUnit, yesterdayData.unsalesUnit),
                    orderRegistrationTrendByYesterday: getTrendPercentage(todayData.orderRegistration, yesterdayData.orderRegistration),
                    salesRegistrationTrendByYesterday: getTrendPercentage(todayData.salesRegistration, yesterdayData.salesRegistration),
                    unsalesRegistrationTrendByYesterday: getTrendPercentage(todayData.unsalesRegistration, yesterdayData.unsalesRegistration),
                    dayNameOfYesterday: getDayName(yesterdayData.datetime),
                }

                // 어제의 1주일 전과 어제 데이터 비교
                yesterdayData = {
                    ...yesterdayData,
                    orderPayAmountTrendByAWeekAgo: getTrendPercentage(yesterdayData.orderPayAmount, prev8DaysData.orderPayAmount),
                    salesPayAmountTrendByAWeekAgo: getTrendPercentage(yesterdayData.salesPayAmount, prev8DaysData.salesPayAmount),
                    unsalesPayAmountTrendByAWeekAgo: getTrendPercentage(yesterdayData.unsalesPayAmount, prev8DaysData.unsalesPayAmount),
                    orderUnitTrendByAWeekAgo: getTrendPercentage(yesterdayData.orderUnit, prev8DaysData.orderUnit),
                    salesUnitTrendByAWeekAgo: getTrendPercentage(yesterdayData.salesUnit, prev8DaysData.salesUnit),
                    unsalesUnitTrendByAWeekAgo: getTrendPercentage(yesterdayData.unsalesUnit, prev8DaysData.unsalesUnit),
                    orderRegistrationTrendByAWeekAgo: getTrendPercentage(yesterdayData.orderRegistration, prev8DaysData.orderRegistration),
                    salesRegistrationTrendByAWeekAgo: getTrendPercentage(yesterdayData.salesRegistration, prev8DaysData.salesRegistration),
                    unsalesRegistrationTrendByAWeekAgo: getTrendPercentage(yesterdayData.unsalesRegistration, prev8DaysData.unsalesRegistration),
                    dayNameOfAWeekAgo: getDayName(prev8DaysData.datetime)
                }

                setTodayData(todayData);
                setYesterdayData(yesterdayData);
            },
            initPerformanceData: () => {
                let data = [...performanceData];
                let payAmount = 0;
                let registration = 0;
                let unit = 0;

                data.forEach(r => {
                    payAmount += r.salesPayAmount;
                    registration += r.salesRegistration;
                    unit += r.salesUnit;
                })

                payAmount = Math.round(payAmount / data.length);
                registration = Math.round(registration / data.length);
                unit = Math.round(unit / data.length);

                let monthPerformance = {
                    title: '이번달 일일 평균',
                    payAmount,
                    registration,
                    unit,
                }

                setMonthAvgData(monthPerformance);
            },
            initLastMonthPerformanceData: () => {
                let data = [...lastMonthPerformanceData];
                let payAmount = 0;
                let registration = 0;
                let unit = 0;

                data.forEach(r => {
                    payAmount += r.salesPayAmount;
                    registration += r.salesRegistration;
                    unit += r.salesUnit;
                })

                payAmount = Math.round(payAmount / data.length);
                registration = Math.round(registration / data.length);
                unit = Math.round(unit / data.length);

                let monthPerformance = {
                    title: '지난달 일일 평균',
                    payAmount,
                    registration,
                    unit,
                }

                setLastMonthAvgData(monthPerformance);
            },
            initChannelPerformanceData: () => {
                let data = channelPerformance?.map(r => {
                    let sortedPerformances = _.sortBy(r.performances, 'salesPayAmount').reverse();
                    let salesPayAmountSum = 0;
                    r.performances.forEach(performance => {
                        salesPayAmountSum += performance.salesPayAmount;
                    })

                    return {
                        ...r,
                        channelPayAmount: sortedPerformances,
                        totalPayAmount: salesPayAmountSum
                    }
                })

                let todayData = {};
                let yesterdayData = {};

                data.forEach(r => {
                    switch(r.datetime) {
                        case dateToYYYYMMDD(TODAY):
                            todayData = {...r};
                            return;
                        case dateToYYYYMMDD(YESTERDAY):
                            yesterdayData = {...r};
                            return;
                    }
                });


                setChannelPerformanceData({todayData, yesterdayData});
            }
        }
    }

    return (
        <Container>
            <ContentTextFieldView />

            {/* 채널 판매성과 요약*/}
            {channelPerformanceData &&
                <ChannelPerformanceFieldView
                    channelPerformanceData={channelPerformanceData}
                />
            }

            {/* 대시보드 */}
            <DashboardFieldView
                todayData={todayData}
                yesterdayData={yesterdayData}
            />

            {monthAvgData && lastMonthAvgData &&
                <SubPerformanceFieldView
                    monthAvgData={monthAvgData}
                    lastMonthAvgData={lastMonthAvgData}
                />
            }

            {/* Backdrop Loading */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}
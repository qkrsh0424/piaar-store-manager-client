import _ from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import { BackdropHookComponent, useBackdropHook } from "../../../hooks/backdrop/useBackdropHook";
import useRouterHook from "../../../hooks/router/useRouterHook";
import { dateToYYYYMMDD, getEndDate, getEndDateOfMonth, getStartDate, getStartDateOfMonth, getTimeDiffWithUTC, setSubtractedDate } from "../../../utils/dateFormatUtils";
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
    const [prev7DaysData, setPrev7DaysData] = useState(null);
    const [prev8DaysData, setPrev8DaysData] = useState(null);

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
            let endDate = YESTERDAY.getDate() > TODAY.getDate() ? getEndDate(TODAY) : getEndDate(YESTERDAY);
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

        __handle.action.initDashboardData();
        __handle.action.initPerformanceData();
        __handle.action.initLastMonthPerformanceData();
        __handle.action.initChannelPerformanceData();
    }, [dashboardData, performanceData, lastMonthPerformanceData, channelPerformance])

    const __handle = {
        action: {
            initDashboardData: () => {
                let data = dashboardData.map(r => {
                    return {
                        ...r,
                        unsalesPayAmount: r.orderPayAmount - r.salesPayAmount,
                        unsalesUnit: r.orderUnit - r.salesUnit,
                        unsalesRegistration: r.orderRegistration - r.salesRegistration
                    }
                })

                data.forEach(r => {
                    switch(r.datetime) {
                        case dateToYYYYMMDD(TODAY):
                            setTodayData({...r});
                            return;
                        case dateToYYYYMMDD(YESTERDAY):
                            setYesterdayData({...r});
                            return;
                        case dateToYYYYMMDD(PREV_7DAYS):
                            setPrev7DaysData({...r});
                            return;
                        case dateToYYYYMMDD(PREV_8DAYS):
                            setPrev8DaysData({...r})
                            return;
                    }
                });
            },
            initPerformanceData: () => {
                let data = [...performanceData];
                let payAmount = 0;
                let registration = 0;
                let unit = 0;

                // 판매데이터 계산
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

                // 판매데이터 계산
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
                prev7DaysData={prev7DaysData}
                prev8DaysData={prev8DaysData}
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
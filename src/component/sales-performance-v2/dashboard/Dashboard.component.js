import _ from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import { dateToYYMMDD2, getDayName, setStartDateOfPeriod } from "../../../utils/dateFormatUtils";
import { getPercentage } from "../../../utils/numberFormatUtils";
import { Container } from "./Dashboard.styled"
import DashboardFieldView from "./view/DashboardField.view"
import SubPerformanceFieldView from "./view/SubPerformanceField.view";

const TODAY = new Date();
const YESTERDAY = setStartDateOfPeriod(TODAY, 0, 0, -1);
const PREV_7DAYS = setStartDateOfPeriod(TODAY, 0, 0, -7);
const PREV_8DAYS = setStartDateOfPeriod(TODAY, 0, 0, -8);

export default function DashboardComponent(props) {
    const [todayData, setTodayData] = useState(null);
    const [yesterdayData, setYesterdayData] = useState(null);
    const [monthAvgData, setMonthAvgData] = useState(null);
    const [lastMonthAvgData, setLastMonthAvgData] = useState(null);

    useEffect(() => {
        if(!(props.dashboardData && props.dashboardData.length > 0)) {
            return;
        }

        __handle.action.initDashboardData();
    }, [props.dashboardData])

    useEffect(() => {
        if(!(props.performanceData && props.performanceData?.length > 0)) {
            return;
        }

        if(!(props.lastMonthPerformanceData && props.lastMonthPerformanceData?.length > 0)) {
            return;
        }

        __handle.action.initPerformanceData();
        __handle.action.initLastMonthPerformanceData();
    }, [props.performanceData, props.lastMonthPerformanceData])

    const __handle = {
        action: {
            initDashboardData: () => {
                let data = {};

                props.dashboardData?.forEach(r => {
                    if (dateToYYMMDD2(new Date(r.datetime)) === dateToYYMMDD2(TODAY)) {
                        data = {
                            ...data,
                            today: {
                                ...r,
                                unsalesPayAmount: r.orderPayAmount - r.salesPayAmount,
                                unsalesUnit: r.orderUnit - r.salesUnit,
                                unsalesRegistration: r.orderRegistration - r.salesRegistration
                            }
                        }
                    } else if (dateToYYMMDD2(new Date(r.datetime)) === dateToYYMMDD2(YESTERDAY)) {
                        data = {
                            ...data,
                            yesterday: {
                                ...r,
                                unsalesPayAmount: r.orderPayAmount - r.salesPayAmount,
                                unsalesUnit: r.orderUnit - r.salesUnit,
                                unsalesRegistration: r.orderRegistration - r.salesRegistration
                            }
                        }
                    } else if (dateToYYMMDD2(new Date(r.datetime)) === dateToYYMMDD2(PREV_7DAYS)) {
                        data = {
                            ...data,
                            prev7Days: {
                                ...r,
                                unsalesPayAmount: r.orderPayAmount - r.salesPayAmount,
                                unsalesUnit: r.orderUnit - r.salesUnit,
                                unsalesRegistration: r.orderRegistration - r.salesRegistration
                            }
                        }
                    } else if (dateToYYMMDD2(new Date(r.datetime)) === dateToYYMMDD2(PREV_8DAYS)) {
                        data = {
                            ...data,
                            prev8Days: {
                                ...r,
                                unsalesPayAmount: r.orderPayAmount - r.salesPayAmount,
                                unsalesUnit: r.orderUnit - r.salesUnit,
                                unsalesRegistration: r.orderRegistration - r.salesRegistration
                            }
                        }
                    }
                });

                let todayData = { ...data.today };
                let prev7DaysData = { ...data.prev7Days }
                let yesterdayData = { ...data.yesterday }
                let prev8DaysData = { ...data.prev8Days }

                // view단에서 보여질 데이터 세팅
                // 1주일 전과 오늘 & 어제와 오늘 데이터 비교
                let updatedTodayData = {
                    ...todayData,
                    orderPayAmountTrendByAWeekAgo: getPercentage(todayData.orderPayAmount, prev7DaysData.orderPayAmount),
                    salesPayAmountTrendByAWeekAgo: getPercentage(todayData.salesPayAmount, prev7DaysData.salesPayAmount),
                    unsalesPayAmountTrendByAWeekAgo: getPercentage(todayData.unsalesPayAmount, prev7DaysData.unsalesPayAmount),
                    orderUnitTrendByAWeekAgo: getPercentage(todayData.orderUnit, prev7DaysData.orderUnit),
                    salesUnitTrendByAWeekAgo: getPercentage(todayData.salesUnit, prev7DaysData.salesUnit),
                    unsalesUnitTrendByAWeekAgo: getPercentage(todayData.unsalesUnit, prev7DaysData.unsalesUnit),
                    orderRegistrationTrendByAWeekAgo: getPercentage(todayData.orderRegistration, prev7DaysData.orderRegistration),
                    salesRegistrationTrendByAWeekAgo: getPercentage(todayData.salesRegistration, prev7DaysData.salesRegistration),
                    unsalesRegistrationTrendByAWeekAgo: getPercentage(todayData.unsalesRegistration, prev7DaysData.unsalesRegistration),
                    dayNameOfAWeekAgo: getDayName(prev7DaysData.datetime),

                    orderPayAmountTrendByYesterday: getPercentage(todayData.orderPayAmount, yesterdayData.orderPayAmount),
                    salesPayAmountTrendByYesterday: getPercentage(todayData.salesPayAmount, yesterdayData.salesPayAmount),
                    unsalesPayAmountTrendByYesterday: getPercentage(todayData.unsalesPayAmount, yesterdayData.unsalesPayAmount),
                    orderUnitTrendByYesterday: getPercentage(todayData.orderUnit, yesterdayData.orderUnit),
                    salesUnitTrendByYesterday: getPercentage(todayData.salesUnit, yesterdayData.salesUnit),
                    unsalesUnitTrendByYesterday: getPercentage(todayData.unsalesUnit, yesterdayData.unsalesUnit),
                    orderRegistrationTrendByYesterday: getPercentage(todayData.orderRegistration, yesterdayData.orderRegistration),
                    salesRegistrationTrendByYesterday: getPercentage(todayData.salesRegistration, yesterdayData.salesRegistration),
                    unsalesRegistrationTrendByYesterday: getPercentage(todayData.unsalesRegistration, yesterdayData.unsalesRegistration),
                    dayNameOfYesterday: getDayName(yesterdayData.datetime),
                }

                // 어제의 1주일 전과 어제 데이터 비교
                let updatedYesterDayData = {
                    ...yesterdayData,
                    orderPayAmountTrendByAWeekAgo: getPercentage(yesterdayData.orderPayAmount, prev8DaysData.orderPayAmount),
                    salesPayAmountTrendByAWeekAgo: getPercentage(yesterdayData.salesPayAmount, prev8DaysData.salesPayAmount),
                    unsalesPayAmountTrendByAWeekAgo: getPercentage(yesterdayData.unsalesPayAmount, prev8DaysData.unsalesPayAmount),
                    orderUnitTrendByAWeekAgo: getPercentage(yesterdayData.orderUnit, prev8DaysData.orderUnit),
                    salesUnitTrendByAWeekAgo: getPercentage(yesterdayData.salesUnit, prev8DaysData.salesUnit),
                    unsalesUnitTrendByAWeekAgo: getPercentage(yesterdayData.unsalesUnit, prev8DaysData.unsalesUnit),
                    orderRegistrationTrendByAWeekAgo: getPercentage(yesterdayData.orderRegistration, prev8DaysData.orderRegistration),
                    salesRegistrationTrendByAWeekAgo: getPercentage(yesterdayData.salesRegistration, prev8DaysData.salesRegistration),
                    unsalesRegistrationTrendByAWeekAgo: getPercentage(yesterdayData.unsalesRegistration, prev8DaysData.unsalesRegistration),
                    dayNameOfAWeekAgo: getDayName(prev8DaysData.datetime)
                }

                setTodayData(updatedTodayData);
                setYesterdayData(updatedYesterDayData);
            },
            initPerformanceData: () => {
                let data = [...props.performanceData];
                let payAmount = _.sumBy(data, 'salesPayAmount') / data.length;
                let registration = Math.round(_.sumBy(data, 'salesRegistration') / data.length);
                let unit = Math.round(_.sumBy(data, 'salesUnit') / data.length);

                let monthPerformance = {
                    title: '이번달 일일 평균',
                    payAmount,
                    registration,
                    unit,
                }

                setMonthAvgData(monthPerformance);
            },
            initLastMonthPerformanceData: () => {
                let data = [...props.lastMonthPerformanceData];
                let payAmount = _.sumBy(data, 'salesPayAmount') / data.length;
                let registration = Math.round(_.sumBy(data, 'salesRegistration') / data.length);
                let unit = Math.round(_.sumBy(data, 'salesUnit') / data.length);

                let monthPerformance = {
                    title: '지난달 일일 평균',
                    payAmount,
                    registration,
                    unit,
                }

                setLastMonthAvgData(monthPerformance);
            }
        }
    }

    return (
        <Container>
            <DashboardFieldView
                todayData={todayData}
                yesterdayData={yesterdayData}
            />
            {monthAvgData && lastMonthAvgData &&
                <SubPerformanceFieldView
                    monthAvgData={monthAvgData}
                    lastMonthAvgData={lastMonthAvgData}
                />}
        </Container>
    )
}
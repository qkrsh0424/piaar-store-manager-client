import { Container } from "./SummaryTable.styled";
import { useEffect, useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import { getEndDate, getStartDate } from "../../../../utils/dateFormatUtils";
import TableTitleFieldView from "./view/TableTitleField.view";
import TableFieldView from "./view/TableField.view";
import useSummaryTableHook from "./hooks/useSummaryTableHook";

// 그래프 기본 3가지 색상 : [주문, 판매, 평균]
const DEFAULT_GRAPH_BG_2COLOR = ['#ADA8C3', '#C0C5DC', '#596dd3'];

export default function SummaryTableComponent() {
    const [summaryTableData, setSummaryTableData] = useState(null);
    const [totalSummarySumData, setTotalSummarySumData] = useState(null);

    const {
        location,
        query,
        navigateParams
    } = useRouterHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        summaryData: summaryData,
        reqSearchSummaryData,
        onActionResetSummaryData
    } = useSummaryTableHook()

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            let startDate = query.startDate ? getStartDate(query.startDate) : null;
            let endDate = query.endDate ? getEndDate(query.endDate) : null;

            let params = {
                startDate,
                endDate
            }
            await reqSearchSummaryData(params);
            onActionCloseBackdrop();
        }

        if(!(query.startDate || query.endDate)) {
            onActionResetSummaryData();
            return;
        }

        fetchInit();
    }, [location])

    useEffect(() => {
        if(!(summaryData && summaryData.length > 0)) {
            setSummaryTableData(null);
            return;
        }

        __handle.action.createSummaryTableData();
        __handle.action.createTotalSummarySumData();
    }, [summaryData])

    const __handle = {
        action: {
            createSummaryTableData: () => {
                let data = [...summaryData];

                data = data.map(r => {
                    return {
                        ...r,
                        unsalesRegistration: r.orderRegistration - r.salesRegistration,
                        unsalesUnit: r.orderUnit - r.salesUnit,
                        unsalesPayAmount: r.orderPayAmount - r.salesPayAmount
                    }
                });

                data = data.sort((a, b) => b.salesPayAmount - a.salesPayAmount);

                setSummaryTableData(data);
            },
            createTotalSummarySumData: () => {
                let totalSumData = {
                    datetime: '전체',
                    orderRegistration: 0,
                    orderUnit: 0,
                    orderPayAmount: 0,
                    salesRegistration: 0,
                    salesUnit: 0,
                    salesPayAmount: 0,
                    unsalesRegistration: 0,
                    unsalesUnit: 0,
                    unsalesPayAmount: 0
                };

                summaryData.forEach(r => {
                    totalSumData = {
                        ...totalSumData,
                        orderRegistration: totalSumData.orderRegistration + r.orderRegistration,
                        orderUnit: totalSumData.orderUnit + r.orderUnit,
                        orderPayAmount: totalSumData.orderPayAmount + r.orderPayAmount,
                        salesRegistration: totalSumData.salesRegistration + r.salesRegistration,
                        salesUnit: totalSumData.salesUnit + r.salesUnit,
                        salesPayAmount: totalSumData.salesPayAmount + r.salesPayAmount
                    }
                });

                totalSumData = {
                    ...totalSumData,
                    unsalesRegistration: totalSumData.orderRegistration - totalSumData.salesRegistration,
                    unsalesUnit: totalSumData.orderUnit - totalSumData.salesUnit,
                    unsalesPayAmount: totalSumData.orderPayAmount - totalSumData.salesPayAmount
                }

                setTotalSummarySumData(totalSumData);
            }
        }
    }

    return (
        <>
            <Container>
                <TableTitleFieldView />
                <TableFieldView
                    totalSummarySumData={totalSummarySumData}
                    summaryTableData={summaryTableData}
                />
            </Container>

            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    )
}
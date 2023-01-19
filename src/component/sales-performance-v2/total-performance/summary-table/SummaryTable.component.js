import { Container } from "./SummaryTable.styled";
import { useEffect, useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import TableTitleFieldView from "./view/TableTitleField.view";
import TableFieldView from "./view/TableField.view";
import { dateToYYYYMMDD, getEndDate, getStartDate } from "../../../../utils/dateFormatUtils";

export default function SummaryTableComponent(props) {
    const [summaryTableData, setSummaryTableData] = useState(null);
    const [totalSummarySumData, setTotalSummarySumData] = useState(null);

    const {
        query,
        navigateUrl
    } = useRouterHook();

    useEffect(() => {
        if(!(props.performance && props.performance.length > 0)) {
            setSummaryTableData(null);
            setTotalSummarySumData(null);
            return;
        }

        __handle.action.createSummaryTableData();
        __handle.action.createTotalSummarySumData();
    }, [props.performance])

    const __handle = {
        action: {
            createSummaryTableData: () => {
                let data = [...props.performance];

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

                props.performance.forEach(r => {
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
        <Container>
            <TableTitleFieldView />
            <TableFieldView
                totalSummarySumData={totalSummarySumData}
                summaryTableData={summaryTableData}
            />
        </Container>
    )
}
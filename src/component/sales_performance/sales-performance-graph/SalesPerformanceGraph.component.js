import { Chart } from "chart.js";
import { useEffect, useReducer } from "react";
import { dateToYYYYMMDD2 } from "../../../utils/dateFormatUtils";
import OrderAnalysisGraphFieldView from "./OrderAnalysisGraphField.view";
import RevenueGraphFieldView from "./RevenueGraphField.view";
import { Container, GraphTitleFieldWrapper } from "./SalesPerformanceGraph.styled";
import TableFieldView from "./TableField.view";

function GraphTitleField({ element }) {
    return (
        <GraphTitleFieldWrapper>
            {element}
        </GraphTitleFieldWrapper>
    );
}

const SalesPerformanceGraphComponent = (props) => {
    const [revenueGraphData, dispatchRevenueGraphData] = useReducer(revenueGraphDataReducer, initialRevenueGraphData);
    const [orderAnalysisGraphData, dispatchOrderAnalysisGraphData] = useReducer(orderAnalysisGraphDataReducer, initialOrderAnalysisGraphData);
    const [tableData, dispatchTableData] = useReducer(tableDataReducer, initialTableData);

    useEffect(() => {
        if(!props.erpItemData) {
            return;
        }

        onActionCreateRevenueGraphData();
        onActionCreateOrderAnalysisGraphData();
        onActionCreateTableData();
    }, [props.erpItemData])

    const onActionCreateRevenueGraphData = () => {
        let erpOrderItem = props.erpItemData.map(r => r.erpOrderItem);

        let date = new Set([]);
        let analysis = [];

        erpOrderItem.sort((a, b) => b.channelOrderDate - a.channelOrderDate);

        for(let i = 0; i < 14; i++) {
            let date3 = new Date();
            date3.setDate(date3.getDate() - i);
            date.add(dateToYYYYMMDD2(date3));
        }

        date.forEach(r => {
            let data = {
                key: r,
                value: 0
            }
            analysis.push(data);
        });

        erpOrderItem.forEach(r => {
            let date3 = dateToYYYYMMDD2(r.channelOrderDate);
            if (date3 && date.has(date3)) {
                let data4 = analysis.map(r2 => {
                    if (r2.key === date3) {
                        return r2 = {
                            ...r2,
                            value: parseInt(r2.value) + parseInt(r.price) + parseInt(r.deliveryCharge)
                        }
                    }else {
                        return r2;
                    }
                })

                analysis = [...data4];
            }
        })

        analysis.reverse();

        let labels = analysis.map(r => r.key);
        let dataset = analysis.map(r => r.value);

        dispatchRevenueGraphData({
            type: 'INIT_DATA',
            payload: {
                labels: labels,
                datasets: [
                    {
                        label: '총 매출액',
                        data: dataset,
                        fill: false,
                        borderColor: '#B9B4EB',
                        backgroundColor: '#B9B4EB',
                        tension: 0.1
                    }
                ]
            }
        })
    }

    const onActionCreateOrderAnalysisGraphData = () => {
        let erpOrderItem = props.erpItemData.map(r => r.erpOrderItem);

        let date = new Set([]);
        let analysis = [];

        erpOrderItem.sort((a, b) => b.channelOrderDate - a.channelOrderDate);

        for(let i = 0; i < 14; i++) {
            let date3 = new Date();
            date3.setDate(date3.getDate() - i);
            date.add(dateToYYYYMMDD2(date3));
        }

        date.forEach(r => {
            let data = {
                key: r,
                order: 0,
                unit: 0
            }
            analysis.push(data);
        });

        erpOrderItem.forEach(r => {
            let date3 = dateToYYYYMMDD2(r.channelOrderDate);
            if (date3 && date.has(date3)) {
                let data4 = analysis.map(r2 => {
                    if (r2.key === date3) {
                        return r2 = {
                            ...r2,
                            order: parseInt(r2.order) + 1,
                            unit: parseInt(r2.unit) + parseInt(r.unit)
                        }
                    }else {
                        return r2;
                    }
                })

                analysis = [...data4];
            }
        })

        analysis.reverse();

        let labels = analysis.map(r => r.key);
        let data1 = analysis.map(r => r.order);
        let data2 = analysis.map(r => r.unit);

        dispatchOrderAnalysisGraphData({
            type: 'INIT_DATA',
            payload: {
                labels: labels,
                datasets: [
                    {
                        label: '총 주문건',
                        data: data1,
                        backgroundColor: '#908CB8',
                        borderWidth: 1,
                        fill: true
                    },
                    {
                        label: '총 수량',
                        data: data2,
                        backgroundColor: '#B9B4EB',
                        borderWidth: 1,
                        fill: true
                    }
                ]
            }
        })
    }

    const onActionCreateTableData = () => {
        let erpOrderItem = props.erpItemData.map(r => r.erpOrderItem);

        let date = new Set([]);
        let analysis = [];

        erpOrderItem.sort((a, b) => b.channelOrderDate - a.channelOrderDate);

        for(let i = 0; i < 14; i++) {
            let date3 = new Date();
            date3.setDate(date3.getDate() - i);
            date.add(dateToYYYYMMDD2(date3));
        }

        date.forEach(r => {
            let data = {
                key: r,
                revenue: 0,
                order: 0,
                unit: 0
            }
            analysis.push(data);
        });

        erpOrderItem.forEach(r => {
            let date3 = dateToYYYYMMDD2(r.channelOrderDate);
            if (date3 && date.has(date3)) {
                let data4 = analysis.map(r2 => {
                    if (r2.key === date3) {
                        return r2 = {
                            ...r2,
                            revenue: parseInt(r2.revenue) + parseInt(r.price) + parseInt(r.deliveryCharge),
                            order: parseInt(r2.order) + 1,
                            unit: parseInt(r2.unit) + parseInt(r.unit)
                        }
                    }else {
                        return r2;
                    }
                })

                analysis = [...data4];
            }
        })

        analysis.sort((a, b) => b.revenue - a.revenue);

        dispatchTableData({
            type: 'INIT_DATA',
            payload: analysis
        })
    }

    return (
        <Container>
            <div>
                <GraphTitleField
                    element={
                        (
                            <div>1. 총 매출액</div>
                        )
                    }
                ></GraphTitleField>
                {revenueGraphData &&
                    <RevenueGraphFieldView
                        revenueGraphData={revenueGraphData}
                    ></RevenueGraphFieldView>
                }
            </div>

            <div>
                <GraphTitleField
                    element={
                        (
                            <div>2. 총 주문건 & 수량</div>
                        )
                    }
                ></GraphTitleField>
                {orderAnalysisGraphData &&
                    <OrderAnalysisGraphFieldView
                        orderAnalysisGraphData={orderAnalysisGraphData}
                    ></OrderAnalysisGraphFieldView>
                }
            </div>

            <div>
                <GraphTitleField
                    element={
                        (
                            <div>3. 매출 BEST</div>
                        )
                    }
                ></GraphTitleField>
                {tableData &&
                    <TableFieldView
                        tableData={tableData}
                    ></TableFieldView>
                }
            </div>
        </Container>
    )
}

export default SalesPerformanceGraphComponent;

const initialRevenueGraphData = null;
const initialOrderAnalysisGraphData = null;
const initialTableData = null;

const revenueGraphDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialRevenueGraphData;
        default:
            return state;
    }
}

const orderAnalysisGraphDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialRevenueGraphData;
        default:
            return state;
    }
}

const tableDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialTableData;
        default:
            return state;
    }
}

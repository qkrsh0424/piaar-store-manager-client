import { useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { dateToMMDD, dateToYYYYMMDD, getBetweenDay, getDayName } from "../../../utils/dateFormatUtils";
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
    const location = useLocation();
    const query = qs.parse(location.search);

    const [revenueGraphData, dispatchRevenueGraphData] = useReducer(revenueGraphDataReducer, initialRevenueGraphData);
    const [orderAnalysisGraphData, dispatchOrderAnalysisGraphData] = useReducer(orderAnalysisGraphDataReducer, initialOrderAnalysisGraphData);
    const [detailOrderAnalysisGraphData, dispatchDetailOrderAnalysisGraphData] = useReducer(detailOrderAnalysisGraphDataReducer, initialDetailOrderAnalysisGraphData);
    const [tableData, dispatchTableData] = useReducer(tableDataReducer, initialTableData);

    useEffect(() => {
        if(!props.erpItemData) {
            return;
        }

        let search = props.searchItem ?? 'total';
        if(search === 'total') {
            onActionCreateRevenueGraphData();
            onActionCreateOrderAnalysisGraphData();
        }else if(search === 'salesChannel') {
            onActionCreateChannelRevenueGraphData();
            onActionCreateChannelOrderAnalysisGraphData();
        }
        onActionCreateTableData();
    }, [props.erpItemData, props.searchItem])

    // 1. 총 매출액
    const onActionCreateRevenueGraphData = () => {
        let erpOrderItem = props.erpItemData.map(r => r.erpOrderItem);

        let date = new Set([]);
        let analysis = [];    

        let startDate = query.startDate;
        let endDate = query.endDate;

        let betweenDay = getBetweenDay(startDate, endDate);
        for(let i = 0; i < betweenDay; i++) {
            let lastDate = new Date(endDate);
            lastDate.setDate(lastDate.getDate() - i);
            date.add(dateToYYYYMMDD(new Date(lastDate)));
        }

        date.forEach(r => {
            let data = {
                key: r,
                value: 0
            }
            analysis.push(data);
        });

        erpOrderItem.forEach(r => {
            let date3 = dateToYYYYMMDD(r.channelOrderDate);
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

        let labels = analysis.map(r => dateToMMDD(r.key) + ' (' + getDayName(r.key) + ')');
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

    // 1 -2 판매 스토어 별 매출액
    const onActionCreateChannelRevenueGraphData = () => {
        let erpOrderItem = props.erpItemData.map(r => r.erpOrderItem);

        let date = [];
        let channel = new Set([]);
        let analysis = [];    

        let startDate = query.startDate;
        let endDate = query.endDate;

        let betweenDay = getBetweenDay(startDate, endDate);
        for(let i = 0; i < betweenDay; i++) {
            let lastDate = new Date(endDate);
            lastDate.setDate(lastDate.getDate() - i);
            date.push(dateToYYYYMMDD(new Date(lastDate)));
        }

        // 채널 추출
        erpOrderItem.forEach(r => channel.add(r.salesChannel));

        date.forEach(r => {
            let data = {};
            channel.forEach(r2 => {
                data = {
                    ...data,
                    key: r,
                    [r2]: 0
                }
            })

            analysis.push(data);
        })

        erpOrderItem.forEach(r => {
            let date = dateToYYYYMMDD(r.channelOrderDate);
            analysis = analysis.map(r2 => {
                if(r2.key === date) {
                    return {
                        ...r2,
                        [r.salesChannel]: parseInt(r2[r.salesChannel]) + parseInt(r.price) + parseInt(r.deliveryCharge)
                    }
                }else {
                    return r2;
                }
            })

        })

        analysis.reverse();
        let labels = analysis.map(r => dateToMMDD(r.key) + ' (' + getDayName(r.key) + ')');

        let channelRevenue = [];
        channel.forEach(r => {
            channelRevenue.push(analysis.map(r2 => r2[r]));
        })

        let datasets = [];
        let idx = 0;
        channel.forEach(r => {
            let color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
            let data = {
                // label: r,
                // data: channelRevenue[idx++],
                // backgroundColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
                // borderWidth: 1,
                // fill: true,
                // barThickness: 35
                label: r,
                data: channelRevenue[idx++],
                fill: false,
                borderColor:  color,
                backgroundColor: color,
                tension: 0.1
            }
            datasets.push(data);
        })

        dispatchRevenueGraphData({
            type: 'INIT_DATA',
            payload: {
                labels: labels,
                datasets: datasets
            }
        })
    }

    // 2. 총 주문건 & 수량
    const onActionCreateOrderAnalysisGraphData = () => {
        let erpOrderItem = props.erpItemData.map(r => r.erpOrderItem);

        let date = new Set([]);
        let analysis = [];

        let startDate = query.startDate;
        let endDate = query.endDate;

        let betweenDay = getBetweenDay(startDate, endDate);
        for(let i = 0; i < betweenDay; i++) {
            let lastDate = new Date(endDate);
            lastDate.setDate(lastDate.getDate() - i);
            date.add(dateToYYYYMMDD(new Date(lastDate)));
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
            let date3 = dateToYYYYMMDD(r.channelOrderDate);
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

        let labels = analysis.map(r => dateToMMDD(r.key) + ' (' + getDayName(r.key) + ')');
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

    // 2-2. 판매스토어 별 총 주문건 & 수량
    const onActionCreateChannelOrderAnalysisGraphData = () => {
        let erpOrderItem = props.erpItemData.map(r => r.erpOrderItem);

        let date = [];
        let channel = new Set([]);
        let analysis = [];    

        let startDate = query.startDate;
        let endDate = query.endDate;

        let betweenDay = getBetweenDay(startDate, endDate);
        for(let i = 0; i < betweenDay; i++) {
            let lastDate = new Date(endDate);
            lastDate.setDate(lastDate.getDate() - i);
            date.push(dateToYYYYMMDD(new Date(lastDate)));
        }

        // 채널 추출
        erpOrderItem.forEach(r => channel.add(r.salesChannel));

        date.forEach(r => {
            let data = {};
            channel.forEach(r2 => {
                data = {
                    ...data,
                    key: r,
                    [r2]: {
                        order: 0,
                        unit: 0
                    }
                }
            })

            analysis.push(data);
        })

        erpOrderItem.forEach(r => {
            let date = dateToYYYYMMDD(r.channelOrderDate);
            analysis = analysis.map(r2 => {
                if(r2.key === date) {
                    return {
                        ...r2,
                        [r.salesChannel]: {
                            order: parseInt(r2[r.salesChannel].order) + 1,
                            unit: parseInt(r2[r.salesChannel].unit) + parseInt(r.unit)
                        }
                    }
                }else {
                    return r2;
                }
            })
        })

        analysis.reverse();
        let labels = analysis.map(r => dateToMMDD(r.key) + ' (' + getDayName(r.key) + ')');

        let channelOrder = [];
        let channelUnit = [];
        channel.forEach(r => {
            channelOrder.push(analysis.map(r2 => r2[r].order));
            channelUnit.push(analysis.map(r2 => r2[r].unit));
        })

        // 주문건
        let datasets1 = [];
        let idx = 0;
        channel.forEach(r => {
            let data = {
                label: r,
                data: channelOrder[idx++],
                backgroundColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
                borderWidth: 1,
                fill: true,
                barThickness: 35
            }
            datasets1.push(data);
        })

        // 수량
        let datasets2 = [];
        idx = 0;
        channel.forEach(r => {
            let data = {
                label: r,
                data: channelUnit[idx++],
                backgroundColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
                borderWidth: 1,
                fill: true,
                barThickness: 35
            }
            datasets2.push(data);
        })
        
        dispatchDetailOrderAnalysisGraphData({
            type: 'INIT_DATA',
            payload: {
                order: {
                    labels: labels,
                    datasets: datasets1
                },
                unit: {
                    labels: labels,
                    datasets: datasets2
                }
            }
        })
    }

    // 3. 매출 BEST
    const onActionCreateTableData = () => {
        let erpOrderItem = props.erpItemData.map(r => r.erpOrderItem);

        let date = new Set([]);
        let analysis = [];

        let startDate = query.startDate;
        let endDate = query.endDate;

        let betweenDay = getBetweenDay(startDate, endDate);
        for(let i = 0; i < betweenDay; i++) {
            let lastDate = new Date(endDate);
            lastDate.setDate(lastDate.getDate() - i);
            date.add(dateToYYYYMMDD(new Date(lastDate)));
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
            let date3 = dateToYYYYMMDD(r.channelOrderDate);
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

        let totalOrder = 0;
        let totalUnit = 0;
        let totalRevenue = 0;
        analysis.forEach(r => {
            totalOrder += r.order;
            totalUnit += r.unit;
            totalRevenue += r.revenue;
        })

        let data = {
            key: '전체',
            revenue: totalRevenue,
            unit: totalUnit,
            order: totalOrder
        }
        analysis.push(data);

        analysis.sort((a, b) => b.revenue - a.revenue);
        
        dispatchTableData({
            type: 'INIT_DATA',
            payload: analysis
        })
    }

    return (
        <Container>
            <div className='graph-group'>
                <GraphTitleField
                    element={
                        (
                            <div>1. 총 매출액</div>
                        )
                    }
                ></GraphTitleField>
                <RevenueGraphFieldView
                    searchItem={props.searchItem}
                    revenueGraphData={revenueGraphData}
                ></RevenueGraphFieldView>
            </div>

            <div className='graph-group'>
                <GraphTitleField
                    element={
                        (
                            <div>2. 총 주문건 & 수량</div>
                        )
                    }
                ></GraphTitleField>
                <OrderAnalysisGraphFieldView
                    searchItem={props.searchItem}
                    orderAnalysisGraphData={orderAnalysisGraphData}
                    detailOrderAnalysisGraphData={detailOrderAnalysisGraphData}
                ></OrderAnalysisGraphFieldView>
            </div>

            <div className='graph-group'>
                <GraphTitleField
                    element={
                        (
                            <div>3. 매출 BEST</div>
                        )
                    }
                ></GraphTitleField>
                <TableFieldView
                    tableData={tableData}
                ></TableFieldView>
            </div>
        </Container>
    )
}

export default SalesPerformanceGraphComponent;

const initialRevenueGraphData = null;
const initialOrderAnalysisGraphData = null;
const initialDetailOrderAnalysisGraphData = null;
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

const detailOrderAnalysisGraphDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialDetailOrderAnalysisGraphData;
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

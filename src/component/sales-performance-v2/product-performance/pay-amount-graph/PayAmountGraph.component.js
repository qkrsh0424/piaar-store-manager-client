import { Container } from "./PayAmountGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphSummaryFieldView from "./view/GraphSummaryField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import { dateToYYYYMMDDAndDayName, getMonthAndSearchDateRange, getWeekNumberAndSearchDateRange } from "../../../../utils/dateFormatUtils";
import { GraphDataset, setAnalysisResultText } from "../../../../utils/graphDataUtils";
import { toPriceUnitFormat } from "../../../../utils/numberFormatUtils";
import _ from "lodash";

const SALES_GRAPH_BG_COLOR = ['#B9B4EB', '#F0B0E8', '#80A9E1', '#FFAFCC', '#F9F871', '#F1EDFF', '#80A9E1', '#70dbc2', '#D5CABD', '#389091'];

// 판매스토어별 총 매출액
export default function PayAmountGraphComponent(props) {
    const [salesPayAmountGraphData, setSalesPayAmountGraphData] = useState(null);
    const [totalPayAmountGraphData, setTotalPayAmountGraphData] = useState(null);

    const [salesSummaryData, setSalesSummaryData] = useState(null);
    const [graphOption, setGraphOption] = useState(null);
    
    useEffect(() => {
        if(!props.selectedOptions) {
            return;
        }

        if (!props.searchDimension) {
            return;
        }

        if(!props.searchDataControl) {
            return;
        }

        if (!props.payAmount) {
            __handle.action.resetGraphData();
            return;
        }

        if(props.searchDataControl === 'product') {
            __handle.action.createGraphDataByProduct();
        }else if(props.searchDataControl === 'option') {
            __handle.action.createGraphDataByOption();
        }
        __handle.action.createGraphOption();
    }, [props.selectedOptions, props.payAmount, props.searchDimension, props.searchDataControl])

    const __handle = {
        action: {
            resetGraphData: () => {
                setSalesPayAmountGraphData(null);
                setTotalPayAmountGraphData(null);
                setSalesSummaryData(null);
            },
            createGraphDataByProduct: () => {
                let salesPayAmountData = [];
                let orderPayAmountData = [];
                let salesDatasets = [];
                let orderDatasets = [];
                let graphLabels = new Set([]);
                let searchProduct = [...new Set(props.selectedOptions.map(r => JSON.stringify(r.product)))].map(r => JSON.parse(r));
                
                // 검색날짜 최소, 최대값
                let minimumDate = props.payAmount[0].datetime;
                let maximumDate = props.payAmount.slice(-1)[0].datetime;

                props.payAmount.forEach(data => {
                    let datetime = dateToYYYYMMDDAndDayName(data.datetime);
                    if(props.searchDimension === 'week') {
                        datetime = getWeekNumberAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                    }else if(props.searchDimension === 'month') {
                        datetime = getMonthAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                    }
                    graphLabels.add(datetime);
                })

                // 상품별 매출액 계산
                let payAmountData = props.payAmount.map(r => {
                    let salesPerformances = [];
                    r.performances.forEach(r2 => {
                        let data = salesPerformances?.filter(r3 => r3.productCode === r2.productCode)[0];

                        if(data) {
                            salesPerformances = salesPerformances.map(r3 => {
                                if(r3.productCode === r2.productCode) {
                                    return {
                                        productCode: r3.productCode,
                                        productDefaultName: r3.productDefaultName,
                                        salesPayAmount: r3.salesPayAmount + r2.salesPayAmount,
                                        orderPayAmount: r3.orderPayAmount + r2.orderPayAmount
                                    }
                                }else {
                                    return r3;
                                }
                            })
                        }else {
                            let data = {
                                productCode: r2.productCode,
                                productDefaultName: r2.productDefaultName,
                                salesPayAmount: r2.salesPayAmount,
                                orderPayAmount: r2.orderPayAmount
                            }
                            salesPerformances.push(data)
                        }
                    })

                    return {
                        ...r,
                        performances: salesPerformances
                    }
                })


                searchProduct.forEach(r => {
                    let salesPayAmount = [];
                    let orderPayAmount = [];
                    let dateValue = new Set([]);

                    payAmountData.forEach(data => {
                        let datetime = dateToYYYYMMDDAndDayName(data.datetime);
                        if (props.searchDimension === 'week') {
                            datetime = getWeekNumberAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                        } else if (props.searchDimension === 'month') {
                            datetime = getMonthAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                        }

                        let performance = data.performances?.filter(r3 => r3.productCode === r.code)[0];
                        let salesValue = performance?.salesPayAmount || 0;
                        let orderValue = performance?.orderPayAmount || 0;
                        if (dateValue.has(datetime)) {
                            salesPayAmount[salesPayAmount.length - 1] += salesValue;
                            orderPayAmount[orderPayAmount.length - 1] += orderValue;
                        } else {
                            dateValue.add(datetime);
                            salesPayAmount.push(salesValue);
                            orderPayAmount.push(orderValue);
                        }
                    })

                    salesPayAmountData.push(salesPayAmount);
                    orderPayAmountData.push(orderPayAmount);
                })

                let graphColor = SALES_GRAPH_BG_COLOR;
                for (let i = SALES_GRAPH_BG_COLOR.length; i < props.selectedOptions.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                // 판매 그래프 데이터 세팅
                if(searchProduct.size === 0) {
                    let lineGraphOfOrder = {
                        ...new GraphDataset().toJSON(),
                        label: '주문 매출액',
                        data: [],
                        type: 'line',
                        fill: false,
                        borderColor: graphColor[0],
                        backgroundColor: graphColor[0],
                        order: -1,
                        pointRadius: 2
                    }
                    let barGraphOfSales = {
                        ...new GraphDataset().toJSON(),
                        type: 'bar',
                        label: '판매 매출액',
                        data: [],
                        borderColor: graphColor[0],
                        backgroundColor: graphColor[0],
                        borderWidth: 0,
                        order: 0
                    }
                    orderDatasets.push(lineGraphOfOrder);
                    salesDatasets.push(barGraphOfSales);
                } else {
                    searchProduct.forEach((r, idx) => {
                        let lineGraphOfOrder = {
                            ...new GraphDataset().toJSON(),
                            type: 'line',
                            label: '(주문) ' + r.defaultName,
                            fill: false,
                            data: orderPayAmountData[idx],
                            borderColor: graphColor[idx] + '88',
                            backgroundColor: graphColor[idx] + '88',
                            order: -1,
                            pointRadius: 2
                        }
                        let barGraphOfSales = {
                            ...new GraphDataset().toJSON(),
                            type: 'bar',
                            label: r.defaultName,
                            data: salesPayAmountData[idx],
                            borderColor: graphColor[idx],
                            backgroundColor: graphColor[idx],
                            borderWidth: 0,
                            order: 0
                        }
                        orderDatasets.push(lineGraphOfOrder);
                        salesDatasets.push(barGraphOfSales);
                    })
                }

                // 매출 그래프 데이터 생성
                let createdSalesGraph = {
                    labels: [...graphLabels],
                    datasets: [...salesDatasets]
                }
                let createdTotalGraph = {
                    labels: [...graphLabels],
                    datasets: [...salesDatasets, ...orderDatasets]
                }

                setSalesPayAmountGraphData(createdSalesGraph);
                setTotalPayAmountGraphData(createdTotalGraph);
                
                // 매출 그래프 요약 데이터 생성
                __handle.action.createSalesSummary(salesDatasets);
            },
            createGraphDataByOption: () => {
                let salesPayAmountData = [];
                let orderPayAmountData = [];
                let salesDatasets = [];
                let orderDatasets = [];
                let graphLabels = new Set([]);
                let minimumDate = props.payAmount[0].datetime;
                let maximumDate = props.payAmount.slice(-1)[0].datetime;

                props.payAmount.forEach(data => {
                    let datetime = dateToYYYYMMDDAndDayName(data.datetime);
                    if(props.searchDimension === 'week') {
                        datetime = getWeekNumberAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                    }else if(props.searchDimension === 'month') {
                        datetime = getMonthAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                    }
                    graphLabels.add(datetime);
                })

                props.selectedOptions.forEach(r => {
                    let salesPayAmount = [];
                    let orderPayAmount = [];
                    let dateValue = new Set([]);

                    props.payAmount.forEach(data => {
                        let datetime = dateToYYYYMMDDAndDayName(data.datetime);
                        if (props.searchDimension === 'week') {
                            datetime = getWeekNumberAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                        } else if (props.searchDimension === 'month') {
                            datetime = getMonthAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                        }

                        let performance = data.performances?.filter(r3 => r3.optionCode === r.option.code)[0];
                        let salesValue = performance?.salesPayAmount || 0;
                        let orderValue = performance?.orderPayAmount || 0;
                        if (dateValue.has(datetime)) {
                            salesPayAmount[salesPayAmount.length - 1] += salesValue;
                            orderPayAmount[orderPayAmount.length - 1] += orderValue;
                        } else {
                            dateValue.add(datetime);
                            salesPayAmount.push(salesValue);
                            orderPayAmount.push(orderValue);
                        }
                    })

                    salesPayAmountData.push(salesPayAmount);
                    orderPayAmountData.push(orderPayAmount);
                })

                let graphColor = SALES_GRAPH_BG_COLOR;
                for (let i = SALES_GRAPH_BG_COLOR.length; i < props.selectedOptions.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                // 판매 그래프 데이터 세팅
                if(props.selectedOptions.size === 0) {
                    let lineGraphOfOrder = {
                        ...new GraphDataset().toJSON(),
                        label: '주문 매출액',
                        data: [],
                        type: 'line',
                        fill: false,
                        borderColor: graphColor[0],
                        backgroundColor: graphColor[0],
                        order: -1,
                        pointRadius: 2
                    }
                    let barGraphOfSales = {
                        ...new GraphDataset().toJSON(),
                        type: 'bar',
                        label: '판매 매출액',
                        data: [],
                        borderColor: graphColor[0],
                        backgroundColor: graphColor[0],
                        borderWidth: 0,
                        order: 0
                    }
                    orderDatasets.push(lineGraphOfOrder);
                    salesDatasets.push(barGraphOfSales);
                } else {
                    props.selectedOptions.forEach((r, idx) => {
                        let label = props.searchDataControl === 'option' ? r.product.defaultName + " ["+ r.option.defaultName + "]" : r.product.defaultName
                        let lineGraphOfOrder = {
                            ...new GraphDataset().toJSON(),
                            type: 'line',
                            label: '(주문) ' + label,
                            fill: false,
                            data: orderPayAmountData[idx],
                            borderColor: graphColor[idx] + '88',
                            backgroundColor: graphColor[idx] + '88',
                            order: -1,
                            pointRadius: 2
                        }
                        let barGraphOfSales = {
                            ...new GraphDataset().toJSON(),
                            type: 'bar',
                            label: label,
                            data: salesPayAmountData[idx],
                            borderColor: graphColor[idx],
                            backgroundColor: graphColor[idx],
                            borderWidth: 0,
                            order: 0
                        }
                        orderDatasets.push(lineGraphOfOrder);
                        salesDatasets.push(barGraphOfSales);
                    })
                }

                // 매출 그래프 데이터 생성
                let createdSalesGraph = {
                    labels: [...graphLabels],
                    datasets: [...salesDatasets]
                }
                let createdTotalGraph = {
                    labels: [...graphLabels],
                    datasets: [...salesDatasets, ...orderDatasets]
                }

                setSalesPayAmountGraphData(createdSalesGraph);
                setTotalPayAmountGraphData(createdTotalGraph);
                
                // // 매출 그래프 요약 데이터 생성
                __handle.action.createSalesSummary(salesDatasets);
            },
            createSalesSummary: (data) => {
                let salesData = setAnalysisResultText(data);

                // 매출액 내림차순으로 정렬
                salesData = _.sortBy(salesData, 'value').reverse();
                setSalesSummaryData(salesData);
            },
            createGraphOption: () => {
                let option = {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                    scales: {
                        y: {
                            ticks: {
                                callback: function (value, index, ticks) {
                                    return toPriceUnitFormat(value);
                                }
                            }
                        }
                    }
                }

                setGraphOption(option);
            }
        }
    }

    return (
        <>
            <Container>
                <GraphBoardFieldView />
                <div className='content-box'>
                    <GraphBodyFieldView
                        totalPayAmountGraphData={props.checkedSwitch ? totalPayAmountGraphData : salesPayAmountGraphData}
                        graphOption={graphOption}
                    />
                    <GraphSummaryFieldView
                        summaryData={salesSummaryData}
                    />
                </div>
            </Container>
        </>
    )
}
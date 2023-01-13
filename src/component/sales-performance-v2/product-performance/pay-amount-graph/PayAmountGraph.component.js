import { Container } from "./PayAmountGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphSummaryFieldView from "./view/GraphSummaryField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import { dateToYYYYMM, getWeekNumber } from "../../../../utils/dateFormatUtils";
import { dateToYYMMDDAndDayName, GraphDataset, setAnalysisResultText } from "../../../../utils/graphDataUtils";
import { toPriceUnitFormat } from "../../../../utils/numberFormatUtils";

const SALES_GRAPH_BG_COLOR = ['#4975A9', '#ffca9f', '#FF7FAB', '#80A9E1', '#f9f871', '#D678CD', '#B9B4EB', '#70dbc2', '#D5CABD', '#389091'];

// 판매스토어별 총 매출액
export default function PayAmountGraphComponent(props) {

    const [salesPayAmountGraphData, setSalesPayAmountGraphData] = useState(null);
    const [totalPayAmountGraphData, setTotalPayAmountGraphData] = useState(null);

    const [salesSummaryData, setSalesSummaryData] = useState(null);

    const [payAmountGraphOption, setPayAmountGraphOption] = useState(null);
    
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

        if (!(props.payAmount && props.payAmount.length > 0)) {
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
                setTotalPayAmountGraphData(null);
                setSalesPayAmountGraphData(null);
                setSalesSummaryData(null);
                setPayAmountGraphOption(null);
            },
            createGraphDataByProduct: () => {
                let salesPayAmountData = [];
                let orderPayAmountData = [];
                let salesDatasets = [];
                let orderDatasets = [];
                let graphLabels = new Set([]);
                let searchProduct = [...new Set(props.selectedOptions.map(r => JSON.stringify(r.product)))].map(r => JSON.parse(r));

                // 상품별 매출액 계산
                let payAmountData = props.payAmount.map(r => {
                    let salesPerformances = [];
                    r.performances.forEach(r2 => {
                        let data = salesPerformances.filter(r3 => r3.productCode === r2.productCode)[0];

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
                
                for (let i = 0; i < payAmountData.length; i++) {
                    let datetime = dateToYYMMDDAndDayName(payAmountData[i].datetime);
                    if (props.searchDimension === 'week') {
                        datetime = dateToYYYYMM(payAmountData[i].datetime) + '-' + getWeekNumber(payAmountData[i].datetime) + '주차';
                    } else if (props.searchDimension === 'month') {
                        datetime = dateToYYYYMM(payAmountData[i].datetime);
                    }
                    graphLabels.add(datetime);
                }

                searchProduct.forEach(r => {
                    let salesPayAmount = [];
                    let orderPayAmount = [];
                    let dateValue = new Set([]);

                    for (let i = 0; i < payAmountData.length; i++) {
                        let data = payAmountData[i];
                        let datetime = dateToYYMMDDAndDayName(data.datetime);
                        if (props.searchDimension === 'week') {
                            datetime = dateToYYYYMM(data.datetime) + '-' + getWeekNumber(data.datetime) + '주차';
                        } else if (props.searchDimension === 'month') {
                            datetime = dateToYYYYMM(data.datetime);
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
                    }

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
                    salesDatasets.push(barGraphOfSales);
                } else {
                    searchProduct.forEach((r, idx) => {
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
                        salesDatasets.push(barGraphOfSales);
                    })
                }

                // 주문 그래프 데이터 세팅
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
                    orderDatasets.push(lineGraphOfOrder);
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
                        orderDatasets.push(lineGraphOfOrder);
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
                let salesData = setAnalysisResultText(salesDatasets);

                // // 매출액 내림차순으로 정렬
                salesData.sort((a, b) => b.value - a.value);
                setSalesSummaryData(salesData);
            },
            createGraphDataByOption: () => {
                let salesPayAmountData = [];
                let orderPayAmountData = [];
                let salesDatasets = [];
                let orderDatasets = [];
                let graphLabels = new Set([]);

                for (let i = 0; i < props.payAmount.length; i++) {
                    let datetime = dateToYYMMDDAndDayName(props.payAmount[i].datetime);
                    if (props.searchDimension === 'week') {
                        datetime = dateToYYYYMM(props.payAmount[i].datetime) + '-' + getWeekNumber(props.payAmount[i].datetime) + '주차';
                    } else if (props.searchDimension === 'month') {
                        datetime = dateToYYYYMM(props.payAmount[i].datetime);
                    }
                    graphLabels.add(datetime);
                }

                props.selectedOptions.forEach(r => {
                    let salesPayAmount = [];
                    let orderPayAmount = [];
                    let dateValue = new Set([]);

                    for (let i = 0; i < props.payAmount.length; i++) {
                        let data = props.payAmount[i];
                        let datetime = dateToYYMMDDAndDayName(data.datetime);
                        if (props.searchDimension === 'week') {
                            datetime = dateToYYYYMM(data.datetime) + '-' + getWeekNumber(data.datetime) + '주차';
                        } else if (props.searchDimension === 'month') {
                            datetime = dateToYYYYMM(data.datetime);
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
                    }

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
                    salesDatasets.push(barGraphOfSales);
                } else {
                    props.selectedOptions.forEach((r, idx) => {
                        let label = props.searchDataControl === 'option' ? r.product.defaultName + " ["+ r.option.defaultName + "]" : r.product.defaultName
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
                        salesDatasets.push(barGraphOfSales);
                    })
                }

                // 주문 그래프 데이터 세팅
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
                    orderDatasets.push(lineGraphOfOrder);
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
                        orderDatasets.push(lineGraphOfOrder);
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
                let salesData = setAnalysisResultText(salesDatasets);

                // // 매출액 내림차순으로 정렬
                salesData.sort((a, b) => b.value - a.value);
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

                setPayAmountGraphOption(option);
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
                        payAmountGraphOption={payAmountGraphOption}
                    />
                    <GraphSummaryFieldView
                        summaryData={salesSummaryData}
                    />
                </div>
            </Container>
        </>
    )
}
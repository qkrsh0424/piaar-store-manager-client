import { Container } from "./PayAmountGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphSummaryFieldView from "./view/GraphSummaryField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import { dateToYYYYMM, getWeekNumber } from "../../../../utils/dateFormatUtils";
import { dateToYYMMDDAndDayName, GraphDataset, setAnalysisResultText } from "../../../../utils/graphDataUtils";

const SALES_CHNNAEL_GRAPH_BG_COLOR = ['#4975A9', '#80A9E1', '#D678CD', '#FF7FAB', '#FF9D83', '#FFCA67', '#B9B4EB', '#00C894', '#D5CABD', '#389091', '#95C477'];

// 판매스토어별 총 매출액
export default function PayAmountGraphComponent(props) {

    const [salesPayAmountGraphData, setSalesPayAmountGraphData] = useState(null);
    const [totalPayAmountGraphData, setTotalPayAmountGraphData] = useState(null);

    const [salesSummaryData, setSalesSummaryData] = useState(null);

    const [payAmountGraphOption, setPayAmountGraphOption] = useState(null);

    useEffect(() => {
        __handle.action.resetGraphData();
    }, [props.salesChannel])
    
    useEffect(() => {
        if (!props.selectedChannel) {
            __handle.action.resetGraphData();
            return;
        }

        if (!props.searchDimension) {
            return;
        }

        if (!(props.payAmount && props.payAmount.length > 0)) {
            __handle.action.resetGraphData();
            return;
        }

        __handle.action.createGraphData();
        __handle.action.createGraphOption();
    }, [props.selectedChannel, props.payAmount, props.searchDimension])

    const __handle = {
        action: {
            resetGraphData: () => {
                setTotalPayAmountGraphData(null);
                setSalesPayAmountGraphData(null);
                setSalesSummaryData(null);
                setPayAmountGraphOption(null);
            },
            createGraphData: () => {
                let salesPayAmountData = [];
                let orderPayAmountData = [];
                let salesDatasets = [];
                let orderDatasets = [];
                let graphLabels = new Set([]);
                let channel = [...props.selectedChannel];

                for (let i = 0; i < props.payAmount.length; i++) {
                    let datetime = dateToYYMMDDAndDayName(props.payAmount[i].datetime);
                    if (props.searchDimension === 'week') {
                        datetime = dateToYYYYMM(props.payAmount[i].datetime) + '-' + getWeekNumber(props.payAmount[i].datetime) + '주차';
                    } else if (props.searchDimension === 'month') {
                        datetime = dateToYYYYMM(props.payAmount[i].datetime);
                    }
                    graphLabels.add(datetime);
                }

                channel.forEach(r => {
                    let salesPayAmount = [];
                    let orderPayAmount = [];
                    let dateValue = new Set([]);

                    for(let i = 0; i < props.payAmount.length; i++) {
                        let data = props.payAmount[i];
                        let datetime = dateToYYMMDDAndDayName(data.datetime);
                        if (props.searchDimension === 'week') {
                            datetime = dateToYYYYMM(data.datetime) + '-' + getWeekNumber(data.datetime) + '주차';
                        } else if (props.searchDimension === 'month') {
                            datetime = dateToYYYYMM(data.datetime);
                        }
                        
                        let performance = data.performances?.filter(r3 => r3.salesChannel === r)[0];
                        let salesValue = performance?.salesPayAmount || 0;
                        let orderValue = performance?.orderPayAmount || 0;
                        if(dateValue.has(datetime)) {
                            salesPayAmount[salesPayAmount.length - 1] += salesValue;
                            orderPayAmount[orderPayAmount.length - 1] += orderValue;
                        }else {
                            dateValue.add(datetime);
                            salesPayAmount.push(salesValue);
                            orderPayAmount.push(orderValue);
                        }
                    }

                    salesPayAmountData.push(salesPayAmount);
                    orderPayAmountData.push(orderPayAmount);
                })
                
                let graphColor = SALES_CHNNAEL_GRAPH_BG_COLOR;
                for (let i = SALES_CHNNAEL_GRAPH_BG_COLOR.length; i < channel.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                // 판매 그래프 데이터 세팅
                if(channel.size === 0) {
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
                    channel.forEach((r, idx) => {
                        let barGraphOfSales = {
                            ...new GraphDataset().toJSON(),
                            type: 'bar',
                            label: r,
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
                if(channel.size === 0) {
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
                    channel.forEach((r, idx) => {
                        let lineGraphOfOrder = {
                            ...new GraphDataset().toJSON(),
                            type: 'line',
                            label: '(주문) ' + r,
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
                    datasets: salesDatasets
                }
                let createdTotalGraph = {
                    labels: [...graphLabels],
                    datasets: [...salesDatasets, ...orderDatasets]
                }

                setSalesPayAmountGraphData(createdSalesGraph);
                setTotalPayAmountGraphData(createdTotalGraph);
                
                // 매출 그래프 요약 데이터 생성
                let salesData = setAnalysisResultText(salesDatasets);

                // 매출액 내림차순으로 정렬
                salesData.sort((a, b) => b.value - a.value);
                setSalesSummaryData(salesData);
            },
            createGraphOption: () => {
                let option = {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'index',
                        intersect: true,
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
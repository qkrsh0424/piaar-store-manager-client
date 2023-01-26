import { useEffect, useState } from "react";
import { GraphDataset, setAnalysisResultText } from "../../../../../utils/graphDataUtils";
import { toPriceUnitFormat } from "../../../../../utils/numberFormatUtils";
import { Container } from "./ChannelPerformanceGraph.styled";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphSummaryFieldView from "./view/GraphSummaryField.view";

// 그래프 기본 3가지 색상 : [주문, 판매, 평균]
const SALES_GRAPH_BG_COLOR = ['#4975A9', '#ffca9f', '#FF7FAB', '#80A9E1', '#f9f871', '#D678CD', '#B9B4EB', '#70dbc2', '#D5CABD', '#389091'];

export default function ChannelPerformanceGraphComponent(props) {
    const [salesPayAmountGraphData, setSalesPayAmountGraphData] = useState(null);
    const [totalPayAmountGraphData, setTotalPayAmountGraphData] = useState(null);
    
    const [salesSummaryData, setSalesSummaryData] = useState(null);
    const [totalSummaryData, setTotalSummaryData] = useState(null);
    
    const [totalPayAmountGraphOption, setTotalPayAmountGraphOption] = useState(null);

    useEffect(() => {
        if(!props.searchDimension) {
            return;
        }

        if(!props.selectedOptions) {
            return;
        }

        if(!(props.performance && props.performance.length > 0)) {
            __handle.action.resetGraphData();
            return;
        }

        __handle.action.createGraphData();
    }, [props.performance, props.searchDimension, props.selectedOptions])

    useEffect(() => {
        if(!(totalSummaryData && salesSummaryData)) {
            return;
        }

        __handle.action.createGraphOption();
    }, [totalSummaryData, salesSummaryData])

    const __handle = {
        action: {
            resetGraphData: () => {
                setTotalPayAmountGraphData(null);
                setTotalSummaryData(null);
                setSalesPayAmountGraphData(null);
                setSalesSummaryData(null);
                setTotalPayAmountGraphOption(null);
            },
            createGraphData: () => {
                let searchChannelPerformance = [...new Set(props.performance.map(r => r.salesChannel))].map(channel => {
                    return {
                        salesChannel: channel,
                        salesPayAmount: 0,
                        orderPayAmount: 0
                    }
                });
                let selectedOptionCodes = props.selectedOptions?.map(r => r.code) ?? [];
                let searchOptionPerformance = props.performance.filter(r => selectedOptionCodes.includes(r.optionCode));

                searchOptionPerformance.forEach(r => {
                    searchChannelPerformance = searchChannelPerformance.map(channelData => {
                        if(r.salesChannel === channelData.salesChannel) {
                            return {
                                ...channelData,
                                salesPayAmount: channelData.salesPayAmount + r.salesPayAmount,
                                orderPayAmount: channelData.orderPayAmount + r.orderPayAmount
                            }
                        }else {
                            return channelData;
                        }
                    })
                })

                let salesPayAmountData = searchChannelPerformance.map(r => r.salesPayAmount);
                let orderPayAmountData = searchChannelPerformance.map(r => r.orderPayAmount);
                let graphLabels = searchChannelPerformance.map(r => r.salesChannel);
                

                let graphColor = SALES_GRAPH_BG_COLOR;
                for (let i = SALES_GRAPH_BG_COLOR.length; i < searchChannelPerformance.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                let barGraphOfSales = {};
                let lineGraphOfOrder = {};
                // 판매 그래프 데이터 세팅
                if(graphLabels.size === 0) {
                    barGraphOfSales = {
                        ...new GraphDataset().toJSON(),
                        type: 'bar',
                        label: '판매 매출액',
                        data: [],
                        borderColor: graphColor,
                        backgroundColor: graphColor,
                        borderWidth: 0,
                        order: 0
                    }
                } else {
                    barGraphOfSales = {
                        ...new GraphDataset().toJSON(),
                        type: 'bar',
                        label: '판매 매출액',
                        data: salesPayAmountData,
                        borderColor: graphColor,
                        backgroundColor: graphColor,
                        borderWidth: 0,
                        order: 0
                    }
                }

                if(graphLabels.size === 0) {
                    lineGraphOfOrder = {
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
                } else {
                    lineGraphOfOrder = {
                        ...new GraphDataset().toJSON(),
                        type: 'line',
                        label: '주문 매출액',
                        data: orderPayAmountData,
                        borderColor: graphColor,
                        backgroundColor: graphColor,
                        borderWidth: 0,
                        order: 0
                    }
                }

                // 매출 그래프 데이터 생성
                let createdSalesGraph = {
                    labels: [...graphLabels],
                    datasets: [barGraphOfSales]
                }
                let createdTotalGraph = {
                    labels: [...graphLabels],
                    datasets: [barGraphOfSales, lineGraphOfOrder]
                }

                setSalesPayAmountGraphData(createdSalesGraph);
                setTotalPayAmountGraphData(createdTotalGraph);
                
                // 매출 그래프 요약 데이터 생성
                let salesData = setAnalysisResultText([barGraphOfSales]);
                let data = setAnalysisResultText([barGraphOfSales, lineGraphOfOrder]);
                
                setSalesSummaryData(salesData);
                setTotalSummaryData(data);
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

                setTotalPayAmountGraphOption(option);
            }
        }
    }

    return (
        <Container>
            <GraphBoardFieldView />
            <div className='content-box'>
                <GraphBodyFieldView
                    totalPayAmountGraphData={props.checkedSwitch ? totalPayAmountGraphData : salesPayAmountGraphData}
                    totalPayAmountGraphOption={totalPayAmountGraphOption}
                />
                <GraphSummaryFieldView
                    summaryData={props.checkedSwitch ? totalSummaryData : salesSummaryData}
                />
            </div>
        </Container>
    )
}
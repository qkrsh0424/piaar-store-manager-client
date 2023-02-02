import { Container } from "./PayAmountGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphSummaryFieldView from "./view/GraphSummaryField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import { dateToYYYYMMDDAndDayName, getDateFormatByGraphDateLabel, getEndDate, getMonthAndSearchDateRange,getStartDate, getWeekNumber, getWeekNumberAndSearchDateRange } from "../../../../../utils/dateFormatUtils";
import { GraphDataset, setAnalysisResultText } from "../../../../../utils/graphDataUtils";
import { toPriceUnitFormat } from "../../../../../utils/numberFormatUtils";
import _ from "lodash";

// 그래프 기본 3가지 색상 : [주문, 판매, 평균]
const DEFAULT_GRAPH_BG_2COLOR = ['#ADA8C3', '#C0C5DC', '#596dd3'];

export default function PayAmountGraphComponent(props) {
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
                let salesPayAmountData = [];
                let orderPayAmountData = [];
                let graphLabels = new Set([]);
                let minimumDate = props.performance[0].datetime;
                let maximumDate = props.performance[props.performance.length - 1].datetime;
                let selectedOptionCodes = props.selectedOptions?.map(r => r.code) ?? [];

                let searchPerformance = props.performance.map(r => {
                    let searchData = r.performances.filter(r => selectedOptionCodes.includes(r.optionCode));
                    let salesPayAmount = _.sumBy(searchData, 'salesPayAmount');
                    let orderPayAmount = _.sumBy(searchData, 'orderPayAmount');

                    return {
                        datetime: r.datetime,
                        salesPayAmount,
                        orderPayAmount
                    }
                });

                for(let i = 0; i < searchPerformance.length; i++) {
                    let datetime = dateToYYYYMMDDAndDayName(searchPerformance[i].datetime);
                    if(props.searchDimension === 'week') {
                        datetime = getWeekNumberAndSearchDateRange(searchPerformance[i].datetime, minimumDate, maximumDate);
                    }else if(props.searchDimension === 'month') {
                        datetime = getMonthAndSearchDateRange(searchPerformance[i].datetime, minimumDate, maximumDate);
                    }

                    if(graphLabels.has(datetime)) {
                        salesPayAmountData[salesPayAmountData.length - 1] += searchPerformance[i].salesPayAmount;
                        orderPayAmountData[orderPayAmountData.length - 1] += searchPerformance[i].orderPayAmount;
                    }else {
                        graphLabels.add(datetime);
                        salesPayAmountData.push(searchPerformance[i].salesPayAmount);
                        orderPayAmountData.push(searchPerformance[i].orderPayAmount);
                    }
                }

                let barGraphOfSales = {
                    ...new GraphDataset().toJSON(),
                    type: 'bar',
                    label: '판매 매출액',
                    data: salesPayAmountData,
                    fill: false,
                    borderColor: DEFAULT_GRAPH_BG_2COLOR[1],
                    backgroundColor: DEFAULT_GRAPH_BG_2COLOR[1],
                    borderWidth: 0,
                    order: 0
                }

                let lineGraphOfOrder = {
                    ...new GraphDataset().toJSON(),
                    type: 'line',
                    label: '주문 매출액',
                    data: orderPayAmountData,
                    fill: false,
                    borderColor: DEFAULT_GRAPH_BG_2COLOR[0] + '88',
                    backgroundColor: DEFAULT_GRAPH_BG_2COLOR[0] + '88',
                    order: -1,
                    pointRadius: 2
                }

                // 판매매출액 7일간 평균 데이터 생성
                // 조회된 기간의 시작날짜부터 7일간 null로 채운다
                let salesPayAmountAvgData = Array(7).fill(null, 0, 7);
                for (let i = 7; i <= salesPayAmountData.length; i++) {
                    let avg = parseInt(salesPayAmountData.slice(i - 7, i).reduce((a, b) => a + b) / 7);
                    salesPayAmountAvgData.push(avg);
                }

                // 판매매출액 7일간 평균 그래프 데이터 생성
                let lineGraphOfSalesAvg = {
                    ...new GraphDataset().toJSON(),
                    type: 'line',
                    label: '판매 매출액 7일간 평균',
                    data: salesPayAmountAvgData,
                    fill: false,
                    borderColor: DEFAULT_GRAPH_BG_2COLOR[2],
                    backgroundColor: DEFAULT_GRAPH_BG_2COLOR[2],
                    order: -2,
                    borderDash: [3, 3]
                }
                
                // 매출 그래프 데이터 생성
                let createdSalesGraph = {
                    labels: [...graphLabels],
                    datasets: [barGraphOfSales, lineGraphOfSalesAvg]
                }
                let createdTotalGraph = {
                    labels: [...graphLabels],
                    datasets: [barGraphOfSales, lineGraphOfOrder, lineGraphOfSalesAvg]
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
            <GraphBoardFieldView
            />
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
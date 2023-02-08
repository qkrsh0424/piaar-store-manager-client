import { Container } from "./PayAmountGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphSummaryFieldView from "./view/GraphSummaryField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import { dateToYYYYMMDDAndDayName, getDateFormatByGraphDateLabel, getEndDate, getMonthAndSearchDateRange, getSearchEndDateByMonth, getSearchEndDateByWeekNumber, getSearchStartDateByMonth, getSearchStartDateByWeekNumber, getStartDate, getWeekNumber, getWeekNumberAndSearchDateRange } from "../../../../utils/dateFormatUtils";
import { GraphDataset, setAnalysisResultText } from "../../../../utils/graphDataUtils";
import { toPriceUnitFormat } from "../../../../utils/numberFormatUtils";

// 그래프 기본 3가지 색상 : [주문, 판매, 평균]
const DEFAULT_GRAPH_BG_2COLOR = ['#ADA8C3', '#C0C5DC', '#596dd3'];

export default function PayAmountGraphComponent(props) {
    const [salesPayAmountGraphData, setSalesPayAmountGraphData] = useState(null);
    const [totalPayAmountGraphData, setTotalPayAmountGraphData] = useState(null);
    
    const [salesSummaryData, setSalesSummaryData] = useState(null);
    const [totalSummaryData, setTotalSummaryData] = useState(null);
    
    const [graphOption, setGraphOption] = useState(null);
    const [graphLabels, setGraphLabels] = useState(null);

    useEffect(() => {
        if(!props.searchDimension) {
            return;
        }

        if(!props.performance) {
            return;
        }

        __handle.action.createGraphData();
    }, [props.performance, props.searchDimension])

    useEffect(() => {
        if(!(totalSummaryData && salesSummaryData)) {
            return;
        }

        __handle.action.createGraphOption();
    }, [totalSummaryData, salesSummaryData])

    const __handle = {
        action: {
            createGraphData: () => {
                let salesPayAmountData = [];
                let orderPayAmountData = [];
                let graphLabels = new Set([]);

                // 날짜 최소값, 최대값 설정
                let minimumDate = props.performance[0].datetime;
                let maximumDate = props.performance.slice(-1)[0].datetime;

                props.performance.forEach(data => {
                    let datetime = dateToYYYYMMDDAndDayName(data.datetime);
                    if(props.searchDimension === 'week') {
                        datetime = getWeekNumberAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                    }else if(props.searchDimension === 'month') {
                        datetime = getMonthAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                    }

                    graphLabels.add(datetime);
                    salesPayAmountData.push(data.salesPayAmount);
                    orderPayAmountData.push(data.orderPayAmount);
                })

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
                
                // 판매, 판매평균 그래프 데이터 생성
                let createdSalesGraph = {
                    labels: [...graphLabels],
                    datasets: [barGraphOfSales, lineGraphOfSalesAvg]
                }
                // 주문, 판매, 판매평균 그래프 데이터 생성
                let createdTotalGraph = {
                    labels: [...graphLabels],
                    datasets: [barGraphOfSales, lineGraphOfOrder, lineGraphOfSalesAvg]
                }
                setSalesPayAmountGraphData(createdSalesGraph);
                setTotalPayAmountGraphData(createdTotalGraph);
                setGraphLabels([...graphLabels]);

                // 매출 그래프 요약 데이터 생성
                __handle.action.createSalesSummary([barGraphOfSales]);
                __handle.action.createTotalSummart([barGraphOfSales, lineGraphOfOrder]);
            },
            createSalesSummary: (data) => {
                let salesSummary = setAnalysisResultText(data);
                setSalesSummaryData(salesSummary);
            },
            createTotalSummart: (data) => {
                let totalSummary = setAnalysisResultText(data);
                setTotalSummaryData(totalSummary);
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
                    },
                    onClick: function (e, item) {
                        __handle.action.setGraphClickOption(e, item);
                    },
                    onHover: (e, item) => {
                        const target = e.native ? e.native.target : e.target;
                        target.style.cursor = item[0] ? 'pointer' : 'default';
                    }
                }

                setGraphOption(option);
            },
            setGraphClickOption: (e, item) => {
                if(item.length === 0) return;

                var itemIdx = item[0].index;
                var label = graphLabels[itemIdx];
                var date = getDateFormatByGraphDateLabel(label, props.searchDimension);

                let startDate = getStartDate(date.startDate);
                let endDate = getEndDate(date.endDate);

                let searchValue = {
                    startDate,
                    endDate
                }
                
                props.onActionUpdateDetailSearchValue(searchValue);
                props.onActionOpenDetailGraphSelectorModal();
            },
            openWholePeroidDetailGraphSelectorModal: () => {
                let startDate = getStartDate(props.performance[0].datetime);
                let endDate = getEndDate(props.performance.slice(-1)[0].datetime);

                let searchValue = {
                    startDate,
                    endDate
                }

                props.onActionUpdateDetailSearchValue(searchValue);
                props.onActionOpenDetailGraphSelectorModal();
            }
        }
    }

    return (
        <Container>
            <GraphBoardFieldView
                onActionOpenDetailGraphSelectorModal={__handle.action.openWholePeroidDetailGraphSelectorModal}
            />
            <div className='content-box'>
                <GraphBodyFieldView
                    totalPayAmountGraphData={props.checkedSwitch ? totalPayAmountGraphData : salesPayAmountGraphData}
                    graphOption={graphOption}
                />
                <GraphSummaryFieldView
                    summaryData={props.checkedSwitch ? totalSummaryData : salesSummaryData}
                />
            </div>
        </Container>
    )
}
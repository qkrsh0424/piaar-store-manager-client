import { Container } from "./PayAmountGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphSummaryFieldView from "./view/GraphSummaryField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import { dateToYYYYMMDDAndDayName, getDateFormatByGraphDateLabel, getEndDate, getMonthAndSearchDateRange, getStartDate, getWeekNumberAndSearchDateRange } from "../../../../utils/dateFormatUtils";
import { GraphDataset, setAnalysisResultText } from "../../../../utils/graphDataUtils";
import { toPriceUnitFormat } from "../../../../utils/numberFormatUtils";
import _ from "lodash";

const SALES_GRAPH_BG_COLOR = ['#B9B4EB', '#F0B0E8', '#80A9E1', '#FFAFCC', '#F9F871', '#F1EDFF', '#EEE8A9', '#70dbc2', '#D5CABD', '#389091'];

// 판매스토어별 총 매출액
export default function PayAmountGraphComponent(props) {
    const [salesPayAmountGraphData, setSalesPayAmountGraphData] = useState(null);
    const [totalPayAmountGraphData, setTotalPayAmountGraphData] = useState(null);

    const [salesSummaryData, setSalesSummaryData] = useState(null);

    const [graphOption, setGraphOption] = useState(null);
    const [graphLabels, setGraphLabels] = useState(null);

    useEffect(() => {
        if (!props.selectedChannel) {
            return;
        }

        if (!props.searchDimension) {
            return;
        }

        if (!props.payAmount) {
            return;
        }

        __handle.action.createGraphData();
    }, [props.selectedChannel, props.payAmount, props.searchDimension])

    useEffect(() => {
        if(!(totalPayAmountGraphData && salesPayAmountGraphData)) {
            return;
        }

        __handle.action.createGraphOption();
    }, [totalPayAmountGraphData, salesPayAmountGraphData])

    const __handle = {
        action: {
            createGraphData: () => {
                let salesPayAmountData = [];
                let orderPayAmountData = [];

                let salesDatasets = [];
                let orderDatasets = [];
                let salesAvgDatasets = [];
                let graphLabels = new Set([]);
                let channel = [...props.selectedChannel];

                // 날짜 최소값, 최대값 설정
                let minimumDate = props.payAmount[0].datetime;
                let maximumDate = props.payAmount.slice(-1)[0].datetime;

                props.payAmount.forEach(data => {
                    let datetime = dateToYYYYMMDDAndDayName(data.datetime);
                    if (props.searchDimension === 'week') {
                        datetime = getWeekNumberAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                    } else if (props.searchDimension === 'month') {
                        datetime = getMonthAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                    }
                    graphLabels.add(datetime);
                })

                channel.forEach(r => {
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
                    })

                    salesPayAmountData.push(salesPayAmount);
                    orderPayAmountData.push(orderPayAmount);
                })
                
                let graphColor = SALES_GRAPH_BG_COLOR;
                for (let i = SALES_GRAPH_BG_COLOR.length; i < channel.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                // 판매 그래프 데이터 세팅
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

                        orderDatasets.push(lineGraphOfOrder);
                        salesDatasets.push(barGraphOfSales);

                        // 판매매출액 7일간 평균 데이터 생성
                        // 조회된 기간의 시작날짜부터 7일간 null로 채운다
                        let salesPayAmountAvgData = Array(7).fill(null, 0, 7);
                        for (let i = 7; i <= salesPayAmountData[idx].length; i++) {
                            let avg = parseInt(salesPayAmountData[idx].slice(i - 7, i).reduce((a, b) => a + b) / 7);
                            salesPayAmountAvgData.push(avg);
                        }

                        // 판매매출액 7일간 평균 그래프 데이터 생성
                        let lineGraphOfSalesAvg = {
                            ...new GraphDataset().toJSON(),
                            type: 'line',
                            label: r  + ' 7일간 평균',
                            data: salesPayAmountAvgData,
                            fill: false,
                            borderColor: graphColor[idx],
                            backgroundColor: graphColor[idx],
                            order: -2,
                            borderDash: [3, 3]
                        }

                        salesAvgDatasets.push(lineGraphOfSalesAvg);
                    })
                }

                // 매출 그래프 데이터 생성
                let createdSalesGraph = {
                    labels: [...graphLabels],
                    datasets: [...salesDatasets, ...salesAvgDatasets]
                }
                let createdTotalGraph = {
                    labels: [...graphLabels],
                    datasets: [...salesDatasets, ...orderDatasets, ...salesAvgDatasets]
                }

                setSalesPayAmountGraphData(createdSalesGraph);
                setTotalPayAmountGraphData(createdTotalGraph);
                setGraphLabels([...graphLabels]);
                
                // 매출 그래프 요약 데이터 생성
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
                    },
                    plugins: {
                        legend: {
                            labels: {
                                fullSize: true
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
                let salesChannels = [...props.selectedChannel];

                let detailSearchValue = {
                    startDate,
                    endDate,
                    salesChannels
                }

                props.onActionUpdateDetailSearchValue(detailSearchValue);
                props.onActionOpenDetailGraphSelectorModal();
            },
            openWholePeroidDetailGraphSelectorModal: () => {
                let startDate = getStartDate(props.payAmount[0].datetime);
                let endDate = getEndDate(props.payAmount[props.payAmount.length - 1].datetime);
                let salesChannels = [...props.selectedChannel];

                let detailSearchValue = {
                    startDate,
                    endDate,
                    salesChannels
                }

                props.onActionUpdateDetailSearchValue(detailSearchValue);
                props.onActionOpenDetailGraphSelectorModal();
            }
        }
    }

    return (
        <>
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
                        summaryData={salesSummaryData}
                    />
                </div>
            </Container>
        </>
    )
}
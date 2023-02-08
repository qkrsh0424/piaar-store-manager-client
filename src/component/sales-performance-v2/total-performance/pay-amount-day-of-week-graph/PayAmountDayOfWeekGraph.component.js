import { Container } from "./PayAmountDayOfWeekGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import { getDayName, getWeekName, getWeekNumber } from "../../../../utils/dateFormatUtils";
import { GraphDataset } from "../../../../utils/graphDataUtils";
import { toPriceUnitFormat } from "../../../../utils/numberFormatUtils";

const WEEKLY_AVG_GRAPH_BG_COLOR = '#FFAFCC';
const WEEKLY_GRAPH_BG_COLOR = ['#B9B4EB', '#F0B0E8', '#80A9E1', '#FFAFCC', '#F9F871', '#F1EDFF', '#80A9E1', '#70dbc2', '#D5CABD', '#389091'];

export default function PayAmountDayOfWeekGraphComponent(props) {
    const [salesGraphData, setSalesGraphData] = useState(null);
    const [salesWeeklyGraphData, setSalesWeeklyGraphData] = useState(null);
    
    const [graphOption, setGraphOption] = useState(null);

    useEffect(() => {
        if(!(props.performance && props.performance.length > 0)) {
            return;
        }

        __handle.action.createGraphData();
        __handle.action.createWeeklyGraphData();
    }, [props.performance])

    useEffect(() => {
        if(!(salesGraphData && salesWeeklyGraphData)) {
            return;
        }

        __handle.action.createGraphOption();
    }, [salesGraphData, salesWeeklyGraphData])

    const __handle = {
        action: {
            createGraphData: () => {
                let salesPayAmountData = [];
                let graphLabels = getWeekName();

                // 요일별 판매 매출액 그래프
                let payAmountData = graphLabels.map(r => {
                    return {
                        dayName: r,
                        salesPayAmount: 0,
                        frequency: 0
                    }
                });

                props.performance.forEach(data => {
                    let day = getDayName(data.datetime);
                    payAmountData = payAmountData.map(r => {
                        if(r.dayName === day) {
                            return {
                                ...r,
                                salesPayAmount: r.salesPayAmount + data.salesPayAmount,
                                frequency: r.frequency + 1
                            }
                        }else {
                            return r;
                        }
                    })
                })

                payAmountData.forEach(r => {
                    let salesAvg = parseInt((r.salesPayAmount) / r.frequency);
                    salesPayAmountData.push(salesAvg);
                })

                let barGraphOfSales = {
                    ...new GraphDataset().toJSON(),
                    type: 'bar',
                    label: '평균 매출액',
                    data: salesPayAmountData,
                    fill: true,
                    borderColor: WEEKLY_AVG_GRAPH_BG_COLOR,
                    backgroundColor: WEEKLY_AVG_GRAPH_BG_COLOR,
                    borderWidth: 0
                }
                
                // // 매출 그래프 데이터 생성
                let createdSalesGraph = {
                    labels: graphLabels,
                    datasets: [barGraphOfSales]
                }
                setSalesGraphData(createdSalesGraph);
            },
            createWeeklyGraphData: () => {
                let weeklyDatasets = [];
                let payAmountWeeklyData = [];
                let graphLabels = getWeekName();
                let weekValue = {};

                // 주차별 판매 매출액 그래프
                let week = new Set([]);
                props.performance.forEach(r => week.add(getWeekNumber(r.datetime)));

                graphLabels.forEach(r => {
                    weekValue = {
                        ...weekValue,
                        [r]: 0
                    }
                })

                payAmountWeeklyData = [...week].map(r => {
                    return {
                        weekNum: r,
                        value: weekValue
                    }
                });

                props.performance.forEach(r => {
                    let compareWeek = getWeekNumber(r.datetime);
                    let compareDay = getDayName(r.datetime);
                    
                    payAmountWeeklyData = payAmountWeeklyData.map(r2 => {
                        if(r2.weekNum === compareWeek) {
                            return {
                                ...r2,
                                value: {
                                    ...r2.value,
                                    [compareDay]: parseInt(r2.value[compareDay]) + parseInt(r.salesPayAmount)
                                }
                            }
                        }else {
                            return r2;
                        }
                    })
                })

                let graphColor = WEEKLY_GRAPH_BG_COLOR;
                for (let i = WEEKLY_GRAPH_BG_COLOR.length; i < payAmountWeeklyData.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                payAmountWeeklyData.forEach((r, idx) => {
                    let datasets = new GraphDataset().toJSON();
                    datasets = {
                        ...datasets,
                        type: 'bar',
                        label: r.weekNum + '주차',
                        data: r.value,
                        fill: true,
                        borderColor: graphColor[idx] + 'BB',
                        backgroundColor: graphColor[idx] + 'BB',
                        borderWidth: 0
                    }
                    weeklyDatasets.push(datasets);
                })

                // // 매출 그래프 데이터 생성
                let createdWeeklySalesGraph = {
                    labels: graphLabels,
                    datasets: weeklyDatasets
                }
                setSalesWeeklyGraphData(createdWeeklySalesGraph)
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
        <Container>
            <GraphBoardFieldView />
            <div className='content-box'>
                <GraphBodyFieldView
                    totalGraphData={salesGraphData}
                    totalWeeklyGraphData={salesWeeklyGraphData}
                    graphOption={graphOption}
                />
            </div>
        </Container>
    )
}
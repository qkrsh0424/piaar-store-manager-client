import { Container } from "./PayAmountDayOfWeekGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import { dateToYYYYMMDD, getDayName, getEndDate, getStartDate, getWeekName, getWeekNumber } from "../../../../utils/dateFormatUtils";
import { GraphDataset } from "../../../../utils/graphDataUtils";
import { toPriceUnitFormat } from "../../../../utils/numberFormatUtils";
import useRouterHook from "../../../../hooks/router/useRouterHook";

const WEEKLY_AVG_GRAPH_BG_COLOR = '#FFAFCC';
const WEEKLY_GRAPH_BG_COLOR = ['#FFBCA2', '#FFCC89', '#FFB2BA', '#F58293', '#D2759F', '#FFCA67', '#A974BC'];
// const GRAPH_LABELS = getWeekName();

export default function PayAmountDayOfWeekGraphComponent(props) {
    const [salesGraphData, setSalesGraphData] = useState(null);
    const [salesWeeklyGraphData, setSalesWeeklyGraphData] = useState(null);
    
    const [totalGraphOption, setTotalGraphOption] = useState(null);

    const {
        query,
        navigateUrl
    } = useRouterHook();

    useEffect(() => {
        if(!(props.performance && props.performance.length > 0)) {
            __handle.action.resetGraphData();
            return;
        }

        __handle.action.createGraphData();
        __handle.action.createWeeklyGraphData();
        __handle.action.createGraphOption();
    }, [props.performance])

    useEffect(() => {
        if(!(salesGraphData && salesWeeklyGraphData)) {
            return;
        }

        __handle.action.createGraphOption();
    }, [salesGraphData, salesWeeklyGraphData])

    const __handle = {
        action: {
            resetGraphData: () => {
                setSalesGraphData(null);
                setSalesWeeklyGraphData(null);
                
                setTotalGraphOption(null);
            },
            createGraphData: () => {
                // 요일별 판매 매출액 그래프
                let payAmountData = getWeekName().map(r => {
                    return {
                        dayName: r,
                        salesPayAmount: 0,
                        frequency: 0
                    }
                });

                let graphLabels = [];
                for(let i = 0; i < props.performance.length; i++) {
                    let day = getDayName(props.performance[i].datetime);
                    payAmountData = payAmountData.map(r => {
                        if(r.dayName === day) {
                            return {
                                ...r,
                                salesPayAmount: r.salesPayAmount + props.performance[i].salesPayAmount,
                                frequency: r.frequency + 1
                            }
                        }else {
                            return r;
                        }
                    });
                }

                let salesPayAmountData = [];
                for(let i = 0; i < payAmountData.length; i++) {
                    let salesAvg = parseInt((payAmountData[i].salesPayAmount) / payAmountData[i].frequency);
                    
                    salesPayAmountData.push(salesAvg);
                    graphLabels.push(payAmountData[i].dayName);
                }

                let barGraphOfSales = {
                    ...new GraphDataset().toJSON(),
                    type: 'bar',
                    label: '평균 매출액',
                    data: salesPayAmountData,
                    fill: true,
                    borderColor: WEEKLY_AVG_GRAPH_BG_COLOR,
                    backgroundColor: WEEKLY_AVG_GRAPH_BG_COLOR,
                }
                
                // // 매출 그래프 데이터 생성
                let createdSalesGraph = {
                    labels: graphLabels,
                    datasets: [barGraphOfSales]
                }
                setSalesGraphData(createdSalesGraph);
            },
            createWeeklyGraphData: () => {
                // 주차별 판매 매출액 그래프
                let week = new Set([]);
                props.performance.forEach(r => week.add(getWeekNumber(r.datetime)));

                let payAmountWeeklyData = [];
                let weekValue = {};
                getWeekName().forEach(r => {
                    weekValue = {
                        ...weekValue,
                        [r]: 0
                    }
                })

                payAmountWeeklyData = [...week].map(r => {
                    return {
                        key: r,
                        value: weekValue
                    }
                });
            
                props.performance.forEach(r => {
                    let compareWeek = getWeekNumber(r.datetime);
                    let compareDay = getDayName(r.datetime);
                    
                    payAmountWeeklyData = payAmountWeeklyData.map(r2 => {
                        if(r2.key === compareWeek) {
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

                let weeklyDatasets = []
                payAmountWeeklyData.forEach((r, idx) => {
                    let datasets = new GraphDataset().toJSON();
                    datasets = {
                        ...datasets,
                        type: 'bar',
                        label: r.key + '주차',
                        data: r.value,
                        fill: true,
                        borderColor: graphColor[idx] + 'BB',
                        backgroundColor: graphColor[idx] + 'BB'
                    }
                    weeklyDatasets.push(datasets);
                })

                // // 매출 그래프 데이터 생성
                let createdWeeklySalesGraph = {
                    labels: getWeekName(),
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
                    },
                    onClick: function (e, item) {
                        __handle.action.setGraphClickOption(e, item);
                    },
                    onHover: (e, item) => {
                        const target = e.native ? e.native.target : e.target;
                        target.style.cursor = item[0] ? 'pointer' : 'default';
                    }
                }

                setTotalGraphOption(option);
            },
            setGraphClickOption: (e, item) => {
                if(item.length === 0) return;

                var itemIdx = item[0].index;

                // dayIndex : 1-7, SUN-SAT
                let dayIndex = itemIdx + 1;

                let startDate = getStartDate(props.performance[0].datetime);
                let endDate = getEndDate(props.performance[props.performance.length - 1].datetime);

                let data = {
                    pathname: '/sales-performance/search',
                    state: {
                        startDate,
                        endDate,
                        dayIndex
                    }
                }

                navigateUrl(data);
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
                    totalGraphOption={totalGraphOption}
                />
            </div>
        </Container>
    )
}
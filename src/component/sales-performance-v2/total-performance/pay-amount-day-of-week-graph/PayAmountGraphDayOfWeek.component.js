import { Container } from "./PayAmountDayOfWeekGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import { dateToYYYYMM, getDayName, getEndDate, getStartDate, getWeekName, getWeekNumber } from "../../../../utils/dateFormatUtils";
import useTotalPayAmountHook from "./hooks/usePayAmountDayOfWeekHook";
import { GraphDataset } from "../../../../utils/graphDataUtils";

const WEEKLY_AVG_GRAPH_BG_COLOR = '#FFAFCC';
const WEEKLY_GRAPH_BG_COLOR = ['#D2759F', '#FFCA67', '#FF9D83', '#FC868F', '#D678CD', '#95C477', '#389091', '#D5CABD', '#00C894', '#B9B4EB', '#FF7FAB'];

export default function PayAmountDayOfWeekGraphComponent() {
    const [searchDimension, setSearchDimension] = useState('date');
    
    const [salesGraphData, setSalesGraphData] = useState(null);
    const [salesWeeklyGraphData, setSalesWeeklyGraphData] = useState(null);
    
    const [totalGraphOption, setTotalGraphOption] = useState(null);
    
    const {
        location,
        query,
        navigateParams
    } = useRouterHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        totalPayAmount: totalPayAmount,
        reqSearchPayAmountDayOfWeek
    } = useTotalPayAmountHook()

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            let startDate = query.startDate ? getStartDate(query.startDate) : null;
            let endDate = query.endDate ? getEndDate(query.endDate) : null;
            let dimension = searchDimension || 'date';

            let params = {
                startDate,
                endDate,
                dimension
            }
            await reqSearchPayAmountDayOfWeek(params);
            onActionCloseBackdrop();
        }

        if(!(query.startDate || query.endDate)) {
            __handle.action.resetGraphData();
            return;
        }
        fetchInit();
    }, [location])

    useEffect(() => {
        if(!(totalPayAmount && totalPayAmount.length > 0)) {
            __handle.action.resetGraphData();
            return;
        }

        __handle.action.createGraphData();
        __handle.action.createWeeklyGraphData();
        __handle.action.createGraphOption();
    }, [totalPayAmount])

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
                for(let i = 0; i < totalPayAmount.length; i++) {
                    let day = getDayName(totalPayAmount[i].datetime);
                    payAmountData = payAmountData.map(r => {
                        if(r.dayName === day) {
                            return {
                                ...r,
                                salesPayAmount: r.salesPayAmount + totalPayAmount[i].salesPayAmount,
                                frequency: r.frequency+1
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
                totalPayAmount.forEach(r => week.add(dateToYYYYMM(r.datetime) + '-' + getWeekNumber(r.datetime)));

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
            
                totalPayAmount.forEach(r => {
                    let compareWeek = dateToYYYYMM(r.datetime) + '-' + getWeekNumber(r.datetime);
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

                let weeklyDatasets = []
                payAmountWeeklyData.forEach((r, idx) => {
                    let datasets = new GraphDataset().toJSON();
                    datasets = {
                        ...datasets,
                        type: 'bar',
                        label: r.key + '주차',
                        data: r.value,
                        fill: true,
                        borderColor: WEEKLY_GRAPH_BG_COLOR[idx] + 'BB',
                        backgroundColor: WEEKLY_GRAPH_BG_COLOR[idx] + 'BB'
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
                        intersect: true,
                    }
                }

                setTotalGraphOption(option);
            }
        },
        submit: {
            changeSearchDimension: (e) => {
                let value = e.target.value;
                setSearchDimension(value);

                query.dimension = value;
                navigateParams({ replace: true })
            }
        }
    }

    return (
        <>
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

            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    )
}
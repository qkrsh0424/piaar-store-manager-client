import { Container } from "./PayAmountGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphSummaryFieldView from "./view/GraphSummaryField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import { dateToYYYYMM, getEndDate, getStartDate, getWeekNumber } from "../../../../utils/dateFormatUtils";
import useTotalPayAmountHook from "./hooks/useTotalPayAmountHook";
import { dateToYYMMDDAndDayName, GraphDataset, setAnalysisResultText } from "../../../../utils/graphDataUtils";

// 그래프 기본 3가지 색상 : [주문, 판매, 평균]
const DEFAULT_GRAPH_BG_2COLOR = ['#ADA8C3', '#C0C5DC', '#596dd3'];

export default function PayAmountGraphComponent() {
    const [searchDimension, setSearchDimension] = useState('date');
    
    const [salesPayAmountGraphData, setSalesPayAmountGraphData] = useState(null);
    const [totalPayAmountGraphData, setTotalPayAmountGraphData] = useState(null);
    
    const [salesSummaryData, setSalesSummaryData] = useState(null);
    const [totalSummaryData, setTotalSummaryData] = useState(null);
    
    const [totalPayAmountGraphOption, setTotalPayAmountGraphOption] = useState(null);
    const [checkedSwitch, setCheckedSwitch] = useState(false);
    
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
        reqSearchTotalPayAmount
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
            await reqSearchTotalPayAmount(params);
            onActionCloseBackdrop();
        }

        if (!(query.startDate && query.endDate)) {
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
        __handle.action.createGraphOption();
    }, [totalPayAmount])

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
                let graphLabels = [];

                for(let i = 0; i < totalPayAmount.length; i++) {
                    let datetime = dateToYYMMDDAndDayName(totalPayAmount[i].datetime);
                    if(searchDimension === 'week') {
                        datetime = dateToYYYYMM(totalPayAmount[i].datetime) + '-' + getWeekNumber(totalPayAmount[i].datetime) + '주차';
                    }else if(searchDimension === 'month') {
                        datetime = dateToYYYYMM(totalPayAmount[i].datetime);
                    }
                    graphLabels.push(datetime);
                    salesPayAmountData.push(totalPayAmount[i].salesPayAmount);
                    orderPayAmountData.push(totalPayAmount[i].orderPayAmount);
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
                let salesPayAmountAvgData = [null, null, null, null, null, null];
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
                    labels: graphLabels,
                    datasets: [barGraphOfSales, lineGraphOfSalesAvg]
                }
                let createdTotalGraph = {
                    labels: graphLabels,
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
                        intersect: true,
                    }
                }

                setTotalPayAmountGraphOption(option);
            },
            changeSwitch: () => {
                let checkedValue = checkedSwitch;
                setCheckedSwitch(!checkedValue);
            }
        },
        submit: {
            changeSearchDimension: async (e) => {
                let value = e.target.value;
                setSearchDimension(value);

                let startDate = query.startDate ? getStartDate(query.startDate) : null;
                let endDate = query.endDate ? getEndDate(query.endDate) : null;
                let dimension = value || 'date';

                let params = {
                    startDate,
                    endDate,
                    dimension
                }
                await reqSearchTotalPayAmount(params);
            }
        }
    }

    return (
        <>
            <Container>
                <GraphBoardFieldView
                    searchDimension={searchDimension}
                    checkedSwitch={checkedSwitch}

                    onActionChangeSearchDimension={__handle.submit.changeSearchDimension}
                    onActionChangeSwitch={__handle.action.changeSwitch}
                />
                <div className='content-box'>
                    <GraphBodyFieldView
                        totalPayAmountGraphData={checkedSwitch ? totalPayAmountGraphData : salesPayAmountGraphData}
                        totalPayAmountGraphOption={totalPayAmountGraphOption}
                    />
                    <GraphSummaryFieldView
                        summaryData={checkedSwitch ? totalSummaryData : salesSummaryData}
                    />
                </div>
            </Container>

            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    )
}
import { Container } from "./RegistrationAndUnitGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphSummaryFieldView from "./view/GraphSummaryField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import { getEndDate, getStartDate } from "../../../../utils/dateFormatUtils";
import useTotalPayAmountHook from "./hooks/useTotalRegistrationAndUnitHook";
import { dateToYYMMDDAndDayName, GraphDataset, setAnalysisResultText } from "../../../../utils/graphDataUtils";

// 그래프 색상
// const DEFULAT_GRAPH_BG_9COLOR = ['#D678CD', '#FF7FAB', '#FF9D83', '#FFCA67', '#B9B4EB', '#00C894', '#D5CABD', '#389091', '#95C477'];
// 그래프 기본 2가지 색상
// const DEFAULT_GRAPH_BG_2COLOR = ['#B9B4EB', '#908CB8'];
const DEFAULT_GRAPH_BG_2COLOR = ['#ADA8C3', '#C0C5DC', '#596dd3'];

export default function RegistrationAndUnitGraphComponent() {
    const [searchDimension, setSearchDimension] = useState('date');
    const [totalGraphData, setTotalGraphData] = useState(null);
    const [totalGraphOption, setTotalGraphOption] = useState(null);
    const [summaryData, setSummaryData] = useState(null);

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
        totalRegistrationAndUnit: totalRegistrationAndUnit,
        reqSearchTotalRegistrationAndUnit
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
            await reqSearchTotalRegistrationAndUnit(params);
            onActionCloseBackdrop();
        }

        if(!(query.startDate || query.endDate)) {
            __handle.action.resetGraphData();
            return;
        }
        fetchInit();
    }, [location])

    useEffect(() => {
        if(!(totalRegistrationAndUnit && totalRegistrationAndUnit.length > 0)) {
            __handle.action.resetGraphData();
            return;
        }

        // __handle.action.createGraphData();
        // __handle.action.createGraphOption();
    }, [totalRegistrationAndUnit])

    const __handle = {
        action: {
            resetGraphData: () => {
                setTotalGraphData(null);
                setTotalGraphOption(null);
                setSummaryData(null);
            },
            createGraphData: () => {
                let salesPayAmountData = [];
                let orderPayAmountData = [];
                let graphLabels = [];
                for(let i = 0; i < totalRegistrationAndUnit.length; i++) {
                    salesPayAmountData.push(totalRegistrationAndUnit[i].salesPayAmount);
                    orderPayAmountData.push(totalRegistrationAndUnit[i].orderPayAmount);
                    graphLabels.push(dateToYYMMDDAndDayName(totalRegistrationAndUnit[i].datetime));
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
                    order: -1
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

                let createdGraphDatasets = [barGraphOfSales, lineGraphOfOrder];
                let avgGraphDataset = [lineGraphOfSalesAvg];
                
                // 총 매출 그래프 데이터 생성
                let createdGraph = {
                    labels: graphLabels,
                    datasets: [...createdGraphDatasets, ...avgGraphDataset]
                }
                setTotalGraphData(createdGraph);

                // 총 매출 그래프 요약 데이터 생성
                let data = setAnalysisResultText(createdGraphDatasets);
                setSummaryData(data);
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
                <GraphBoardFieldView
                    searchDimension={searchDimension}

                    onActionChangeSearchDimension={__handle.submit.changeSearchDimension}
                />
                <div className='content-box'>
                    <GraphBodyFieldView
                        totalGraphData={totalGraphData}
                        totalGraphOption={totalGraphOption}
                    />
                    <GraphSummaryFieldView
                        summaryData={summaryData}
                    />
                </div>
            </Container>

            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    )
}
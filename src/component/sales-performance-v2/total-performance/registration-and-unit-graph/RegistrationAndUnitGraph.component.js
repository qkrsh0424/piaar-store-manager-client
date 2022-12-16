import { Container } from "./RegistrationAndUnitGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphSummaryFieldView from "./view/GraphSummaryField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import { dateToYYYYMM, getEndDate, getStartDate, getWeekNumber } from "../../../../utils/dateFormatUtils";
import useTotalPayAmountHook from "./hooks/useTotalRegistrationAndUnitHook";
import { dateToYYMMDDAndDayName, GraphDataset, setAnalysisResultText } from "../../../../utils/graphDataUtils";

// 그래프 기본 2가지 색상 : [판매, 주문]
const DEFAULT_GRAPH_BG_2COLOR = ['#4975A9', '#80A9E1'];

export default function RegistrationAndUnitGraphComponent() {
    const [searchDimension, setSearchDimension] = useState('date');
    
    const [salesGraphData, setSalesGraphData] = useState(null);
    const [totalGraphData, setTotalGraphData] = useState(null);
    
    const [salesSummaryData, setSalesSummaryData] = useState(null);
    const [totalSummaryData, setTotalSummaryData] = useState(null);
    
    const [totalGraphOption, setTotalGraphOption] = useState(null);
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

        __handle.action.createGraphData();
        __handle.action.createGraphOption();
    }, [totalRegistrationAndUnit])

    const __handle = {
        action: {
            resetGraphData: () => {
                setTotalGraphData(null);
                setTotalSummaryData(null);

                setSalesGraphData(null);
                setSalesSummaryData(null);
                
                setTotalGraphOption(null);
            },
            createGraphData: () => {
                let salesRegistrationData = [];
                let salesUnitData = [];
                let orderRegistrationData = [];
                let orderUnitData = [];
                let graphLabels = [];
                for(let i = 0; i < totalRegistrationAndUnit.length; i++) {
                    let datetime = dateToYYMMDDAndDayName(totalRegistrationAndUnit[i].datetime);
                    if(searchDimension === 'week') {
                        datetime = dateToYYYYMM(totalRegistrationAndUnit[i].datetime) + '-' + getWeekNumber(totalRegistrationAndUnit[i].datetime) + '주차';
                    }else if(searchDimension === 'month') {
                        datetime = dateToYYYYMM(totalRegistrationAndUnit[i].datetime);
                    }
                    graphLabels.push(datetime);
                    
                    salesRegistrationData.push(totalRegistrationAndUnit[i].salesRegistration);
                    salesUnitData.push(totalRegistrationAndUnit[i].salesUnit);
                    orderRegistrationData.push(totalRegistrationAndUnit[i].orderRegistration);
                    orderUnitData.push(totalRegistrationAndUnit[i].orderUnit);
                }
                
                let barGraphOfSalesReg = {
                    ...new GraphDataset().toJSON(),
                    type: 'bar',
                    label: '판매건',
                    data: salesRegistrationData,
                    fill: true,
                    borderColor: DEFAULT_GRAPH_BG_2COLOR[1],
                    backgroundColor: DEFAULT_GRAPH_BG_2COLOR[1],
                    borderWidth: 0,
                    order: 0
                }

                let barGraphOfSalesUnit = {
                    ...new GraphDataset().toJSON(),
                    type: 'bar',
                    label: '판매수량',
                    data: salesUnitData,
                    fill: true,
                    borderColor: DEFAULT_GRAPH_BG_2COLOR[0],
                    backgroundColor: DEFAULT_GRAPH_BG_2COLOR[0],
                    borderWidth: 0,
                    order: 0
                }

                let lineGraphOfOrderReg = {
                    ...new GraphDataset().toJSON(),
                    type: 'line',
                    label: '주문건',
                    data: orderRegistrationData,
                    fill: false,
                    borderColor: DEFAULT_GRAPH_BG_2COLOR[1] + '88',
                    backgroundColor: DEFAULT_GRAPH_BG_2COLOR[1] + '88',
                    order: -1,
                    pointRadius: 2
                }

                let lineGraphOfOrderUnit = {
                    ...new GraphDataset().toJSON(),
                    type: 'line',
                    label: '주문수량',
                    data: orderUnitData,
                    fill: false,
                    borderColor: DEFAULT_GRAPH_BG_2COLOR[0] + '88',
                    backgroundColor: DEFAULT_GRAPH_BG_2COLOR[0] + '88',
                    order: -1,
                    pointRadius: 2
                }

                let createdSalesGraphDatasets = [barGraphOfSalesReg, barGraphOfSalesUnit];
                let createdOrderGraphDatasets = [lineGraphOfOrderReg, lineGraphOfOrderUnit];
                
                // 매출 그래프 데이터 생성
                let createSalesGraph = {
                    labels: graphLabels,
                    datasets: createdSalesGraphDatasets
                }
                let createdGraph = {
                    labels: graphLabels,
                    datasets: [...createdSalesGraphDatasets, ...createdOrderGraphDatasets]
                }
                setSalesGraphData(createSalesGraph)
                setTotalGraphData(createdGraph);

                // 매출 그래프 요약 데이터 생성
                let salesData = setAnalysisResultText(createdSalesGraphDatasets)
                let data = setAnalysisResultText([...createdSalesGraphDatasets, ...createdOrderGraphDatasets]);
                setSalesSummaryData(salesData)
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

                setTotalGraphOption(option);
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

                // location 설정?
                let startDate = query.startDate ? getStartDate(query.startDate) : null;
                let endDate = query.endDate ? getEndDate(query.endDate) : null;
                let dimension = value || 'date';

                let params = {
                    startDate,
                    endDate,
                    dimension
                }
                await reqSearchTotalRegistrationAndUnit(params);
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
                        totalGraphData={checkedSwitch ? totalGraphData : salesGraphData}
                        totalGraphOption={totalGraphOption}
                    />
                    <GraphSummaryFieldView
                        summaryData={checkedSwitch? totalSummaryData : salesSummaryData}
                    />
                </div>
            </Container>

            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    )
}
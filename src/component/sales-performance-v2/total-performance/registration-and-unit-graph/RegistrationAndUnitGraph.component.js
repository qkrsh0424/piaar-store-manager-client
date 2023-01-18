import { Container } from "./RegistrationAndUnitGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphSummaryFieldView from "./view/GraphSummaryField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { dateToYYYYMMDD, dateToYYYYMMDDAndDayName, getDateFormatByGraphDateLabel, getEndDate, getMonthAndSearchDateRange, getStartDate, getWeekNumberAndSearchDateRange } from "../../../../utils/dateFormatUtils";
import { GraphDataset, setAnalysisResultText } from "../../../../utils/graphDataUtils";

// 그래프 기본 2가지 색상 : [판매, 주문]
const DEFAULT_GRAPH_BG_2COLOR = ['#4975A9', '#80A9E1'];

export default function RegistrationAndUnitGraphComponent(props) {
    const [salesGraphData, setSalesGraphData] = useState(null);
    const [totalGraphData, setTotalGraphData] = useState(null);
    
    const [salesSummaryData, setSalesSummaryData] = useState(null);
    const [totalSummaryData, setTotalSummaryData] = useState(null);
    
    const [totalGraphOption, setTotalGraphOption] = useState(null);
    const [graphLabels, setGraphLabels] = useState(null);

    const {
        query,
        navigateUrl
    } = useRouterHook();

    useEffect(() => {
        if(!props.searchDimension) {
            return;
        }

        if(!(props.performance && props.performance.length > 0)) {
            __handle.action.resetGraphData();
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
                let graphLabels = new Set([]);
                let minimumDate = props.performance[0].datetime;
                let maximumDate = props.performance[props.performance.length - 1].datetime;

                for(let i = 0; i < props.performance.length; i++) {
                    let datetime = dateToYYYYMMDDAndDayName(props.performance[i].datetime);
                    if(props.searchDimension === 'week') {
                        datetime = getWeekNumberAndSearchDateRange(props.performance[i].datetime, minimumDate, maximumDate);
                    }else if(props.searchDimension === 'month') {
                        datetime = getMonthAndSearchDateRange(props.performance[i].datetime, minimumDate, maximumDate);
                    }

                    if(graphLabels.has(datetime)) {
                        salesRegistrationData[salesRegistrationData.length - 1] += props.performance[i].salesRegistration;
                        salesUnitData[salesUnitData.length - 1] += props.performance[i].salesUnit;
                        orderRegistrationData[orderRegistrationData.length - 1] += props.performance[i].orderRegistration;
                        orderUnitData[orderUnitData.length - 1] += props.performance[i].orderUnit;
                    }else {
                        graphLabels.add(datetime);

                        salesRegistrationData.push(props.performance[i].salesRegistration);
                        salesUnitData.push(props.performance[i].salesUnit);
                        orderRegistrationData.push(props.performance[i].orderRegistration);
                        orderUnitData.push(props.performance[i].orderUnit);
                    }
                    
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
                    labels: [...graphLabels],
                    datasets: createdSalesGraphDatasets
                }
                let createdGraph = {
                    labels: [...graphLabels],
                    datasets: [...createdSalesGraphDatasets, ...createdOrderGraphDatasets]
                }
                setSalesGraphData(createSalesGraph)
                setTotalGraphData(createdGraph);

                // 매출 그래프 요약 데이터 생성
                let salesData = setAnalysisResultText(createdSalesGraphDatasets)
                let data = setAnalysisResultText([...createdSalesGraphDatasets, ...createdOrderGraphDatasets]);
                setSalesSummaryData(salesData)
                setTotalSummaryData(data);
                setGraphLabels([...graphLabels]);
            },
            createGraphOption: () => {
                let option = {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'index',
                        intersect: false,
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
                var label = graphLabels[itemIdx];
                var date = getDateFormatByGraphDateLabel(label, props.searchDimension);

                let startDate = getStartDate(date.startDate);
                let endDate = getEndDate(date.endDate);

                let data = { 
                    pathname: '/sales-performance/search',
                    state: {
                        startDate,
                        endDate
                    }
                }

                navigateUrl(data);
            }
        }
    }

    return (
        <>
            <Container>
                <GraphBoardFieldView
                    searchDimension={props.searchDimension}
                    checkedSwitch={props.checkedSwitch}
                />
                <div className='content-box'>
                    <GraphBodyFieldView
                        totalGraphData={props.checkedSwitch ? totalGraphData : salesGraphData}
                        totalGraphOption={totalGraphOption}
                    />
                    <GraphSummaryFieldView
                        summaryData={props.checkedSwitch? totalSummaryData : salesSummaryData}
                    />
                </div>
            </Container>
        </>
    )
}
import { Container } from "./RegistrationAndUnitGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphSummaryFieldView from "./view/GraphSummaryField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import { dateToYYYYMMDDAndDayName, getDateFormatByGraphDateLabel, getEndDate, getMonthAndSearchDateRange, getStartDate, getWeekNumberAndSearchDateRange } from "../../../../utils/dateFormatUtils";
import { GraphDataset, setAnalysisResultText } from "../../../../utils/graphDataUtils";

// 그래프 기본 2가지 색상 : [판매, 주문]
const DEFAULT_GRAPH_BG_2COLOR = ['#4975A9', '#80A9E1'];

export default function RegistrationAndUnitGraphComponent(props) {
    const [salesGraphData, setSalesGraphData] = useState(null);
    const [totalGraphData, setTotalGraphData] = useState(null);
    
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
                let salesRegistrationData = [];
                let salesUnitData = [];
                let orderRegistrationData = [];
                let orderUnitData = [];
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
                    salesRegistrationData.push(data.salesRegistration);
                    salesUnitData.push(data.salesUnit);
                    orderRegistrationData.push(data.orderRegistration);
                    orderUnitData.push(data.orderUnit);
                })
                
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
                setSalesGraphData(createSalesGraph);
                setTotalGraphData(createdGraph);
                setGraphLabels([...graphLabels]);

                // 매출 그래프 요약 데이터 생성
                __handle.action.createSalesSummary(createdSalesGraphDatasets);
                __handle.action.createTotalSummary([...createdSalesGraphDatasets, ...createdOrderGraphDatasets]);
            },
            createSalesSummary: (data) => {
                let salesSummary = setAnalysisResultText(data);
                setSalesSummaryData(salesSummary);
            }, 
            createTotalSummary: (data) => {
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
                props.onActionOpenDetailGraphSelectorModal(searchValue);
            },
            openWholePeroidDetailGraphSelectorModal: () => {
                let startDate = getStartDate(props.performance[0].datetime);
                let endDate = getEndDate(props.performance[props.performance.length - 1].datetime);

                let searchValue = {
                    startDate,
                    endDate
                }
                props.onActionOpenDetailGraphSelectorModal(searchValue);
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
                        totalGraphData={props.checkedSwitch ? totalGraphData : salesGraphData}
                        graphOption={graphOption}
                    />
                    <GraphSummaryFieldView
                        summaryData={props.checkedSwitch? totalSummaryData : salesSummaryData}
                    />
                </div>
            </Container>
        </>
    )
}
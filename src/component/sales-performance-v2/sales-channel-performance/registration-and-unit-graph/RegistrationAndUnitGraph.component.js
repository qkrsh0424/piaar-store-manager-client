import { Container } from "./RegistrationAndUnitGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphSummaryFieldView from "./view/GraphSummaryField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import { dateToYYYYMMDDAndDayName, getDateFormatByGraphDateLabel, getEndDate, getMonthAndSearchDateRange, getStartDate, getWeekNumberAndSearchDateRange } from "../../../../utils/dateFormatUtils";
import { GraphDataset, setAnalysisResultText } from "../../../../utils/graphDataUtils";
import _ from "lodash";

const SALES_GRAPH_BG_COLOR = ['#B9B4EB', '#F0B0E8', '#80A9E1', '#FFAFCC', '#F9F871', '#F1EDFF', '#EEE8A9', '#70dbc2', '#D5CABD', '#389091'];

// 판매스토어별 총 판매, 주문건 & 수량
export default function RegistrationAndUnitGraphComponent(props) {
    const [salesRegistrationGraphData, setSalesRegistrationGraphData] = useState(null);
    const [totalRegistrationGraphData, setTotalRegistrationGraphData] = useState(null);

    const [salesUnitGraphData, setSalesUnitGraphData] = useState(null);
    const [totalUnitGraphData, setTotalUnitGraphData] = useState(null);
    
    const [registrationSummaryData, setRegistrationSummaryData] = useState(null);
    const [unitSummaryData, setUnitSummaryData] = useState(null);
    
    const [graphOption, setGraphOption] = useState(null);
    const [graphLabels, setGraphLabels] = useState(null);

    useEffect(() => {
        if(!props.selectedChannel) {
            return;
        }

        if(!props.searchDimension) {
            return;
        }

        if(!props.registrationAndUnit) {
            return;
        }

        __handle.action.createRegistrationGraphData();
        __handle.action.createUnitGraphData();
    }, [props.selectedChannel, props.registrationAndUnit, props.searchDimension])

    useEffect(() => {
        if(!(totalRegistrationGraphData && totalUnitGraphData)) {
            return;
        }

        __handle.action.createGraphOption();
    }, [totalRegistrationGraphData, totalUnitGraphData])

    const __handle = {
        action: {
            createRegistrationGraphData: () => {
                let salesRegistrationData = [];
                let orderRegistrationData = [];
                let salesDatasets = [];
                let orderDatasets = [];
                let salesAvgDatasets =[];
                let graphLabels = new Set([]);
                let channel = [...props.selectedChannel];
                
                let minimumDate = props.registrationAndUnit[0].datetime;
                let maximumDate = props.registrationAndUnit.slice(-1)[0].datetime;

                props.registrationAndUnit.forEach(data => {
                    let datetime = dateToYYYYMMDDAndDayName(data.datetime);
                    if(props.searchDimension === 'week') {
                        datetime = getWeekNumberAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                    }else if(props.searchDimension === 'month') {
                        datetime = getMonthAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                    }

                    graphLabels.add(datetime);
                })

                channel.forEach(r => {
                    let salesRegistration = [];
                    let orderRegistration = [];
                    let dateValue = new Set([]);

                    props.registrationAndUnit.forEach(data => {
                        let datetime = dateToYYYYMMDDAndDayName(data.datetime);
                        if (props.searchDimension === 'week') {
                            datetime = getWeekNumberAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                        } else if (props.searchDimension === 'month') {
                            datetime = getMonthAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                        }
                        
                        let performance = data.performances?.filter(r3 => r3.salesChannel === r)[0];
                        let salesValue = performance?.salesRegistration || 0;
                        let orderValue = performance?.orderRegistration || 0;
                        if(dateValue.has(datetime)) {
                            salesRegistration[salesRegistration.length - 1] += salesValue;
                            orderRegistration[orderRegistration.length - 1] += orderValue;
                        }else {
                            dateValue.add(datetime);
                            salesRegistration.push(salesValue);
                            orderRegistration.push(orderValue);
                        }
                    })

                    salesRegistrationData.push(salesRegistration);
                    orderRegistrationData.push(orderRegistration);
                })
                
                let graphColor = SALES_GRAPH_BG_COLOR;
                for (let i = SALES_GRAPH_BG_COLOR.length; i < channel.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                // 그래프 데이터 세팅
                if(channel.size === 0) {
                    let lineGraphOfOrder = {
                        ...new GraphDataset().toJSON(),
                        label: '주문 건',
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
                        label: '판매 건',
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
                            data: orderRegistrationData[idx],
                            borderColor: graphColor[idx] + '88',
                            backgroundColor: graphColor[idx] + '88',
                            order: -1,
                            pointRadius: 2
                        }
                        let barGraphOfSales = {
                            ...new GraphDataset().toJSON(),
                            type: 'bar',
                            label: r,
                            data: salesRegistrationData[idx],
                            borderColor: graphColor[idx] + 'BB',
                            backgroundColor: graphColor[idx] + 'BB',
                            borderWidth: 0,
                            order: 0
                        }
                        salesDatasets.push(barGraphOfSales);
                        orderDatasets.push(lineGraphOfOrder);

                        // 판매매출액 7일간 평균 데이터 생성
                        // 조회된 기간의 시작날짜부터 7일간 null로 채운다
                        let salesRegistrationAvgData = Array(7).fill(null, 0, 7);
                        for (let i = 7; i <= salesRegistrationData[idx].length; i++) {
                            let avg = parseInt(salesRegistrationData[idx].slice(i - 7, i).reduce((a, b) => a + b) / 7);
                            salesRegistrationAvgData.push(avg);
                        }

                        // 판매매출액 7일간 평균 그래프 데이터 생성
                        let lineGraphOfSalesAvg = {
                            ...new GraphDataset().toJSON(),
                            type: 'line',
                            label: r  + ' 7일간 평균',
                            data: salesRegistrationAvgData,
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
                let createSalesGraph = {
                    labels: [...graphLabels],
                    datasets: [...salesDatasets, ...salesAvgDatasets]
                }
                let createdTotalGraph = {
                    labels: [...graphLabels],
                    datasets: [...salesDatasets, ...orderDatasets, ...salesAvgDatasets]
                }
                setSalesRegistrationGraphData(createSalesGraph)
                setTotalRegistrationGraphData(createdTotalGraph);
                setGraphLabels([...graphLabels]);
                
                // 요약 데이터 생성
                let salesData = setAnalysisResultText(salesDatasets)
                let totalData = setAnalysisResultText([...salesDatasets, ...orderDatasets]);

                // 매출액 내림차순으로 정렬
                salesData = _.sortBy(salesData, 'value').reverse();
                totalData = _.sortBy(totalData, 'value').reverse();

                setRegistrationSummaryData({
                    sales: salesData,
                    total: totalData
                });
            },
            createUnitGraphData: () => {
                let salesUnitData = [];
                let orderUnitData = [];
                let salesDatasets = [];
                let orderDatasets = [];
                let salesAvgDatasets = [];
                let graphLabels = new Set([]);
                let channel = [...props.selectedChannel];
                let minimumDate = props.registrationAndUnit[0].datetime;
                let maximumDate = props.registrationAndUnit.slice(-1)[0].datetime;

                props.registrationAndUnit.forEach(data => {
                    let datetime = dateToYYYYMMDDAndDayName(data.datetime);
                    if(props.searchDimension === 'week') {
                        datetime = getWeekNumberAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                    }else if(props.searchDimension === 'month') {
                        datetime = getMonthAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                    }
                    graphLabels.add(datetime);
                })

                channel.forEach(r => {
                    let salesUnit = [];
                    let orderUnit = [];
                    let dateValue = new Set([]);

                    props.registrationAndUnit.forEach(data => {
                        let datetime = dateToYYYYMMDDAndDayName(data.datetime);
                        if (props.searchDimension === 'week') {
                            datetime = getWeekNumberAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                        } else if (props.searchDimension === 'month') {
                            datetime = getMonthAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                        }
                        
                        let performance = data.performances?.filter(r3 => r3.salesChannel === r)[0];
                        let salesValue = performance?.salesUnit || 0;
                        let orderValue = performance?.orderUnit || 0;
                        if(dateValue.has(datetime)) {
                            salesUnit[salesUnit.length - 1] += salesValue;
                            orderUnit[orderUnit.length - 1] += orderValue;
                        }else {
                            dateValue.add(datetime);
                            salesUnit.push(salesValue);
                            orderUnit.push(orderValue);
                        }
                    })

                    salesUnitData.push(salesUnit);
                    orderUnitData.push(orderUnit);
                })
                
                let graphColor = SALES_GRAPH_BG_COLOR;
                for (let i = SALES_GRAPH_BG_COLOR.length; i < channel.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                // 그래프 데이터 세팅
                if(channel.size === 0) {
                    let lineGraphOfOrder = {
                        ...new GraphDataset().toJSON(),
                        label: '주문 수량',
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
                        label: '판매 수량',
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
                            data: orderUnitData[idx],
                            borderColor: graphColor[idx] + '88',
                            backgroundColor: graphColor[idx] + '88',
                            order: -1,
                            pointRadius: 2
                        }
                        let barGraphOfSales = {
                            ...new GraphDataset().toJSON(),
                            type: 'bar',
                            label: r,
                            data: salesUnitData[idx],
                            borderColor: graphColor[idx] + 'BB',
                            backgroundColor: graphColor[idx] + 'BB',
                            borderWidth: 0,
                            order: 0
                        }
                        orderDatasets.push(lineGraphOfOrder);
                        salesDatasets.push(barGraphOfSales);

                        // 판매매출액 7일간 평균 데이터 생성
                        // 조회된 기간의 시작날짜부터 7일간 null로 채운다
                        let salesUnitAvgData = Array(7).fill(null, 0, 7);
                        for (let i = 7; i <= salesUnitData[idx].length; i++) {
                            let avg = parseInt(salesUnitData[idx].slice(i - 7, i).reduce((a, b) => a + b) / 7);
                            salesUnitAvgData.push(avg);
                        }

                        // 판매매출액 7일간 평균 그래프 데이터 생성
                        let lineGraphOfSalesAvg = {
                            ...new GraphDataset().toJSON(),
                            type: 'line',
                            label: r  + ' 7일간 평균',
                            data: salesUnitAvgData,
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
                let createSalesGraph = {
                    labels: [...graphLabels],
                    datasets: [...salesDatasets, ...salesAvgDatasets]
                }
                let createdTotalGraph = {
                    labels: [...graphLabels],
                    datasets: [...salesDatasets, ...orderDatasets, ...salesAvgDatasets]
                }
                setSalesUnitGraphData(createSalesGraph)
                setTotalUnitGraphData(createdTotalGraph);

                // 매출 그래프 요약 데이터 생성
                let salesData = setAnalysisResultText(salesDatasets)
                let totalData = setAnalysisResultText([...salesDatasets, ...orderDatasets]);

                // 매출액 내림차순으로 정렬
                salesData = _.sortBy(salesData, 'value').reverse();
                totalData = _.sortBy(totalData, 'value').reverse();

                setUnitSummaryData({
                    sales: salesData,
                    total: totalData
                });
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
                                    return value;
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
                let startDate = getStartDate(props.registrationAndUnit[0].datetime);
                let endDate = getEndDate(props.registrationAndUnit.slice(-1)[0].datetime);
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
                        totalGraphData={props.checkedSwitch ? totalRegistrationGraphData : salesRegistrationGraphData}
                        graphOption={graphOption}
                    />
                    <GraphSummaryFieldView
                        title={'[스토어별 총 판매건]'}
                        summaryData={props.checkedSwitch ? registrationSummaryData?.total : registrationSummaryData?.sales}
                    />
                </div>
                <div className='content-box'>
                    <GraphBodyFieldView
                        totalGraphData={props.checkedSwitch ? totalUnitGraphData : salesUnitGraphData}
                        graphOption={graphOption}
                    />
                    <GraphSummaryFieldView
                        title={'[스토어별 총 판매수량]'}
                        summaryData={props.checkedSwitch ? unitSummaryData?.total : unitSummaryData?.sales}
                    />
                </div>
            </Container>
        </>
    )
}
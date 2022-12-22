import { Container } from "./RegistrationAndUnitGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphSummaryFieldView from "./view/GraphSummaryField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { dateToYYYYMM, getEndDate, getStartDate, getWeekNumber } from "../../../../utils/dateFormatUtils";
import { dateToYYMMDDAndDayName, GraphDataset, setAnalysisResultText } from "../../../../utils/graphDataUtils";

// const SALES_CHNNAEL_GRAPH_BG_COLOR = ['#D678CD', '#FF7FAB', '#FF9D83', '#FFCA67', '#B9B4EB', '#00C894', '#D5CABD', '#389091', '#95C477'];
const SALES_CHNNAEL_GRAPH_BG_COLOR = ['#4975A9', '#80A9E1', '#D678CD', '#FF7FAB', '#FF9D83', '#FFCA67', '#B9B4EB', '#00C894', '#D5CABD', '#389091', '#95C477'];

// 판매스토어별 총 판매, 주문건 & 수량
export default function RegistrationAndUnitGraphComponent(props) {
    const [searchDimension, setSearchDimension] = useState('date');

    const [salesRegistrationGraphData, setSalesRegistrationGraphData] = useState(null);
    const [totalRegistrationGraphData, setTotalRegistrationGraphData] = useState(null);

    const [salesUnitGraphData, setSalesUnitGraphData] = useState(null);
    const [totalUnitGraphData, setTotalUnitGraphData] = useState(null);
    
    const [registrationSummaryData, setRegistrationSummaryData] = useState(null);
    const [unitSummaryData, setUnitSummaryData] = useState(null);
    
    const [totalGraphOption, setTotalGraphOption] = useState(null);
    const [checkedSwitch, setCheckedSwitch] = useState(false);

    const {
        location,
        query,
        navigateParams
    } = useRouterHook();

    useEffect(() => {
        __handle.action.resetGraphData();
    }, [props.salesChannel])

    useEffect(() => {
        if(!props.selectedChannel) {
            __handle.action.resetGraphData();
            return;
        }

        if(!(props.registrationAndUnit && props.registrationAndUnit.length > 0)) {
            __handle.action.resetGraphData();
            return;
        }

        __handle.action.createRegistrationGraphData();
        __handle.action.createUnitGraphData();
        __handle.action.createGraphOption();
    }, [props.selectedChannel, props.registrationAndUnit])

    const __handle = {
        action: {
            resetGraphData: () => {
                setTotalRegistrationGraphData(null);
                setTotalUnitGraphData(null);
                
                setSalesRegistrationGraphData(null);
                setSalesUnitGraphData(null);
                
                setRegistrationSummaryData(null);
                setUnitSummaryData(null);
                
                setTotalGraphOption(null);
            },
            createRegistrationGraphData: () => {
                let salesRegistrationData = [];
                let orderRegistrationData = [];
                let salesDatasets = [];
                let orderDatasets = [];
                let graphLabels = [];
                let channel = [...props.selectedChannel];

                for(let i = 0; i < props.registrationAndUnit.length; i++) {
                    let datetime = dateToYYMMDDAndDayName(props.registrationAndUnit[i].datetime);
                    if(searchDimension === 'week') {
                        datetime = dateToYYYYMM(props.registrationAndUnit[i].datetime) + '-' + getWeekNumber(props.registrationAndUnit[i].datetime) + '주차';
                    }else if(searchDimension === 'month') {
                        datetime = dateToYYYYMM(props.registrationAndUnit[i].datetime);
                    }
                    graphLabels.push(datetime);
                }

                channel.forEach(r => {
                    let salesRegistration = [];
                    let orderRegistration = [];

                    props.registrationAndUnit.forEach(r2 => {
                        let data = r2.performance?.filter(r3 => r3.salesChannel === r)[0];

                        salesRegistration.push(data?.salesRegistration || 0);
                        orderRegistration.push(data?.orderRegistration || 0);
                    })

                    salesRegistrationData.push(salesRegistration);
                    orderRegistrationData.push(orderRegistration);
                })
                
                let graphColor = SALES_CHNNAEL_GRAPH_BG_COLOR;
                for (let i = SALES_CHNNAEL_GRAPH_BG_COLOR.length; i < channel.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                // 판매 그래프 데이터 세팅
                if(channel.size === 0) {
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
                    salesDatasets.push(barGraphOfSales);
                } else {
                    channel.forEach((r, idx) => {
                        let barGraphOfSales = {
                            ...new GraphDataset().toJSON(),
                            type: 'bar',
                            label: r,
                            data: salesRegistrationData[idx],
                            borderColor: graphColor[idx],
                            backgroundColor: graphColor[idx],
                            borderWidth: 0,
                            order: 0
                        }
                        salesDatasets.push(barGraphOfSales);
                    })
                }

                // 주문 그래프 데이터 세팅
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
                    orderDatasets.push(lineGraphOfOrder);
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
                        orderDatasets.push(lineGraphOfOrder);
                    })
                }

                // 매출 그래프 데이터 생성
                let createSalesGraph = {
                    labels: graphLabels,
                    datasets: salesDatasets
                }
                let createdTotalGraph = {
                    labels: graphLabels,
                    datasets: [...salesDatasets, ...orderDatasets]
                }
                setSalesRegistrationGraphData(createSalesGraph)
                setTotalRegistrationGraphData(createdTotalGraph);

                // 매출 그래프 요약 데이터 생성
                let salesData = setAnalysisResultText(salesDatasets)
                let totalData = setAnalysisResultText([...salesDatasets, ...orderDatasets]);

                // 매출액 내림차순으로 정렬
                salesData.sort((a, b) => b.value - a.value);
                totalData.sort((a, b) => b.value - a.value);

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
                let graphLabels = [];
                let channel = [...props.selectedChannel];

                for(let i = 0; i < props.registrationAndUnit.length; i++) {
                    let datetime = dateToYYMMDDAndDayName(props.registrationAndUnit[i].datetime);
                    if(searchDimension === 'week') {
                        datetime = dateToYYYYMM(props.registrationAndUnit[i].datetime) + '-' + getWeekNumber(props.registrationAndUnit[i].datetime) + '주차';
                    }else if(searchDimension === 'month') {
                        datetime = dateToYYYYMM(props.registrationAndUnit[i].datetime);
                    }
                    graphLabels.push(datetime);
                }

                channel.forEach(r => {
                    let salesUnit = [];
                    let orderUnit = [];

                    props.registrationAndUnit.forEach(r2 => {
                        let data = r2.performance?.filter(r3 => r3.salesChannel === r)[0];

                        salesUnit.push(data?.salesUnit || 0);
                        orderUnit.push(data?.orderUnit || 0);
                    })

                    salesUnitData.push(salesUnit);
                    orderUnitData.push(orderUnit);
                })
                
                let graphColor = SALES_CHNNAEL_GRAPH_BG_COLOR;
                for (let i = SALES_CHNNAEL_GRAPH_BG_COLOR.length; i < channel.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                // 판매 그래프 데이터 세팅
                if(channel.size === 0) {
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
                    salesDatasets.push(barGraphOfSales);
                } else {
                    channel.forEach((r, idx) => {
                        let barGraphOfSales = {
                            ...new GraphDataset().toJSON(),
                            type: 'bar',
                            label: r,
                            data: salesUnitData[idx],
                            borderColor: graphColor[idx],
                            backgroundColor: graphColor[idx],
                            borderWidth: 0,
                            order: 0
                        }
                        salesDatasets.push(barGraphOfSales);
                    })
                }

                // 주문 그래프 데이터 세팅
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
                    orderDatasets.push(lineGraphOfOrder);
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
                        orderDatasets.push(lineGraphOfOrder);
                    })
                }

                // 매출 그래프 데이터 생성
                let createSalesGraph = {
                    labels: graphLabels,
                    datasets: salesDatasets
                }
                let createdTotalGraph = {
                    labels: graphLabels,
                    datasets: [...salesDatasets, ...orderDatasets]
                }
                setSalesUnitGraphData(createSalesGraph)
                setTotalUnitGraphData(createdTotalGraph);

                // 매출 그래프 요약 데이터 생성
                let salesData = setAnalysisResultText(salesDatasets)
                let totalData = setAnalysisResultText([...salesDatasets, ...orderDatasets]);

                // 매출액 내림차순으로 정렬
                salesData.sort((a, b) => b.value - a.value);
                totalData.sort((a, b) => b.value - a.value);

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
            changeSearchDimension: (e) => {
                let value = e.target.value;
                setSearchDimension(value);

                let startDate = query.startDate ? getStartDate(query.startDate) : null;
                let endDate = query.endDate ? getEndDate(query.endDate) : null;
                let dimension = value || 'date';
                let channel = props.selectedChannel.join(",");
    
                let params = {
                    startDate,
                    endDate,
                    dimension,
                    channel
                }

                props.onActionSearchChannelRegistrationAndUnit(params);
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
                        totalGraphData={checkedSwitch ? totalRegistrationGraphData : salesRegistrationGraphData}
                        totalGraphOption={totalGraphOption}
                    />
                    <GraphSummaryFieldView
                        title={'[스토어별 총 판매건]'}
                        summaryData={checkedSwitch ? registrationSummaryData?.total : registrationSummaryData?.sales}
                    />
                </div>
                <div className='content-box'>
                    <GraphBodyFieldView
                        totalGraphData={checkedSwitch ? totalUnitGraphData : salesUnitGraphData}
                        totalGraphOption={totalGraphOption}
                    />
                    <GraphSummaryFieldView
                        title={'[스토어별 총 판매수량]'}
                        summaryData={checkedSwitch ? unitSummaryData?.total : unitSummaryData?.sales}
                    />
                </div>
            </Container>
        </>
    )
}
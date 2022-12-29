import { Container } from "./RegistrationAndUnitGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphSummaryFieldView from "./view/GraphSummaryField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { dateToYYYYMM, getWeekNumber } from "../../../../utils/dateFormatUtils";
import { dateToYYMMDDAndDayName, GraphDataset, setAnalysisResultText } from "../../../../utils/graphDataUtils";

// const SALES_CHNNAEL_GRAPH_BG_COLOR = ['#D678CD', '#FF7FAB', '#FF9D83', '#FFCA67', '#B9B4EB', '#00C894', '#D5CABD', '#389091', '#95C477'];
const SALES_CHNNAEL_GRAPH_BG_COLOR = ['#4975A9', '#80A9E1', '#D678CD', '#FF7FAB', '#FF9D83', '#FFCA67', '#B9B4EB', '#00C894', '#D5CABD', '#389091', '#95C477'];

// 판매스토어별 총 판매, 주문건 & 수량
export default function RegistrationAndUnitGraphComponent(props) {
    const [salesRegistrationGraphData, setSalesRegistrationGraphData] = useState(null);
    const [totalRegistrationGraphData, setTotalRegistrationGraphData] = useState(null);

    const [salesUnitGraphData, setSalesUnitGraphData] = useState(null);
    const [totalUnitGraphData, setTotalUnitGraphData] = useState(null);
    
    const [registrationSummaryData, setRegistrationSummaryData] = useState(null);
    const [unitSummaryData, setUnitSummaryData] = useState(null);
    
    const [totalGraphOption, setTotalGraphOption] = useState(null);

    useEffect(() => {
        __handle.action.resetGraphData();
    }, [props.category])

    useEffect(() => {
        if(!props.selectedCategory) {
            __handle.action.resetGraphData();
            return;
        }

        if(!props.searchDimension) {
            return;
        }

        if(!(props.registrationAndUnit && props.registrationAndUnit.length > 0)) {
            __handle.action.resetGraphData();
            return;
        }

        __handle.action.createRegistrationGraphData();
        __handle.action.createUnitGraphData();
        __handle.action.createGraphOption();
    }, [props.selectedCategory, props.registrationAndUnit, props.searchDimension])

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
                let graphLabels = new Set([]);
                let category = [...props.selectedCategory];

                for(let i = 0; i < props.registrationAndUnit.length; i++) {
                    let datetime = dateToYYMMDDAndDayName(props.registrationAndUnit[i].datetime);
                    if(props.searchDimension === 'week') {
                        datetime = dateToYYYYMM(props.registrationAndUnit[i].datetime) + '-' + getWeekNumber(props.registrationAndUnit[i].datetime) + '주차';
                    }else if(props.searchDimension === 'month') {
                        datetime = dateToYYYYMM(props.registrationAndUnit[i].datetime);
                    }
                    graphLabels.add(datetime);
                }

                category.forEach(r => {
                    let salesRegistration = [];
                    let orderRegistration = [];
                    let dateValue = new Set([]);

                    for(let i = 0; i < props.registrationAndUnit.length; i++) {
                        let data = props.registrationAndUnit[i];
                        let datetime = dateToYYMMDDAndDayName(data.datetime);
                        if (props.searchDimension === 'week') {
                            datetime = dateToYYYYMM(data.datetime) + '-' + getWeekNumber(data.datetime) + '주차';
                        } else if (props.searchDimension === 'month') {
                            datetime = dateToYYYYMM(data.datetime);
                        }
                        
                        let performance = data.performances?.filter(r3 => r3.productCategoryName === r)[0];
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
                    }

                    salesRegistrationData.push(salesRegistration);
                    orderRegistrationData.push(orderRegistration);
                })
                
                let graphColor = SALES_CHNNAEL_GRAPH_BG_COLOR;
                for (let i = SALES_CHNNAEL_GRAPH_BG_COLOR.length; i < category.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                // 판매 그래프 데이터 세팅
                if(category.size === 0) {
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
                    category.forEach((r, idx) => {
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
                if(category.size === 0) {
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
                    category.forEach((r, idx) => {
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
                    labels: [...graphLabels],
                    datasets: salesDatasets
                }
                let createdTotalGraph = {
                    labels: [...graphLabels],
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
                let graphLabels = new Set([]);
                let category = [...props.selectedCategory];

                for(let i = 0; i < props.registrationAndUnit.length; i++) {
                    let datetime = dateToYYMMDDAndDayName(props.registrationAndUnit[i].datetime);
                    if(props.searchDimension === 'week') {
                        datetime = dateToYYYYMM(props.registrationAndUnit[i].datetime) + '-' + getWeekNumber(props.registrationAndUnit[i].datetime) + '주차';
                    }else if(props.searchDimension === 'month') {
                        datetime = dateToYYYYMM(props.registrationAndUnit[i].datetime);
                    }
                    graphLabels.add(datetime);
                }

                category.forEach(r => {
                    let salesUnit = [];
                    let orderUnit = [];
                    let dateValue = new Set([]);

                    for(let i = 0; i < props.registrationAndUnit.length; i++) {
                        let data = props.registrationAndUnit[i];
                        let datetime = dateToYYMMDDAndDayName(data.datetime);
                        if (props.searchDimension === 'week') {
                            datetime = dateToYYYYMM(data.datetime) + '-' + getWeekNumber(data.datetime) + '주차';
                        } else if (props.searchDimension === 'month') {
                            datetime = dateToYYYYMM(data.datetime);
                        }
                        
                        let performance = data.performances?.filter(r3 => r3.productCategoryName === r)[0];
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
                    }

                    salesUnitData.push(salesUnit);
                    orderUnitData.push(orderUnit);
                })
                
                let graphColor = SALES_CHNNAEL_GRAPH_BG_COLOR;
                for (let i = SALES_CHNNAEL_GRAPH_BG_COLOR.length; i < category.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                // 판매 그래프 데이터 세팅
                if(category.size === 0) {
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
                    category.forEach((r, idx) => {
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
                if(category.size === 0) {
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
                    category.forEach((r, idx) => {
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
                    labels: [...graphLabels],
                    datasets: salesDatasets
                }
                let createdTotalGraph = {
                    labels: [...graphLabels],
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
            }
        }
    }

    return (
        <>
            <Container>
                <GraphBoardFieldView />
                <div className='content-box'>
                    <GraphBodyFieldView
                        totalGraphData={props.checkedSwitch ? totalRegistrationGraphData : salesRegistrationGraphData}
                        totalGraphOption={totalGraphOption}
                    />
                    <GraphSummaryFieldView
                        title={'[스토어별 총 판매건]'}
                        summaryData={props.checkedSwitch ? registrationSummaryData?.total : registrationSummaryData?.sales}
                    />
                </div>
                <div className='content-box'>
                    <GraphBodyFieldView
                        totalGraphData={props.checkedSwitch ? totalUnitGraphData : salesUnitGraphData}
                        totalGraphOption={totalGraphOption}
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
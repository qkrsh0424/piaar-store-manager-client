import { Container } from "./RegistrationAndUnitGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphSummaryFieldView from "./view/GraphSummaryField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import { dateToYYYYMMDDAndDayName, getMonthAndSearchDateRange, getWeekNumberAndSearchDateRange } from "../../../../utils/dateFormatUtils";
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

    useEffect(() => {
        if(!props.selectedOptions) {
            return;
        }

        if(!props.searchDimension) {
            return;
        }

        if(!props.searchDataControl) {
            return;
        }

        if(!props.registrationAndUnit) {
            __handle.action.resetGraphData();
            return;
        }

        if(props.searchDataControl === 'product') {
            __handle.action.createRegistrationGraphDataByProduct();
            __handle.action.createUnitGraphDataByProduct();
        } else if(props.searchDataControl === 'option') {
            __handle.action.createRegistrationGraphDataByOption();
            __handle.action.createUnitGraphDataByOption();
        }
        __handle.action.createGraphOption();
    }, [props.selectedOptions, props.registrationAndUnit, props.searchDimension, props.searchDataControl])

    const __handle = {
        action: {
            resetGraphData: () => {
                setSalesUnitGraphData(null);
                setTotalUnitGraphData(null);
                setRegistrationSummaryData(null);
                setUnitSummaryData(null);
                setGraphOption(null);
            },
            createRegistrationGraphDataByProduct: () => {
                let salesRegistrationData = [];
                let orderRegistrationData = [];
                let salesDatasets = [];
                let orderDatasets = [];
                let graphLabels = new Set([]);
                let searchProduct = [...new Set(props.selectedOptions.map(r => JSON.stringify(r.product)))].map(r => JSON.parse(r));

                let minimumDate = props.registrationAndUnit[0].datetime;
                let maximumDate = props.registrationAndUnit.slice(-1)[0].datetime;

                // 상품별 판매건 계산
                let registrationAndUnitData = props.registrationAndUnit.map(r => {
                    let salesPerformances = [];
                    r.performances.forEach(r2 => {
                        let data = salesPerformances.filter(r3 => r3.productCode === r2.productCode)[0];

                        if(data) {
                            salesPerformances = salesPerformances.map(r3 => {
                                if(r3.productCode === r2.productCode) {
                                    return {
                                        productCode: r3.productCode,
                                        productDefaultName: r3.productDefaultName,
                                        salesRegistration: r3.salesRegistration + r2.salesRegistration,
                                        orderRegistration: r3.orderRegistration + r2.orderRegistration
                                    }
                                }else {
                                    return r3;
                                }
                            })
                        }else {
                            let data = {
                                productCode: r2.productCode,
                                productDefaultName: r2.productDefaultName,
                                salesRegistration: r2.salesRegistration,
                                orderRegistration: r2.orderRegistration
                            }
                            salesPerformances.push(data)
                        }
                    })

                    return {
                        ...r,
                        performances: salesPerformances
                    }
                })

                registrationAndUnitData.forEach(data => {
                    let datetime = dateToYYYYMMDDAndDayName(data.datetime);
                    if(props.searchDimension === 'week') {
                        datetime = getWeekNumberAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                    }else if(props.searchDimension === 'month') {
                        datetime = getMonthAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                    }
                    graphLabels.add(datetime);
                })

                searchProduct.forEach(r => {
                    let salesRegistration = [];
                    let orderRegistration = [];
                    let dateValue = new Set([]);

                    registrationAndUnitData.forEach(data => {
                        let datetime = dateToYYYYMMDDAndDayName(data.datetime);
                        if (props.searchDimension === 'week') {
                            datetime = getWeekNumberAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                        } else if (props.searchDimension === 'month') {
                            datetime = getMonthAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                        }
                        
                        let performance = data.performances?.filter(r3 => r3.productCode === r.code)[0];
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
                for (let i = SALES_GRAPH_BG_COLOR.length; i < props.selectedOptions.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                // 판매 그래프 데이터 세팅
                if(searchProduct.size === 0) {
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
                    searchProduct.forEach((r, idx) => {
                        let lineGraphOfOrder = {
                            ...new GraphDataset().toJSON(),
                            type: 'line',
                            label: '(주문) ' + r.defaultName,
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
                            label: r.defaultName,
                            data: salesRegistrationData[idx],
                            borderColor: graphColor[idx],
                            backgroundColor: graphColor[idx],
                            borderWidth: 0,
                            order: 0
                        }
                        orderDatasets.push(lineGraphOfOrder);
                        salesDatasets.push(barGraphOfSales);
                    })
                }

                // 매출 그래프 데이터 생성
                let createSalesGraph = {
                    labels: [...graphLabels],
                    datasets: [...salesDatasets]
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
                salesData = _.sortBy(salesData, 'value').reverse();
                totalData = _.sortBy(totalData, 'value').reverse();

                setRegistrationSummaryData({
                    sales: salesData,
                    total: totalData
                });
            },
            createRegistrationGraphDataByOption: () => {
                let salesRegistrationData = [];
                let orderRegistrationData = [];
                let salesDatasets = [];
                let orderDatasets = [];
                let graphLabels = new Set([]);

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

                props.selectedOptions.forEach(r => {
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
                        
                        let performance = data.performances?.filter(r3 => r3.optionCode === r.option.code)[0];
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
                for (let i = SALES_GRAPH_BG_COLOR.length; i < props.selectedOptions.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                // 판매 그래프 데이터 세팅
                if(props.selectedOptions.size === 0) {
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
                    props.selectedOptions.forEach((r, idx) => {
                        let lineGraphOfOrder = {
                            ...new GraphDataset().toJSON(),
                            type: 'line',
                            label: '(주문) ' + r.product.defaultName + " [" + r.option.defaultName + "]",
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
                            label: r.product.defaultName + " [" + r.option.defaultName + "]",
                            data: salesRegistrationData[idx],
                            borderColor: graphColor[idx],
                            backgroundColor: graphColor[idx],
                            borderWidth: 0,
                            order: 0
                        }
                        orderDatasets.push(lineGraphOfOrder);
                        salesDatasets.push(barGraphOfSales);
                    })
                }

                // 매출 그래프 데이터 생성
                let createSalesGraph = {
                    labels: [...graphLabels],
                    datasets: [...salesDatasets]
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
                salesData = _.sortBy(salesData, 'value').reverse();
                totalData = _.sortBy(totalData, 'value').reverse();

                setRegistrationSummaryData({
                    sales: salesData,
                    total: totalData
                });
            },
            createUnitGraphDataByProduct: () => {
                let salesUnitData = [];
                let orderUnitData = [];
                let salesDatasets = [];
                let orderDatasets = [];
                let graphLabels = new Set([]);
                let searchProduct = [...new Set(props.selectedOptions.map(r => JSON.stringify(r.product)))].map(r => JSON.parse(r));
                
                let minimumDate = props.registrationAndUnit[0].datetime;
                let maximumDate = props.registrationAndUnit.slice(-1)[0].datetime;

                // 상품별 판매수량 계산
                let registrationAndUnitData = props.registrationAndUnit.map(r => {
                    let salesPerformances = [];
                    r.performances.forEach(r2 => {
                        let data = salesPerformances.filter(r3 => r3.productCode === r2.productCode)[0];

                        if(data) {
                            salesPerformances = salesPerformances.map(r3 => {
                                if(r3.productCode === r2.productCode) {
                                    return {
                                        productCode: r3.productCode,
                                        productDefaultName: r3.productDefaultName,
                                        salesUnit: r3.salesUnit + r2.salesUnit,
                                        orderUnit: r3.orderUnit + r2.orderUnit
                                    }
                                }else {
                                    return r3;
                                }
                            })
                        }else {
                            let data = {
                                productCode: r2.productCode,
                                productDefaultName: r2.productDefaultName,
                                salesUnit: r2.salesUnit,
                                orderUnit: r2.orderUnit
                            }
                            salesPerformances.push(data)
                        }
                    })

                    return {
                        ...r,
                        performances: salesPerformances
                    }
                })

                registrationAndUnitData.forEach(data => {
                    let datetime = dateToYYYYMMDDAndDayName(data.datetime);
                    if(props.searchDimension === 'week') {
                        datetime = getWeekNumberAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                    }else if(props.searchDimension === 'month') {
                        datetime = getMonthAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                    }
                    graphLabels.add(datetime);
                })

                searchProduct.forEach(r => {
                    let salesUnit = [];
                    let orderUnit = [];
                    let dateValue = new Set([]);

                    registrationAndUnitData.forEach(data => {
                        let datetime = dateToYYYYMMDDAndDayName(data.datetime);
                        if (props.searchDimension === 'week') {
                            datetime = getWeekNumberAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                        } else if (props.searchDimension === 'month') {
                            datetime = getMonthAndSearchDateRange(data.datetime, minimumDate, maximumDate);
                        }
                        
                        let performance = data.performances?.filter(r3 => r3.productCode === r.code)[0];
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
                for (let i = SALES_GRAPH_BG_COLOR.length; i < props.selectedOptions.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                // 판매 그래프 데이터 세팅
                if(searchProduct.size === 0) {
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
                    searchProduct.forEach((r, idx) => {
                        let lineGraphOfOrder = {
                            ...new GraphDataset().toJSON(),
                            type: 'line',
                            label: '(주문) ' + r.defaultName,
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
                            label: r.defaultName,
                            data: salesUnitData[idx],
                            borderColor: graphColor[idx],
                            backgroundColor: graphColor[idx],
                            borderWidth: 0,
                            order: 0
                        }
                        orderDatasets.push(lineGraphOfOrder);
                        salesDatasets.push(barGraphOfSales);
                    })
                }

                // 매출 그래프 데이터 생성
                let createSalesGraph = {
                    labels: [...graphLabels],
                    datasets: [...salesDatasets]
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
                salesData = _.sortBy(salesData, 'value').reverse();
                totalData = _.sortBy(totalData, 'value').reverse();

                setUnitSummaryData({
                    sales: salesData,
                    total: totalData
                });
            },
            createUnitGraphDataByOption: () => {
                let salesUnitData = [];
                let orderUnitData = [];
                let salesDatasets = [];
                let orderDatasets = [];
                let graphLabels = new Set([]);

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

                props.selectedOptions.forEach(r => {
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
                        
                        let performance = data.performances?.filter(r3 => r3.optionCode === r.option.code)[0];
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
                for (let i = SALES_GRAPH_BG_COLOR.length; i < props.selectedOptions.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                // 판매 그래프 데이터 세팅
                if(props.selectedOptions.size === 0) {
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
                    props.selectedOptions.forEach((r, idx) => {
                        let lineGraphOfOrder = {
                            ...new GraphDataset().toJSON(),
                            type: 'line',
                            label: '(주문) ' + r.product.defaultName + " [" + r.option.defaultName + "]",
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
                            label: r.product.defaultName + " [" + r.option.defaultName + "]",
                            data: salesUnitData[idx],
                            borderColor: graphColor[idx],
                            backgroundColor: graphColor[idx],
                            borderWidth: 0,
                            order: 0
                        }
                        orderDatasets.push(lineGraphOfOrder);
                        salesDatasets.push(barGraphOfSales);
                    })
                }

                // 매출 그래프 데이터 생성
                let createSalesGraph = {
                    labels: [...graphLabels],
                    datasets: [...salesDatasets]
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
                    }
                }

                setGraphOption(option);
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
                        graphOption={graphOption}
                    />
                    <GraphSummaryFieldView
                        title={'[상품별 총 판매건]'}
                        summaryData={props.checkedSwitch ? registrationSummaryData?.total : registrationSummaryData?.sales}
                    />
                </div>
                <div className='content-box'>
                    <GraphBodyFieldView
                        totalGraphData={props.checkedSwitch ? totalUnitGraphData : salesUnitGraphData}
                        graphOption={graphOption}
                    />
                    <GraphSummaryFieldView
                        title={'[상품별 총 판매수량]'}
                        summaryData={props.checkedSwitch ? unitSummaryData?.total : unitSummaryData?.sales}
                    />
                </div>
            </Container>
        </>
    )
}
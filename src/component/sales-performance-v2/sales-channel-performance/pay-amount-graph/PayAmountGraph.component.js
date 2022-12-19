import { Container } from "./PayAmountGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphSummaryFieldView from "./view/GraphSummaryField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import { dateToYYYYMM, getEndDate, getStartDate, getWeekNumber } from "../../../../utils/dateFormatUtils";
import { dateToYYMMDDAndDayName, GraphDataset, setAnalysisResultText } from "../../../../utils/graphDataUtils";
import useSalesChannelPayAmountHook from "./hooks/useSalesChannelPayAmountHook";

const SALES_CHNNAEL_GRAPH_BG_COLOR = ['#D678CD', '#FF7FAB', '#FF9D83', '#FFCA67', '#B9B4EB', '#00C894', '#D5CABD', '#389091', '#95C477'];

// 판매스토어별 총 매출액은 
export default function PayAmountGraphComponent(props) {
    const [searchDimension, setSearchDimension] = useState('date');

    const [salesPayAmountGraphData, setSalesPayAmountGraphData] = useState(null);
    const [totalPayAmountGraphData, setTotalPayAmountGraphData] = useState(null);

    const [salesSummaryData, setSalesSummaryData] = useState(null);

    const [payAmountGraphOption, setPayAmountGraphOption] = useState(null);
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
        payAmount: payAmount,
        reqSearchSalesChannelPayAmount
    } = useSalesChannelPayAmountHook()

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
            await reqSearchSalesChannelPayAmount(params);
            onActionCloseBackdrop();
        }

        if (!(query.startDate && query.endDate)) {
            __handle.action.resetGraphData();
            return;
        }
        fetchInit();
    }, [location])

    useEffect(() => {
        if (!props.salesChannel) {
            return;
        }

        if (!(payAmount && payAmount.length > 0)) {
            __handle.action.resetGraphData();
            return;
        }

        __handle.action.createGraphData();
        __handle.action.createGraphOption();
    }, [props.salesChannel, payAmount])

    const __handle = {
        action: {
            resetGraphData: () => {
                setTotalPayAmountGraphData(null);

                setSalesPayAmountGraphData(null);
                setSalesSummaryData(null);

                setPayAmountGraphOption(null);
            },
            createGraphData: () => {
                let salesPayAmountData = [];
                let orderPayAmountData = [];
                let salesDatasets = [];
                let orderDatasets = [];
                let graphLabels = [];
                let channel = [...props.salesChannel];

                for (let i = 0; i < payAmount.length; i++) {
                    let datetime = dateToYYMMDDAndDayName(payAmount[i].datetime);
                    if (searchDimension === 'week') {
                        datetime = dateToYYYYMM(payAmount[i].datetime) + '-' + getWeekNumber(payAmount[i].datetime) + '주차';
                    } else if (searchDimension === 'month') {
                        datetime = dateToYYYYMM(payAmount[i].datetime);
                    }
                    graphLabels.push(datetime);
                }

                channel.forEach(r => {
                    let salesPayAmount = [];
                    let orderPayAmount = [];

                    payAmount.forEach(r2 => {
                        let data = r2.performance?.filter(r3 => r3.salesChannel === r)[0];
                        
                        salesPayAmount.push(data?.salesPayAmount || 0);
                        orderPayAmount.push(data?.orderPayAmount || 0);
                    })

                    salesPayAmountData.push(salesPayAmount);
                    orderPayAmountData.push(orderPayAmount);
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
                        label: '판매 매출액',
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
                            data: salesPayAmountData[idx],
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
                        label: '주문 매출액',
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
                            data: orderPayAmountData[idx],
                            borderColor: graphColor[idx] + '88',
                            backgroundColor: graphColor[idx] + '88',
                            order: -1,
                            pointRadius: 2
                        }
                        orderDatasets.push(lineGraphOfOrder);
                    })
                }

                // // 매출 그래프 데이터 생성
                let createdSalesGraph = {
                    labels: graphLabels,
                    datasets: salesDatasets
                }
                let createdTotalGraph = {
                    labels: graphLabels,
                    datasets: [...salesDatasets, ...orderDatasets]
                }

                setSalesPayAmountGraphData(createdSalesGraph);
                setTotalPayAmountGraphData(createdTotalGraph);
                
                // // 매출 그래프 요약 데이터 생성
                let salesData = setAnalysisResultText(salesDatasets);

                // 매출액 내림차순으로 정렬
                salesData.sort((a, b) => b.value - a.value);
                setSalesSummaryData(salesData);
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

                setPayAmountGraphOption(option);
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
                await reqSearchSalesChannelPayAmount(params);
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
                        payAmountGraphOption={payAmountGraphOption}
                    />
                    <GraphSummaryFieldView
                        summaryData={salesSummaryData}
                    />
                </div>
            </Container>

            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    )
}
import { useEffect, useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { getDayName, getWeekName } from "../../../../utils/dateFormatUtils";
import { GraphDataset } from "../../../../utils/graphDataUtils";
import { toPriceUnitFormat } from "../../../../utils/numberFormatUtils";
import { Container } from "./PayAmountDayOfWeekGraph.styled";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import GraphBodyFieldView from "./view/GraphBodyField.view";

const SALES_GRAPH_BG_COLOR = ['#4975A9', '#ffca9f', '#FF7FAB', '#80A9E1', '#f9f871', '#D678CD', '#B9B4EB', '#70dbc2', '#D5CABD', '#389091'];

export default function PayAmountDayOfWeekGraphComponent(props) {
    const [salesGraphData, setSalesGraphData] = useState(null);
    const [totalGraphOption, setTotalGraphOption] = useState(null);
    
    const {
        location,
        query,
        navigateParams
    } = useRouterHook();

    useEffect(() => {
        __handle.action.resetGraphData();
    }, [props.salesChannel])

    useEffect(() => {
        if (!props.selectedChannel) {
            __handle.action.resetGraphData();
            return;
        }

        if(!(props.dayOfWeekPayAmount && props.dayOfWeekPayAmount.length > 0)) {
            __handle.action.resetGraphData();
            return;
        }

        __handle.action.createGraphData();
        __handle.action.createGraphOption();
    }, [props.selectedChannel, props.dayOfWeekPayAmount])

    const __handle = {
        action: {
            resetGraphData: () => {
                setSalesGraphData(null);
                setTotalGraphOption(null);
            },
            createGraphData: () => {
                let salesPayAmountData = [];
                let salesDatasets = [];
                let graphLabels = getWeekName();
                let channel = [...props.selectedChannel];

                let channelPayAmount = channel.map(r => {
                    let data = getWeekName().map(r2 => {
                        return {
                            dayName: r2,
                            salesPayAmount: 0,
                            frequency: 0
                        }
                    })

                    return {
                        channel: r,
                        payAmountData: data
                    }
                });

                /**
                 * channelPayAmount = [
                 *  {
                 *      channel: A,
                 *      payAmountData: [
                 *          {dayName: '일', salesPayAmount: -, frequency: -},
                 *          {dayName: '월', salesPayAmount: -. freqiemcy: -},
                 *          ...
                 *      ]
                 *  },
                 *  {
                 *      ...
                 *  }
                 * ]
                 */
                channelPayAmount = channelPayAmount.map(r => {
                    let channelPayAmountData = [...r.payAmountData];

                    for(let i = 0; i < props.dayOfWeekPayAmount.length; i++) {
                        let day = getDayName(props.dayOfWeekPayAmount[i].datetime);

                        props.dayOfWeekPayAmount[i].performances.forEach(r2 => {
                            if(r2.salesChannel === r.channel) {
                                channelPayAmountData = channelPayAmountData.map(r3 => {
                                    if(r3.dayName === day) {
                                        return {
                                            ...r3,
                                            salesPayAmount: r3.salesPayAmount + r2.salesPayAmount,
                                            frequency: r3.frequency + 1
                                        }
                                    }else {
                                        return r3;
                                    }
                                });
                            };
                        });
                    }

                    return {
                        ...r,
                        payAmountData : channelPayAmountData
                    }
                });

                channelPayAmount.forEach(r => {
                    let channelSalesPayAmountData = [];
                    for(let i = 0; i < r.payAmountData.length; i++) {
                        let salesAvg = parseInt((r.payAmountData[i].salesPayAmount) / r.payAmountData[i].frequency);
                    
                        channelSalesPayAmountData.push(salesAvg);
                    }

                    salesPayAmountData.push(channelSalesPayAmountData);
                })

                let graphColor = SALES_GRAPH_BG_COLOR;
                for (let i = SALES_GRAPH_BG_COLOR.length; i < channel.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

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
                    channelPayAmount.forEach((r, idx) => {
                        let barGraphOfSales = {
                            ...new GraphDataset().toJSON(),
                            type: 'bar',
                            label: r.channel,
                            data: salesPayAmountData[idx],
                            borderColor: graphColor[idx],
                            backgroundColor: graphColor[idx],
                            borderWidth: 0,
                            order: 0
                        }
                        salesDatasets.push(barGraphOfSales);
                    })
                }

                // 매출 그래프 데이터 생성
                let createdSalesGraph = {
                    labels: graphLabels,
                    datasets: salesDatasets
                }

                setSalesGraphData(createdSalesGraph);
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
                                    return toPriceUnitFormat(value);
                                }
                            }
                        }
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
                        totalGraphData={salesGraphData}
                        totalGraphOption={totalGraphOption}
                    />
                </div>
            </Container>
        </>
    )
}
import { Container } from "./BestOptionGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import { GraphDataset } from "../../../../utils/graphDataUtils";
import { toPriceUnitFormat } from "../../../../utils/numberFormatUtils";
import _ from "lodash";

const DEFAULT_GRAPH_BG_COLOR = ['#4975A9', '#80A9E1'];

const BEST_UNIT = 15;
// 판매스토어별 총 매출액
export default function BestOptionGraphComponent(props) {
    const [salesPayAmountGraphData, setSalesPayAmountGraphData] = useState(null);
    const [totalPayAmountGraphData, setTotalPayAmountGraphData] = useState(null);
    const [salesUnitGraphData, setSalesUnitGraphData] = useState(null);
    const [totalUnitGraphData, setTotalUnitGraphData] = useState(null);

    const [priceGraphOption, setPriceGraphOption] = useState(null);
    const [unitGraphOption, setUnitGraphOption] = useState(null);

    useEffect(() => {
        if (!(props.performance && props.performance.length > 0)) {
            __handle.action.resetGraphData();
            return;
        }

        __handle.action.createPayAmountGraphData();
        __handle.action.createUnitDate();
        __handle.action.createGraphOption();
    }, [props.performance])

    const __handle = {
        action: {
            resetGraphData: () => {
                setSalesPayAmountGraphData(null);
                setTotalPayAmountGraphData(null);
                setSalesUnitGraphData(null);
                setTotalUnitGraphData(null);

                setPriceGraphOption(null);
                setUnitGraphOption(null);
            },
            createPayAmountGraphData: () => {
                let bestSalesPayAmount = _.sortBy(props.performance, 'salesPayAmount').reverse().slice(0, BEST_UNIT);
                let graphLabels = bestSalesPayAmount.map(r => r.productDefaultName + " [" + r.optionDefaultName + "]");

                let salesPayAmount = bestSalesPayAmount.map(r => r.salesPayAmount);
                let orderPayAmount = bestSalesPayAmount.map(r => r.orderPayAmount);

                let salesPayAmountDatasets = {
                    ...new GraphDataset().toJSON(),
                    type: 'bar',
                    label: '판매 매출액',
                    data: salesPayAmount,
                    backgroundColor: DEFAULT_GRAPH_BG_COLOR[0],
                    borderColor: DEFAULT_GRAPH_BG_COLOR[0],
                    borderWidth: 0,
                    order: 0
                }

                let orderPayAmountDatasets = {
                    ...new GraphDataset().toJSON(),
                    type: 'line',
                    label: '(주문) 매출액',
                    data: orderPayAmount,
                    fill: false,
                    backgroundColor: DEFAULT_GRAPH_BG_COLOR[0] + '88',
                    borderColor: DEFAULT_GRAPH_BG_COLOR[0] + '88',
                    order: -1,
                    pointRadius: 2
                }

                let createdSalesGraph = {
                    labels: [...graphLabels],
                    datasets: [salesPayAmountDatasets]
                }

                let createdTotalGraph = {
                    labels: [...graphLabels],
                    datasets: [salesPayAmountDatasets, orderPayAmountDatasets]
                }

                setSalesPayAmountGraphData(createdSalesGraph);
                setTotalPayAmountGraphData(createdTotalGraph);
            },
            createUnitDate: () => {
                let bestSalesUnit = _.sortBy(props.performance, 'salesUnit').reverse().slice(0, BEST_UNIT);
                let graphLabels = bestSalesUnit.map(r => r.productDefaultName + " [" + r.optionDefaultName + "]");

                let salesUnit = bestSalesUnit.map(r => r.salesUnit);
                let orderUnit = bestSalesUnit.map(r => r.orderUnit);

                let salesUnitDatasets = {
                    ...new GraphDataset().toJSON(),
                    type: 'bar',
                    label: '판매 수량',
                    data: salesUnit,
                    backgroundColor: DEFAULT_GRAPH_BG_COLOR[1],
                    borderColor: DEFAULT_GRAPH_BG_COLOR[1],
                    borderWidth: 0,
                    order: 0
                }

                let orderUnitDatasets = {
                    ...new GraphDataset().toJSON(),
                    type: 'line',
                    label: '(주문) 수량',
                    data: orderUnit,
                    fill: false,
                    backgroundColor: DEFAULT_GRAPH_BG_COLOR[1] + '88',
                    borderColor: DEFAULT_GRAPH_BG_COLOR[1] + '88',
                    order: -1,
                    pointRadius: 2
                }

                let createdSalesGraph = {
                    labels: [...graphLabels],
                    datasets: [salesUnitDatasets]
                }

                let createdTotalGraph = {
                    labels: [...graphLabels],
                    datasets: [salesUnitDatasets, orderUnitDatasets]
                }

                setSalesUnitGraphData(createdSalesGraph);
                setTotalUnitGraphData(createdTotalGraph);
            },
            createGraphOption: () => {
                let priceOption = {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'index',
                        intersect: true,
                    },
                    indexAxis: 'y',
                    scales: {
                        x: {
                            ticks: {
                                callback: function (value, index, ticks) {
                                    return toPriceUnitFormat(value);
                                }
                            }
                        },
                        y: {
                            // 글자 수 7글자로 제한
                            afterTickToLabelConversion: function (scaleInstance) {
                                let ticks = scaleInstance.ticks;

                                let updatedTicks = ticks.map(r => {
                                    let updatedLabel = r.label
                                    if(r.label.length > 8) {
                                        return {
                                            ...r,
                                            label : updatedLabel.substring(0, 7) + "..."
                                        }
                                    }else {
                                        return r;
                                    }
                                })
                                
                                scaleInstance.ticks = updatedTicks;
                            }
                        }
                    }
                }

                let unitOption = {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'y',
                        intersect: false,
                    },
                    indexAxis: 'y',
                    scales: {
                        y: {
                            // 글자 수 7글자로 제한
                            afterTickToLabelConversion: function (scaleInstance) {
                                let ticks = scaleInstance.ticks;

                                let updatedTicks = ticks.map(r => {
                                    let updatedLabel = r.label
                                    if(r.label.length > 8) {
                                        return {
                                            ...r,
                                            label : updatedLabel.substring(0, 7) + "..."
                                        }
                                    }else {
                                        return r;
                                    }
                                })
                                
                                scaleInstance.ticks = updatedTicks;
                            }
                        }
                    }
                }

                setPriceGraphOption(priceOption);
                setUnitGraphOption(unitOption);
            }
        }
    }

    return (
        <>
            <Container>
                <GraphBoardFieldView />
                <div className='content-box'>
                    <GraphBodyFieldView
                        payAmountGraphData={props.checkedSwitch ? totalPayAmountGraphData : salesPayAmountGraphData}
                        unitGraphData={props.checkedSwitch ? totalUnitGraphData : salesUnitGraphData}
                        priceGraphOption={priceGraphOption}
                        unitGraphOption={unitGraphOption}
                    />
                </div>
            </Container>
        </>
    )
}
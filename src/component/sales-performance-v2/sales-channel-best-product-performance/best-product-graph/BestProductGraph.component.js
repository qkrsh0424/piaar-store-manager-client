import { Container } from "./BestProductGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import { GraphDataset } from "../../../../utils/graphDataUtils";
import { toPriceUnitFormat } from "../../../../utils/numberFormatUtils";
import _ from "lodash";
import { getEndDate, getStartDate } from "../../../../utils/dateFormatUtils";

const DEFAULT_GRAPH_BG_3COLOR = ['#ADA8C3', '#C0C5DC'];

// 판매스토어별 총 매출액
export default function BestProductGraphComponent(props) {
    const [salesPayAmountGraphData, setSalesPayAmountGraphData] = useState(null);
    const [totalPayAmountGraphData, setTotalPayAmountGraphData] = useState(null);
    const [salesUnitGraphData, setSalesUnitGraphData] = useState(null);
    const [totalUnitGraphData, setTotalUnitGraphData] = useState(null);

    const [priceGraphOption, setPriceGraphOption] = useState(null);
    const [unitGraphOption, setUnitGraphOption] = useState(null);

    const [payAmountGraphLabels, setPayAmountGraphLabels] = useState(null);
    const [unitGraphLabels, setUnitGraphLabels] = useState(null);

    useEffect(() => {
        if (!(props.performance && props.performance.length > 0)) {
            __handle.action.resetGraphData();
            return;
        }

        __handle.action.createPayAmountGraphData();
        __handle.action.createUnitDate();
    }, [props.performance])

    useEffect(() => {
        if(!(totalPayAmountGraphData && totalUnitGraphData)) {
            return;
        }

        __handle.action.createGraphOption();
    }, [totalPayAmountGraphData, totalUnitGraphData])

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
                let graphLabels = [];
                let productCodeLabels = [];
                
                props.performance.forEach(r => {
                    graphLabels.push(r.productDefaultName);
                    productCodeLabels.push(r.productCode);
                });
                setPayAmountGraphLabels(productCodeLabels);
    
                let salesPayAmount = props.performance.map(r => r.salesPayAmount);
                let orderPayAmount = props.performance.map(r => r.orderPayAmount);

                let salesPayAmountDatasets = {
                    ...new GraphDataset().toJSON(),
                    type: 'bar',
                    label: '판매 매출액',
                    data: salesPayAmount,
                    backgroundColor: DEFAULT_GRAPH_BG_3COLOR[0],
                    borderColor: DEFAULT_GRAPH_BG_3COLOR[0],
                    borderWidth: 0,
                    order: 0
                }

                let orderPayAmountDatasets = {
                    ...new GraphDataset().toJSON(),
                    type: 'line',
                    label: '(주문) 매출액',
                    data: orderPayAmount,
                    fill: false,
                    backgroundColor: DEFAULT_GRAPH_BG_3COLOR[0] + '88',
                    borderColor: DEFAULT_GRAPH_BG_3COLOR[0] + '88',
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
                let graphLabels = [];
                let productCodeLabels = [];
                props.performance.forEach(r => {
                    graphLabels.push(r.productDefaultName);
                    productCodeLabels.push(r.productCode);
                });
                setUnitGraphLabels(productCodeLabels);

                let salesUnit = props.performance.map(r => r.salesUnit);
                let orderUnit = props.performance.map(r => r.orderUnit);

                let salesUnitDatasets = {
                    ...new GraphDataset().toJSON(),
                    type: 'bar',
                    label: '판매 수량',
                    data: salesUnit,
                    backgroundColor: DEFAULT_GRAPH_BG_3COLOR[1],
                    borderColor: DEFAULT_GRAPH_BG_3COLOR[1],
                    borderWidth: 0,
                    order: 0
                }

                let orderUnitDatasets = {
                    ...new GraphDataset().toJSON(),
                    type: 'line',
                    label: '(주문) 수량',
                    data: orderUnit,
                    fill: false,
                    backgroundColor: DEFAULT_GRAPH_BG_3COLOR[1] + '88',
                    borderColor: DEFAULT_GRAPH_BG_3COLOR[1] + '88',
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
                    },
                    onClick: function (e, item) {
                        __handle.action.setPayAmountGraphClickOption(e, item);
                    },
                    onHover: (e, item) => {
                        const target = e.native ? e.native.target : e.target;
                        target.style.cursor = item[0] ? 'pointer' : 'default';
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
                    },
                    onClick: function (e, item) {
                        __handle.action.setUnitGraphClickOption(e, item);
                    },
                    onHover: (e, item) => {
                        const target = e.native ? e.native.target : e.target;
                        target.style.cursor = item[0] ? 'pointer' : 'default';
                    }
                }

                setPriceGraphOption(priceOption);
                setUnitGraphOption(unitOption);
            },
            setPayAmountGraphClickOption: (e, item) => {
                if(item.length === 0) return;

                var itemIdx = item[0].index;
                var label = payAmountGraphLabels[itemIdx];

                let startDate = getStartDate(props.detailSearchValue.startDate);
                let endDate = getEndDate(props.detailSearchValue.endDate);
                let productCodes = [label];

                let detailSearchValue = {
                    startDate,
                    endDate,
                    productCodes
                }

                props.onActionOpenDetailGraphSelectorModal(detailSearchValue);
            },
            setUnitGraphClickOption: (e, item) => {
                if(item.length === 0) return;

                var itemIdx = item[0].index;
                var label = unitGraphLabels[itemIdx];

                let startDate = getStartDate(props.detailSearchValue.startDate);
                let endDate = getEndDate(props.detailSearchValue.endDate);
                let productCodes = [label];

                let detailSearchValue = {
                    startDate,
                    endDate,
                    productCodes
                }

                props.onActionOpenDetailGraphSelectorModal(detailSearchValue);
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
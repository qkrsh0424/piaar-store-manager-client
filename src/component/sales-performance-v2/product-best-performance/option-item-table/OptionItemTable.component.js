import { Container } from "./OptionItemTable.styled";
import _ from "lodash";
import TableFieldView from "./view/TableField.view";
import { useEffect, useState } from "react";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import TableBoardFieldView from "./view/TableBoardField.view";
import { GraphDataset } from "../../../../utils/graphDataUtils";
import { toPriceUnitFormat } from "../../../../utils/numberFormatUtils";

const DEFAULT_GRAPH_BG_COLOR = ['#4975A9', '#80A9E1'];


// 판매스토어별 총 매출액
export default function OptionItemTableComponent(props) {
    const [tableData, setTableData] = useState(null);
    const [viewType, setViewType] = useState('table');

    const [salesPayAmountGraphData, setSalesPayAmountGraphData] = useState(null);
    const [totalPayAmountGraphData, setTotalPayAmountGraphData] = useState(null);
    const [salesUnitGraphData, setSalesUnitGraphData] = useState(null);
    const [totalUnitGraphData, setTotalUnitGraphData] = useState(null);

    const [priceGraphOption, setPriceGraphOption] = useState(null);
    const [unitGraphOption, setUnitGraphOption] = useState(null);

    useEffect(() => {
        if(!props.performance) {
            return;
        }

        __handle.action.initTableData();
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
            initTableData: () => {
                let tableData = [...new Set(props.performance.map(r => JSON.stringify({
                    productCode: r.productCode,
                    productDefaultName: r.productDefaultName,
                    performance: []
                })))].map(r => JSON.parse(r));

                props.performance.forEach(r => {
                    tableData = tableData.map(r2 => {
                        if(r.productCode === r2.productCode) {
                            let data = r2.performance;
                            data.push(r);

                            return {
                                ...r2,
                                performance: data
                            }
                        }else {
                            return r2;
                        }
                    });
                })

                setTableData(tableData);
            },
            changeViewType: (e) => {
                let value = e.target.value;
                setViewType(value);
            },
            createPayAmountGraphData: () => {
                let graphLabels = props.performance.map(r => r.productDefaultName + " [" + r.optionDefaultName + "]");

                let salesPayAmount = props.performance.map(r => r.salesPayAmount);
                let orderPayAmount = props.performance.map(r => r.orderPayAmount);

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
                let graphLabels = props.performance.map(r => r.productDefaultName + " [" + r.optionDefaultName + "]");


                let salesUnit = props.performance.map(r => r.salesUnit);
                let orderUnit = props.performance.map(r => r.orderUnit);

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
                    maxBarThickness: 20,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'y',
                        intersect: false,
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
                                    if (r.label.length > 11) {
                                        return {
                                            ...r,
                                            label: updatedLabel.substring(0, 10) + "..."
                                        }
                                    } else {
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
                    maxBarThickness: 20,
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
                                    if (r.label.length > 11) {
                                        return {
                                            ...r,
                                            label: updatedLabel.substring(0, 10) + "..."
                                        }
                                    } else {
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
                <TableBoardFieldView
                    viewType={viewType}
                    onChangeViewType={__handle.action.changeViewType}
                />
                <div className='content-box'>
                    {viewType === 'table' &&
                        <TableFieldView
                            tableData={tableData}
                            detailSearchValue={props.detailSearchValue}
                        />
                    }

                    {viewType === 'graph' &&
                        <GraphBodyFieldView
                            payAmountGraphData={props.checkedSwitch ? totalPayAmountGraphData : salesPayAmountGraphData}
                            unitGraphData={props.checkedSwitch ? totalUnitGraphData : salesUnitGraphData}
                            priceGraphOption={priceGraphOption}
                            unitGraphOption={unitGraphOption}
                        />
                    }
                </div>
            </Container>
        </>
    )
}
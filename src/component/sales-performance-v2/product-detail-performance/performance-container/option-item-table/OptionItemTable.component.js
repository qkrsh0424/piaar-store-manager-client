import { Container } from "./OptionItemTable.styled";
import _ from "lodash";
import TableFieldView from "./view/TableField.view";
import { useEffect, useState } from "react";
import { GraphDataset } from "../../../../../utils/graphDataUtils";
import TableBoardFieldView from "./view/TableBoardField.view";
import GraphBodyFieldView from "./view/GraphBodyField.view";

// const SALES_GRAPH_BG_COLOR = ['#4975A9', '#ffca9f', '#FF7FAB', '#80A9E1', '#f9f871', '#D678CD', '#B9B4EB', '#70dbc2', '#389091', '#EEE8A9', '#D5CABD'];
const SALES_GRAPH_BG_COLOR = ['#B9B4EB', '#F0B0E8', '#80A9E1', '#FFAFCC', '#F9F871', '#F1EDFF', '#EEE8A9', '#70dbc2', '#D5CABD', '#389091', '#A2ACBD'];
const OPTION_MAX_SIZE = 10;

// 판매스토어별 총 매출액
export default function OptionItemTableComponent(props) {
    const [tableData, setTableData] = useState(null);
    const [viewType, setViewType] = useState('table');

    const [salesPayAmountGraphData, setSalesPayAmountGraphData] = useState(null);
    const [salesUnitGraphData, setSalesUnitGraphData] = useState(null);

    const [graphOption, setGraphOption] = useState(null);

    useEffect(() => {
        if(!props.performance) {
            return;
        }

        __handle.action.initTableData();
    }, [props.performance])

    useEffect(() => {
        if(!props.performance) {
            return;
        }

        if(!(props.selectedOptions && props.selectedOptions.length > 0)) {
            __handle.action.resetGraphData();
            return;
        }

        __handle.action.createGraphData();
        __handle.action.createGraphOption();
    }, [props.performance, props.selectedOptions])

    const __handle = {
        action: {
            resetGraphData: () => {
                setSalesPayAmountGraphData(null);
                setSalesUnitGraphData(null);
            },
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
            isSelectedOption: (code) => {
                return props.selectedOptions.some(r => r.code === code);
            },
            changeViewType: (e) => {
                let value = e.target.value;
                setViewType(value);
            },
            createGraphData: () => {
                let payAmountData = [];
                let unitData = [];
                let payAmountSum = 0;
                let unitSum = 0;
                let worstOptionPayAmountSum = 0;
                let worstOptionUnitSum = 0;
                let optionCodes = props.selectedOptions.map(r => r.code);

                // 판매 매출액이 존재하면서 선택된 옵션코드에 포함된다면 그래프에 표시
                let performances = props.performance.filter(r => optionCodes.includes(r.optionCode) && r.salesPayAmount !== 0);
                let salesPerformance = _.sortBy(performances, 'salesPayAmount').reverse();
                let bestSalesPerformance = salesPerformance.slice(0, OPTION_MAX_SIZE);
                let graphLabels = bestSalesPerformance.map((r, idx) => (idx+1) + '. ' + r.optionDefaultName);

                salesPerformance.forEach((r, idx) => {
                    if(idx >= OPTION_MAX_SIZE) {
                        worstOptionPayAmountSum += r.salesPayAmount;
                        worstOptionUnitSum += r.salesUnit;
                    }
                    payAmountSum += r.salesPayAmount;
                    unitSum += r.salesUnit;
                });

                bestSalesPerformance.forEach(r => {
                    let payAmountValue = Math.round(((r.salesPayAmount / payAmountSum) * 100) || 0);
                    let unitValue = Math.round(((r.salesUnit / unitSum) * 100) || 0);

                    payAmountData.push(payAmountValue);
                    unitData.push(unitValue)
                });
                
                // BEST10 이하 데이터 추가
                if(performances.length > OPTION_MAX_SIZE && worstOptionPayAmountSum !== 0) {
                    graphLabels.push('기타');
                    payAmountData.push(Math.round(((worstOptionPayAmountSum / payAmountSum) * 100) || 0));
                    unitData.push(Math.round(((worstOptionUnitSum / unitSum) * 100) || 0));
                }

                let salesPayAmountDatasets = {
                    ...new GraphDataset().toJSON(),
                    type: 'doughnut',
                    label: '판매 매출액',
                    data: payAmountData,
                    fill: true,
                    backgroundColor: SALES_GRAPH_BG_COLOR,
                    borderColor: '#fff',
                    tension: 0
                }
                
                let salesUnitDatasets = {
                    ...new GraphDataset().toJSON(),
                    type: 'doughnut',
                    label: '판매 수량',
                    data: unitData,
                    fill: true,
                    backgroundColor: SALES_GRAPH_BG_COLOR,
                    borderColor: '#fff',
                    order: 0
                }

                let createdPayAmountGraph = {
                    labels: [...graphLabels],
                    datasets: [salesPayAmountDatasets]
                }
                
                let createdUnitGraph = {
                    labels: [...graphLabels],
                    datasets: [salesUnitDatasets]
                }

                setSalesPayAmountGraphData(createdPayAmountGraph);
                setSalesUnitGraphData(createdUnitGraph);
            },
            createGraphOption: () => {
                let option = {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '40%',
                    plugins: {
                        legend: {
                            position: 'right'
                        },
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    var label = tooltipItem?.label || '';
                                    var value = tooltipItem?.parsed || 0;
                                    return label + " : " + value + "%";
                                }
                            }
                        },
                        datalabels: {
                            formatter:function(value, context){
                                if(value <= 5) {
                                    return "";
                                }
                                return value + "%";
                            },
                            font: {
                                size: '14',
                                weight: '700',
                            },
                            color: 'white'
                        }
                    }
                }

                setGraphOption(option);
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
                            onActionIsSelectedOption={__handle.action.isSelectedOption}
                        />
                    }

                    {viewType === 'graph' &&
                        <GraphBodyFieldView
                            payAmountGraphData={salesPayAmountGraphData}
                            unitGraphData={salesUnitGraphData}
                            graphOption={graphOption}
                        />
                    }
                </div>
            </Container>
        </>
    )
}
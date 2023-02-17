import _ from "lodash";
import { useEffect, useState } from "react";
import { GraphDataset } from "../../../../utils/graphDataUtils";
import { Container } from "./BestCategoryGraph.styled";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import GraphBodyFieldView from "./view/GraphBodyField.view";

const SALES_GRAPH_BG_COLOR = ['#35848F', '#689CB5', '#9CB5D3', '#CECEEB', '#F3CAF2', '#FFC4DE', '#FFC8B4', '#FFDB86'];

export default function BestCategoryGraphComponent(props) {
    const [payAmountGraphData, setPayAmountGraphData] = useState(null);
    const [unitGraphData, setUnitGraphData] = useState(null);
    const [graphOption, setGraphOption] = useState(null);

    useEffect(() => {
        if (!props.category) {
            return;
        }

        if(!props.performance) {
            return;
        }

        __handle.action.createGraphData();
        __handle.action.createGraphOption();
    }, [props.category, props.performance])

    const __handle = {
        action: {
            createGraphData: () => {
                let graphLabels = [];
                let payAmountData = [];
                let unitData = [];
                let categoryPerformance = [...props.performance];
                let totalPayAmountSum = 0;
                let totalUnitSum = 0;

                categoryPerformance = categoryPerformance.map(r => {
                    let payAmountSum = 0;
                    let unitSum = 0;
                    r.performances.forEach(performance => {
                        payAmountSum += performance.salesPayAmount;
                        unitSum += performance.salesUnit;
                    });

                    totalPayAmountSum += payAmountSum;
                    totalUnitSum += unitSum;

                    return {
                        category: r.productCategoryName,
                        payAmount: payAmountSum,
                        unit: unitSum
                    };
                })

                categoryPerformance = _.sortBy(categoryPerformance, 'payAmount').reverse();
                categoryPerformance.forEach(r => {
                    let payAmountValue = Math.round(((r.payAmount / totalPayAmountSum) * 100) || 0);
                    let unitValue = Math.round(((r.unit / totalUnitSum) * 100) || 0);

                    graphLabels.push(r.category);
                    payAmountData.push(payAmountValue);
                    unitData.push(unitValue)
                });

                let graphColor = SALES_GRAPH_BG_COLOR;
                for (let i = SALES_GRAPH_BG_COLOR.length; i < graphLabels.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                let payAmountGraphDataset = {
                    ...new GraphDataset().toJSON(),
                    type: 'doughnut',
                    label: '판매 매출액',
                    data: payAmountData,
                    fill: true,
                    backgroundColor: graphColor,
                    borderColor: '#fff',
                    tension: 0,
                }
                
                let unitGraphDataset = {
                    ...new GraphDataset().toJSON(),
                    type: 'doughnut',
                    label: '판매 수량',
                    data: unitData,
                    fill: true,
                    backgroundColor: graphColor,
                    borderColor: '#fff',
                    tension: 0
                }

                let createdPayAmountGraph = {
                    labels: [...graphLabels],
                    datasets: [payAmountGraphDataset]
                }

                let createdUnitGraph = {
                    labels: [...graphLabels],
                    datasets: [unitGraphDataset]
                }

                setPayAmountGraphData(createdPayAmountGraph);
                setUnitGraphData(createdUnitGraph);
            },
            createGraphOption: () => {
                let option = {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '40%',
                    plugins: {
                        legend: {
                            position: 'right',
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
                                if(value < 5) {
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
        <Container>
            <GraphBoardFieldView
            />

            <div className='content-box'>
                <GraphBodyFieldView
                    payAmountGraphData={payAmountGraphData}
                    unitGraphData={unitGraphData}
    
                    graphOption={graphOption}
                />
            </div>
        </Container>
    )
}
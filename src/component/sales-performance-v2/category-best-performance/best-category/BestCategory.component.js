import _ from "lodash";
import { useEffect, useState } from "react";
import { GraphDataset, setAnalysisResultText } from "../../../../utils/graphDataUtils";
import { Container } from "./BestCategory.styled";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import GraphBodyFieldView from "./view/GraphBodyField.view";

const SALES_CHNNAEL_GRAPH_BG_COLOR = ['#4975A9', '#80A9E1', '#D678CD', '#FF7FAB', '#FF9D83', '#FFCA67', '#B9B4EB', '#00C894', '#D5CABD', '#389091', '#95C477'];

export default function BestCategoryComponent(props) {
    const [payAmountGraphData, setPayAmountGraphData] = useState(null);
    const [unitGraphData, setUnitGraphData] = useState(null);
    const [graphOption, setGraphOption] = useState(null);

    const [summaryData, setSummaryData] = useState(null);

    useEffect(() => {
        if(!(props.performance && props.performance.length > 0)) {
            __handle.action.resetGraphData();
            return;
        }

        __handle.action.createGraphData();
        __handle.action.createGraphOption();
    }, [props.performance])

    const __handle = {
        action: {
            resetGraphData: () => {

            },
            createGraphData: () => {
                let graphLabels = [];
                let payAmountData = [];
                let unitData = [];
                let categoryPerformance = [...props.performance];
                let totalPayAmountSum = 0;
                let totalUnitSum = 0;

                categoryPerformance = categoryPerformance.map(r => {
                    let payAmountSum = _.sumBy(r.performances, 'salesPayAmount');
                    let unitSum = _.sumBy(r.performances, 'salesUnit');

                    totalPayAmountSum += payAmountSum;
                    totalUnitSum += unitSum;

                    return {
                        category: r.productCategoryName,
                        payAmount: payAmountSum,
                        unit: unitSum
                    };
                })

                categoryPerformance.forEach(r => {
                    let payAmountValue = Math.round(((r.payAmount / totalPayAmountSum) * 100) || 0);
                    let unitValue = Math.round(((r.unit / totalUnitSum) * 100) || 0);

                    graphLabels.push(r.category);
                    payAmountData.push(payAmountValue);
                    unitData.push(unitValue)
                });

                let payAmountGraphDataset = {
                    ...new GraphDataset().toJSON(),
                    type: 'doughnut',
                    label: '판매 매출액',
                    data: payAmountData,
                    fill: true,
                    borderColor: SALES_CHNNAEL_GRAPH_BG_COLOR,
                    backgroundColor: SALES_CHNNAEL_GRAPH_BG_COLOR,
                    tension: 0,
                }
                
                let unitGraphDataset = {
                    ...new GraphDataset().toJSON(),
                    type: 'doughnut',
                    label: '판매 수량',
                    data: unitData,
                    fill: true,
                    borderColor: SALES_CHNNAEL_GRAPH_BG_COLOR,
                    backgroundColor: SALES_CHNNAEL_GRAPH_BG_COLOR,
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

                let summary = setAnalysisResultText([payAmountGraphDataset]);
                setSummaryData(summary);
            },
            createGraphOption: () => {
                let option = {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '40%',
                    plugins: {
                        legend: {
                            position: 'right'
                        }
                    },
                }

                setGraphOption(option);
            }
        }
    }

    return (
        <Container>
            <GraphBoardFieldView
            />

            {/* TODO :: summary data 띄우기 */}
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
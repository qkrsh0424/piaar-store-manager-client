import { Container, GraphFieldWrapper } from "./BestItemGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import { GraphDataset } from "../../../../utils/graphDataUtils";

const SALES_CHNNAEL_GRAPH_BG_COLOR = ['#4975A9', '#80A9E1', '#D678CD', '#FF7FAB', '#FF9D83', '#FFCA67', '#B9B4EB', '#00C894', '#D5CABD', '#389091', '#95C477'];

// 판매스토어별 총 매출액
export default function BestItemGraphComponent(props) {
    const [payAmountGraphData, setPayAmountGraphData] = useState(null);
    const [unitGraphData, setUnitGraphData] = useState(null);

    const [graphOption, setGraphOption] = useState(null);

    useEffect(() => {
        if (!props.category) {
            __handle.action.resetGraphData();
            return;
        }

        if (!(props.bestPayAmountItem && props.bestPayAmountItem.length > 0)) {
            __handle.action.resetGraphData();
            return;
        }

        __handle.action.createPayAmountGraphData();
        __handle.action.createBestUnitDate();
        __handle.action.createGraphOption();
    }, [props.category, props.bestPayAmountItem])

    const __handle = {
        action: {
            resetGraphData: () => {
                setPayAmountGraphData(null);
                setUnitGraphData(null);

                setGraphOption(null);
            },
            createPayAmountGraphData: () => {
                let graphLabels = [];
                
                for(let i  = 0; i < props.category.length; i++) {
                    let categoryItem = props.bestPayAmountItem.filter(r => r.categoryName === props.category[i])[0];
                    let productLabel = categoryItem.performances.map(r => r.productName);

                    graphLabels.push(productLabel);
                }

                let graphColor = SALES_CHNNAEL_GRAPH_BG_COLOR;
                for (let i = SALES_CHNNAEL_GRAPH_BG_COLOR.length; i < props.category.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                let salesPayAmountDatasets = props.bestPayAmountItem.map((r, idx) => {
                    let payAmountValues = r.performances.map(r2 => r2.salesPayAmount);
                    return {
                        ...new GraphDataset().toJSON(),
                        type: 'bar',
                        label: '판매 매출액',
                        data: payAmountValues,
                        backgroundColor: graphColor[idx],
                        borderColor: graphColor[idx],
                        borderWidth: 0,
                        order: 0
                    }
                })

                let orderPayAmountDatasets = props.bestUnitItem.map((r, idx) => {
                    let payAmountValues = r.performances.map(r2 => r2.orderPayAmount);
                    return {
                        ...new GraphDataset().toJSON(),
                        type: 'line',
                        label: '(주문) 매출액',
                        data: payAmountValues,
                        fill: false,
                        backgroundColor: graphColor[idx] + '88',
                        borderColor: graphColor[idx] + '88',
                        order: -1,
                        pointRadius: 2
                    }  
                })

                let createdSalesGraph = {
                    labels: [...graphLabels],
                    datasets: {
                        sales: salesPayAmountDatasets,
                        order: orderPayAmountDatasets
                    }
                }

                setPayAmountGraphData(createdSalesGraph);
            },
            createBestUnitDate: () => {
                let graphLabels = [];
                
                for(let i  = 0; i < props.category.length; i++) {
                    let categoryItem = props.bestUnitItem.filter(r => r.categoryName === props.category[i])[0];
                    let productLabel = categoryItem.performances.map(r => r.productName);

                    graphLabels.push(productLabel);
                }

                let graphColor = SALES_CHNNAEL_GRAPH_BG_COLOR;
                for (let i = SALES_CHNNAEL_GRAPH_BG_COLOR.length; i < props.category.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                let salesUnitDatasets = props.bestUnitItem.map((r, idx) => {
                    let unitValues = r.performances.map(r2 => r2.salesUnit);
                    return {
                        ...new GraphDataset().toJSON(),
                        type: 'bar',
                        label: '판매 수량',
                        data: unitValues,
                        backgroundColor: graphColor[idx],
                        borderColor: graphColor[idx],
                        borderWidth: 0,
                        order: 0
                    }
                })

                let orderUnitDatasets = props.bestUnitItem.map((r, idx) => {
                    let unitValues = r.performances.map(r2 => r2.orderUnit);
                    return {
                        ...new GraphDataset().toJSON(),
                        type: 'line',
                        label: '(주문) 수량',
                        data: unitValues,
                        fill: false,
                        backgroundColor: graphColor[idx] + '88',
                        borderColor: graphColor[idx] + '88',
                        order: -1,
                        pointRadius: 2
                    }  
                })

                let createdSalesGraph = {
                    labels: graphLabels,
                    datasets: {
                        sales: salesUnitDatasets,
                        order: orderUnitDatasets
                    }
                }

                setUnitGraphData(createdSalesGraph);
            },
            createGraphOption: () => {
                let option = {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'index',
                        intersect: true,
                    },
                    indexAxis: 'y'
                }

                setGraphOption(option);
            }
        }
    }

    return (
        <>
            <Container>
                {payAmountGraphData && unitGraphData &&
                    props.category?.map((r, idx) => {
                        let payAmountGraph = {
                            labels: [...payAmountGraphData.labels[idx]],
                            datasets: [payAmountGraphData.datasets.sales[idx]]
                        }
                        let unitGraph = {
                            labels: [...unitGraphData.labels[idx]],
                            datasets: [unitGraphData.datasets.sales[idx]]
                        }

                        
                        if(props.checkedSwitch) {
                            payAmountGraph = {
                                ...payAmountGraph,
                                datasets: [payAmountGraphData.datasets.sales[idx], payAmountGraphData.datasets.order[idx]]
                            }
                            unitGraph = {
                                ...unitGraph,
                                datasets: [unitGraphData.datasets.sales[idx], unitGraphData.datasets.order[idx]]
                            }
                        }
                        
                        return (
                            <GraphFieldWrapper key={'category-graph-idx' + idx}>
                                <GraphBoardFieldView
                                    categoryName={r}
                                />
                                <div className='content-box'>
                                    <GraphBodyFieldView
                                        payAmountGraphData={payAmountGraph}
                                        unitGraphData={unitGraph}
                                        graphOption={graphOption}
                                    />
                                </div>
                            </GraphFieldWrapper>
                        )
                    })
                }
            </Container>
        </>
    )
}
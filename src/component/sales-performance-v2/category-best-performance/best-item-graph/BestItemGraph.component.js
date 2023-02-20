import { Container, GraphFieldWrapper } from "./BestItemGraph.styled";
import GraphBodyFieldView from "./view/GraphBodyField.view";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import { useEffect, useState } from "react";
import { GraphDataset } from "../../../../utils/graphDataUtils";
import { toPriceUnitFormat } from "../../../../utils/numberFormatUtils";

const SALES_GRAPH_BG_COLOR = ['#6398C2', '#29658C', '#2FB3D3', '#00CCCD', '#35DABF', '#66E5AC', '#95EF95', '#C6F580', '#61EBE4', '#7CF6C2'];

// 판매스토어별 총 매출액
export default function BestItemGraphComponent(props) {
    const [payAmountGraphData, setPayAmountGraphData] = useState(null);
    const [unitGraphData, setUnitGraphData] = useState(null);

    const [priceGraphOption, setPriceGraphOption] = useState(null);
    const [unitGraphOption, setUnitGraphOption] = useState(null);

    useEffect(() => {
        if (!(props.category && props.category.length > 0)) {
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

                setPriceGraphOption(null);
                setUnitGraphOption(null);
            },
            createPayAmountGraphData: () => {
                let graphLabels = [];
                
                for(let i  = 0; i < props.category.length; i++) {
                    let categoryItem = props.bestPayAmountItem.filter(r => r.categoryName === props.category[i])[0];
                    let productLabel = categoryItem.performances.map(r => r.productDefaultName);

                    graphLabels.push(productLabel);
                }

                let graphColor = SALES_GRAPH_BG_COLOR;
                for (let i = SALES_GRAPH_BG_COLOR.length; i < props.category.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                let orderPayAmountDatasets = props.bestPayAmountItem.map((r, idx) => {
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
                let salesPayAmountDatasets = props.bestPayAmountItem.map((r, idx) => {
                    let payAmountValues = r.performances.map(r2 => r2.salesPayAmount);
                    return {
                        ...new GraphDataset().toJSON(),
                        type: 'bar',
                        label: '판매 매출액',
                        data: payAmountValues,
                        backgroundColor: graphColor[idx] + 'BB',
                        borderColor: graphColor[idx] + 'BB',
                        borderWidth: 0,
                        order: 0
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
                    let productLabel = categoryItem.performances.map(r => r.productDefaultName);

                    graphLabels.push(productLabel);
                }

                let graphColor = SALES_GRAPH_BG_COLOR;
                for (let i = SALES_GRAPH_BG_COLOR.length; i < props.category.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

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
                let salesUnitDatasets = props.bestUnitItem.map((r, idx) => {
                    let unitValues = r.performances.map(r2 => r2.salesUnit);
                    return {
                        ...new GraphDataset().toJSON(),
                        type: 'bar',
                        label: '판매 수량',
                        data: unitValues,
                        backgroundColor: graphColor[idx] + 'BB',
                        borderColor: graphColor[idx] + 'BB',
                        borderWidth: 0,
                        order: 0
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
                                        priceGraphOption={priceGraphOption}
                                        unitGraphOption={unitGraphOption}
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
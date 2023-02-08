import { useEffect, useState } from "react";
import { getDayName, getWeekName } from "../../../../utils/dateFormatUtils";
import { GraphDataset } from "../../../../utils/graphDataUtils";
import { toPriceUnitFormat } from "../../../../utils/numberFormatUtils";
import { Container } from "./PayAmountDayOfWeekGraph.styled";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import GraphBodyFieldView from "./view/GraphBodyField.view";

const SALES_GRAPH_BG_COLOR = ['#B9B4EB', '#F0B0E8', '#80A9E1', '#FFAFCC', '#F9F871', '#F1EDFF', '#80A9E1', '#70dbc2', '#D5CABD', '#389091'];

export default function PayAmountDayOfWeekGraphComponent(props) {
    const [salesGraphData, setSalesGraphData] = useState(null);
    const [graphOption, setGraphOption] = useState(null);

    useEffect(() => {
        if (!(props.selectedCategory && props.selectedCategory.length > 0)) {
            __handle.action.resetGraphData();
            return;
        }

        if(!props.dayOfWeekPayAmount) {
            return;
        }

        __handle.action.createGraphData();
        __handle.action.createGraphOption();
    }, [props.selectedCategory, props.dayOfWeekPayAmount])

    const __handle = {
        action: {
            resetGraphData: () => {
                setSalesGraphData(null);
            },
            createGraphData: () => {
                let salesPayAmountData = [];
                let salesDatasets = [];
                let graphLabels = getWeekName();
                let category = [...props.selectedCategory];

                let categoryPayAmount = category.map(r => {
                    let data = graphLabels.map(r2 => {
                        return {
                            dayName: r2,
                            salesPayAmount: 0,
                            frequency: 0
                        }
                    })

                    return {
                        category: r,
                        payAmountData: data
                    }
                });

                /**
                 * categoryPayAmount = [
                 *  {
                 *      category: A,
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
                categoryPayAmount = categoryPayAmount.map(r => {
                    let categoryPayAmountData = [...r.payAmountData];

                    props.dayOfWeekPayAmount.forEach(data => {
                        let day = getDayName(data.datetime);

                        data.performances.forEach(r2 => {
                            if(r2.productCategoryName === r.category) {
                                categoryPayAmountData = categoryPayAmountData.map(r3 => {
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
                    })

                    return {
                        ...r,
                        payAmountData : categoryPayAmountData
                    }
                });

                categoryPayAmount.forEach(r => {
                    let categorySalesPayAmountData = [];

                    r.payAmountData.forEach(data => {
                        let salesAvg = parseInt((data.salesPayAmount) / data.frequency);
                        categorySalesPayAmountData.push(salesAvg);
                    })
                    salesPayAmountData.push(categorySalesPayAmountData);
                })

                let graphColor = SALES_GRAPH_BG_COLOR;
                for (let i = SALES_GRAPH_BG_COLOR.length; i < category.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                if(category.size === 0) {
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
                    categoryPayAmount.forEach((r, idx) => {
                        let barGraphOfSales = {
                            ...new GraphDataset().toJSON(),
                            type: 'bar',
                            label: r.category,
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

                setGraphOption(option);
            }
        }
    }

    return (
        <>
            <Container>
                <GraphBoardFieldView />
                <div className='content-box'>
                    <GraphBodyFieldView
                        salesGraphData={salesGraphData}
                        graphOption={graphOption}
                    />
                </div>
            </Container>
        </>
    )
}
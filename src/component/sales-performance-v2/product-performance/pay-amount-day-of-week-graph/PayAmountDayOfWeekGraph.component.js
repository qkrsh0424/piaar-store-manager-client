import { useEffect, useState } from "react";
import { getDayName, getWeekName } from "../../../../utils/dateFormatUtils";
import { GraphDataset } from "../../../../utils/graphDataUtils";
import { toPriceUnitFormat } from "../../../../utils/numberFormatUtils";
import { Container } from "./PayAmountDayOfWeekGraph.styled";
import GraphBoardFieldView from "./view/GraphBoardField.view";
import GraphBodyFieldView from "./view/GraphBodyField.view";

const SALES_GRAPH_BG_COLOR = ['#35848F', '#6CDCBA', '#9CB5D3', '#CECEEB', '#F3CAF2', '#47CDBF', '#FFC8B4', '#FFDB86'];

export default function PayAmountDayOfWeekGraphComponent(props) {
    const [salesGraphData, setSalesGraphData] = useState(null);
    const [totalGraphOption, setTotalGraphOption] = useState(null);

    useEffect(() => {
        if (!props.selectedOptions) {
            return;
        }

        if(!props.searchDataControl) {
            return;
        }

        if(!props.dayOfWeekPayAmount) {
            __handle.action.resetGraphData();
            return;
        }

        if(props.searchDataControl === 'product') {
            __handle.action.createGraphDataByProduct();
        } else if(props.searchDataControl === 'option') {
            __handle.action.createGraphDataByOption();
        }
        __handle.action.createGraphOption();
    }, [props.selectedOptions, props.dayOfWeekPayAmount, props.searchDataControl])

    const __handle = {
        action: {
            resetGraphData: () => {
                setSalesGraphData(null);
                setTotalGraphOption(null);
            },
            createGraphDataByProduct: () => {
                let salesPayAmountData = [];
                let salesDatasets = [];
                let graphLabels = getWeekName();
                let searchProduct = [...new Set(props.selectedOptions.map(r => JSON.stringify(r.product)))].map(r => JSON.parse(r));

                let productPayAmount = searchProduct.map(r => {
                    let data = graphLabels.map(r2 => {
                        return {
                            dayName: r2,
                            salesPayAmount: 0,
                            frequency: 0
                        }
                    })

                    return {
                        productDefaultName: r.defaultName,
                        productCode: r.code,
                        payAmountData: data
                    }
                });

                /**
                 * channelPayAmount = [
                 *  {
                 *      ... ,
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
                productPayAmount = productPayAmount.map(r => {
                    let productPayAmountData = [...r.payAmountData];

                    props.dayOfWeekPayAmount.forEach(data => {
                        data.performances.forEach(r2 => {
                            if(r2.productCode === r.productCode) {
                                productPayAmountData = productPayAmountData.map(r3 => {
                                    if(r3.dayName === getDayName(data.datetime)) {
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
                        payAmountData : productPayAmountData
                    }
                });

                productPayAmount.forEach(r => {
                    let productSalesPayAmountData = [];
                    r.payAmountData.forEach(data => {
                        let salesAvg = parseInt((data.salesPayAmount) / data.frequency);
                        productSalesPayAmountData.push(salesAvg);
                    })

                    salesPayAmountData.push(productSalesPayAmountData);
                })

                let graphColor = SALES_GRAPH_BG_COLOR;
                for (let i = SALES_GRAPH_BG_COLOR.length; i < props.selectedOptions.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                if(searchProduct.size === 0) {
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
                    productPayAmount.forEach((r, idx) => {
                        let barGraphOfSales = {
                            ...new GraphDataset().toJSON(),
                            type: 'bar',
                            label: r.productDefaultName,
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
            createGraphDataByOption: () => {
                let salesPayAmountData = [];
                let salesDatasets = [];
                let graphLabels = getWeekName();

                let optionPayAmount = props.selectedOptions.map(r => {
                    let data = graphLabels.map(r2 => {
                        return {
                            dayName: r2,
                            salesPayAmount: 0,
                            frequency: 0
                        }
                    })

                    return {
                        productDefaultName: r.product.defaultName,
                        productCode: r.product.code,
                        optionDefaultName: r.option.defaultName,
                        optionCode: r.option.code,
                        payAmountData: data
                    }
                });

                /**
                 * channelPayAmount = [
                 *  {
                 *      ... ,
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
                optionPayAmount = optionPayAmount.map(r => {
                    let optionPayAmountData = [...r.payAmountData];

                    props.dayOfWeekPayAmount.forEach(data => {
                        data.performances.forEach(r2 => {
                            if(r2.optionCode === r.optionCode) {
                                optionPayAmountData = optionPayAmountData.map(r3 => {
                                    if(r3.dayName === getDayName(data.datetime)) {
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
                        payAmountData : optionPayAmountData
                    }
                });

                optionPayAmount.forEach(r => {
                    let optionSalesPayAmountData = [];
                    r.payAmountData.forEach(data => {
                        let salesAvg = parseInt((data.salesPayAmount) / data.frequency);
                        optionSalesPayAmountData.push(salesAvg);
                    })

                    salesPayAmountData.push(optionSalesPayAmountData);
                })

                let graphColor = SALES_GRAPH_BG_COLOR;
                for (let i = SALES_GRAPH_BG_COLOR.length; i < props.selectedOptions.length; i++) {
                    let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
                    graphColor.push(randomColor);
                }

                if(props.selectedOptions.size === 0) {
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
                    optionPayAmount.forEach((r, idx) => {
                        let barGraphOfSales = {
                            ...new GraphDataset().toJSON(),
                            type: 'bar',
                            label: r.productDefaultName + " [" + r.optionDefaultName + "]",
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
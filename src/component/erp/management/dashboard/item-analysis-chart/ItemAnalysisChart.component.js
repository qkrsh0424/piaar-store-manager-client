import { SatelliteTwoTone } from "@material-ui/icons";
import { useEffect, useReducer } from "react";
import { Container } from "./ItemAnalysisChart.styled";
import ChartFieldView from "./ChartField.view";
import DefaultChartFieldView from "./DefaultChartField.view";
import _ from "lodash";

const DEFAULT_CHART_COLUMN = ['totalRevenue', 'totalUnit', 'totalOrder'];

const DETAIL_CHART_COLUMN = ['salesChannel', 'categoryName', 'prodDefaultName'];
const ANALYSIS_ITEM = ['orderItemData', 'salesItemData', 'releaseCompleteItemData'];

const CHART_BG_COLOR = ['#908CB8BB', '#B9B4EBBB', '#F1EDFFBB']

const ItemAnalysisChartComponent = (props) => {
    const [orderItemData, dispatchOrderItemData] = useReducer(orderItemDataReducer, initialOrderItemData);
    const [salesItemData, dispatchSalesItemData] = useReducer(salesItemDataReducer, initialSalesItemData);
    const [releaseCompleteItemData, dispatchReleaseCompleteItemData] = useReducer(releaseCompleteItemDataReducer, initialReleaseCompleteItemData);

    const [barGraphData, dispatchBarGraphData] = useReducer(barGraphDataReducer, initialBarGraphData);
    const [doughnutGraphData, dispatchDoughnutGraphData] = useReducer(doughnutGraphDataReducer, initialDoughnutGraphData);


    useEffect(() => {
        if(!props.erpItemAnalysisData) {
            return;
        }

        _onAction_convertAnalysisItem();
    }, [props.erpItemAnalysisData]);

    useEffect(() => {
        if(!(orderItemData && salesItemData && releaseCompleteItemData)) {
            return;
        }
        
        // 바 그래프
        DEFAULT_CHART_COLUMN.forEach(r => {
            _onAction_createBarGraph(r);
        })

        // 도넛 그래프
        ANALYSIS_ITEM.forEach(item => {
            DETAIL_CHART_COLUMN.forEach(r => _onAction_createDoughnutGraph2(item, r));
        });
    }, [orderItemData, salesItemData, releaseCompleteItemData])

    const _onAction_convertAnalysisItem = () => {
        let data = [ ...props.erpItemAnalysisData ];

        let salesItem = data.filter(r => r.salesYn === 'y');

        let releaseCompleteItem = data.filter(r => r.releaseYn === 'y');

        dispatchOrderItemData({
            type: 'INIT_DATA',
            payload: data
        });

        dispatchSalesItemData({
            type: 'INIT_DATA',
            payload: salesItem
        });

        dispatchReleaseCompleteItemData({
            type: 'INIT_DATA',
            payload: releaseCompleteItem
        })
    }

    const _onAction_createBarGraph = (column) => {
        let orderAnalysis = 0;
        let salesAnalysis = 0;
        let releaseCompleteAnalysis = 0;
        let label = '데이터';

        // 매출기준
        if(column === 'totalRevenue') {
            label = '총 매출액';
            orderItemData.forEach(r => {
                orderAnalysis += parseInt(r.price) + parseInt(r.deliveryCharge);
                if(r.salesYn === 'y') {
                    salesAnalysis += parseInt(r.price) + parseInt(r.deliveryCharge);
                }
                if(r.releaseYn === 'y') {
                    releaseCompleteAnalysis += parseInt(r.price) + parseInt(r.deliveryCharge);
                }
            });
        }else if(column === 'totalUnit') {  // 수량 기준
            label = '총 주문수량';
            orderItemData.forEach(r => {
                orderAnalysis += parseInt(r.unit);
                if(r.salesYn === 'y') {
                    salesAnalysis += parseInt(r.unit);
                }
                if(r.releaseYn === 'y') {
                    releaseCompleteAnalysis += parseInt(r.unit);
                }
            });
        }else {     // 주문건 기준
            label = '총 주문건';
            orderAnalysis = orderItemData.length;
            salesAnalysis = salesItemData.length;
            releaseCompleteAnalysis = releaseCompleteItemData.length;
        }

        let datasets = [orderAnalysis, salesAnalysis, releaseCompleteAnalysis];
        
        dispatchBarGraphData({
            type: 'CHANGE_DATA',
            payload: {
                name: column,
                value: {
                    labels: ['주문', '판매', '출고'],
                    datasets: [{
                        label: label,
                        axis: 'y',
                        data: datasets,
                        backgroundColor: CHART_BG_COLOR,
                        borderWidth: 1,
                        fill: true
                    }
                    ]
                }
            }
        })
    }

    // const _onAction_createDoughnutGraph = (itemStatus, column) => {
    //     let labels = new Set([]);
    //     let analysis = {};
    //     let data = [];

    //     if(itemStatus === 'orderItemData') {
    //         data = [...orderItemData];
    //     }else if(itemStatus === 'salesItemData') {
    //         data = [...salesItemData];
    //     }else {
    //         data = [...releaseCompleteItemData];
    //     }

    //     data.forEach(r => {
    //         if (!r[column]) {
    //             labels.add('기타');
    //         } else {
    //             labels.add(r[column])
    //         }

    //         let prevRevenue = analysis[r[column]] || 0;
    //         analysis = {
    //             ...analysis,
    //             [r[column]]: prevRevenue + parseInt(r.price) + parseInt(r.deliveryCharge)
    //         }
    //     });

    //     console.log(analysis);

    //     let dataset = [];
    //     labels.forEach(r => dataset.push(analysis[r] || 0));

    //     let bgColor = dataset.map(data => `rgba(122, 123, 218, ${Math.random().toFixed(1) ?? 1})`);

    //     dispatchDoughnutGraphData({
    //         type: 'CHANGE_DATA',
    //         payload: {
    //             item: itemStatus,
    //             name: column,
    //             value: {
    //                 labels: [...labels],
    //                 datasets:
    //                     [
    //                         {
    //                             data: dataset,
    //                             backgroundColor: bgColor,
    //                             borderColor: bgColor,
    //                             borderWidth: 1
    //                         }
    //                     ]
    //             }
    //         }
    //     })
    // }

    const _onAction_createDoughnutGraph2 = (itemStatus, column) => {
        let labels = new Set([]);
        let analysis = [];
        let data = [];

        if(itemStatus === 'orderItemData') {
            data = [...orderItemData];
        }else if(itemStatus === 'salesItemData') {
            data = [...salesItemData];
        }else {
            data = [...releaseCompleteItemData];
        }

        data.forEach(r => {
            let matchName = '';
            if (!r[column]) {
                matchName = '기타';
            } else {
                matchName = r[column];
            }
            labels.add(matchName)

            let data = analysis.filter(r2 => r2.key === matchName)[0];

            if(data) {
                let result = analysis.map(r2 => {
                    if (r2.key === matchName) {
                        return r2 = {
                            ...r2,
                            value: parseInt(r2.value) + parseInt(r.price) + parseInt(r.deliveryCharge)
                        }
                    }else {
                        return r2;
                    }
                })

                analysis = [...result];
            } else {
                let data2 = {
                    key: matchName,
                    value: parseInt(r.price) + parseInt(r.deliveryCharge)
                }
                analysis.push(data2);
            }
        });

        let bestItem = _.sortBy(analysis, 'value').reverse();
        bestItem = bestItem.slice(0, 3);

        let resultLabels = bestItem.map(r => r.key);
        let dataset = bestItem.map(r => r.value);

        dispatchDoughnutGraphData({
            type: 'CHANGE_DATA',
            payload: {
                item: itemStatus,
                name: column,
                value: {
                    labels: resultLabels,
                    datasets:
                        [
                            {
                                data: dataset,
                                backgroundColor: CHART_BG_COLOR,
                                borderColor: CHART_BG_COLOR,
                                borderWidth: 1
                            }
                        ]
                }
            }
        })
    }
    
    return (
        <Container>
            {barGraphData &&
                <DefaultChartFieldView
                    barGraphData={barGraphData}
                ></DefaultChartFieldView>
            }
            {doughnutGraphData &&
                <ChartFieldView
                    doughnutGraphData={doughnutGraphData}
                ></ChartFieldView>
            }
        </Container>
    )
}

export default ItemAnalysisChartComponent;

const initialOrderItemData = null;
const initialSalesItemData = null;
const initialReleaseCompleteItemData = null;
const initialBarGraphData = {};
const initialDoughnutGraphData = {};

const orderItemDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialOrderItemData;
        default:
            return state;
    }
}

const salesItemDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSalesItemData;
        default:
            return state;
    }
}

const releaseCompleteItemDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialReleaseCompleteItemData;
        default:
            return state;
    }
}

const barGraphDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialBarGraphData;
        default:
            return state;
    }
}

const doughnutGraphDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.item] : {
                    ...state[action.payload.item],
                    [action.payload.name]: action.payload.value
                }
            }
        case 'CLEAR':
            return initialDoughnutGraphData;
        default:
            return state;
    }
}

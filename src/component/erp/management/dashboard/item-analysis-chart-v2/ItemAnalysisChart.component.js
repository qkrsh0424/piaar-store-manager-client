import { useEffect, useReducer } from "react";
import { Container } from "./ItemAnalysisChart.styled";
import ChartFieldView from "./ChartField.view";
import DefaultChartFieldView from "./DefaultChartField.view";
import _ from "lodash";

class GraphDataset {
    constructor() {
        this.type = 'bar';
        this.label = '';
        this.data = [];
        this.fill = false;
        this.borderColor = '#80A9E1';
        this.backgroundColor = '#80A9E1';
        this.tension = '0';
    }

    toJSON() {
        return {
            type: this.type,
            label: this.label,
            data: this.data,
            fill: this.fill,
            borderColor: this.borderColor,
            backgroundColor: this.backgroundColor,
            tension: this.tension
        }
    }
}

const DEFAULT_CHART_COLUMN = ['totalRevenue', 'totalUnit', 'totalOrder'];

const DETAIL_CHART_COLUMN = ['salesChannel', 'categoryName', 'prodDefaultName'];
const ANALYSIS_ITEM = ['orderItemData', 'salesItemData', 'releaseCompleteItemData'];

const CHART_BG_COLOR = ['#908CB8BB', '#B9B4EBBB', '#F1EDFFBB'];

const ItemAnalysisChartComponent = (props) => {
    const [orderItemData, dispatchOrderItemData] = useReducer(orderItemDataReducer, initialOrderItemData);
    const [salesItemData, dispatchSalesItemData] = useReducer(salesItemDataReducer, initialSalesItemData);
    const [releaseCompleteItemData, dispatchReleaseCompleteItemData] = useReducer(releaseCompleteItemDataReducer, initialReleaseCompleteItemData);

    const [barGraphData, dispatchBarGraphData] = useReducer(barGraphDataReducer, initialBarGraphData);
    const [doughnutGraphData, dispatchDoughnutGraphData] = useReducer(doughnutGraphDataReducer, initialDoughnutGraphData);


    useEffect(() => {
        if(!(props.erpItemAnalysisData && props.erpReleaseItemAnalysisData)) {
            return;
        }

        onActionConvertAnalysisItem();
    }, [props.erpItemAnalysisData, props.erpReleaseItemAnalysisData]);

    useEffect(() => {
        if(!(orderItemData && salesItemData && releaseCompleteItemData)) {
            return;
        }
        
        // 바 그래프
        DEFAULT_CHART_COLUMN.forEach(r => {
            onActionCreateBarGraph(r);
        })

        // 도넛 그래프
        ANALYSIS_ITEM.forEach(item => {
            DETAIL_CHART_COLUMN.forEach(r => onActionCreateDoughnutGraph(item, r));
        });
    }, [orderItemData, salesItemData, releaseCompleteItemData])

    const onActionConvertAnalysisItem = () => {
        let data = [ ...props.erpItemAnalysisData ];
        let salesItem = data.filter(r => r.salesYn === 'y');
        let releaseCompleteItem = [ ...props.erpReleaseItemAnalysisData ];

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

    const onActionCreateBarGraph = (column) => {
        let orderAnalysis = 0;
        let salesAnalysis = 0;
        let releaseCompleteAnalysis = 0;
        let label = '';
        let datasets = [];

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
        }else if(column === 'totalOrder'){     // 주문건 기준
            label = '총 주문건';
            orderAnalysis = orderItemData.length;
            salesAnalysis = salesItemData.length;
            releaseCompleteAnalysis = releaseCompleteItemData.length;
        }

        let data = [orderAnalysis, salesAnalysis, releaseCompleteAnalysis];

        let datshboardDataset = new GraphDataset().toJSON();
        datshboardDataset = {
            type: 'bar',
            label: label,
            data: data,
            fill: true,
            backgroundColor: CHART_BG_COLOR,
            borderColor: CHART_BG_COLOR,
            order: 0,
            tension: 0.1,
            axis: 'y',
        };
        datasets.push(datshboardDataset);

        dispatchBarGraphData({
            type: 'CHANGE_DATA',
            payload: {
                name: column,
                value: {
                    labels: ['주문', '판매', '출고'],
                    datasets
                }
            }
        })
    }
    
    // 주문, 판매, 출고 도넛그래프 데이터 생성
    const onActionCreateDoughnutGraph = (itemStatus, column) => {
        let analysis = [];
        let data = [];
        let matchColumn = new Set([]);
        let datasets = [];

        // itemStatus에 대응되는 데이터 사용 (주문/판매/출고)
        if(itemStatus === 'orderItemData') {
            data = [...orderItemData];
        }else if(itemStatus === 'salesItemData') {
            data = [...salesItemData];
        }else if(itemStatus === 'releaseCompleteItemData'){
            data = [...releaseCompleteItemData];
        }


        data.forEach(r => {
            matchColumn.add(r[column] || '미지정');
        })

        analysis = [...matchColumn].map(r => { 
            return {
                key: r,
                value: 0
            }
        });

        data.forEach(r => {
            let matchData = r[column] || '미지정';
            analysis = analysis.map(r2 => {
                if(r2.key === matchData) {
                    return {
                        ...r2,
                        value: parseInt(r2.value) + parseInt(r.price) + parseInt(r.deliveryCharge)
                    }
                }else {
                    return r2;
                }
            })
        })

        // best3 추출
        let bestItem = _.sortBy(analysis, 'value').reverse();
        bestItem = bestItem.slice(0, 3);

        let dataset = bestItem.map(r => r.value);

        let bestGraphDataset = new GraphDataset().toJSON();
        bestGraphDataset = {
            ...bestGraphDataset,
            type: 'doughnut',
            label: '매출액',
            data: dataset,
            fill: true,
            borderColor: CHART_BG_COLOR,
            backgroundColor: CHART_BG_COLOR,
            tension: 0
        }
        datasets.push(bestGraphDataset);

        let labels = bestItem.map(r => r.key);

        dispatchDoughnutGraphData({
            type: 'CHANGE_DATA',
            payload: {
                item: itemStatus,
                name: column,
                value: {
                    labels,
                    datasets
                }
            }
        })
    }

    return (
        <Container>
            <DefaultChartFieldView
                barGraphData={barGraphData}
            ></DefaultChartFieldView>
            <ChartFieldView
                doughnutGraphData={doughnutGraphData}
            ></ChartFieldView>
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

import { SatelliteTwoTone } from "@material-ui/icons";
import { useEffect, useReducer } from "react";
import { Container } from "./ItemAnalysisChart.styled";
import ChartFieldView from "./ChartField.view";
import DefaultChartFieldView from "./DefaultChartField.view";

const defaultAnalysisColumn = ['totalRevenue', 'totalUnit', 'totalOrder'];

const chartAnalysisColumn = ['salesChannel', 'categoryName', 'prodDefaultName'];
const chartAnalysisItem = ['orderItemData', 'salesItemData', 'releaseCompleteItemData'];
const chartBgColor = [ '#b9b4eb', '#b5bcff', '#908cb8']

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
        defaultAnalysisColumn.forEach(r => {
            _onAction_createBarGraph(r);
        })

        // 도넛 그래프
        chartAnalysisItem.forEach(item => {
            chartAnalysisColumn.forEach(r => _onAction_createDoughnutGraph(item, r));
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
        }else if(column === 'totalUnit') {
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
        }else {
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
                        backgroundColor: chartBgColor,
                        borderWidth: 1,
                        fill: true
                    }
                    ]
                }
            }
        })
    }

    const _onAction_createDoughnutGraph = (itemStatus, column) => {
        let labels = new Set([]);
        let analysis = {};
        let data = [];

        if(itemStatus === 'orderItemData') {
            data = [...orderItemData];
        }else if(itemStatus === 'salesItemData') {
            data = [...salesItemData];
        }else {
            data = [...releaseCompleteItemData];
        }

        data.forEach(r => {
            if (!r[column]) {
                labels.add('기타');
            } else {
                labels.add(r[column])
            }

            let prevRevenue = analysis[r[column]] || 0;
            analysis = {
                ...analysis,
                [r[column]]: prevRevenue + parseInt(r.price) + parseInt(r.deliveryCharge)
            }
        });

        let dataset = [];
        labels.forEach(r => dataset.push(analysis[r] || 0));

        let bgColor = dataset.map(data => `rgba(122, 123, 218, ${Math.random().toFixed(1) ?? 1})`);

        dispatchDoughnutGraphData({
            type: 'CHANGE_DATA',
            payload: {
                item: itemStatus,
                name: column,
                value: {
                    labels: [...labels],
                    datasets:
                        [
                            {
                                data: dataset,
                                backgroundColor: bgColor,
                                borderColor: bgColor,
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

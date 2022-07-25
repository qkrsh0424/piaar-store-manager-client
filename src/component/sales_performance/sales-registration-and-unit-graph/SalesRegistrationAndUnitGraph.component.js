import { useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { getDifferenceBetweenStartDateAndEndDate, getEndDate, getEndDateByWeekNumber, getEndDateOfMonth, getStartDate, getStartDateByWeekNumber, getStartDateOfMonth } from "../../../utils/dateFormatUtils";
import GraphAnalysisResultFieldView from "./GraphAnalysisResultField.view";
import GraphFieldView from "./GraphField.view";
import { Container, GraphTitleFieldWrapper } from "./SalesRegistrationAndUnitGraph.styled";
import { getAnalysisDateFormatToViewFormat, getDateToAnalysisRangeDateFormat, GraphDataset, setAnalysisResultText } from "../../../utils/graphDataUtils";

function GraphTitleField({ element }) {
    return (
        <GraphTitleFieldWrapper>
            {element}
        </GraphTitleFieldWrapper>
    );
}

// 그래프 기본 2가지 색상
const PIAAR_DEFAUTL_GRAPH_BG_COLOR = ['#B9B4EB', '#908CB8'];

const SalesRegistrationAndUnitGraphComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);

    const [analysisItem, dispatchAnalysisItem] = useReducer(analysisItemReducer, initialAnalysisItem);

    const [graphOption, dispatchGraphOption] = useReducer(graphOptionReducer, initialGraphOption);
    const [graphLabels, dispatchGraphLabels] = useReducer(graphLabelsReducer, initialGraphLabels);
    
    const [graphDatasets, dispatchGraphDatasets] = useReducer(graphDatasetsReducer, initialGraphDatasets);
    const [orderAnalysisGraphData, dispatchOrderAnalysisGraphData] = useReducer(orderAnalysisGraphDataReducer, initialOrderAnalysisGraphData);
    const [orderAnalysisResult, dispatchOrderAnalysisResult] = useReducer(orderAnalysisResultReducer, initialOrderAnalysisResult);


    useEffect(() => {
        if (!props.erpItemData) {
            return;
        }

        let data = props.erpItemData.map(r => r.erpOrderItem);
        dispatchAnalysisItem({
            type: 'INIT_DATA',
            payload: data
        })
    }, [props.erpItemData])

    // 총 판매건 & 수량 그래프 생성
    useEffect(() => {
        if (!analysisItem) {
            return;
        }

        dispatchGraphLabels({type: 'CLEAR'});
        dispatchGraphDatasets({type: 'CLEAR'});
        dispatchOrderAnalysisGraphData({type: 'CLEAR'});

        onActionCreateOrderAnalysisGraphData();
    }, [analysisItem, props.analysisDateRange])

    useEffect(() => {
        if(!(graphDatasets && graphLabels)) {
            return;
        }

        let gOption = {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            onClick: function (e, item) {
                onActionSetGraphOption(e, item)
            },
            onHover: (e, item) => {
                const target = e.native ? e.native.target : e.target;
                target.style.cursor = item[0] ? 'pointer' : 'default';
            }
        }

        dispatchGraphOption({
            type: 'INIT_DATA',
            payload: gOption
        })

        // 주문 데이터 표시 여부 바뀔 때마다 호출
        onActionSetGraphDataset();
    }, [graphLabels, graphDatasets, props.hideOrderGraph])

    // 2. 총 판매건 & 판매수량
    const onActionCreateOrderAnalysisGraphData = () => {
        let date = new Set([]);
        let analysis = [];
        let salesDatasets = [];
        let orderDatasets = [];

        let startDate = query.startDate;
        let endDate = query.endDate;

        let betweenDay = getDifferenceBetweenStartDateAndEndDate(startDate, endDate);
        for (let i = 0; i < betweenDay; i++) {
            let lastDate = new Date(endDate);
            lastDate.setDate(lastDate.getDate() - i);
            let addDate = getDateToAnalysisRangeDateFormat(props.analysisDateRange, lastDate);
            date.add(addDate);
        }

        // 조회 날짜별로 초기값 세팅
        analysis = [...date].map(r => {
            return {
                key: r,
                order: 0,
                unit: 0
            }
        });
        analysis.reverse();

        let salesAnalysis = [...analysis];
        let salesAnalysisItem = [...analysisItem].filter(r => r.salesYn ==='y');

        salesAnalysisItem.forEach(r => {
            let compareDate = getDateToAnalysisRangeDateFormat(props.analysisDateRange, r.channelOrderDate);
            salesAnalysis = salesAnalysis.map(r2 => {
                if (r2.key === compareDate) {
                    return r2 = {
                        ...r2,
                        order: parseInt(r2.order) + 1,
                        unit: parseInt(r2.unit) + parseInt(r.unit)
                    }
                } else {
                    return r2;
                }
            })
        })

        let salesData = salesAnalysis.map(r => r.order);
        let salesBarGraphDataset = new GraphDataset().toJSON();
        salesBarGraphDataset = {
            ...salesBarGraphDataset,
            type: 'bar',
            label: '판매건',
            data: salesData,
            fill: true,
            borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0],
            backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0]
        }
        salesDatasets.push(salesBarGraphDataset);

        let salesUnitData = salesAnalysis.map(r => r.unit);
        let salesUnitBarGraphDataset = new GraphDataset().toJSON();
        salesUnitBarGraphDataset = {
            ...salesUnitBarGraphDataset,
            type: 'bar',
            label: '판매 수량',
            data: salesUnitData,
            fill: true,
            borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1],
            backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1]
        }
        salesDatasets.push(salesUnitBarGraphDataset);

        // 전체 판매 매출액 분석 결과 텍스트 설정
        let salesAnalysisResult = setAnalysisResultText(salesDatasets);

        dispatchOrderAnalysisResult({
            type: 'INIT_DATA',
            payload: salesAnalysisResult
        })

        // 옵션 - 주문 그래프 값 세팅
        let orderAnalysis = [...analysis];

        analysisItem.forEach(r => {
            let compareDate = getDateToAnalysisRangeDateFormat(props.analysisDateRange, r.channelOrderDate);
            orderAnalysis = orderAnalysis.map(r2 => {
                if (r2.key === compareDate) {
                    return r2 = {
                        ...r2,
                        order: parseInt(r2.order) + 1,
                        unit: parseInt(r2.unit) + parseInt(r.unit)
                    }
                } else {
                    return r2;
                }
            })
        })

        let orderData = orderAnalysis.map(r => r.order);
        let orderBarGraphDataset = new GraphDataset().toJSON();
        orderBarGraphDataset = {
            ...orderBarGraphDataset,
            type: 'line',
            label: '주문건',
            data: orderData,
            borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0] + '88',
            backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0 + '88']
        }
        orderDatasets.push(orderBarGraphDataset);

        let orderUnitData = salesAnalysis.map(r => r.unit);
        let orderUnitBarGraphDataset = new GraphDataset().toJSON();
        orderUnitBarGraphDataset = {
            ...orderUnitBarGraphDataset,
            type: 'line',
            label: '주문 수량',
            data: orderUnitData,
            borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1] + '88',
            backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1] + '88'
        }
        orderDatasets.push(orderUnitBarGraphDataset);

        let labels = salesAnalysis.map(r => getAnalysisDateFormatToViewFormat(props.analysisDateRange, r.key));

        dispatchGraphLabels({
            type: 'INIT_DATA',
            payload: labels
        })

        dispatchGraphDatasets({
            type: 'INIT_DATA',
            payload: {
                sales: salesDatasets,
                order: orderDatasets
            }
        })
    }

    // hideOrderGraph 값에 따라 표시되는 데이터 변환
    const onActionSetGraphDataset = () => {
        let datasets = [...graphDatasets.sales];

        if(!props.hideOrderGraph) {
            datasets = datasets.concat([...graphDatasets.order]);
        }

        dispatchOrderAnalysisGraphData({
            type: 'INIT_DATA',
            payload: {
                labels: graphLabels,
                datasets
            }
        })
    }

    const onActionSetGraphOption = async (e, item) => {
        if(item.length === 0) return;

        var idx = item[0].index;
        var label = graphLabels[idx];

        let startDate = null;
        let endDate = null;
        let periodType = 'channelOrderDate';
        let salesYn = 'y';

        // 주문그래프가 보여지는 경우
        if(!props.hideOrderGraph) {
            salesYn = null;
        }

        if(props.analysisDateRange === 'date') {
            var date = new Date(label);
            startDate = getStartDate(date);
            endDate = getEndDate(date);
        }else if(props.analysisDateRange === 'week') {
            startDate = getStartDateByWeekNumber(label);
            endDate = getEndDateByWeekNumber(label);

            // 조회된 기간의 시작일
            if(idx === 0) {
                startDate = getStartDate(query.startDate);
            }
            // 조회된 기간의 마지막일
            if(idx === (graphLabels.length-1)){
                endDate = getEndDate(query.endDate);
            }
        }else if(props.analysisDateRange === 'month') {
            var date = new Date(label);
            startDate = getStartDate(getStartDateOfMonth(date));
            endDate = getEndDate(getEndDateOfMonth(date));
            
            // 조회된 기간의 시작일
            if(idx === 0) {
                startDate = getStartDate(query.startDate);
            }
            // 조회된 기간의 마지막일
            if(idx === (graphLabels.length-1)){
                endDate = getEndDate(query.endDate);
            }
        }

        let params = {
            startDate: startDate,
            endDate: endDate,
            periodType: periodType,
            salesYn: salesYn
        }

        await props._onAction_searchErpOrderGraphItemByParams(params);
    }

    return (
        <Container>
            {/* 총 주문건 & 수량 그래프 */}
            {orderAnalysisGraphData && graphOption &&
                <div className='graph-group'>
                    <GraphTitleField
                        element={
                            (<div className='title'>[ 총 판매건 & 수량 ]</div>)
                        }
                    ></GraphTitleField>
                    <div className='flex-box'>
                        <GraphFieldView
                            orderAnalysisGraphData={orderAnalysisGraphData}
                            graphOption={graphOption}
                        ></GraphFieldView>
                        <GraphAnalysisResultFieldView
                            orderAnalysisResult={orderAnalysisResult}
                        ></GraphAnalysisResultFieldView>
                    </div>
                </div>
            }
        </Container>
    )
}

export default SalesRegistrationAndUnitGraphComponent;

const initialOrderAnalysisGraphData = null;
const initialOrderAnalysisResult = null;
const initialAnalysisItem = null;
const initialGraphLabels = null;
const initialGraphDatasets = {};
const initialGraphOption = null;

const orderAnalysisGraphDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialOrderAnalysisGraphData;
        default:
            return state;
    }
}

const analysisItemReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialAnalysisItem;
        default:
            return state;
    }
}

const orderAnalysisResultReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialOrderAnalysisResult;
        default:
            return state;
    }
}

const graphLabelsReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialGraphLabels;
        default:
            return state;
    }
}

const graphDatasetsReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialGraphDatasets;
        default:
            return state;
    }
}

const graphOptionReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialGraphOption;
        default:
            return state;
    }
}

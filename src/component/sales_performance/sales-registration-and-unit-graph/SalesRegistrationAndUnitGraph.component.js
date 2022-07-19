import { useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { dateToMMDD, dateToYYYYMM, dateToYYYYMMDD, getDayName, getDifferenceBetweenStartDateAndEndDate, getWeekNumber } from "../../../utils/dateFormatUtils";
import GraphAnalysisResultFieldView from "./GraphAnalysisResultField.view";
import GraphFieldView from "./GraphField.view";
import { Container, GraphTitleFieldWrapper } from "./SalesRegistrationAndUnitGraph.styled";
import { getAnalysisDateFormatToViewFormat, getDateToAnalysisRangeDateFormat, GraphDataset, setAnalysisResultText } from "../../../utils/graphUtils";

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

        onActionCreateOrderAnalysisGraphData();
    }, [analysisItem, props.hideOrderGraph])

    // 2. 총 판매건 & 판매수량
    const onActionCreateOrderAnalysisGraphData = () => {
        let date = new Set([]);
        let analysis = [];
        let datasets = [];

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

        let labels = salesAnalysis.map(r => getAnalysisDateFormatToViewFormat(props.analysisDateRange, r.key));

        let orderData = salesAnalysis.map(r => r.order);
        let orderBarGraphDataset = new GraphDataset().toJSON();
        orderBarGraphDataset = {
            ...orderBarGraphDataset,
            type: 'bar',
            label: '판매건',
            data: orderData,
            fill: true,
            borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0],
            backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0]
        }
        datasets.push(orderBarGraphDataset);

        let unitData = salesAnalysis.map(r => r.unit);
        let unitBarGraphDataset = new GraphDataset().toJSON();
        unitBarGraphDataset = {
            ...unitBarGraphDataset,
            type: 'bar',
            label: '판매 수량',
            data: unitData,
            fill: true,
            borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1],
            backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1]
        }
        datasets.push(unitBarGraphDataset);

        // 전체 판매 매출액 분석 결과 텍스트 설정
        let orderAnalysis = setAnalysisResultText(datasets);

        dispatchOrderAnalysisResult({
            type: 'INIT_DATA',
            payload: orderAnalysis
        })

        // 주문그래프 숨기기 체크박스가 해제되어 있다면
        if (!props.hideOrderGraph) {
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
            datasets.push(orderBarGraphDataset);
    
            let unitData = salesAnalysis.map(r => r.unit);
            let unitBarGraphDataset = new GraphDataset().toJSON();
            unitBarGraphDataset = {
                ...unitBarGraphDataset,
                type: 'line',
                label: '주문 수량',
                data: unitData,
                borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1] + '88',
                backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1] + '88'
            }
            datasets.push(unitBarGraphDataset);
        }

        dispatchOrderAnalysisGraphData({
            type: 'INIT_DATA',
            payload: {
                labels: labels,
                datasets
            }
        })
    }

    return (
        <Container>
            {/* 총 주문건 & 수량 그래프 */}
            {orderAnalysisGraphData &&
                <div className='graph-group'>
                    <GraphTitleField
                        element={
                            (<div className='title'>[ 총 판매건 & 수량 ]</div>)
                        }
                    ></GraphTitleField>
                    <div className='flex-box'>
                        <GraphFieldView
                            orderAnalysisGraphData={orderAnalysisGraphData}
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

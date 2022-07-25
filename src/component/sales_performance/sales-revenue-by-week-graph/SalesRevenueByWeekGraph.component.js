import { useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { getDayName, getDifferenceBetweenStartDateAndEndDate, getEndDate, getEndDateByWeekNumber, getEndDateOfMonth, getStartDate, getStartDateByWeekNumber, getStartDateOfMonth, getWeekName } from "../../../utils/dateFormatUtils";
import GraphFieldView from "./GraphField.view";
import { Container, GraphTitleFieldWrapper } from "./SalesRevenueByWeekGraph.styled";
import { getDateToAnalysisRangeDateFormat, GraphDataset } from "../../../utils/graphDataUtils";

function GraphTitleField({ element }) {
    return (
        <GraphTitleFieldWrapper>
            {element}
        </GraphTitleFieldWrapper>
    );
}

// 그래프 색상
const ORDER_GRAPH_BG_COLOR = ['#D678CD', '#FF7FAB', '#FF9D83', '#FFCA67', '#B9B4EB', '#00C894', '#D5CABD', '#389091', '#95C477'];

const SalesRevenueByWeekGraphComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);

    const [analysisItem, dispatchAnalysisItem] = useReducer(analysisItemReducer, initialAnalysisItem);

    const [graphOption, dispatchGraphOption] = useReducer(graphOptionReducer, initialGraphOption);
    const [graphLabels, dispatchGraphLabels] = useReducer(graphLabelsReducer, initialGraphLabels);
    const [graphDatasets, dispatchGraphDatasets] = useReducer(graphDatasetsReducer, initialGraphDatasets);
    
    const [revenueByWeekGraphData, dispatchRevenueByWeekGraphData] = useReducer(revenueByWeekGraphDataReducer, initialRevenueByWeekGraphData);

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
        dispatchRevenueByWeekGraphData({type: 'CLEAR'});

        onActionCreateRevenueByWeekGraphData();
    }, [analysisItem, props.hideOrderGraph])

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
                onActionSetDayOfWeekGraphOption(e, item)
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
    }, [props.hideOrderGraph, graphLabels, graphDatasets])

    // 3. 요일별 매출액
    const onActionCreateRevenueByWeekGraphData = () => {
        let dayName = getWeekName();    // 일 ~ 토
        let date = new Set([]);
        let week = new Set([]);
        let analysis = [];
        let analysisByWeek = [];
        let salesDatasets = [];
        let orderDatasets = [];
        let salesDatasetsByWeek = [];
        let orderDatasetsByWeek = [];

        let startDate = query.startDate;
        let endDate = query.endDate;

        let betweenDay = getDifferenceBetweenStartDateAndEndDate(startDate, endDate);
        for (let i = 0; i < betweenDay; i++) {
            let lastDate = new Date(endDate);
            lastDate.setDate(lastDate.getDate() - i);
            let addDate = getDateToAnalysisRangeDateFormat('date', lastDate);
            let addWeek = getDateToAnalysisRangeDateFormat('week', lastDate);
            date.add(addDate);
            week.add(addWeek);
        }

        analysis = [...date].map(r => {
            return {
                key: r,
                value: 0
            }
        });

        // 주차 별 요일 데이터
        let weekValue = {};
        dayName.forEach(r => {
            weekValue = {
                ...weekValue,
                [r]: 0
            }
        })
        analysisByWeek = [...week].map(r => {
            return {
                key: r,
                value: weekValue
            }
        });
        analysisByWeek.reverse();

        let salesAnalysis = [...analysis];
        let salesAnalysisByWeek = [...analysisByWeek];
        let salesAnalysisItem = [...analysisItem].filter(r => r.salesYn ==='y');

        salesAnalysisItem.forEach(r => {
            let compareDate = getDateToAnalysisRangeDateFormat('date', r.channelOrderDate);
            salesAnalysis = salesAnalysis.map(r2 => {
                if (r2.key === compareDate) {
                    return r2 = {
                        ...r2,
                        value: parseInt(r2.value) + parseInt(r.price) + parseInt(r.deliveryCharge)
                    }
                } else {
                    return r2;
                }
            })
        })

        // 요일별 평균 매출액을 구하기 위해 count를 추가
        let total = dayName.map(r => {
            return {
                key: r,
                revenue: 0,
                count: 0
            }
        })

        salesAnalysis.forEach(r => {
            total = total.map(r2 => {
                if (r2.key === getDayName(r.key)) {
                    return {
                        ...r2,
                        revenue: r2.revenue + r.value,
                        count: r2.count + 1
                    }
                } else {
                    return r2;
                }
            })
        });

        // 요일별 평균 매출액 계산
        let totalAverage = [];
        total.forEach(r => {
            totalAverage = {
                ...totalAverage,
                [r.key]: r.revenue / r.count
            }
        })

        // [일, 월, 화, 수, 목, 금, 토] 로 정렬
        let totalRevenue = dayName.map(r => totalAverage[r]);
        let totalRevenueGraphDataset = new GraphDataset().toJSON();
        totalRevenueGraphDataset = {
            ...totalRevenueGraphDataset,
            type: 'bar',
            label: '평균 매출액',
            data: totalRevenue,
            fill: true,
            borderColor: ORDER_GRAPH_BG_COLOR[2] + 'BB',
            backgroundColor: ORDER_GRAPH_BG_COLOR[2] + 'BB'
        }
        salesDatasets.push(totalRevenueGraphDataset);

        // 주차별 요일 매출액 그래프
        salesAnalysis.forEach(r => {
            let compareWeek = getDateToAnalysisRangeDateFormat('week', r.key);
            let compareDay = getDayName(r.key);
            salesAnalysisByWeek = salesAnalysisByWeek.map(r2 => {
                if (r2.key === compareWeek) {
                    return r2 = {
                        ...r2,
                        value: {
                            ...r2.value,
                            [compareDay]: parseInt(r2.value[compareDay]) + parseInt(r.value)
                        }
                    }
                } else {
                    return r2;
                }
            })
        })

        // 검색 주차가 팔레트색상 사이즈보다 크다면 랜덤한 컬러 생성
        let graphColor = ORDER_GRAPH_BG_COLOR;
        for (let i = ORDER_GRAPH_BG_COLOR.length; i < salesAnalysisByWeek.length; i++) {
            let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
            graphColor.push(randomColor);
        }

        let revenueByWeek = salesAnalysisByWeek.map(r => Object.values(r.value));
        salesAnalysisByWeek.forEach((r, idx) => {
            let datasets = new GraphDataset().toJSON();
            datasets = {
                ...datasets,
                type: 'bar',
                label: r.key + '주차',
                data: revenueByWeek[idx],
                fill: true,
                borderColor: graphColor[idx] + 'BB',
                backgroundColor: graphColor[idx] + 'BB'
            }
            salesDatasetsByWeek.push(datasets);
        })

        // 옵션 - 주문 그래프
        let orderAnalysis = [...analysis];
        let orderAnalysisByWeek = [...analysisByWeek];
        analysisItem.forEach(r => {
            let compareDate = getDateToAnalysisRangeDateFormat('date', r.channelOrderDate);
            orderAnalysis = orderAnalysis.map(r2 => {
                if (r2.key === compareDate) {
                    return r2 = {
                        ...r2,
                        value: parseInt(r2.value) + parseInt(r.price) + parseInt(r.deliveryCharge)
                    }
                } else {
                    return r2;
                }
            })
        })

        // 요일별 평균 매출액을 구하기 위해 count를 추가
        let orderTotal = dayName.map(r => {
            return {
                key: r,
                revenue: 0,
                count: 0
            }
        })

        orderAnalysis.forEach(r => {
            orderTotal = orderTotal.map(r2 => {
                if (r2.key === getDayName(r.key)) {
                    return {
                        ...r2,
                        revenue: r2.revenue + r.value,
                        count: r2.count + 1
                    }
                } else {
                    return r2;
                }
            })
        });

        // 요일별 평균 매출액 계산
        let orderTotalAverage = [];
        total.forEach(r => {
            orderTotalAverage = {
                ...orderTotalAverage,
                [r.key]: r.revenue / r.count
            }
        })

        // [일, 월, 화, 수, 목, 금, 토] 로 정렬
        let orderTotalRevenue = dayName.map(r => totalAverage[r]);
        let orderTotalRevenueGraphDataset = new GraphDataset().toJSON();
        orderTotalRevenueGraphDataset = {
            ...orderTotalRevenueGraphDataset,
            type: 'line',
            label: '(주문) 평균 매출액',
            data: orderTotalRevenue,
            borderColor: ORDER_GRAPH_BG_COLOR[2] + '88',
            backgroundColor: ORDER_GRAPH_BG_COLOR[2] + '88'
        }
        orderDatasets.push(orderTotalRevenueGraphDataset);

        // 주차별 요일 매출액 그래프
        orderAnalysis.forEach(r => {
            let compareWeek = getDateToAnalysisRangeDateFormat('week', r.key);
            let compareDay = getDayName(r.key);
            orderAnalysisByWeek = orderAnalysisByWeek.map(r2 => {
                if (r2.key === compareWeek) {
                    return r2 = {
                        ...r2,
                        value: {
                            ...r2.value,
                            [compareDay]: parseInt(r2.value[compareDay]) + parseInt(r.value)
                        }
                    }
                } else {
                    return r2;
                }
            })
        })

        let orderRevenueByWeek = orderAnalysisByWeek.map(r => Object.values(r.value));
        orderAnalysisByWeek.forEach((r, idx) => {
            let datasets = new GraphDataset().toJSON();
            datasets = {
                ...datasets,
                type: 'line',
                label: '(주문) ' + r.key + '주차',
                data: orderRevenueByWeek[idx],
                borderColor: graphColor[idx] + '88',
                backgroundColor: graphColor[idx] + '88'
            }
            orderDatasetsByWeek.push(datasets);
        })

        let labels = dayName;

        dispatchGraphLabels({
            type: 'INIT_DATA',
            payload: labels
        })

        // 요일별 그래프 2개 생성
        dispatchGraphDatasets({
            type: 'INIT_DATA',
            payload: {
                sales: {
                    total: salesDatasets,
                    week: salesDatasetsByWeek
                },
                order: {
                    total: orderDatasets,
                    week: orderDatasetsByWeek
                }
            }
        })
    }

    // hideOrderGraph 값에 따라 표시되는 데이터 변환
    const onActionSetGraphDataset = () => {
        let totalDatasets = [...graphDatasets.sales.total];
        let weekDatasets = [...graphDatasets.sales.week];

        if(!props.hideOrderGraph) {
            totalDatasets = totalDatasets.concat([...graphDatasets.order.total]);
            weekDatasets = weekDatasets.concat([...graphDatasets.order.week]);
        }

        dispatchRevenueByWeekGraphData({
            type: 'INIT_DATA',
            payload: {
                total: {
                    labels: graphLabels,
                    datasets: totalDatasets
                },
                week: {
                    labels: graphLabels,
                    datasets: weekDatasets
                }
            }
        })
    }

    const onActionSetDayOfWeekGraphOption = async (e, item) => {
        if(item.length === 0) return;

        var idx = item[0].index;
        var searchDay = e.chart.config._config.data.labels[idx];
        
        let startDate = getStartDate(query.startDate);
        let endDate = getEndDate(query.endDate);
        let periodType = 'channelOrderDate';
        let salesYn = 'y';

        // 주문그래프가 보여지는 경우
        if(!props.hideOrderGraph) {
            salesYn = null;
        }

        let params = {
            startDate: startDate,
            endDate: endDate,
            periodType: periodType,
            salesYn: salesYn,
            fixedSearchDay: searchDay
        }

        await props._onAction_searchErpOrderGraphItemByParams(params);
    }

    return (
        <Container>
            {/* 요일별 매출액 그래프 */}
            {revenueByWeekGraphData && graphOption && 
                <div className='graph-group'>
                    <GraphTitleField
                        element={
                            (<div className='title'>[ 요일별 매출액 ]</div>)
                        }
                    ></GraphTitleField>
                    <GraphFieldView
                        revenueByWeekGraphData={revenueByWeekGraphData}
                        graphOption={graphOption}
                    ></GraphFieldView>
                </div>
            }
        </Container>
    )
}

export default SalesRevenueByWeekGraphComponent;

const initialRevenueByWeekGraphData = null;
const initialAnalysisItem = null;
const initialGraphLabels = null;
const initialGraphDatasets = {};
const initialGraphOption = null;

const revenueByWeekGraphDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialRevenueByWeekGraphData;
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

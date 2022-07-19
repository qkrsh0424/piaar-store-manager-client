import { useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { dateToYYYYMM, dateToYYYYMMDD, getDayName, getDifferenceBetweenStartDateAndEndDate, getWeekName, getWeekNumber } from "../../../utils/dateFormatUtils";
import GraphFieldView from "./GraphField.view";
import { Container, GraphTitleFieldWrapper } from "./SalesRevenueByWeekGraph.styled";
import { getDateToAnalysisRangeDateFormat, GraphDataset } from "../../../utils/graphUtils";

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

        onActionCreateRevenueByWeekGraphData();
    }, [analysisItem, props.hideOrderGraph])

    // 3. 요일별 매출액
    const onActionCreateRevenueByWeekGraphData = () => {
        let dayName = getWeekName();    // 일 ~ 토
        let date = new Set([]);
        let week = new Set([]);
        let analysis = [];
        let analysisByWeek = [];
        let datasets = [];
        let datasetsByWeek = [];

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
        datasets.push(totalRevenueGraphDataset);

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
            datasetsByWeek.push(datasets);
        })

        if (!props.hideOrderGraph) {
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
            let total = dayName.map(r => {
                return {
                    key: r,
                    revenue: 0,
                    count: 0
                }
            })
    
            orderAnalysis.forEach(r => {
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
                type: 'line',
                label: '(주문) 평균 매출액',
                data: totalRevenue,
                borderColor: ORDER_GRAPH_BG_COLOR[2] + '88',
                backgroundColor: ORDER_GRAPH_BG_COLOR[2] + '88'
            }
            datasets.push(totalRevenueGraphDataset);

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

            let revenueByWeek = orderAnalysisByWeek.map(r => Object.values(r.value));
            orderAnalysisByWeek.forEach((r, idx) => {
                let datasets = new GraphDataset().toJSON();
                datasets = {
                    ...datasets,
                    type: 'line',
                    label: '(주문) ' + r.key + '주차',
                    data: revenueByWeek[idx],
                    borderColor: graphColor[idx] + '88',
                    backgroundColor: graphColor[idx] + '88'
                }
                datasetsByWeek.push(datasets);
            })
        }

        // 요일별 그래프 2개 생성
        let revenueByWeekGraphData = {
            total: {
                labels: dayName,
                datasets: datasets
            },
            week: {
                labels: dayName,
                datasets: datasetsByWeek
            }
        }

        dispatchRevenueByWeekGraphData({
            type: 'INIT_DATA',
            payload: revenueByWeekGraphData
        })
    }

    return (
        <Container>
            {/* 요일별 매출액 그래프 */}
            {revenueByWeekGraphData &&
                <div className='graph-group'>
                    <GraphTitleField
                        element={
                            (<div className='title'>[ 요일별 매출액 ]</div>)
                        }
                    ></GraphTitleField>
                    <GraphFieldView
                        revenueByWeekGraphData={revenueByWeekGraphData}
                    ></GraphFieldView>
                </div>
            }
        </Container>
    )
}

export default SalesRevenueByWeekGraphComponent;

const initialRevenueByWeekGraphData = null;
const initialAnalysisItem = null;

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

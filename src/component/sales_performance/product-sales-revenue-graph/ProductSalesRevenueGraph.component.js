import _ from "lodash";
import { useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import qs from 'query-string';
import { getDayName, getDifferenceBetweenStartDateAndEndDate, getEndDate, getStartDate, getWeekName } from "../../../utils/dateFormatUtils";
import { Container, GraphTitleFieldWrapper } from "./ProductSalesRevenueGraph.styled";
import GraphFieldView from "./GraphField.view";
import RevenueOperatorFieldView from "./RevenueOperatorField.view";
import DetailRevenueGraphByDayOfWeekFieldView from "./DetailRevenueGraphByDayOfWeek.view";
import { getDateToAnalysisRangeDateFormat, GraphDataset } from "../../../utils/graphDataUtils";
import { ControlPointSharp } from "@material-ui/icons";

function GraphTitleField({ element }) {
    return (
        <GraphTitleFieldWrapper>
            {element}
        </GraphTitleFieldWrapper>
    );
}

// 그래프 색상
const ORDER_GRAPH_BG_COLOR = ['#D678CD', '#FF7FAB', '#FF9D83', '#FFCA67', '#B9B4EB', '#00C894', '#D5CABD', '#389091', '#95C477'];
// 그래프 기본 2가지 색상
const PIAAR_DEFAUTL_GRAPH_BG_COLOR = ['#B9B4EB', '#908CB8'];

const ProductSalesRevenueGraphComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);
    
    const [analysisItem, dispatchAnalysisItem] = useReducer(analysisItemReducer, initialAnalysisItem);
    const [productViewList, dispatchProductViewList] = useReducer(productViewListReducer, initialProductViewList);
    const [productSearchItem, dispatchProductSearchItem] = useReducer(productSearchItemReducer, initialProductSearchItem);

    const [graphOption, dispatchGraphOption] = useReducer(graphOptionReducer, initialGraphOption);
    const [optionRevenueGraphData, dispatchOptionRevenueGraphData] = useReducer(optionRevenueGraphDataReducer, initialOptionRevenueGraphData);
    
    const [dayOfWeekGraphOption, dispatchDayOfWeekGraphOption] = useReducer(dayOfWeekGraphOptionReducer, initialDayOfWeekGraphOption);
    const [optionRevenueGraphByDayOfWeekData, dispatchOptionRevenueGraphByDayOfWeekData] = useReducer(optionRevenueGraphByDayOfWeekDataReducer, initialOptionRevenueGraphByDayOfWeekData)

    useEffect(() => {
        if (!props.erpItemData) {
            return;
        }

        dispatchAnalysisItem({
            type: 'INIT_DATA',
            payload: props.erpItemData
        })
    }, [props.erpItemData])

    useEffect(() => {
        if (!(props.categoryList && props.productList)) {
            return;
        }

        dispatchProductViewList({
            type: 'INIT_DATA',
            payload: props.productList
        })
    }, [props.categoryList, props.productList])

    useEffect(() => {
        if (!productSearchItem) {
            return;
        }

        // 카테고리만 선택된 경우
        if (!productSearchItem.product || productSearchItem.product === 'total') {
            // 하단 요일별 그래프 초기화
            dispatchOptionRevenueGraphByDayOfWeekData({
                type: 'CLEAR'
            })

            if (!productSearchItem.category || productSearchItem.category == 'total') {
                dispatchOptionRevenueGraphData({
                    type: 'CLEAR'
                })
                dispatchProductViewList({
                    type:'CLEAR'
                })
                return;
            }

            onActionCreateProductCategoryRevenueGraphData();
            onActionCreateCategoryRevenueGraphByDayOfWeekData();
            return;
        }
        
        onActionCreateOptionRevenueGraphData();
        onActionCreateProductRevenueGraphByDayOfWeekData();
    }, [productSearchItem, props.hideOrderGraph, analysisItem])

    useEffect(() => {
        if(!optionRevenueGraphData) {
            return;
        }

        let gOption = {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: true
            },
            indexAxis: 'y',
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
    }, [optionRevenueGraphData])

    useEffect(() => {
        if(!optionRevenueGraphByDayOfWeekData) {
            return;
        }

        let gOption = {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            onClick: function (e, item) {
                onActionSetDayOfWeekGraphOption(e, item)
            }
        }

        dispatchDayOfWeekGraphOption({
            type: 'INIT_DATA',
            payload: gOption
        })
    }, [optionRevenueGraphByDayOfWeekData])

    const onChangeOptionRevenueDropDownItem = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        dispatchProductSearchItem({
            type: 'CHANGE_DATA',
            payload: {
                name,
                value
            }
        })

        // 캬테고리가 변경된 경우
        if (name === 'category') {
            let product = props.productList?.filter(r => (r.productCategoryCid === parseInt(value)));

            dispatchProductSearchItem({
                type: 'CHANGE_DATA',
                payload: {
                    name: 'product',
                    value: 'total'
                }
            })

            dispatchProductViewList({
                type: 'INIT_DATA',
                payload: product
            })
        }
    }

    // 1-4. 상품별 - 카테고리 총 매출액 및 주문 수량
    const onActionCreateProductCategoryRevenueGraphData = () => {
        let erpOrderItem = [...analysisItem];

        let option = new Set([]);
        let analysis = [];
        let revenueDatasets = [];
        let unitDatasets = [];

        // 주문의 bestRevenueItem(best top 10)를 추출해 판매데이터를 확인
        let bestRevenueItem = [];
        let bestRevenueLabel = [];
        let bestUnitItem = [];
        let bestUnitLabel = [];

        erpOrderItem = erpOrderItem.filter(r => r.productCategory?.cid === parseInt(productSearchItem.category));
        erpOrderItem = erpOrderItem.map(r => r.erpOrderItem);

        // 상품 추출
        erpOrderItem.forEach(r => {
            option.add(r.prodDefaultName || '미지정');
        })

        analysis = [...option].map(r => {
            return {
                key: r,
                revenue: 0,
                unit: 0
            }
        })

        // 기본 - 판매 그래프
        let salesAnalysis = [...analysis];
        let erpSalesItem = erpOrderItem.filter(r => r.salesYn === 'y');

        erpSalesItem.forEach(r => {
            salesAnalysis = salesAnalysis.map(r2 => {
                let prodDefaultName = r.prodDefaultName || '미지정';
                if (prodDefaultName === r2.key) {
                    return {
                        ...r2,
                        revenue: parseInt(r2.revenue) + parseInt(r.price) + parseInt(r.deliveryCharge),
                        unit: parseInt(r2.unit) + parseInt(r.unit)
                    }
                } else {
                    return r2;
                }
            })
        })

        // best10 추출
        bestRevenueItem = _.sortBy(salesAnalysis, 'revenue').reverse();
        bestRevenueItem = bestRevenueItem.slice(0, 10);
        bestUnitItem = _.sortBy(salesAnalysis, 'unit').reverse();
        bestUnitItem = bestUnitItem.slice(0, 10);

        // 카테고리 내 상품 매출액 best10 상품명, 매출액 추출
        bestRevenueLabel = bestRevenueItem.map(r => r.key);
        let revenueValues = bestRevenueItem.map(r => r.revenue);

        // 카테고리 내 상품 주문건 best10 상품명, 주문건 추출
        bestUnitLabel = bestUnitItem.map(r => r.key);
        let unitValues = bestUnitItem.map(r => r.unit);

        let salesRevenueDataset = new GraphDataset().toJSON();
        salesRevenueDataset = {
            ...salesRevenueDataset,
            type: 'bar',
            label: '(판매) 매출액',
            data: revenueValues,
            backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0],
            borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0],
        }

        let salesUnitDataset = new GraphDataset().toJSON();
        salesUnitDataset = {
            ...salesUnitDataset,
            type: 'bar',
            label: '(판매) 주문 수량',
            data: unitValues,
            backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1],
            borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1],
        }

        revenueDatasets.push(salesRevenueDataset);
        unitDatasets.push(salesUnitDataset);

        if (!props.hideOrderGraph) {
            // 기본 - 주문 그래프
            let orderAnalysis = [...analysis];

            erpOrderItem.forEach(r => {
                orderAnalysis = orderAnalysis.map(r2 => {
                    let prodDefaultName = r.prodDefaultName || '미지정';
                    if (prodDefaultName === r2.key) {
                        return {
                            ...r2,
                            revenue: parseInt(r2.revenue) + parseInt(r.price) + parseInt(r.deliveryCharge),
                            unit: parseInt(r2.unit) + parseInt(r.unit)
                        }
                    } else {
                        return r2;
                    }
                })
            })

            revenueValues = bestRevenueItem.map(r => orderAnalysis.filter(r2 => r.key === r2.key)[0]?.revenue);
            unitValues = bestUnitItem.map(r => orderAnalysis.filter(r2 => r.key === r2.key)[0]?.unit);

            let orderRevenueDataset = new GraphDataset().toJSON();
            orderRevenueDataset = {
                ...orderRevenueDataset,
                type: 'line',
                label: '(주문) 매출액',
                data: revenueValues,
                backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0] + '88',
                borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0] + '88',
                order: -1
            }

            let orderUnitDataset = new GraphDataset().toJSON();
            orderUnitDataset = {
                ...orderUnitDataset,
                type: 'line',
                label: '(주문) 주문 수량',
                data: unitValues,
                backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1] + '88',
                borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1] + '88',
                order: -1
            }

            revenueDatasets.push(orderRevenueDataset);
            unitDatasets.push(orderUnitDataset);
        }

        let datasets = {
            revenue: {
                labels: bestRevenueLabel,
                datasets: revenueDatasets
            },
            unit: {
                labels: bestUnitLabel,
                datasets: unitDatasets
            }
        }

        dispatchOptionRevenueGraphData({
            type: 'INIT_DATA',
            payload: datasets
        })
    }

    // 1-4. 옵션 별 - 총 매출액 및 주문 수량
    const onActionCreateOptionRevenueGraphData = () => {
        let erpOrderItem = [...analysisItem];

        let option = new Set([]);
        let analysis = [];
        let revenueDatasets = [];
        let unitDatasets = [];

        let bestRevenueItem = [];
        let bestRevenueLabel = [];
        let bestUnitItem = [];
        let bestUnitLabel = [];

        erpOrderItem = erpOrderItem.filter(r => r.product?.cid === parseInt(productSearchItem.product));
        erpOrderItem = erpOrderItem.map(r => r.erpOrderItem);

        erpOrderItem.forEach(r => {
            let optionDefaultName = r.optionDefaultName || '미지정';
            option.add(optionDefaultName);
        });

        analysis = [...option].map(r => {
            return {
                key: r,
                revenue: 0,
                unit: 0
            }
        });

        // 기본 - 판매 그래프
        let salesAnalysis = [...analysis];
        let erpSalesItem = erpOrderItem.filter(r => r.salesYn === 'y');

        erpSalesItem.forEach(r => {
            salesAnalysis = salesAnalysis.map(r2 => {
                let optionDefaultName = r.optionDefaultName || '미지정';
                if (optionDefaultName === r2.key) {
                    return {
                        ...r2,
                        revenue: parseInt(r2.revenue) + parseInt(r.price) + parseInt(r.deliveryCharge),
                        unit: parseInt(r2.unit) + parseInt(r.unit)
                    }
                } else {
                    return r2;
                }
            })
        })

        // best10 추출
        bestRevenueItem = _.sortBy(salesAnalysis, 'revenue').reverse();
        bestRevenueItem = bestRevenueItem.slice(0, 10);

        bestUnitItem = _.sortBy(salesAnalysis, 'unit').reverse();
        bestUnitItem = bestUnitItem.slice(0, 10);

        bestRevenueLabel = bestRevenueItem.map(r => r.key);
        let revenueValues = bestRevenueItem.map(r => r.revenue);

        bestUnitLabel = bestUnitItem.map(r => r.key);
        let unitValues = bestUnitItem.map(r => r.unit);

        let salesRevenueDataset = new GraphDataset().toJSON();
        salesRevenueDataset = {
            ...salesRevenueDataset,
            type: 'bar',
            label: '(판매) 매출액',
            data: revenueValues,
            backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0],
            borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0],
        }

        let salesUnitDataset = new GraphDataset().toJSON();
        salesUnitDataset = {
            ...salesUnitDataset,
            type: 'bar',
            label: '(판매) 주문 수량',
            data: unitValues,
            backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1],
            borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1],
        }

        revenueDatasets.push(salesRevenueDataset);
        unitDatasets.push(salesUnitDataset);

        if (!props.hideOrderGraph) {
            // 기본 - 주문 그래프
            let orderAnalysis = [...analysis];

            erpOrderItem.forEach(r => {
                orderAnalysis = orderAnalysis.map(r2 => {
                    let optionDefaultName = r.optionDefaultName || '미지정';
                    if (optionDefaultName === r2.key) {
                        return {
                            ...r2,
                            revenue: parseInt(r2.revenue) + parseInt(r.price) + parseInt(r.deliveryCharge),
                            unit: parseInt(r2.unit) + parseInt(r.unit)
                        }
                    } else {
                        return r2;
                    }
                })
            })

            // best10 추출
            revenueValues = bestRevenueItem.map(r => orderAnalysis.filter(r2 => r.key === r2.key)[0]?.revenue);
            unitValues = bestUnitItem.map(r => orderAnalysis.filter(r2 => r.key === r2.key)[0]?.unit);

            let orderRevenueDataset = new GraphDataset().toJSON();
            orderRevenueDataset = {
                ...orderRevenueDataset,
                type: 'line',
                label: '(주문) 매출액',
                data: revenueValues,
                backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0] + '88',
                borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0] + '88',
                order: -1
            }

            let orderUnitDataset = new GraphDataset().toJSON();
            orderUnitDataset = {
                ...orderUnitDataset,
                type: 'line',
                label: '(주문) 주문 수량',
                data: unitValues,
                backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1] + '88',
                borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1] + '88',
                order: -1
            }

            revenueDatasets.push(orderRevenueDataset);
            unitDatasets.push(orderUnitDataset);
        }

        let datasets = {
            revenue: {
                labels: bestRevenueLabel,
                datasets: revenueDatasets
            },
            unit: {
                labels: bestUnitLabel,
                datasets: unitDatasets
            }
        }

        dispatchOptionRevenueGraphData({
            type: 'INIT_DATA',
            payload: datasets
        })
    }

    // 1-4. 상품(카테고리별) 요일별 매출액
    const onActionCreateCategoryRevenueGraphByDayOfWeekData = () => {
        let erpOrderItem = [...analysisItem];
        erpOrderItem = erpOrderItem.filter(r => r.productCategory?.cid === parseInt(productSearchItem.category));
        erpOrderItem = erpOrderItem.map(r => r.erpOrderItem);

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
        let salesErpOrderItem = erpOrderItem.filter(r => r.salesYn === 'y');

        salesErpOrderItem.forEach(r => {
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

        let categoryName = props.categoryList.filter(r => r.cid === parseInt(productSearchItem.category))[0]?.name;

        // [일, 월, 화, 수, 목, 금, 토] 로 정렬
        let totalRevenue = dayName.map(r => totalAverage[r]);
        let totalRevenueGraphDataset = new GraphDataset().toJSON();
        totalRevenueGraphDataset = {
            ...totalRevenueGraphDataset,
            type: 'bar',
            label: '[' + categoryName + '] 평균 매출액',
            data: totalRevenue,
            fill: true,
            borderColor: ORDER_GRAPH_BG_COLOR[3] + 'BB',
            backgroundColor: ORDER_GRAPH_BG_COLOR[3] + 'BB'
        }
        datasets.push(totalRevenueGraphDataset);

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
            let orderAnalysis = [...analysis];
            let orderAnalysisByWeek = [...analysisByWeek];

            erpOrderItem.forEach(r => {
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

            let categoryName = props.categoryList.filter(r => r.cid === parseInt(productSearchItem.category))[0]?.name;

            // [일, 월, 화, 수, 목, 금, 토] 로 정렬
            let totalRevenue = dayName.map(r => totalAverage[r]);
            let totalRevenueGraphDataset = new GraphDataset().toJSON();
            totalRevenueGraphDataset = {
                ...totalRevenueGraphDataset,
                type: 'line',
                label: '(주문) [' + categoryName + '] 평균 매출액',
                data: totalRevenue,
                borderColor: ORDER_GRAPH_BG_COLOR[3] + '88',
                backgroundColor: ORDER_GRAPH_BG_COLOR[3] + '88'
            }
            datasets.push(totalRevenueGraphDataset);
        
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
        let dayRevenueGraphData = {
            total: {
                labels: dayName,
                datasets: datasets
            },
            week: {
                labels: dayName,
                datasets: datasetsByWeek
            }
        }

        dispatchOptionRevenueGraphByDayOfWeekData({
            type: 'INIT_DATA',
            payload: dayRevenueGraphData
        })
    }

    // 1-4. 상품(상품별) - 요일별 매출액
    const onActionCreateProductRevenueGraphByDayOfWeekData = () => {
        let erpOrderItem = [...analysisItem];
        erpOrderItem = erpOrderItem.filter(r => r.product?.cid === parseInt(productSearchItem.product));
        erpOrderItem = erpOrderItem.map(r => r.erpOrderItem);

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
        let salesErpOrderItem = erpOrderItem.filter(r => r.salesYn === 'y');

        salesErpOrderItem.forEach(r => {
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

        let productDefaultName = productViewList.filter(r => r.cid === parseInt(productSearchItem.product))[0]?.defaultName;

        // [일, 월, 화, 수, 목, 금, 토] 로 정렬
        let totalRevenue = dayName.map(r => totalAverage[r]);
        let totalRevenueGraphDataset = new GraphDataset().toJSON();
        totalRevenueGraphDataset = {
            ...totalRevenueGraphDataset,
            type: 'bar',
            label: '[' + productDefaultName + '] 평균 매출액',
            data: totalRevenue,
            fill: true,
            borderColor: ORDER_GRAPH_BG_COLOR[3] + 'BB',
            backgroundColor: ORDER_GRAPH_BG_COLOR[3] + 'BB'
        }
        datasets.push(totalRevenueGraphDataset);

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
        salesAnalysisByWeek.map((r, idx) => {
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
            let orderAnalysis = [...analysis];
            let orderAnalysisByWeek = [...analysisByWeek];
            
            erpOrderItem.forEach(r => {
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
    
            let productDefaultName = productViewList.filter(r => r.cid === parseInt(productSearchItem.product))[0]?.defaultName;
    
            // [일, 월, 화, 수, 목, 금, 토] 로 정렬
            let totalRevenue = dayName.map(r => totalAverage[r]);
            let totalRevenueGraphDataset = new GraphDataset().toJSON();
            totalRevenueGraphDataset = {
                ...totalRevenueGraphDataset,
                type: 'line',
                label: '(주문) [' + productDefaultName + '] 평균 매출액',
                data: totalRevenue,
                borderColor: ORDER_GRAPH_BG_COLOR[3] + '88',
                backgroundColor: ORDER_GRAPH_BG_COLOR[3] + '88'
            }
            datasets.push(totalRevenueGraphDataset);

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
            orderAnalysisByWeek.map((r, idx) => {
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
        let dayRevenueGraphData = {
            total: {
                labels: dayName,
                datasets: datasets
            },
            week: {
                labels: dayName,
                datasets: datasetsByWeek
            }
        }

        dispatchOptionRevenueGraphByDayOfWeekData({
            type: 'INIT_DATA',
            payload: dayRevenueGraphData
        })
    }

    const onActionSetGraphOption = async (e, item) => {
        if(item.length === 0) return;

        var idx = item[0].index;
        var legend = e.chart.legend.legendItems[0].text === '(판매) 매출액' ? 'revenue' : 'unit';
        var label = optionRevenueGraphData[legend].labels[idx];
        
        let startDate = getStartDate(query.startDate);
        let endDate = getEndDate(query.endDate);
        let periodType = 'channelOrderDate';
        let salesYn = 'y'   // 주문데이터까지 구하려면 제거
        let searchColumnName = 'prodDefaultName'

        if(productSearchItem.product !== 'total') {
            label = productViewList.filter(r => r.cid === parseInt(productSearchItem.product))[0]?.defaultName || '';
        }

        let params = {
            startDate: startDate,
            endDate: endDate,
            periodType: periodType,
            salesYn: salesYn,
            searchColumnName: searchColumnName,
            searchQuery: label,
            fixedSearchColumnName: searchColumnName,
            fixedSearchQuery: label
        }

        await props._onAction_searchErpOrderGraphItemByParams(params);
    }

    const onActionSetDayOfWeekGraphOption = async (e, item) => {
        if(item.length === 0) return;

        var idx = item[0].index;
        var searchDay = e.chart.config._config.data.labels[idx];
        var searchColumnName = 'categoryName';
        var label = props.categoryList.filter(r => r.cid === parseInt(productSearchItem.category))[0]?.name;
        
        let startDate = getStartDate(query.startDate);
        let endDate = getEndDate(query.endDate);
        let periodType = 'channelOrderDate';
        let salesYn = 'y'   // 주문데이터까지 구하려면 제거

        if(productSearchItem.product !== 'total') {
            searchColumnName = 'prodDefaultName';
            label = productViewList.filter(r => r.cid === parseInt(productSearchItem.product))[0]?.defaultName;
        }

        let params = {
            startDate: startDate,
            endDate: endDate,
            periodType: periodType,
            salesYn: salesYn,
            searchColumnName: searchColumnName,
            searchQuery: label,
            fixedSearchColumnName: searchColumnName,
            fixedSearchQuery: label,
            fixedSearchDay: searchDay
        }

        await props._onAction_searchErpOrderGraphItemByParams(params);
    }

    return (
        <Container>
            <GraphTitleField
                element={
                    (<div className='title'>[ 카테고리 & 상품 판매 분석 ]</div>)
                }
            ></GraphTitleField>
            <div className='graph-group'>
                <RevenueOperatorFieldView
                    productSearchItem={productSearchItem}
                    hideOrderGraph={props.hideOrderGraph}
                    categoryList={props.categoryList}
                    productViewList={productViewList}

                    onChangeOptionRevenueDropDownItem={onChangeOptionRevenueDropDownItem}
                ></RevenueOperatorFieldView>
                {optionRevenueGraphData && graphOption && 
                    <GraphFieldView
                        productSearchItem={productSearchItem}
                        optionRevenueGraphData={optionRevenueGraphData}
                        graphOption={graphOption}
                    ></GraphFieldView>
                }
            </div>

            {/* 요일별 상품 매출 그래프 */}
            <div className='graph-group'>
                {optionRevenueGraphByDayOfWeekData && dayOfWeekGraphOption && 
                    <DetailRevenueGraphByDayOfWeekFieldView
                        productSearchItem={productSearchItem}
                        optionRevenueGraphByDayOfWeekData={optionRevenueGraphByDayOfWeekData}
                        dayOfWeekGraphOption={dayOfWeekGraphOption}
                    ></DetailRevenueGraphByDayOfWeekFieldView>
                }
            </div>
        </Container>
    )
}

export default ProductSalesRevenueGraphComponent;

const initialAnalysisItem = null;
const initialProductViewList = null;
const initialProductSearchItem = {
    category: 'total',
    product: 'total'
};
const initialOptionRevenueGraphData = null;
const initialOptionRevenueGraphByDayOfWeekData = null;
const initialGraphOption = null;
const initialDayOfWeekGraphOption = null;

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

const productViewListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialProductViewList;
        default:
            return state;
    }
}

const productSearchItemReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialProductSearchItem;
        default:
            return state;
    }
}

const optionRevenueGraphDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialOptionRevenueGraphData;
        default:
            return state;
    }
}

const optionRevenueGraphByDayOfWeekDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialOptionRevenueGraphByDayOfWeekData;
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

const dayOfWeekGraphOptionReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialDayOfWeekGraphOption;
        default:
            return state;
    }
}

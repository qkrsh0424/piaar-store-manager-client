import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import { dateToMMDD, dateToYYYYMM, dateToYYYYMMDD, getDifferenceBetweenStartDateAndEndDate, getDayName, getWeekNumber, getWeekName } from "../../../utils/dateFormatUtils";
import OrderAnalysisGraphFieldView from "./OrderAnalysisGraphField.view";
import RevenueGraphFieldView from "./RevenueGraphField.view";
import { Container, GraphTitleFieldWrapper } from "./SalesPerformanceGraph.styled";
import TableFieldView from "./TableField.view";
import DayRevenueGraphFieldView from "./DayRevenueGraphField.view";
import RevenueOperatorFieldView from "./RevenueOperatorField.view";
import _ from "lodash";
import OptionRevenueGraphFieldView from "./OptionRevenueGraphField.view";
import OptionRevenueOperatorFieldView from "./OptionRevenueOperatorField.view";

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

const SalesPerformanceGraphComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);
    const navigate = useNavigate();

    const [revenueGraphData, dispatchRevenueGraphData] = useReducer(revenueGraphDataReducer, initialRevenueGraphData);
    const [dayRevenueGraphData, dispatchDayRevenueGraphData] = useReducer(dayRevenueGraphDataReducer, initialDayRevenueGraphData);
    const [tableData, dispatchTableData] = useReducer(tableDataReducer, initialTableData);
    const [optionRevenueGraphData, dispatchOptionRevenueGraphData] = useReducer(optionRevenueGraphDataReducer, initialOptionRevenueGraphData);
    const [analysisItem, dispatchAnalysisItem] = useReducer(analysisItemReducer, initialAnalysisItem);
    
    const [searchItem, dispatchSearchItem] = useReducer(searchItemReducer, initialSearchItem);
    const [productSearchItem, dispatchProductSearchItem] = useReducer(productSearchItemReducer, initialProductSearchItem);
    const [hideSalesGraph, setHideSalesGraph] = useState(false);
    
    const [productViewList, dispatchProductViewList] = useReducer(productViewListReducer, initialProductViewList);
    const [optionAnalysisItem, dispatchOptionAnalysisItem] = useReducer(optionAnalysisItemReducer, initialOptionAnalysisItem);
    const [orderAnalysisGraphData, dispatchOrderAnalysisGraphData] = useReducer(orderAnalysisGraphDataReducer, initialOrderAnalysisGraphData);

    useEffect(() => {
        if(!props.erpItemData) {
            return;
        }

        let item = props.erpItemData.map(r => r.erpOrderItem);

        dispatchAnalysisItem({
            type: 'INIT_DATA',
            payload: item
        })

        dispatchOptionAnalysisItem({
            type: 'INIT_DATA',
            payload: props.erpItemData
        })
    }, [props.erpItemData])

    useEffect(() => {
        if(!analysisItem) {
            return;
        }

        dispatchRevenueGraphData({
            type: 'CLEAR'
        })

        let search = (query.searchItem || searchItem) ?? 'total';

        switch(search) {
            case 'total':
                onActionCreateRevenueGraphData();
                break;
            case 'salesChannel':
                onActionCreateChannelRevenueGraphData();
                break;
            case 'category':
                onActionCreateCategoryRevenueGraphData();
                break;
            case 'product':
                onActionCreateProductRevenueGraphData();
                break;
            default: break;
        }

        dispatchSearchItem({
            type: 'INIT_DATA',
            payload: search
        });
    }, [analysisItem, searchItem, hideSalesGraph, props.analysisDateRange])

    useEffect(() => {
        if(!(analysisItem && props.analysisDateRange)) {
            return;
        }
        
        onActionCreateDayRevenueGraphData();
        onActionCreateOrderAnalysisGraphData();
        onActionCreateTableData();
    }, [analysisItem, props.analysisDateRange])

    useEffect(() => {
        if(!(props.categoryList && props.productList)) {
            return;
        }

        dispatchProductViewList({
            type: 'INIT_DATA',
            payload: props.productList
        })
    }, [props.categoryList, props.productList])

    useEffect(() => {
        if(!productSearchItem) {
            return;
        }

        // 카테고리만 선택된 경우
        if(!productSearchItem.product || productSearchItem.product === 'total') {
            if(!productSearchItem.category || productSearchItem.category == 'total') {
                dispatchOptionRevenueGraphData({
                    type: 'CLEAR'
                })
                return;
            }
            onActionCreateProductCategoryRevenueGraphData();
            return;
        }

        onActionCreateOptionRevenueGraphData();
    }, [productSearchItem, hideSalesGraph])


    // REFACTOR OK
    // 1-1. 전체 - 총 매출액
    const onActionCreateRevenueGraphData = () => {
        // date는 [주별, 월별] 검색에서 중복날짜를 제거하기 위해 Set으로 설정
        let date = new Set([]);
        let analysis = [];
        let datasets = [];

        let startDate = query.startDate;
        let endDate = query.endDate;

        let betweenDay = getDifferenceBetweenStartDateAndEndDate(startDate, endDate);
        for(let i = 0; i < betweenDay; i++) {
            let lastDate = new Date(endDate);
            lastDate.setDate(lastDate.getDate() - i);

            let addDate = getDateToAnalysisRangeDateFormat(props.analysisDateRange, lastDate);
            date.add(addDate);
        }

        // 조회 날짜별로 초기값 세팅
        analysis = [...date].map(r => {
            return {
                key: r,
                value: 0
            }
        });
        analysis.reverse();

        // 기본 - 주문 그래프 값 세팅
        let orderAnalysis = [...analysis];
        analysisItem.forEach(r => {
            let compareDate = getDateToAnalysisRangeDateFormat(props.analysisDateRange, r.channelOrderDate);
            orderAnalysis = orderAnalysis.map(r2 => {
                if (r2.key === compareDate) {
                    return {
                        ...r2,
                        value: parseInt(r2.value) + parseInt(r.price) + parseInt(r.deliveryCharge)
                    }
                } else {
                    return r2;
                }
            })
        })

        let dataset = orderAnalysis.map(r => r.value);

        let lineGraphDataset = new GraphDataset().toJSON();
        lineGraphDataset = {
            ...lineGraphDataset,
            type: 'line',
            label: '주문 매출액',
            data: dataset,
            fill: false,
            borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0],
            backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0],
            tension: 0
        }
        datasets.push(lineGraphDataset);

        // 옵션 - 판매 그래프
        // 판매그래프 숨기기 체크박스가 해제되어 있다면
        if(!hideSalesGraph) {
            let salesAnalysis = [...analysis];
            let erpSalesItem = analysisItem.filter(r => r.salesYn === 'y');

            erpSalesItem.forEach(r => {
                let compareDate = getDateToAnalysisRangeDateFormat(props.analysisDateRange, r.channelOrderDate);
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

            let dataset = salesAnalysis.map(r => r.value);

            let lineGraphDataset = new GraphDataset().toJSON();
            lineGraphDataset = {
                ...lineGraphDataset,
                type: 'line',
                label: '판매 매출액',
                data: dataset,
                fill: false,
                borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1],
                backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1],
                tension: 0.1
            }
            datasets.push(lineGraphDataset);
        }

        let labels = analysis.map(r => getAnalysisDateFormatToViewFormat(props.analysisDateRange, r.key));

        dispatchRevenueGraphData({
            type: 'INIT_DATA',
            payload: {
                labels: labels,
                datasets: datasets
            }
        })
    }

    // 1-2. 판매스토어 별 - 총 매출액
    const onActionCreateChannelRevenueGraphData = () => {
        let date = new Set([]);
        let channel = new Set([]);
        let analysis = [];    
        let datasets = [];

        let startDate = query.startDate;
        let endDate = query.endDate;

        let betweenDay = getDifferenceBetweenStartDateAndEndDate(startDate, endDate);
        for(let i = 0; i < betweenDay; i++) {
            let lastDate = new Date(endDate);
            lastDate.setDate(lastDate.getDate() - i);
            let addDate = dateToYYYYMMDD(new Date(lastDate))

            if(props.analysisDateRange === 'week') {
                addDate = dateToYYYYMM(new Date(lastDate)) + '-' + getWeekNumber(new Date(lastDate));
            }else if(props.analysisDateRange === 'month'){
                addDate = dateToYYYYMM(new Date(lastDate));
            }
            date.add(addDate);
        }

        // 채널 추출
        analysisItem.forEach(r => {
            let salesChannel = (r.salesChannel === '' ? '미지정' : r.salesChannel);
            channel.add(salesChannel)
        });

        date.forEach(r => {
            let data = {};
            channel.forEach(r2 => {
                data = {
                    ...data,
                    key: r,
                    [r2]: 0
                }
            })

            analysis.push(data);
        })

        analysis.reverse();

        // 기본 - 주문 그래프
        let orderAnalysis = [...analysis];
        analysisItem.forEach(r => {
            let compareDate = dateToYYYYMMDD(r.channelOrderDate);
            if (props.analysisDateRange === 'week') {
                compareDate = dateToYYYYMM(r.channelOrderDate) + '-' + getWeekNumber(new Date(r.channelOrderDate));
            } else if (props.analysisDateRange === 'month') {
                compareDate = dateToYYYYMM(r.channelOrderDate);
            }
            orderAnalysis = orderAnalysis.map(r2 => {
                if (r2.key === compareDate) {
                    let salesChannel = (r.salesChannel === '' ? '미지정' : r.salesChannel);
                    return {
                        ...r2,
                        [salesChannel]: parseInt(r2[salesChannel]) + parseInt(r.price) + parseInt(r.deliveryCharge)
                    }
                } else {
                    return r2;
                }
            })
        })

        let channelRevenue = [];
        channel.forEach(r => {
            channelRevenue.push(orderAnalysis.map(r2 => r2[r]));
        })

        let graphColor = ORDER_GRAPH_BG_COLOR;
        for(let i = ORDER_GRAPH_BG_COLOR.length; i < channel.size; i++) {
            let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
            graphColor.push(randomColor);
        }
        
        let idx = 0;
        channel.forEach(r => {
            let channelGraphDataset = new GraphDataset().toJSON();
            channelGraphDataset = {
                ...channelGraphDataset,
                type: 'bar',
                label: r,
                data: channelRevenue[idx],
                fill: false,
                backgroundColor: graphColor[idx] + '88',
                borderColor: graphColor[idx] + '88',
                order: 0,
                tension: 0.1
            }
            datasets.push(channelGraphDataset);
            idx++;
        })

        // 옵션 - 판매 그래프
        if(!hideSalesGraph){
            let salesAnalysis = [...analysis];
            let erpSalesItem = analysisItem.filter(r => r.salesYn === 'y');

            erpSalesItem.forEach(r => {
                let compareDate = dateToYYYYMMDD(r.channelOrderDate);
                if(props.analysisDateRange === 'week') {
                    compareDate = dateToYYYYMM(r.channelOrderDate) + '-' + getWeekNumber(new Date(r.channelOrderDate));
                } else if(props.analysisDateRange === 'month') {
                    compareDate = dateToYYYYMM(r.channelOrderDate);
                }
                salesAnalysis = salesAnalysis.map(r2 => {
                    if (r2.key === compareDate) {
                        let salesChannel = (r.salesChannel === '' ? '미지정' : r.salesChannel);
                        return {
                            ...r2,
                            [salesChannel]: parseInt(r2[salesChannel]) + parseInt(r.price) + parseInt(r.deliveryCharge)
                        }
                    } else {
                        return r2;
                    }
                })
            })

            let channelRevenue = [];
            channel.forEach(r => {
                channelRevenue.push(salesAnalysis.map(r2 => r2[r]));
            })

            let idx = 0;
            channel.forEach(r => {
                let channelGraphDataset = new GraphDataset().toJSON();
                channelGraphDataset = {
                    type: 'line',
                    label: '(판매) ' + r,
                    data: channelRevenue[idx],
                    fill: false,
                    borderColor: graphColor[idx],
                    backgroundColor: graphColor[idx],
                    order: -1
                }
                datasets.push(channelGraphDataset);
                idx++;
            })
        }

        let labels = analysis.map(r => {
            if(props.analysisDateRange === 'date') {
                return dateToMMDD(r.key) + ' (' + getDayName(r.key) + ')'
            } else if(props.analysisDateRange === 'week') {
                return r.key + '주차'
            } else if(props.analysisDateRange === 'month') {
                return r.key;
            }
        });

        dispatchRevenueGraphData({
            type: 'INIT_DATA',
            payload: {
                labels: labels,
                datasets: datasets
            }
        })
    }

    // 1-3. 카테고리 별 - 총 매출액
    const onActionCreateCategoryRevenueGraphData = () => {
        // let erpOrderItem = [...analysisItem];

        let date = new Set([]);
        let category = new Set([]);
        let analysis = [];
        let datasets = [];

        let startDate = query.startDate;
        let endDate = query.endDate;

        let betweenDay = getDifferenceBetweenStartDateAndEndDate(startDate, endDate);
        for(let i = 0; i < betweenDay; i++) {
            let lastDate = new Date(endDate);
            lastDate.setDate(lastDate.getDate() - i);
            let addDate = dateToYYYYMMDD(new Date(lastDate))

            if(props.analysisDateRange === 'week') {
                addDate = dateToYYYYMM(new Date(lastDate)) + '-' + getWeekNumber(new Date(lastDate));
            }else if(props.analysisDateRange === 'month'){
                addDate = dateToYYYYMM(new Date(lastDate));
            }
            date.add(addDate);
        }

        // 채널 추출
        analysisItem.forEach(r => {
            let categoryName = (r.categoryName === '' ? '미지정' : r.categoryName);
            category.add(categoryName)
        });

        date.forEach(r => {
            let data = {};
            category.forEach(r2 => {
                data = {
                    ...data,
                    key: r,
                    [r2]: 0
                }
            })

            analysis.push(data);
        })

        analysis.reverse();

        // 기본 - 주문 그래프
        let orderAnalysis = [...analysis];

        analysisItem.forEach(r => {
            let compareDate = dateToYYYYMMDD(r.channelOrderDate);
            if (props.analysisDateRange === 'week') {
                compareDate = dateToYYYYMM(r.channelOrderDate) + '-' + getWeekNumber(new Date(r.channelOrderDate));
            } else if (props.analysisDateRange === 'month') {
                compareDate = dateToYYYYMM(r.channelOrderDate);
            }
            orderAnalysis = orderAnalysis.map(r2 => {
                if (r2.key === compareDate) {
                    let categoryName = (r.categoryName === '' ? '미지정' : r.categoryName);
                    return {
                        ...r2,
                        [categoryName]: parseInt(r2[categoryName]) + parseInt(r.price) + parseInt(r.deliveryCharge)
                    }
                } else {
                    return r2;
                }
            })
        })

        let categoryRevenue = [];
        category.forEach(r => {
            categoryRevenue.push(orderAnalysis.map(r2 => r2[r]));
        })

        let graphColor = ORDER_GRAPH_BG_COLOR;
        for(let i = ORDER_GRAPH_BG_COLOR.length; i < category.size; i++) {
            let randomColor = `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
            graphColor.push(randomColor);
        }

        let idx = 0;
        category.forEach(r => {
            let categoryGraphDataset = new GraphDataset().toJSON();
            categoryGraphDataset = {
                label: r,
                data: categoryRevenue[idx],
                fill: false,
                borderColor: graphColor[idx] + '88',
                backgroundColor: graphColor[idx] + '88',
                type: 'bar',
                order: 0,
                tension: 0.1
            }
            datasets.push(categoryGraphDataset);
            idx++;
        })

        // 옵션 - 판매 그래프
        if(!hideSalesGraph){
            let salesAnalysis = [...analysis];
            let erpSalesItem = analysisItem.filter(r => r.salesYn === 'y');

            erpSalesItem.forEach(r => {
                let compareDate = dateToYYYYMMDD(r.channelOrderDate);
                if(props.analysisDateRange === 'week') {
                    compareDate = dateToYYYYMM(r.channelOrderDate) + '-' + getWeekNumber(new Date(r.channelOrderDate));
                } else if(props.analysisDateRange === 'month') {
                    compareDate = dateToYYYYMM(r.channelOrderDate);
                }
                salesAnalysis = salesAnalysis.map(r2 => {
                    if (r2.key === compareDate) {
                        let categoryName = (r.categoryName === '' ? '미지정' : r.categoryName);
                        return {
                            ...r2,
                            [categoryName]: parseInt(r2[categoryName]) + parseInt(r.price) + parseInt(r.deliveryCharge)
                        }
                    } else {
                        return r2;
                    }
                })
            })

            let categoryRevenue = [];
            category.forEach(r => {
                categoryRevenue.push(salesAnalysis.map(r2 => r2[r]));
            })

            let idx = 0;
            category.forEach(r => {
                let categoryGraphDataset = new GraphDataset().toJSON();
                categoryGraphDataset = {
                    label: '(판매) ' + r,
                    data: categoryRevenue[idx],
                    fill: false,
                    borderColor: graphColor[idx],
                    backgroundColor: graphColor[idx],
                    type: 'line',
                    order: -1
                }
                datasets.push(categoryGraphDataset);
                idx++;
            })
        }


        let labels = analysis.map(r => {
            if(props.analysisDateRange === 'date') {
                return dateToMMDD(r.key) + ' (' + getDayName(r.key) + ')'
            } else if(props.analysisDateRange === 'week') {
                return r.key + '주차'
            } else if(props.analysisDateRange === 'month') {
                return r.key;
            }
        });

        dispatchRevenueGraphData({
            type: 'INIT_DATA',
            payload: {
                labels: labels,
                datasets: datasets
            }
        })
    }

    // 1-4. 상품 별 - 총 매출액 및 주문 수량
    const onActionCreateProductRevenueGraphData = () => {
        // let erpOrderItem = [...analysisItem];

        let product = new Set([]);
        let analysis = [];
        let revenueDatasets = [];
        let unitDatasets = [];
        let bestRevenueItem = [];
        let bestRevenueLabel = [];
        let bestUnitItem = [];
        let bestUnitLabel = [];

        // 채널 추출
        analysisItem.forEach(r => {
            let prodDefaultName = (r.prodDefaultName === '' ? '미지정' : r.prodDefaultName);
            product.add(prodDefaultName);
        });

        product.forEach(r => {
            let data = {
                key: r,
                revenue: 0,
                unit: 0
            }
            analysis.push(data);
        })

        // 기본 - 주문 그래프
        let orderAnalysis = [...analysis];

        analysisItem.forEach(r => {
            orderAnalysis = orderAnalysis.map(r2 => {
                let prodDefaultName = (r.prodDefaultName === '' ? '미지정' : r.prodDefaultName);
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

        // best15 추출
        bestRevenueItem = _.sortBy(orderAnalysis, 'revenue').reverse();
        bestUnitItem = _.sortBy(orderAnalysis, 'unit').reverse();
        bestRevenueItem = bestRevenueItem.slice(0, 15);
        bestUnitItem = bestUnitItem.slice(0, 15);

        bestRevenueLabel = bestRevenueItem.map(r => r.key);
        let revenueValues = bestRevenueItem.map(r => r.revenue);

        bestUnitLabel = bestUnitItem.map(r => r.key);
        let unitValues = bestUnitItem.map(r => r.unit);

        let dataset1 = {
            type: 'bar',
            label: '매출액',
            data: revenueValues,
            fill: true,
            backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0] + '88',
            borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0] + '88',
            order: 0,
            tension: 0.1
        }

        let dataset2 = {
            type: 'bar',
            label: '주문 수량',
            data: unitValues,
            fill: true,
            backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1] + '88',
            borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1] + '88',
            order: 0,
            tension: 0.1
        }

        revenueDatasets.push(dataset1);
        unitDatasets.push(dataset2);

        // 옵션 - 판매 그래프
        if(!hideSalesGraph) {
            let salesAnalysis = [...analysis];
            let erpSalesItem = analysisItem.filter(r => r.salesYn === 'y');

            erpSalesItem.forEach(r => {
                salesAnalysis = salesAnalysis.map(r2 => {
                    let prodDefaultName = (r.prodDefaultName === '' ? '미지정' : r.prodDefaultName);
                    if(prodDefaultName === r2.key) {
                        return {
                            ...r2,
                            revenue: parseInt(r2.revenue) + parseInt(r.price) + parseInt(r.deliveryCharge),
                            unit: parseInt(r2.unit) + parseInt(r.unit)
                        }
                    }else {
                        return r2;
                    }
                })
            })
            
            let revenueValues = [];
            let unitValues = [];

            // best15 추출
            bestRevenueItem.forEach(r => {
                revenueValues.push(salesAnalysis.filter(r2 => r.key === r2.key)[0]?.revenue);
            })

            bestUnitItem.forEach(r => {
                unitValues.push(salesAnalysis.filter(r2 => r.key === r2.key)[0]?.unit);
            })

            let dataset1 = {
                type: 'line',
                label: '(판매) 매출액',
                data: revenueValues,
                fill: false,
                backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0],
                borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0],
                order: -1,
                tension: 0.1
            }

            let dataset2 = {
                type: 'line',
                label: '(판매) 주문 수량',
                data: unitValues,
                fill: false,
                backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1],
                borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1],
                order: -1,
                tension: 0.1
            }

            revenueDatasets.push(dataset1);
            unitDatasets.push(dataset2);
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

        dispatchRevenueGraphData({
            type: 'INIT_DATA',
            payload: datasets
        })
    }

    const onActionCreateProductCategoryRevenueGraphData = () => {
        let erpOrderItem = [...optionAnalysisItem];

        let option = new Set([]);
        let analysis = [];
        let revenueDatasets = [];
        let unitDatasets = [];
        let bestRevenueItem = [];
        let bestRevenueLabel = [];
        let bestUnitItem = [];
        let bestUnitLabel = [];

        erpOrderItem = erpOrderItem.filter(r => r.productCategory?.cid === parseInt(productSearchItem.category));
        erpOrderItem = erpOrderItem.map(r => r.erpOrderItem);
        
        erpOrderItem.forEach(r => {
            let prodDefaultName = (r.prodDefaultName === '' ? '미지정' : r.prodDefaultName);
            option.add(prodDefaultName);
        });

        option.forEach(r => {
            let data = {
                key: r,
                revenue: 0,
                unit: 0
            }
            analysis.push(data);
        })

        // 기본 - 주문 그래프
        let orderAnalysis = [...analysis];

        erpOrderItem.forEach(r => {
            orderAnalysis = orderAnalysis.map(r2 => {
                let prodDefaultName = (r.prodDefaultName === '' ? '미지정' : r.prodDefaultName);
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
        bestRevenueItem = _.sortBy(orderAnalysis, 'revenue').reverse();
        bestUnitItem = _.sortBy(orderAnalysis, 'unit').reverse();
        bestRevenueItem = bestRevenueItem.slice(0, 10);
        bestUnitItem = bestUnitItem.slice(0, 10);

        bestRevenueLabel = bestRevenueItem.map(r => r.key);
        let revenueValues = bestRevenueItem.map(r => r.revenue);

        bestUnitLabel = bestUnitItem.map(r => r.key);
        let unitValues = bestUnitItem.map(r => r.unit);

        let dataset1 = {
            type: 'bar',
            label: '매출액',
            data: revenueValues,
            fill: true,
            backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0] + '88',
            borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0] + '88',
            order: 0,
            tension: 0.1
        }

        let dataset2 = {
            type: 'bar',
            label: '주문 수량',
            data: unitValues,
            fill: true,
            backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1] + '88',
            borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1] + '88',
            order: 0,
            tension: 0.1
        }

        revenueDatasets.push(dataset1);
        unitDatasets.push(dataset2);

        // 옵션 - 판매 그래프
        if(!hideSalesGraph) {
            let salesAnalysis = [...analysis];
            let erpSalesItem = erpOrderItem.filter(r => r.salesYn === 'y');

            erpSalesItem.forEach(r => {
                salesAnalysis = salesAnalysis.map(r2 => {
                    let prodDefaultName = (r.prodDefaultName === '' ? '미지정' : r.prodDefaultName);
                    if(prodDefaultName === r2.key) {
                        return {
                            ...r2,
                            revenue: parseInt(r2.revenue) + parseInt(r.price) + parseInt(r.deliveryCharge),
                            unit: parseInt(r2.unit) + parseInt(r.unit)
                        }
                    }else {
                        return r2;
                    }
                })
            })
            
            let revenueValues = [];
            let unitValues = [];

            // best10 추출
            bestRevenueItem.forEach(r => {
                revenueValues.push(salesAnalysis.filter(r2 => r.key === r2.key)[0]?.revenue);
            })

            bestUnitItem.forEach(r => {
                unitValues.push(salesAnalysis.filter(r2 => r.key === r2.key)[0]?.unit);
            })

            let dataset1 = {
                type: 'line',
                label: '(판매) 매출액',
                data: revenueValues,
                fill: false,
                backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0],
                borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0],
                order: -1,
                tension: 0.1
            }

            let dataset2 = {
                type: 'line',
                label: '(판매) 주문 수량',
                data: unitValues,
                fill: false,
                backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1],
                borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1],
                order: -1,
                tension: 0.1
            }

            revenueDatasets.push(dataset1);
            unitDatasets.push(dataset2);
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
        let erpOrderItem = [...optionAnalysisItem];

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
            let optionDefaultName = (r.optionDefaultName === '' ? '미지정' : r.optionDefaultName);
            option.add(optionDefaultName);
        });

        option.forEach(r => {
            let data = {
                key: r,
                revenue: 0,
                unit: 0
            }
            analysis.push(data);
        })

        // 기본 - 주문 그래프
        let orderAnalysis = [...analysis];

        erpOrderItem.forEach(r => {
            orderAnalysis = orderAnalysis.map(r2 => {
                let optionDefaultName = (r.optionDefaultName === '' ? '미지정' : r.optionDefaultName);
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
        bestRevenueItem = _.sortBy(orderAnalysis, 'revenue').reverse();
        bestUnitItem = _.sortBy(orderAnalysis, 'unit').reverse();
        bestRevenueItem = bestRevenueItem.slice(0, 10);
        bestUnitItem = bestUnitItem.slice(0, 10);

        bestRevenueLabel = bestRevenueItem.map(r => r.key);
        let revenueValues = bestRevenueItem.map(r => r.revenue);

        bestUnitLabel = bestUnitItem.map(r => r.key);
        let unitValues = bestUnitItem.map(r => r.unit);

        let dataset1 = {
            type: 'bar',
            label: '매출액',
            data: revenueValues,
            fill: true,
            backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0] + '88',
            borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0] + '88',
            order: 0,
            tension: 0.1
        }

        let dataset2 = {
            type: 'bar',
            label: '주문 수량',
            data: unitValues,
            fill: true,
            backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1] + '88',
            borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1] + '88',
            order: 0,
            tension: 0.1
        }

        revenueDatasets.push(dataset1);
        unitDatasets.push(dataset2);

        // 옵션 - 판매 그래프
        if(!hideSalesGraph) {
            let salesAnalysis = [...analysis];
            let erpSalesItem = erpOrderItem.filter(r => r.salesYn === 'y');

            erpSalesItem.forEach(r => {
                salesAnalysis = salesAnalysis.map(r2 => {
                    let optionDefaultName = (r.optionDefaultName === '' ? '미지정' : r.optionDefaultName);
                    if(optionDefaultName === r2.key) {
                        return {
                            ...r2,
                            revenue: parseInt(r2.revenue) + parseInt(r.price) + parseInt(r.deliveryCharge),
                            unit: parseInt(r2.unit) + parseInt(r.unit)
                        }
                    }else {
                        return r2;
                    }
                })
            })
            
            let revenueValues = [];
            let unitValues = [];

            // best10 추출
            bestRevenueItem.forEach(r => {
                revenueValues.push(salesAnalysis.filter(r2 => r.key === r2.key)[0]?.revenue);
            })

            bestUnitItem.forEach(r => {
                unitValues.push(salesAnalysis.filter(r2 => r.key === r2.key)[0]?.unit);
            })

            let dataset1 = {
                type: 'line',
                label: '(판매) 매출액',
                data: revenueValues,
                fill: false,
                backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0],
                borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0],
                order: -1,
                tension: 0.1
            }

            let dataset2 = {
                type: 'line',
                label: '(판매) 주문 수량',
                data: unitValues,
                fill: false,
                backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1],
                borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1],
                order: -1,
                tension: 0.1
            }

            revenueDatasets.push(dataset1);
            unitDatasets.push(dataset2);
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

    // REFACTOR OK
    // 2. 총 주문건 & 수량
    const onActionCreateOrderAnalysisGraphData = () => {
        let date = new Set([]);
        let analysis = [];
        let datasets = [];

        let startDate = query.startDate;
        let endDate = query.endDate;

        let betweenDay = getDifferenceBetweenStartDateAndEndDate(startDate, endDate);
        for(let i = 0; i < betweenDay; i++) {
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

        analysisItem.forEach(r => {
            let compareDate = getDateToAnalysisRangeDateFormat(props.analysisDateRange, r.channelOrderDate);
            analysis = analysis.map(r2 => {
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

        let labels = analysis.map(r => getAnalysisDateFormatToViewFormat(props.analysisDateRange, r.key));

        let orderData = analysis.map(r => r.order);
        let orderBarGraphDataset = new GraphDataset().toJSON();
        orderBarGraphDataset = {
            ...orderBarGraphDataset,
            type: 'bar',
            label: '주문건',
            data: orderData,
            fill: true,
            borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0],
            backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[0],
            tension: 0
        }
        datasets.push(orderBarGraphDataset);
        
        let unitData = analysis.map(r => r.unit);
        let unitBarGraphDataset = new GraphDataset().toJSON();
        unitBarGraphDataset = {
            ...unitBarGraphDataset,
            type: 'bar',
            label: '주문 수량',
            data: unitData,
            fill: true,
            borderColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1],
            backgroundColor: PIAAR_DEFAUTL_GRAPH_BG_COLOR[1],
            tension: 0
        }
        datasets.push(unitBarGraphDataset);

        dispatchOrderAnalysisGraphData({
            type: 'INIT_DATA',
            payload: {
                labels: labels,
                datasets
            }
        })
    }

    // REFACTOR OK
    // 3. 요일별 매출액
    const onActionCreateDayRevenueGraphData = () => {
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
        for(let i = 0; i < betweenDay; i++) {
            let lastDate = new Date(endDate);
            lastDate.setDate(lastDate.getDate() - i);
            let addDate = getDateToAnalysisRangeDateFormat('date', lastDate);
            let addWeek = getDateToAnalysisRangeDateFormat('week', lastDate);
            date.add(addDate);
            week.add(addWeek);
        }

        // 조회 날짜별로 초기값 세팅
        analysis = [...date].map(r => {
            return {
                key: r,
                value: 0
            }
        });
        
        // 주차 별 요일 데이터
        let weekValue = {};
        dayName.forEach(r =>{
            weekValue = {
                ...weekValue,
                [r] : 0
            }
        })
        analysisByWeek = [...week].map(r => {
            return {
                key: r,
                value: weekValue
            }
        });
        analysisByWeek.reverse();

        analysisItem.forEach(r => {
            let compareDate = getDateToAnalysisRangeDateFormat('date', r.channelOrderDate);
            analysis = analysis.map(r2 => {
                if(r2.key === compareDate) {
                    return r2 = {
                        ...r2,
                        value: parseInt(r2.value) + parseInt(r.price) + parseInt(r.deliveryCharge)
                    }
                } else {
                    return r2;
                }
            })
        })

        let total = [];
        analysis.forEach(r => {
            total = {
                ...total,
                [getDayName(r.key)]: (total[getDayName(r.key)] || 0) + r.value
            }
        })

        let totalRevenue = Object.values(total)
        let totalRevenueGraphDataset = new GraphDataset().toJSON();
        totalRevenueGraphDataset = {
            ...totalRevenueGraphDataset,
            type: 'bar',
            label: '매출액',
            data: totalRevenue,
            fill: true,
            borderColor: ORDER_GRAPH_BG_COLOR[2] + 'BB',
            backgroundColor: ORDER_GRAPH_BG_COLOR[2] + 'BB',
            tension: 0
        }
        datasets.push(totalRevenueGraphDataset);

        analysis.forEach(r => {
            let compareWeek = getDateToAnalysisRangeDateFormat('week', r.key);
            let compareDay = getDayName(r.key);
            analysisByWeek = analysisByWeek.map(r2 => {
                if(r2.key === compareWeek) {
                    return r2 = {
                        ...r2,
                        value: {
                            ...r2.value,
                            [compareDay]: parseInt(r2.value[compareDay]) + parseInt(r.value)
                        }
                    }
                }else {
                    return r2;
                }
            })
        })

        let revenueByWeek = analysisByWeek.map(r => Object.values(r.value));
        datasetsByWeek = analysisByWeek.map((r, idx) => {
            let datasets = new GraphDataset().toJSON();
            return {
                ...datasets,
                type: 'bar',
                label: r.key + '주차',
                data: revenueByWeek[idx],
                fill: true,
                borderColor: ORDER_GRAPH_BG_COLOR[idx] + 'BB',
                backgroundColor: ORDER_GRAPH_BG_COLOR[idx] + 'BB',
                tension: 0
            }
        })

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

        dispatchDayRevenueGraphData({
            type: 'INIT_DATA',
            payload: dayRevenueGraphData
        })
    }

    // 4. 매출 BEST
    const onActionCreateTableData = () => {
        let date = new Set([]);
        let analysis = [];

        let startDate = query.startDate;
        let endDate = query.endDate;

        let betweenDay = getDifferenceBetweenStartDateAndEndDate(startDate, endDate);
        for (let i = 0; i < betweenDay; i++) {
            let lastDate = new Date(endDate);
            lastDate.setDate(lastDate.getDate() - i);
            date.add(dateToYYYYMMDD(new Date(lastDate)));
        }

        date.forEach(r => {
            let data = {
                key: r,
                revenue: 0,
                order: 0,
                unit: 0
            }
            analysis.push(data);
        });

        analysisItem.forEach(r => {
            let date3 = dateToYYYYMMDD(r.channelOrderDate);
            if (date3 && date.has(date3)) {
                let data4 = analysis.map(r2 => {
                    if (r2.key === date3) {
                        return r2 = {
                            ...r2,
                            revenue: parseInt(r2.revenue) + parseInt(r.price) + parseInt(r.deliveryCharge),
                            order: parseInt(r2.order) + 1,
                            unit: parseInt(r2.unit) + parseInt(r.unit)
                        }
                    } else {
                        return r2;
                    }
                })

                analysis = [...data4];
            }
        })

        let totalOrder = 0;
        let totalUnit = 0;
        let totalRevenue = 0;
        analysis.forEach(r => {
            totalOrder += r.order;
            totalUnit += r.unit;
            totalRevenue += r.revenue;
        })

        analysis.sort((a, b) => a.revenue - b.revenue);

        let data = {
            key: '전체',
            revenue: totalRevenue,
            unit: totalUnit,
            order: totalOrder
        }
        analysis.push(data);
        analysis.reverse();

        dispatchTableData({
            type: 'INIT_DATA',
            payload: analysis
        })
    }

    const onActionCheckOrderItem = (e) => {
        e.stopPropagation();

        setHideSalesGraph(!hideSalesGraph);
    }

    const onChangeRevenueDropDownItem = (e) => {
        let target = e.target.value;

        dispatchRevenueGraphData({
            type: 'CLEAR'
        })

        query.searchItem = target;

        navigate({
            pathname: query.pathname,
            search: `?${qs.stringify(query)}`
        });

        dispatchSearchItem({
            type: 'INIT_DATA',
            payload: target
        })
    }

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

        if(name === 'category') {
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

    // dateRange(일, 주, 월)값에 따라 date값을 변환한다
    const getDateToAnalysisRangeDateFormat = (dateRange, date) => {
        let addDate = dateToYYYYMMDD(date);
        if(dateRange === 'week') {
            addDate = dateToYYYYMM(date) + '-' + getWeekNumber(date);
        }else if(dateRange === 'month'){
            addDate = dateToYYYYMM(date);
        }
        return addDate;
    }

    const getAnalysisDateFormatToViewFormat = (dateRange, date) => {
        let viewDateFormat = dateToMMDD(date) + ' (' + getDayName(date) + ')';
        if(dateRange === 'week') {
            viewDateFormat = date + '주차';
        } else if(dateRange === 'month') {
            viewDateFormat = date;
        }
        return viewDateFormat;
    }

    return (
        <Container>
            {revenueGraphData &&
                <>
                    <div className='graph-group'>
                        <GraphTitleField
                            element={
                                (
                                    <div className='title'>[ 총 매출액 ]</div>
                                )
                            }
                        ></GraphTitleField>
                        <RevenueOperatorFieldView
                            searchItem={searchItem}
                            hideSalesGraph={hideSalesGraph}

                            onChangeRevenueDropDownItem={onChangeRevenueDropDownItem}
                            onActionCheckOrderItem={onActionCheckOrderItem}
                        ></RevenueOperatorFieldView>
                        <RevenueGraphFieldView
                            searchItem={searchItem}
                            revenueGraphData={revenueGraphData}
                        ></RevenueGraphFieldView>
                    </div>
                    {searchItem === 'product' &&
                        <div className='graph-group'>
                            <OptionRevenueOperatorFieldView
                                productSearchItem={productSearchItem}
                                hideSalesGraph={hideSalesGraph}
                                categoryList={props.categoryList}
                                productViewList={productViewList}

                                onChangeOptionRevenueDropDownItem={onChangeOptionRevenueDropDownItem}
                            ></OptionRevenueOperatorFieldView>
                            <OptionRevenueGraphFieldView
                                productSearchItem={productSearchItem}
                                optionRevenueGraphData={optionRevenueGraphData}
                            ></OptionRevenueGraphFieldView>
                        </div>
                    }
                </>
            }
            {orderAnalysisGraphData &&
                <div className='graph-group'>
                    <GraphTitleField
                        element={
                            (
                                <div className='title'>[ 총 주문건 & 수량 ]</div>
                            )
                        }
                    ></GraphTitleField>
                    <OrderAnalysisGraphFieldView
                        searchItem={searchItem}
                        orderAnalysisGraphData={orderAnalysisGraphData}
                    ></OrderAnalysisGraphFieldView>
                </div>
            }
            {dayRevenueGraphData &&
                <div className='graph-group'>
                    <GraphTitleField
                        element={
                            (
                                <div className='title'>[ 요일별 매출액 ]</div>
                            )
                        }
                    ></GraphTitleField>
                    <DayRevenueGraphFieldView
                        searchItem={searchItem}
                        dayRevenueGraphData={dayRevenueGraphData}
                    ></DayRevenueGraphFieldView>
                </div>
            }
            {tableData &&
                <div className='graph-group'>
                    <GraphTitleField
                        element={
                            (
                                <div className='title'>[ 매출 BEST ]</div>
                            )
                        }
                    ></GraphTitleField>
                    <TableFieldView
                        tableData={tableData}
                    ></TableFieldView>
                </div>
            }
        </Container>
    )
}

export default SalesPerformanceGraphComponent;

const initialRevenueGraphData = null;
const initialDayRevenueGraphData = null;
const initialOrderAnalysisGraphData = null;
const initialTableData = null;
const initialAnalysisItem = null;
const initialSearchItem = 'total';
const initialProductSearchItem = {
    category: 'total',
    product: 'total'
};
const initialProductViewList = null;
const initialOptionAnalysisItem = null;
const initialOptionRevenueGraphData = null;

const revenueGraphDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialRevenueGraphData;
        default:
            return state;
    }
}

const dayRevenueGraphDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialDayRevenueGraphData;
        default:
            return state;
    }
}

const orderAnalysisGraphDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialRevenueGraphData;
        default:
            return state;
    }
}

const tableDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialTableData;
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

const optionAnalysisItemReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialOptionAnalysisItem;
        default:
            return state;
    }
}

const searchItemReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSearchItem;
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
            return initialSearchItem;
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

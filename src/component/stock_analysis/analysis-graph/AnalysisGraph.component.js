import _ from "lodash";
import { useEffect, useReducer } from "react";
import { GraphDataset } from "../../../utils/graphDataUtils";
import { Container, TitleFieldWrapper } from "./AnalysisGraph.styled";
import AnalysisGraphFieldView from "./AnalysisGraphField.view";

const CHART_BG_COLOR = ['#5D5A83BB', '#B9B4EBBB', '#908CB8BB', '#F1EDFFBB', '#ACA9BBBB'];

const BEST_ITEM_INDEX = 5;


function TitleField({ element }) {
    return (
        <TitleFieldWrapper>
            {element}
        </TitleFieldWrapper>
    );
}

const AnalysisGraphComponent = (props) => {
    const [graphOption, dispatchGraphOption] = useReducer(graphOptionReducer, initialGraphOption);

    const [optionAnalysisGraphData, dispatchOptionAnalysisGraphData] = useReducer(optionAnalysisGraphDataReducer, initialOptionAnalysisGraphData);
    const [productAnalysisGraphData, dispatchProductAnalysisGraphData] = useReducer(productAnalysisGraphDataReducer, initialProductAnalysisGraphData);

    useEffect(() => {
        if(!props.stockAnalysisViewList) {
            return;
        }

        let gOption = {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: true,
            },
            plugins: {
                legend: {
                    position: 'right'
                }
            },
        }

        dispatchGraphOption({
            type: 'INIT_DATA',
            payload: gOption
        })
        onActionCreateOptionStockAnalysisGraphData();
        onActionCreateProductStockAnalysisGraphData();
    }, [props.stockAnalysisViewList])

    const onActionCreateOptionStockAnalysisGraphData = () => {
        // 재고자산, 재고수량 worst 항목 추출
        let stockItems = [...props.stockAnalysisViewList];
        let propertyDatasets = [];
        let unitDatasets = [];

        let worstPropertyStockItem = _.sortBy(stockItems, 'stockProperty').reverse();
        worstPropertyStockItem = worstPropertyStockItem.slice(0, BEST_ITEM_INDEX);
        
        let worstUnitStockItem = _.sortBy(stockItems, 'stockSumUnit').reverse();
        worstUnitStockItem = worstUnitStockItem.slice(0, BEST_ITEM_INDEX);

        let propertyLabel = worstPropertyStockItem.map(r => r.product.defaultName + " " + r.option.defaultName);
        let propertyValues = worstPropertyStockItem.map(r => r.stockProperty);

        let unitLabel = worstUnitStockItem.map(r => r.product.defaultName + " " + r.option.defaultName);
        let unitValues = worstUnitStockItem.map(r => r.stockSumUnit);

        // 옵션 재고자산, 재고수량 그래프 dataset 생성
        let worstPropertyGraphDataset = new GraphDataset().toJSON();
        worstPropertyGraphDataset = {
            ...worstPropertyGraphDataset,
            type: 'doughnut',
            label: '재고자산',
            data: propertyValues,
            fill: true,
            borderColor: CHART_BG_COLOR,
            backgroundColor: CHART_BG_COLOR,
            tension: 0
        }
        propertyDatasets.push(worstPropertyGraphDataset);

        let worstUnitGraphDataset = new GraphDataset().toJSON();
        worstUnitGraphDataset = {
            ...worstUnitGraphDataset,
            type: 'doughnut',
            label: '재고수량',
            data: unitValues,
            fill: true,
            borderColor: CHART_BG_COLOR,
            backgroundColor: CHART_BG_COLOR,
            tension: 0
        }
        unitDatasets.push(worstUnitGraphDataset);

        let data = {
            property: {
                labels: propertyLabel,
                datasets: propertyDatasets
            },
            unit: {
                labels: unitLabel,
                datasets: unitDatasets
            }
        }

        dispatchOptionAnalysisGraphData({
            type: 'INIT_DATA',
            payload: data
        })
    }

    const onActionCreateProductStockAnalysisGraphData = () => {
        // 재고자산, 재고수량 worst 항목 추출
        let stockItems = [...props.stockAnalysisViewList];
        let propertyDatasets = [];
        let unitDatasets = [];
        let product = new Set([]);
        let analysis = [];

        stockItems.forEach(r => {
            product.add(r.product?.defaultName || '미지정')
        });

        analysis = [...product].map(r => {
            return {
                key: r,
                property: 0,
                unit: 0
            }
        });


        stockItems.forEach(r => {
            let productId = r.product?.defaultName || '미지정'
            analysis = analysis.map(r2 => {
                if(r2.key === productId) {
                    return {
                        ...r2,
                        property: parseInt(r2.property) + parseInt(r.stockProperty),
                        unit: parseInt(r2.unit) + parseInt(r.stockSumUnit)
                    }
                }else {
                    return r2;
                }
            })
        })

        let propertyItems = [...analysis];
        let unitItems = [...analysis];
        propertyItems.sort((a, b) => b.property - a.property);
        unitItems.sort((a, b) => b.unit - a.unit);

        propertyItems = propertyItems.slice(0, BEST_ITEM_INDEX);
        unitItems = unitItems.slice(0, BEST_ITEM_INDEX);

        // 상품 재고자산, 재고수량 그래프 dataset 생성
        let propertyLabel = propertyItems.map(r => r.key);
        let propertyValues = propertyItems.map(r => r.property);
        let worstPropertyGraphDataset = new GraphDataset().toJSON();
        worstPropertyGraphDataset = {
            ...worstPropertyGraphDataset,
            type: 'doughnut',
            label: '재고자산',
            data: propertyValues,
            fill: true,
            borderColor: CHART_BG_COLOR,
            backgroundColor: CHART_BG_COLOR,
            tension: 0
        }
        propertyDatasets.push(worstPropertyGraphDataset);

        let unitLabel = unitItems.map(r => r.key);
        let unitValues = unitItems.map(r => r.unit);
        let worstUnitGraphDataset = new GraphDataset().toJSON();
        worstUnitGraphDataset = {
            ...worstUnitGraphDataset,
            type: 'doughnut',
            label: '재고수량',
            data: unitValues,
            fill: true,
            borderColor: CHART_BG_COLOR,
            backgroundColor: CHART_BG_COLOR,
            tension: 0
        }
        unitDatasets.push(worstUnitGraphDataset);

        let data = {
            property: {
                labels: propertyLabel,
                datasets: propertyDatasets
            },
            unit: {
                labels: unitLabel,
                datasets: unitDatasets
            }
        }

        dispatchProductAnalysisGraphData({
            type: 'INIT_DATA',
            payload: data
        })
    }

    return (
        <Container>
            <TitleField
                element={<div className='title'>[ 재고자산 대시보드 ]</div>}
            ></TitleField>
            <AnalysisGraphFieldView
                productAnalysisGraphData={productAnalysisGraphData}
                optionAnalysisGraphData={optionAnalysisGraphData}
                graphOption={graphOption}
                bestItemUnit={BEST_ITEM_INDEX}
            ></AnalysisGraphFieldView>
        </Container>
    )
}

export default AnalysisGraphComponent;

const initialOptionAnalysisGraphData = null;
const initialProductAnalysisGraphData = null;
const initialGraphOption = null;

const optionAnalysisGraphDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialOptionAnalysisGraphData;
        default:
            return state;
    }
}

const productAnalysisGraphDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialProductAnalysisGraphData;
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
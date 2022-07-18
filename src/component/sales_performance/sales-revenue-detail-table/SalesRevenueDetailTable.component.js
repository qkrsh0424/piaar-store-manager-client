import { useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { dateToYYYYMM, dateToYYYYMMDD, getDifferenceBetweenStartDateAndEndDate, getWeekNumber } from "../../../utils/dateFormatUtils";
import { Container, GraphTitleFieldWrapper } from "./SalesRevenueDetailTable.styled";
import _ from "lodash";
import TableFieldView from "./TableField.view";

function GraphTitleField({ element }) {
    return (
        <GraphTitleFieldWrapper>
            {element}
        </GraphTitleFieldWrapper>
    );
}

const SalesRevenueDetailTableComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);

    const [analysisItem, dispatchAnalysisItem] = useReducer(analysisItemReducer, initialAnalysisItem);
    const [tableData, dispatchTableData] = useReducer(tableDataReducer, initialTableData);
    
    useEffect(() => {
        if (!props.erpItemData) {
            return;
        }

        let item = props.erpItemData?.map(r => r.erpOrderItem);
        dispatchAnalysisItem({
            type: 'INIT_DATA',
            payload: item
        })
    }, [props.erpItemData])
    
    useEffect(() => {
        if (!analysisItem) {
            return;
        }

        onActionCreateTableData();
    }, [analysisItem, props.hideOrderGraph])

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
            let addDate = getDateToAnalysisRangeDateFormat('date', lastDate);
            date.add(addDate);
        }

        analysis = [...date].map(r => {
            return {
                key: r,
                revenue: 0,
                order: 0,
                unit: 0,
                salesRevenue: 0,
                sales: 0,
                salesUnit: 0
            }
        });

        analysisItem.forEach(r => {
            let compareDate = getDateToAnalysisRangeDateFormat('date', r.channelOrderDate);
            analysis = analysis.map(r2 => {
                if (r2.key === compareDate) {
                    if(r.salesYn === 'y'){
                        return {
                            ...r2,
                            revenue: parseInt(r2.revenue) + parseInt(r.price) + parseInt(r.deliveryCharge),
                            order: parseInt(r2.order) + 1,
                            unit: parseInt(r2.unit) + parseInt(r.unit),
                            salesRevenue: parseInt(r2.salesRevenue) + parseInt(r.price) + parseInt(r.deliveryCharge),
                            sales: parseInt(r2.sales) + 1,
                            salesUnit: parseInt(r2.salesUnit) + parseInt(r.unit)
                        }
                    }else {
                        return {
                            ...r2,
                            revenue: parseInt(r2.revenue) + parseInt(r.price) + parseInt(r.deliveryCharge),
                            order: parseInt(r2.order) + 1,
                            unit: parseInt(r2.unit) + parseInt(r.unit)
                        }
                    }
                } else {
                    return r2;
                }
            })
        })
        // 매출 내림차순 정렬
        analysis.sort((a, b) => b.salesRevenue - a.salesRevenue);

        // 전체 합계를 나타내는 컬럼 추가
        let total = {
            key: '전체',
            order: 0,
            unit: 0,
            revenue: 0,
            sales: 0,
            salesUnit: 0,
            salesRevenue: 0
        }

        analysis.forEach(r => {
            total = {
                ...total,
                order: total.order + r.order,
                unit: total.unit + r.unit,
                revenue: total.revenue + r.revenue,
                sales: total.sales + r.sales,
                salesUnit: total.salesUnit + r.salesUnit,
                salesRevenue: total.salesRevenue + r.salesRevenue
            }
        })

        analysis.unshift(total);

        dispatchTableData({
            type: 'INIT_DATA',
            payload: analysis
        })
    }

    // dateRange(일, 주, 월)값에 따라 date값을 변환한다
    const getDateToAnalysisRangeDateFormat = (dateRange, date) => {
        let addDate = dateToYYYYMMDD(date);
        if (dateRange === 'week') {
            addDate = dateToYYYYMM(date) + '-' + getWeekNumber(date);
        } else if (dateRange === 'month') {
            addDate = dateToYYYYMM(date);
        }
        return addDate;
    }

    return(
        <Container>
            {tableData &&
                <div className='graph-group'>
                    <GraphTitleField
                        element={
                            (
                                <>
                                    <div className='title'>[ 매출 BEST ]</div>
                                    <div className='info-text'>
                                        * 판매 매출액 기준으로 정렬됩니다.
                                    </div>
                                </>
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

export default SalesRevenueDetailTableComponent;

const initialAnalysisItem = null;
const initialTableData = null;

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

import { useEffect, useReducer } from "react"
import { getDateOfLastSunDay, getEndDate, getStartDate } from "../../../utils/dateFormatUtils"
import { Container, ImageFieldWrapper, TextInfoFieldWrapper } from "./OptionStockCycle.styled"
import TableFieldView from "./TableField.view"

function ImageFieldView({ option }) {
    return (
        <ImageFieldWrapper>
            <div className='image-wrapper'>
                <div className='image-box'>
                    {option.imageUrl ?
                        <img src={option.imageUrl} title={option.imageFileName} />
                        :
                        <img src='/images/icon/no-image.jpg' title='no-image' />
                    }
                </div>
            </div>
        </ImageFieldWrapper>
    )
}

function TextInfoFieldView({ option }) {
    return (
        <TextInfoFieldWrapper>
            <div className='data-group'>
                <span>옵션 코드 : </span>
                <span>{option.code}</span>
            </div>
            <div className='data-group'>
                <span>옵션명 : </span>
                <span>{option.defaultName}</span>
            </div>
            <div className='data-group'>
                <span>옵션관리명 : </span>
                <span>{option.managementName}</span>
            </div>
        </TextInfoFieldWrapper>
    )
}

const week = ['W-2', 'W-1', 'W0', 'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11'];
const viewWeek = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'];
const CYCLE_AVERAGE_WEEK = 4;
const CYCLE_TOTAL_WEEK = 11;

const OptionStockCycleComponent = (props) => {
    const [tableData, dispatchTableData] = useReducer(tableDataReducer, initialTableData);
    const [outOfStockIdList, dispatchOutOfStockIdList] = useReducer(outOfStockIdListReducer, initialOutOfStockIdList);

    useEffect(() => {
        if(!props.stockData) {
            return;
        }

        onActionCreateTableData();
    }, [props.stockData])

    const onActionCreateTableData = () => {
        let cycleEndDate = getEndDate(getDateOfLastSunDay());

        // 재고 주기 계산하지 않는 T 주를 구한다
        let data =props.stockData.map(r1 => {
            let receive = 0;
            let release = 0;
            let stock = r1.option.stockSumUnit;

            r1.stockStatus.productReceive.forEach(r2 => {
                if(r2.createdAt >= cycleEndDate) {
                    receive += r2.receiveUnit;
                }
            })

            r1.stockStatus.productRelease.forEach(r2 => {
                if(r2.createdAt >= cycleEndDate) {
                    release += r2.releaseUnit;
                }
            })

            return {
                ...r1,
                stockCycle: {
                    W11: {
                        receive,
                        release,
                        stock
                    }
                }
            }
        })

        // 재고 주기 계산
        week.forEach((r1, idx) => {
            let endDate = getEndDate(cycleEndDate);
            let startDate = getStartDate(new Date(cycleEndDate.setDate(cycleEndDate.getDate() - 6)));
            
            data = data.map(r2 => {
                let receive = 0;
                let release = 0;
                // 현재주의 재고 = 다음주의 재고 + 출고 - 입고
                let lastWeekStock = r2.stockCycle[`W${CYCLE_TOTAL_WEEK - idx}`].stock;
                let lastWeekRelease = r2.stockCycle[`W${CYCLE_TOTAL_WEEK - idx}`].release;
                let lastWeekReceive = r2.stockCycle[`W${CYCLE_TOTAL_WEEK - idx}`].receive;
                let stock = lastWeekStock + lastWeekRelease - lastWeekReceive;

                r2.stockStatus.productReceive.forEach(r3 => {
                    let createdAt = new Date(r3.createdAt);
                    if(createdAt >= startDate && createdAt <= endDate) {
                        receive += r3.receiveUnit;
                    }
                })

                r2.stockStatus.productRelease.forEach(r3 => {
                    let createdAt = new Date(r3.createdAt);
                    if(createdAt >= startDate && createdAt <= endDate) {
                        release += r3.releaseUnit;
                    }
                })

                return {
                    ...r2,
                    stockCycle: {
                        ...r2.stockCycle,
                        [`W${CYCLE_TOTAL_WEEK - (idx+1)}`]: {
                            receive,
                            release,
                            stock
                        }
                    }
                }
            })

            // 날짜 세팅
            cycleEndDate = new Date(startDate);
            cycleEndDate.setDate(cycleEndDate.getDate() - 1);
        })

        // 재고주기
        viewWeek.forEach((r1, idx) => {
            data = data.map((r, index) => {
                let salesSum = 0;
                for(var i = 0; i < CYCLE_AVERAGE_WEEK; i++) {
                    salesSum += parseInt(r.stockCycle[`W${idx + i - 2}`].release);
                }
                let salesAverage = (salesSum / CYCLE_AVERAGE_WEEK) || 1;
                let cycle = parseInt(r.stockCycle[`W${idx + 1}`].stock) <= 0 ? 0 : (r.stockCycle[`W${idx + 1}`].stock / salesAverage).toFixed(2);

                return {
                    ...r,
                    stockCycle: {
                        ...r.stockCycle,
                        [`W${idx + 1}`]: {
                            ...r.stockCycle[`W${idx + 1}`],
                            cycle: cycle
                        }
                    }
                };
            })
        })
        
        dispatchTableData({
            type: 'INIT_DATA',
            payload: data
        })

        // 재고주기 - 위험군 세팅
        let outOfStockOption = data.filter(r => r.stockCycle.W10.cycle <= 3);
        let outOfStockOptionIdList = outOfStockOption.map(r => r.option.id);

        dispatchOutOfStockIdList({
            type: 'INIT_DATA',
            payload: outOfStockOptionIdList
        })
    }

    return (
        <Container>
            {tableData?.map((r, idx) => {
                return (
                    <div
                        key={idx}
                        className='option-stock-cycle-box'
                    >   
                        <div className='option-index'>
                            <span>[{idx+1}]</span>
                            {outOfStockIdList.includes(r.option.id) &&
                                <span className='highlight-text'>재고 부족 예상</span>
                            }
                        </div>
                        <div className='info-box'>
                            <ImageFieldView
                                option={r.option}
                            ></ImageFieldView>
                            <TextInfoFieldView
                                option={r.option}
                            ></TextInfoFieldView>
                        </div>
                        <TableFieldView
                            cycleData={r}
                            outOfStockIdList={outOfStockIdList}
                        ></TableFieldView>
                    </div>
                )
            })}
        </Container>
    )
}

export default OptionStockCycleComponent;

const initialTableData = null;
const initialOutOfStockIdList = null;

const tableDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialTableData;
        default: return { ...state };
    }
}

const outOfStockIdListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialOutOfStockIdList;
        default: return { ...state };
    }
}
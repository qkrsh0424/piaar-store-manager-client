import { useEffect, useReducer } from "react"
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
            <div className='data-group'>
                <span>안전재고 수량 : </span>
                <span>{option.safetyStockUnit || 0}</span>
            </div>
        </TextInfoFieldWrapper>
    )
}

const CYCLE_AVERAGE_WEEK = 4;
const CYCLE_TOTAL_WEEK = 7;

const OptionStockCycleComponent = (props) => {
    const [tableData, dispatchTableData] = useReducer(tableDataReducer, initialTableData);
    const [outOfStockIdList, dispatchOutOfStockIdList] = useReducer(outOfStockIdListReducer, initialOutOfStockIdList);

    useEffect(() => { 
        if(!props.stockCycle) {
            return;
        }
        
        if(!props.selectedProduct || props.selectedProduct === 'total') {
            return;
        }

        onActionCreateTableData();
    }, [props.stockCycle, props.selectedProduct])

    const onActionCreateTableData = () => {
        let data = [...props.stockCycle];

        // 주차별 재고수량 계산. data의 optionId값에 대응하는 옵션을 추가.
        data = data.map(r => {
            let result = {...r};
            let option = props.selectedProduct?.options?.filter(r2 => r2.id === r.optionId)[0];

            for(let i = 1; i < CYCLE_TOTAL_WEEK; i++) {
                let key = 'totalStockUnitForW' + (i + 1);
                let value = parseInt(result['totalStockUnitForW' + i]) + parseInt(r[('releaseSumUnitForW' + i)]) - parseInt(r[('receiveSumUnitForW' + i)]);

                result = {
                    ...result,
                    [key]: value,
                    option: option
                }
            }
            return result;
        })

        // 재고주기 계산
        data = data.map(r => {
            let result = {...r};
            for(var i = 1; i <= CYCLE_AVERAGE_WEEK; i++) {
                let salesSum = 0;
                for (var j = 0; j < CYCLE_AVERAGE_WEEK; j++) {
                    salesSum += parseInt(r['releaseSumUnitForW' + (i + j)]);
                }

                // 안전재고 수량 제외
                let salesAverage = (salesSum / CYCLE_AVERAGE_WEEK) || 1;
                let stock = result['totalStockUnitForW' + i] - result.option?.safetyStockUnit;
                let cycle = stock <= 0 ? 0 : (stock / salesAverage).toFixed(2);
                
                result = {
                    ...result,
                    ['stockCycleForW' + i]: cycle
                }
            }
            return result;
        })
        
        dispatchTableData({
            type: 'INIT_DATA',
            payload: data
        })

        // W1 재고주기 - 위험군 세팅
        let outOfStockOption = data.filter(r => r.stockCycleForW1 <= 3);
        let outOfStockOptionIdList = outOfStockOption.map(r => r.optionId);

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
                            {outOfStockIdList.includes(r.optionId) &&
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
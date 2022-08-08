import { useEffect, useReducer } from "react"
import { Container, ImageFieldWrapper, TextInfoFieldWrapper } from "./OptionStockCycle.styled"
import TableFieldView from "./TableField.view"

function ImageFieldView({ element }) {
    return (
        <ImageFieldWrapper>
            <div className='image-wrapper'>
                <div className='image-box'>
                    {element.imageUrl ?
                        <img src={element.imageUrl} title={element.imageFileName} />
                        :
                        <img src='/images/icon/no-image.jpg' title='no-image' />
                    }
                </div>
            </div>
        </ImageFieldWrapper>
    )
}

function TextInfoFieldView({ element }) {
    return (
        <TextInfoFieldWrapper>
            {element}
        </TextInfoFieldWrapper>
    )
}

const CYCLE_TOTAL_WEEK = 7;
const CYCLE_VIEW_WEEK = 4;
const CYCLE_AVERAGE_WEEK = 4;
const CYCLE_MINIMUM = 3;

const OptionStockCycleComponent = (props) => {
    const [tableData, dispatchTableData] = useReducer(tableDataReducer, initialTableData);
    const [outOfStockIdList, dispatchOutOfStockIdList] = useReducer(outOfStockIdListReducer, initialOutOfStockIdList);

    useEffect(() => {
        dispatchTableData({
            type: 'CLEAR'
        })
    }, [props.selectedProduct])
    
    useEffect(() => {
        if(!props.viewStockCycle) {
            return;
        }
        
        onActionCreateTableData();
    }, [props.viewStockCycle])

    const onActionCreateTableData = async () => {
        let data = [...props.viewStockCycle];
        let productM2OJ = [...props.selectedProduct];

        // 주차별 재고수량 계산. data의 optionId값에 대응하는 옵션을 추가.
        data = data.map(r => {
            let result = {...r};

            let option = {};
            productM2OJ?.forEach(r2 => {
                if(r2.product?.id === r.productId) {
                    let matchedOption = r2.options.filter(r3 => r3.id === result.optionId)[0];
    
                    if(matchedOption) {
                        option = {...matchedOption};
                    }
                }
            })

            // 주차별 재고 수량 계산
            for(let i = 1; i < CYCLE_TOTAL_WEEK; i++) {
                // W(i+1)의 재고수량 = W(i)의 재고수량 + W(i)의 출고 수량 - W(i)의 입고 수량
                let key = 'stockForW' + (i + 1);
                let value = parseInt(result['stockForW' + i]) + parseInt(r[('releaseForW' + i)]) - parseInt(r[('receiveForW' + i)]);

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
            // 테이블에 표시할 주차 개수만큼 반복
            for(var i = 1; i <= CYCLE_VIEW_WEEK; i++) {
                let salesSum = 0;
                for (var j = 0; j < CYCLE_AVERAGE_WEEK; j++) {
                    salesSum += parseInt(r['releaseForW' + (i + j)]);
                }
                let salesAverage = (salesSum / CYCLE_AVERAGE_WEEK) || 1;
                
                // 안전재고 수량 차감
                let stock = result['stockForW' + i] - result.option?.safetyStockUnit;
                let cycle = stock <= 0 ? 0 : (stock / salesAverage).toFixed(2);
                
                result = {
                    ...result,
                    ['cycleForW' + i]: cycle
                }
            }
            return result;
        })
        
        dispatchTableData({
            type: 'INIT_DATA',
            payload: data
        })

        // W1의 재고주기로 위험군 세팅
        let outOfStockOption = data.filter(r => r.cycleForW1 <= CYCLE_MINIMUM);
        let outOfStockOptionIdList = outOfStockOption.map(r => r.optionId);

        dispatchOutOfStockIdList({
            type: 'INIT_DATA',
            payload: outOfStockOptionIdList
        })
    }

    return (
        <Container>
            {tableData && props.selectedProduct?.map((r, idx) => {
                let outOfStockProductSize = 0;
                // 최소 재고주기보다 낮은 옵션 개수를 구한다
                r.options?.forEach(option => {
                    if(outOfStockIdList.includes(option.id)){
                        outOfStockProductSize++;
                    }
                })

                return (
                    <div 
                        key={'product-info-idx' + idx}
                        className='product-cycle-group'
                    >
                        <div className='cycle-title'>
                            <span>상품{idx+1}. </span>
                            <span>{r.product.defaultName}</span>
                        </div>
                        <div className='data-wrapper'>
                            <div className='product-box'>
                                <ImageFieldView
                                    element={r.product}
                                ></ImageFieldView>
                                <TextInfoFieldView
                                    element={
                                        <div>
                                            <div className='product-data-group'>
                                                <div>상품 코드 </div>
                                                <div>: {r.product.code}</div>
                                            </div>
                                            <div className='product-data-group'>
                                                <div>상품명 </div>
                                                <div>: {r.product.defaultName}</div>
                                            </div>
                                            <div className='product-data-group'>
                                                <div>상품관리명 </div>
                                                <div>: {r.product.managementName}</div>
                                            </div>
                                            <div className='product-data-group'>
                                                <div>옵션수량 </div>
                                                <div>: 총 {r.options.length} 개</div>
                                            </div>
                                            <div className='product-data-group out-of-stock-unit'>
                                                <div>재고부족 예상 옵션수량 </div>
                                                <div>: 총 {outOfStockProductSize} 개</div>
                                            </div>
                                        </div>
                                    }
                                ></TextInfoFieldView>
                            </div>
                            <div className='option-box'>
                                {tableData?.map((r2, idx) => {
                                    if (r2.productId === r.product.id)
                                        return (
                                            <div
                                                key={idx}
                                                className='option-stock-cycle-box'
                                            >
                                                <div>
                                                    <div className='out-of-stock-unit'>
                                                        {outOfStockIdList.includes(r2.optionId) &&
                                                            <span className='highlight'>재고 부족 예상</span>
                                                        }
                                                    </div>
                                                    <div className='info-box'>
                                                        <TextInfoFieldView
                                                            element={
                                                                <div>
                                                                    <div className='data-group'>
                                                                        <span>{r2.option.code}</span>
                                                                    </div>
                                                                    <div className='data-group'>
                                                                        <span>{r2.option.defaultName}</span>
                                                                    </div>
                                                                    <div className='data-group'>
                                                                        <span>{r2.option.managementName}</span>
                                                                    </div>
                                                                    <div className='data-group'>
                                                                        <span>안전재고 수량 : </span>
                                                                        <span>{r2.option.safetyStockUnit || 0}개</span>
                                                                    </div>
                                                                </div>
                                                            }
                                                        ></TextInfoFieldView>
                                                    </div>
                                                </div>
                                                <TableFieldView
                                                    cycleData={r2}
                                                    outOfStockIdList={outOfStockIdList}
                                                ></TableFieldView>
                                            </div>
                                        )
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}
        </Container>
    )
}

export default OptionStockCycleComponent;

const initialTableData = null;
const initialOutOfStockIdList = [];

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
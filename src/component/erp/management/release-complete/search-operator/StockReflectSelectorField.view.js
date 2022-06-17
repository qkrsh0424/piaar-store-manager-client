import { StockReflectSelectorFieldWrapper } from "./SearchOperator.styled";

export default function StockReflectSelectorFieldView({
    stockReflectYn,
    onChangeStockReflectYn
}) {
    return (
        <StockReflectSelectorFieldWrapper>
            <div className='label-item'>재고반영 상태</div>
            <div className='flex-box'>

                <select
                    className='select-item'
                    value={stockReflectYn || ''}
                    onChange={onChangeStockReflectYn}
                >
                    <option value=''>전체</option>
                    <option value={'n'}>미반영</option>
                    <option value={'y'}>반영</option>
                </select>
            </div>
        </StockReflectSelectorFieldWrapper>
    );
}
import { StatusSelectorFieldWrapper } from "./SearchOperator.styled";

export default function StatusSelectorFieldView({
    stockReflectYn,
    onChangeStockReflectYn,
    defectiveYn,
    onChangeDefectiveYn
}) {
    return (
        <StatusSelectorFieldWrapper>
            <div>
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
            </div>

            <div>
                <div className='label-item'>불량상품 여부</div>
                <div className='flex-box'>

                    <select
                        className='select-item'
                        value={defectiveYn || ''}
                        onChange={onChangeDefectiveYn}
                    >
                        <option value=''>전체</option>
                        <option value={'n'}>X</option>
                        <option value={'y'}>O</option>
                    </select>
                </div>
            </div>
        </StatusSelectorFieldWrapper>
    );
}
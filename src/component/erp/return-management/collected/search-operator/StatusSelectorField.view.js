import { StatusSelectorFieldWrapper } from "./SearchOperator.styled";

export default function StatusSelectorFieldView({
    returnRejectYn,
    onChangeReturnRejectYn
}) {
    return (
        <StatusSelectorFieldWrapper>
            <div>
                <div className='label-item'>반품거절 여부</div>
                <div className='flex-box'>

                    <select
                        className='select-item'
                        value={returnRejectYn || ''}
                        onChange={onChangeReturnRejectYn}
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
import { ReleaseSelectorFieldWrapper } from "./SearchOperator.styled";

export default function ReleaseSelectorFieldView({
    releaseYn,
    onChangeReleaseYn
}) {
    return (
        <ReleaseSelectorFieldWrapper>
            <div className='label-item'>출고 상태</div>
            <div className='flex-box'>

                <select
                    className='select-item'
                    value={releaseYn || ''}
                    onChange={onChangeReleaseYn}
                >
                    <option value=''>전체</option>
                    <option value={'n'}>미출고</option>
                    <option value={'y'}>출고</option>
                </select>
            </div>
        </ReleaseSelectorFieldWrapper>
    );
}
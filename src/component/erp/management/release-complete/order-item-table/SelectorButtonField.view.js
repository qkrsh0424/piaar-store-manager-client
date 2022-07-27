import { SelectorButtonFieldWrapper } from "./OrderItemTable.styled";

export default function SelectorButtonFieldView(props) {
    return (
        <SelectorButtonFieldWrapper>
            <div className='flex-box'>
                <div>
                    <select
                        className='select-item'
                        value={props.searchReleaseLocationValue || ''}
                        onChange={props.onChangeReleaseLocationValue}
                    >
                        <option value=''>출고지 전체</option>
                        {props.releaseLocation?.map((r, idx) => {
                            return (
                                <option key={'release-location-idx' + idx} value={r}>{r}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <button
                        type='button'
                        className='button-el'
                        onClick={props.onActionCheckOrderItemAll}
                    >전체 선택</button>
                    <button
                        type='button'
                        className='button-el'
                        onClick={props.onActionReleaseOrderItemAll}
                    >전체 해제</button>
                </div>
            </div>
        </SelectorButtonFieldWrapper>
    );
}
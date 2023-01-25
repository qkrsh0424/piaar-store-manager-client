import { CheckBoxFieldWrapper } from "../OptionSelector.styled";

export default function CheckBoxFieldView (props) {
    return (
        <CheckBoxFieldWrapper>
            <div className='selector-box'>
                {props.options?.map((r, idx) => {
                    let checked = props.onActionIsCheckedOne(r);
                    return (
                        <div
                            key={'sales-channel-idx' + idx}
                            className='button-box'
                            onClick={(e) => props.onActionCheckOne(e, r)}
                        >
                            <button
                                type='button'
                                className={`button-el ${checked && 'button-active'}`}
                                checked={checked}
                                onChange={(e) => props.onActionCheckOne(e, r)}
                            >{r.defaultName}</button>
                        </div>
                    )
                })}
            </div>
            {(props.options === null || props.options?.length === 0) &&
                <div style={{ color: '#666', padding: '0 10px' }}>
                    조회된 결과 없음
                </div>
            }
        </CheckBoxFieldWrapper>
    )
}
import { CheckBoxFieldWrapper } from "../CategorySelector.styled";

export default function CheckBoxFieldView (props) {
    return (
        <CheckBoxFieldWrapper>
            <div className='selector-box'>
                {props.category?.map((r, idx) => {
                    let checked = props.onActionIsCheckedOne(r);
                    return (
                        <div
                            key={'category-idx' + idx}
                            className='button-box'
                            onClick={(e) => props.onActionCheckOne(e, r)}
                        >
                            <button
                                type='button'
                                className={`button-el ${checked && 'button-active'}`}
                                checked={checked}
                                onChange={(e) => props.onActionCheckOne(e, r)}
                            >{r}</button>
                        </div>
                    )
                })}
            </div>
            {(props.category === null || props.category.length === 0) &&
                <div style={{ color: '#666', padding: '0 10px' }}>
                    조회된 결과 없음
                </div>
            }
        </CheckBoxFieldWrapper>
    )
}
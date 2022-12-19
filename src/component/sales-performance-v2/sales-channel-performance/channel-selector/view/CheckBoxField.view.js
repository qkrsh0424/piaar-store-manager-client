import { CheckBoxFieldWrapper } from "../ChannelSelector.styled";

export default function CheckBoxFieldView (props) {
    return (
        <CheckBoxFieldWrapper>
            <div className='selector-box'>
                {props.salesChannel?.map((r, idx) => {
                    let checked = props.onActionIsCheckedOne(r);
                    return (
                        <div
                            key={'sales-channel-idx' + idx}
                            className={`checkbox-group ${checked && 'checkbox-active'}`}
                            onClick={(e) => props.onActionCheckOne(e, r)}
                        >
                            <div>
                                <input
                                    type='checkbox'
                                    checked={checked}
                                    onChange={(e) => props.onActionCheckOne(e, r)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                            <div>
                                <span>{r}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
            {(props.salesChannel === null || props.salesChannel.length === 0) &&
                <div style={{ color: '#666', padding: '0 10px' }}>
                    조회된 스토어 없음
                </div>
            }
        </CheckBoxFieldWrapper>
    )
}
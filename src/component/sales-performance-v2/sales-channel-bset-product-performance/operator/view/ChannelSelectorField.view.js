import { ChannelSelectorFieldWrapper } from "../Operator.styled";

export default function ChannelSelectorFieldView(props) {
    return (
        <ChannelSelectorFieldWrapper>
            <div className='selector-box-label'>
                검색 채널 :
            </div>
            <div>
                <div className='selector-box'>
                    {props.salesChannels?.map((r, idx) => {
                        let checked = props.onActionIsCheckedOne(r);
                        return (
                            <div
                                key={'sales-channel-idx' + idx}
                                className='button-box'
                                onClick={(e) => props.onActionCheckOne(e, r)}
                            >
                                <button
                                    type='button'
                                    className={`button-el ${checked && 'button-active'} `}
                                    checked={checked}
                                    onChange={(e) => props.onActionCheckOne(e, r)}
                                >{r}</button>
                            </div>
                        )
                    })}
                </div>
                {(props.salesChannels === null || props.salesChannels.length === 0) &&
                    <div style={{ color: '#666', padding: '0 10px' }}>
                        전체 채널에서 판매된 상품들의 판매순위를 표시합니다.
                    </div>
                }
            </div>
        </ChannelSelectorFieldWrapper>
    )
}
import { ChannelSelectorFieldWrapper } from "../Operator.styled";

export default function CategorySelectorFieldView(props) {
    return (
        <ChannelSelectorFieldWrapper>
            <div className='selector-box-label'>
                검색 카테고리 :
            </div>
            <div>
                <div className='selector-box'>
                    {props.salesCategory?.map((r, idx) => {
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
                {(props.salesCategory === null || props.salesCategory.length === 0) &&
                    <div style={{ color: '#666', padding: '0 10px' }}>
                        전체 카테고리에서 판매된 상품들의 판매순위를 표시합니다.
                    </div>
                }
            </div>
        </ChannelSelectorFieldWrapper>
    )
}
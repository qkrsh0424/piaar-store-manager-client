import { SearchFieldWrapper } from "../Operator.styled";

export default function SearchFieldView(props) {

    return (
        <SearchFieldWrapper>
            <div className='search-box'>
                <button
                    type='button'
                    className='button-el'
                    onClick={(e) => props.onActionOpenProductListModal(e)}
                >
                    <div>조회 상품 추가</div>
                </button>
            </div>

            <div className='option-box'>
                <div className='selector-box'>
                    {props.productAndOptions?.map((r, idx) => {
                        let optionIdx = 0;
                        let checked = props.selectedOptionCodes.some((code, index) => {
                            if(code === r.option.code) {
                                optionIdx = index;
                                return true;
                            }
                        })
                        
                        if(checked) {
                            return (
                                <div
                                    key={'search-option-idx' + idx}
                                    className='button-box'
                                    onClick={(e) => props.onActionOptionCheckOne(e, r.option.code)}
                                >
                                    <div className="close-box">
                                        <div className='close-button-box'>
                                            <img
                                                src='/assets/icon/close_default_666666.svg'
                                                style={{ width: '100%', position: 'absolute', right: '0', top: '50%', transform: 'translate(0, -50%)' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type='button'
                                        className={`button-el ${optionIdx % 2 === 1 ? 'odd-item' : ''}`}
                                        onChange={(e) => props.onActionOptionCheckOne(e, r.option.code)}
                                    >{r.product.defaultName} - {r.option.defaultName}</button>
                                </div>
                            )
                        }
                    })}
                    {props.selectedOptionCodes?.length === 0 &&
                        <div style={{ color: '#888' }}>
                            선택된 옵션 없음
                        </div>
                    }
                </div>
            </div>
        </SearchFieldWrapper>
    )
}
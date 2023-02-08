import Ripple from "../../../../module/button/Ripple";
import { SearchFieldWrapper } from "../Operator.styled";

export default function SearchFieldView(props) {

    return (
        <SearchFieldWrapper>
            <div className='search-box'>
                <div>
                    <button
                        type='button'
                        className='button-el'
                        onClick={(e) => props.onActionOpenProductListModal(e)}
                    >
                        조회 상품 추가
                        <Ripple color={'#e0e0e0'} duration={1000} />
                    </button>
                </div>
            </div>

            <div className='selector-box'>
                <div className='box-wrapper'>
                    {props.selectedProductAndOptions?.map((r, idx) => {
                        return (
                            <div
                                key={'search-box-idx' + idx}
                                className='box-group'
                            >
                                <div style={{ marginBottom: '5px' }}>
                                    <div
                                        className='button-box'
                                        onClick={(e) => props.onActionRemoveProduct(e, r.product.id)}
                                    >
                                        <div className="close-box">
                                            <div className='close-button-box' style={{ border: '1px solid #ff3060' }}>
                                                <img
                                                    src='/assets/icon/close_default_ff3060.svg'
                                                    style={{ width: '100%', position: 'absolute', right: '0', top: '50%', transform: 'translate(0, -50%)' }}
                                                    alt=""
                                                    loading='lazy'
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type='button'
                                            className='button-el'
                                            style={{ backgroundColor: '#465265', border: '1px solid #465265', height: '50px' }}
                                            onChange={(e) => props.onActionRemoveProduct(e, r.product.id)}
                                        >
                                            <div>{`${idx+1}. ${r.product.defaultName}`}</div>
                                            <div style={{ fontSize: '12px', color: '#abb1b9' }}>({`선택 옵션 ${r.options.length}개)`}</div>
                                         </button>
                                    </div>
                                </div>
                                <div className='option-search-box'>
                                    {r.options?.map((option, idx) => {
                                        return (
                                            <div
                                                key={'search-option-idx' + idx}
                                                className='button-box'
                                                onClick={(e) => props.onActionRemoveOptionOne(e, option.id)}
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
                                                    className='button-el'
                                                    onChange={(e) => props.onActionRemoveOptionOne(e, option.id)}
                                                >{option.defaultName}</button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </SearchFieldWrapper>
    )
}
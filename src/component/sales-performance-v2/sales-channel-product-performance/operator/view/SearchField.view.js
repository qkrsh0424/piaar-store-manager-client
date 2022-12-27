import { SearchFieldWrapper } from "../Operator.styled";

export default function SearchFieldView(props) {

    return (
        <SearchFieldWrapper>
            <div className='button-box'>
                <button
                    type='button'
                    className='button-el'
                    onClick={(e) => props.onActionOpenProductListModal(e)}
                >
                    {props.selectedProduct ? props.selectedProduct.defaultName : '상품 선택'}
                </button>
            </div>
            <div className='button-box'>
                <button
                    type='button'
                    className='button-el'
                    onClick={(e) => props.onActionOpenOptionListModal(e)}
                >
                    {props.selectedOption ? props.selectedOption.defaultName : '옵션 선택'}
                </button>
            </div>
        </SearchFieldWrapper>
    )
}
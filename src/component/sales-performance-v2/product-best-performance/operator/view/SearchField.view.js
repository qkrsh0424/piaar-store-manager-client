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
                        <div>{props.selectedProduct ? props.selectedProduct.defaultName : '상품 전체'}</div>
                    </button>
                </div>
            </div>
        </SearchFieldWrapper>
    )
}
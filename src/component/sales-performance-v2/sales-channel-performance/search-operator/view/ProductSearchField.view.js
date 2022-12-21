import { ProductSearchFieldWrapper } from "../SearchOperator.styled";

export default function ProductSearchFieldView(props) {

    return (
        <ProductSearchFieldWrapper>
            <button
                type='button'
                className='button-el'
                onClick={(e) => props.onActionOpenProductListModal(e)}
            >
                {props.selectedProduct ? props.selectedProduct.defaultName : '상품 선택'}
            </button>
        </ProductSearchFieldWrapper>
    )
}
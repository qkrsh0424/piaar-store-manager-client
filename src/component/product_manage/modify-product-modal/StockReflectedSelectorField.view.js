import { StockReflectedSelectorWrapper } from "./ModifyProductModal.styled";

export default function StockReflectedSelectorFieldView(props) {
    return (
        <StockReflectedSelectorWrapper>
            <button type='button'
                className={props.modifyProductData.stockManagement ? `btn-active` : ''} 
                onClick={() => props.onChangeStockReflectedSelector()}
            >
                    재고반영
                    {props.modifyProductData.stockManagement ? ' O' : ' X'}
            </button>
        </StockReflectedSelectorWrapper>
    )
}
import { StockReflectedSelectorWrapper } from "./ProductCreateForm.styled";

export default function StockReflectedSelectorFieldView(props) {
    return (
        <StockReflectedSelectorWrapper>
            <button type='button'
                className={props.createProductData.stockManagement ? `btn-active` : ''} 
                onClick={() => props.onChangeStockReflectedSelector()}
            >
                    재고반영
                    {props.createProductData.stockManagement ? ' O' : ' X'}
            </button>
        </StockReflectedSelectorWrapper>
    )
}
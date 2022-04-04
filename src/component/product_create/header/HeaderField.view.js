import { HeaderWrapper } from "./Header.styled";

export default function HeaderFieldView(props) {
    return (
        <HeaderWrapper>
            <button type='button'
                className={props.createProductData.stockManagement ? `btn-active` : ''} 
                onClick={() => props.onChangeStockReflectedSelector()}
            >
                    재고반영
                    {props.createProductData.stockManagement ? ' O' : ' X'}
            </button>
        </HeaderWrapper>
    )
}
import { SelectorWrapper } from "./Selector.styled";

export default function ProductSelectorFieldView(props) {
    return (
        <SelectorWrapper>
            <select onChange={(e) => props.onChangeProductValue(e)} value={props.selectedProductId || ''}>
                <option value='total'>상품 전체</option>
                {props.productList?.map((r, idx) => {
                    return (
                        <option key={'analysis-product-idx' + idx} value={r.product.id}>{r.product.defaultName}</option>
                    )
                })}
            </select>
        </SelectorWrapper>
    )
}
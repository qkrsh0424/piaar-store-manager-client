import { SelectorWrapper } from "./Selector.styled";

export default function SelectorFieldView(props) {
    return (
        <SelectorWrapper>
            <div className='select-group'>
                <select
                    className='select-item'
                    value={props.selectedCategory?.id || 'total'}
                    onChange={props.onChangeSelectedCategory}
                >
                    <option value='total'>카테고리 전체</option>
                    {props.categoryList?.map((r, idx) => {
                        return (
                            <option key={'product-cateogry-idx' + idx} value={r.id}>{r.name}</option>
                        )
                    })}
                </select>
            </div>
            <div className='select-group'>
                <select
                    className='select-item'
                    value={props.selectedProduct.length === 1 ? props.selectedProduct?.id : 'total'}
                    onChange={props.onChangeSelectedProduct}
                >
                    <option value='total'>상품 전체</option>
                    {props.productViewList?.map((r, idx) => {
                        return (
                            <option key={'product-idx' + idx} value={r.product.id}>{r.product.defaultName}</option>
                        )
                    })}
                </select>
            </div>
        </SelectorWrapper>
    )
}
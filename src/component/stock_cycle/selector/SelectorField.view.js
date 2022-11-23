import { SelectorWrapper } from "./Selector.styled";

export default function SelectorFieldView(props) {
    
    const confirmInput = (e) => {
        if(e.key === 'Enter') {
            props.onActionSearchProduct();
        }
    }

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

            <div className="flex-item place-items-center">
                <div>
                    <input
                        type='text'
                        className='input-el'
                        value={props.searchInput || ''}
                        onChange={(e) => props.onChangeSearchInput(e)}
                        onKeyDown={(e) => confirmInput(e)}
                        placeholder='카테고리 선택 후 상품명을 검색해주세요.'
                        autoFocus
                        disabled={props.selectedCategory === 'total'}
                    />
                </div>

                <div>
                    <button
                        className='button-el'
                        onClick={() => props.onActionSearchProduct()}
                    >
                        조회
                    </button>
                </div>
            </div>
        </SelectorWrapper>
    )
}
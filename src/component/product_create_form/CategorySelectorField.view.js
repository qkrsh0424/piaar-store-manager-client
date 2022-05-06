import { CategorySelectorWrapper, CategoryBtn } from "./ProductCreateForm.styled";

export default function CategorySelectorFieldView(props) {
    return (
        <CategorySelectorWrapper>
            <div className="group-title">
                카테고리
                <i className="icon-must" aria-label="필수항목"></i>
            </div>

            <CategoryBtn className="category-box" size={props.categoryList ? props.categoryList.length : 0}>
                {props.categoryList?.map((r, index) => {
                    return (
                        <button key={`category-selector-idx` + index} type="button"
                            className={parseInt(props.createProductData.productCategoryCid) === r.cid ? `category-btn-active` : ''}
                            name="productCategoryCid"
                            value={r.cid}
                            onClick={(e) => props.onChangeProductInputValue(e)}
                        >{r.name}</button>
                    )
                })}
            </CategoryBtn>
        </CategorySelectorWrapper>
    )
}
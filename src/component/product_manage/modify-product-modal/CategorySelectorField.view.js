import { CategorySelectorWrapper, CategoryBtn } from "./ModifyProductModal.styled";

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
                            className={parseInt(props.modifyProductData.productCategoryCid) === r.cid ? `category-btn-active` : ''}
                            onClick={() => props.onChangeCategoryCidValue(r.cid)}
                        >{r.name}</button>
                    )
                })}
            </CategoryBtn>
        </CategorySelectorWrapper>
    )
}
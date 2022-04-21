import { CategorySelectorWrapper } from "./CategorySelector.styled";

export default function CategorySelectorFieldView(props) {
    return (
        <CategorySelectorWrapper>
            <div className="category-box" size={props.categoryList ? props.categoryList.length + 1 : 0}>
                <button type="button"
                    className={parseInt(props.categoryCid) === 0 ? `category-btn-active` : '' || 'non-category-btn'}
                    onClick={() => props.onChangeCategoryCidValue(0)}
                >전체조회</button>
                {props.categoryList?.map((r, index) => {
                    return (
                        <button key={`category-selector-idx` + index} type="button"
                            className={parseInt(props.categoryCid) === r.cid ? `category-btn-active` : ''}
                            onClick={() => props.onChangeCategoryCidValue(r.cid)}
                        >{r.name}</button>
                    )
                })}
            </div>
        </CategorySelectorWrapper>
    )
}
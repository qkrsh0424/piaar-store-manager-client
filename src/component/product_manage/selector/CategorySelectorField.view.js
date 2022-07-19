import { SelectorWrapper } from "./Selector.styled";

export default function CategorySelectorFieldView(props) {
    return (
        <SelectorWrapper>
            <select onChange={(e) => props.onChangeCategoryValue(e)}>
                <option value='total'>카테고리 전체</option>
                {props.categoryList?.map((r, idx) => {
                    return (
                        <option key={'analysis-product-cateogry-idx' + idx} value={r.id}>{r.name}</option>
                    )
                })}
            </select>
        </SelectorWrapper>
    )
}
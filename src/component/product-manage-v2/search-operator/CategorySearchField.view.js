import { CategorySearchWrapper } from "./SearchOperator.styled";

export default function CategorySearchFieldView(props) {
    return (
        <CategorySearchWrapper>
            <div className='label-item'>카테고리</div>
            <div>
                <select
                    className='select-item'
                    value={props.categorySearchQuery || ''}
                    onChange={props.onChangeCategorySearchQuery}
                >
                    <option value=''>전체</option>
                    {props.categoryList?.map((r, idx) => {
                        return (
                            <option key={'category-list-idx' + idx} value={r.id}>{r.name}</option>
                        )
                    })}
                </select>
            </div>
        </CategorySearchWrapper>
    )
}
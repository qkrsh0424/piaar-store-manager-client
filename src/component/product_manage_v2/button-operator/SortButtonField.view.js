import { SortButtonFieldWrapper } from "./ButtonOperator.styled";

export default function SortButtonFieldView(props) {
    return (
        <SortButtonFieldWrapper>
            <select
                className='select-item'
                value={props.sortBy || ''}
                onChange={props.onChangeSortBy}
            >
                <option value='asc_createdAt'>상품등록일 순</option>
                <option value='desc_createdAt'>상품등록일 역순</option>
                <option value='asc_updatedAt'>상품수정일 순</option>
                <option value='desc_updatedAt'>상품수정일 역순</option>
                <option value='asc_defaultName'>상품명 순</option>
                <option value='desc_defaultName'>상품명 역순</option>
            </select>
        </SortButtonFieldWrapper>
    )
}
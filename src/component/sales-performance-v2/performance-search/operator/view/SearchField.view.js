import { SearchFieldWrapper } from "../Operator.styled";

export default function SearchFieldView (props) {
    return (
        <SearchFieldWrapper>
            <div className='search-column'>
                <div className='label-item'>
                    <span>스토어명</span>
                </div>
                <div className='search-data'>

                </div>
            </div>

            <div className='search-column'>
                <div className='label-item'>
                    <span>카테고리명</span>
                </div>
                <div className='search-data'>

                </div>
            </div>

            <div className='search-column'>
                <div className='label-item'>
                    <span>상품명</span>
                </div>
                <div className='search-data'>

                </div>
            </div>

            <div className='search-column'>
                <div className='label-item'>
                    <span>옵션명</span>
                </div>
                <div className='search-data'>

                </div>
            </div>

            <div className='search-column'>
                <select
                    className='select-item'
                >
                    <option>주문</option>
                    <option>판매</option>
                    <option>미판매</option>
                </select>
            </div>
        </SearchFieldWrapper>
    )
}
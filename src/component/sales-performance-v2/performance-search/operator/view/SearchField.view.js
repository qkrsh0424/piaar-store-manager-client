import { SearchFieldWrapper } from "../Operator.styled";

export default function SearchFieldView (props) {
    return (
        <SearchFieldWrapper>
            <div className='search-column'>
                <div className='label-item'>
                    <span>스토어명</span>
                </div>
                <div className='search-data'>
                    <input
                        type='text'
                        className='input-el'
                    />
                </div>
            </div>

            <div className='search-column'>
                <div className='label-item'>
                    <span>카테고리명</span>
                </div>
                <div className='search-data'>
                    <input
                        type='text'
                        className='input-el'
                    />
                </div>
            </div>

            <div className='search-column'>
                <div className='label-item'>
                    <span>상품명</span>
                </div>
                <div className='search-data'>
                    <input
                        type='text'
                        className='input-el'
                    />
                </div>
            </div>

            <div className='search-column'>
                <div className='label-item'>
                    <span>옵션명</span>
                </div>
                <div className='search-data'>
                    <input
                        type='text'
                        className='input-el'
                    />
                </div>
            </div>

            <div className='search-column'>
                <div className='label-item'>
                    <span>상태</span>
                </div>
                <select
                    className='select-item'
                    value={props.salesYn || ''}
                    onChange={props.onChangeSalesYnValue}
                >
                    <option value=''>주문</option>
                    <option value='y'>판매</option>
                    <option value='n'>미판매</option>
                </select>
            </div>
        </SearchFieldWrapper>
    )
}
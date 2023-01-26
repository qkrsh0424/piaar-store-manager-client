import { SearchFieldWrapper } from "../Operator.styled";

export default function SearchFieldView(props) {

    return (
        <SearchFieldWrapper>
            <div className='search-box'>
                <div>
                    <button
                        type='button'
                        className='button-el'
                        onClick={(e) => props.onActionOpenProductListModal(e)}
                    >
                        <span>{props.selectedProduct ? props.selectedProduct.defaultName : '조회 상품 선택'}</span>
                    </button>
                </div>
                <div className='search-category-info'>
                    {props.selectedCategory &&
                        <div
                            className='category-button-el'
                            onClick={(e) => props.onActionRouteCategoryPerformancePage(e)}
                        >
                            <span>{props.selectedCategory.name} </span>
                            <span>[총 매출액 & 판매 건] 확인</span>
                        </div>
                    }
                    </div>
            </div>
        </SearchFieldWrapper>
    )
}
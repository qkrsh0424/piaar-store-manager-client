import Ripple from "../../../../../module/button/Ripple";
import { SearchFieldWrapper } from "../Operator.styled";

export default function SearchFieldView(props) {

    return (
        <SearchFieldWrapper>
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
            {props.selectedProduct &&
                <div className='image-wrapper'>
                    <div className='image-box'>
                        {props.selectedProduct.imageUrl ?
                            <img src={props.selectedProduct.imageUrl} title={props.selectedProduct.imageFileName} />
                            :
                            <img src='/images/icon/no-image.jpg' title='no-image' />
                        }
                    </div>
                </div>
            }
            <div>
                <button
                    type='button'
                    className='button-el'
                    onClick={(e) => props.onActionOpenProductListModal(e)}
                >
                    <span>{props.selectedProduct ? props.selectedProduct.defaultName : '조회 상품 선택'}</span>
                    <Ripple color={'#e0e0e0'} duration={1000} />
                </button>
            </div>
        </SearchFieldWrapper>
    )
}
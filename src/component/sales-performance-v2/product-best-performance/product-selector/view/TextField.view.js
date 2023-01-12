import { TextFieldWrapper } from "../ProductSelector.styled";

export default function TextFieldView(props) {
    return (
        <TextFieldWrapper>
            <div>
                <div>
                    <span>* 검색 기간 내에 판매된 상품이 조회됩니다. </span>
                </div>
                <div>
                    <span>* 상품을 선택해 옵션별 BEST 판매 데이터를 비교할 수 있습니다. </span>
                </div>
            </div>

            <div className='control-box'>
                <button
                    className='control-button-el'
                    onClick={(e) => props.onActionResetSelectedProduct(e)}
                >
                    <img
                        src='/assets/icon/refresh_default_000000.svg'
                        style={{ width: '30px' }}
                        alt=""
                        loading='lazy'
                    />
                </button>
            </div>
        </TextFieldWrapper>
    )
}
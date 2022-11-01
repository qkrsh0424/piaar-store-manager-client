import { ControlFieldWrapper } from "./ButtonOperator.styled";

export default function ControlFieldView (props) {
    return (
        <ControlFieldWrapper>
            <div>
                <button
                    className='button-el'
                    onClick={() => props.onActionRouteProductCreatePage()}
                >
                    상품등록
                </button>
            </div>
            <div>
                <button
                    className='button-el'
                    onClick={() => props.onActionOpenCreateProductReceiveModal()}
                >
                    입고등록
                </button>
            </div>
            <div>
                <button
                    className='button-el'
                    onClick={() => props.onActionOpenCreateProductReleaseModal()}
                >
                    출고등록
                </button>
            </div>
            <div>
                <button
                    className='button-el'
                    onClick={() => props.onActionOpenSearchProductReceiveAndReleaseModal()}
                >
                    입출고현황
                </button>
            </div>
        </ControlFieldWrapper>
    )
}
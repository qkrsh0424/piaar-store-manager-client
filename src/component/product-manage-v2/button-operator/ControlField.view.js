import { ControlFieldWrapper } from "./ButtonOperator.styled";

export default function ControlFieldView (props) {
    return (
        <ControlFieldWrapper>
            <div>
                <button
                    className='button-el'
                >
                    입고등록
                </button>
            </div>
            <div>
                <button
                    className='button-el'
                >
                    출고등록
                </button>
            </div>
            <div>
                <button
                    className='button-el'
                >
                    입출고현황
                </button>
            </div>
        </ControlFieldWrapper>
    )
}
import Ripple from "../../../../module/button/Ripple";
import { ButtonWrapper, OperatorFieldWrapper, ControlWrapper } from "./CheckedOperator.styled";

export default function OperatorFieldView(props) {
    return (
        <OperatorFieldWrapper>
            <ControlWrapper>
                <div className='title-box'>
                    상태 관리
                </div>
                <ButtonWrapper>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                            onClick={props.onActionOpenCompletedConfirmModal}
                        >
                            반품완료 취소
                            <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                        </button>
                    </div>
                </ButtonWrapper>
            </ControlWrapper>
        </OperatorFieldWrapper>
    );
}
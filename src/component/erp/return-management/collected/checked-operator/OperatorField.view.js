import Ripple from "../../../../module/button/Ripple";
import { ButtonWrapper, OperatorFieldWrapper, ControlWrapper } from "./CheckedOperator.styled";

export default function OperatorFieldView(props) {
    return (
        <OperatorFieldWrapper>
            <ControlWrapper>
                <div className='title-box'>
                    데이터 일괄 처리
                </div>
                {/* TODO :: 보류처리 및 취소, 반품거절 처리 및 취소 */}
                <ButtonWrapper>
                    {/* <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                            onClick={props.onActionOpenHoldConfirmModal}
                        >
                            보류처리
                            <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                        </button>
                    </div>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                            onClick={props.onActionOpenHoldCancleConfirmModal}
                        >
                            보류처리 취소
                            <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                        </button>
                    </div> */}
                    <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                            onClick={props.onActionOpenReturnRejectConfirmModal}
                        >
                            반품거절
                            <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                        </button>
                    </div>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                            onClick={props.onActionOpenReturnRejectCancelConfirmModal}
                        >
                            반품거절 취소
                            <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                        </button>
                    </div>
                </ButtonWrapper>
            </ControlWrapper>
            <ControlWrapper>
                <div className='title-box'>
                    상태 관리
                </div>
                <ButtonWrapper>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                            onClick={props.onActionOpenCollectedConfirmModal}
                        >
                            수거완료 취소
                            <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                        </button>
                    </div>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                            onClick={props.onActionOpenCompletedConfirmModal}
                        >
                            반품 처리완료
                            <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                        </button>
                    </div>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='danger-button-el'
                            onClick={props.onActionOpenDeleteConfirmModal}
                        >
                            영구 삭제
                            <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                        </button>
                    </div>
                </ButtonWrapper>
            </ControlWrapper>
        </OperatorFieldWrapper>
    );
}
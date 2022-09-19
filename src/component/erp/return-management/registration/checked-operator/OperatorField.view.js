import Ripple from "../../../../module/button/Ripple";
import { ButtonWrapper, OperatorFieldWrapper, ControlWrapper } from "./CheckedOperator.styled";

export default function OperatorFieldView(props) {
    return (
        <OperatorFieldWrapper>
            <ControlWrapper>
                <div className='title-box'>
                    데이터 일괄 처리
                </div>
                <ButtonWrapper>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                            onClick={props.onActionOpenReturnReasonTypeModal}
                        >
                            반품 요청 사유 변경
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
                            onClick={props.onActionOpenCollectingConfirmModal}
                        >
                            수거중 처리
                            <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                        </button>
                    </div>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                            // onClick={props.onActionOpenExchangeConfirmModal}
                        >
                            교환 전환(TODO)
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
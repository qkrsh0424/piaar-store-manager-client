import Ripple from "../../../../module/button/Ripple";
import { ButtonWrapper, OperatorFieldWrapper, ControlWrapper } from "./CheckedOperator.styled";

export default function OperatorFieldView(props) {
    return (
        <OperatorFieldWrapper>
            <ControlWrapper>
                <div className='title-box'>
                    데이터 단건 처리
                </div>
                <ButtonWrapper>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                            onClick={props.onActionOpenDefectiveProductConfirmModal}
                        >
                            불량상품 등록
                            <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                        </button>
                    </div>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                            onClick={props.onActionOpenDefectiveProductCancelConfirmModal}
                        >
                            불량상품 취소
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
                            onClick={props.onActionOpenCompletedConfirmModal}
                        >
                            반품 처리완료 취소
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
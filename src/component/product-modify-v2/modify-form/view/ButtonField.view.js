import { CreateButtonFieldWrapper } from "../ModifyForm.styled";

export default function CreateButtonFieldView(props) {
    return (
        <CreateButtonFieldWrapper>
            <div className='button-box'>
                <button
                    type='button'
                    className='button-el'
                    onClick={(e) => props.onActionResetProduct(e)}
                >
                    초기화
                </button>
            </div>
            <div className='button-box'>
                <button
                    type='button'
                    className='button-el'
                    onClick={() => props.onActionCancelCreateProduct()}
                >
                    취소
                </button>
                <button
                    type='submit'
                    className='button-el store-btn'
                    disabled={props.buttonDisabled}
                >
                    수정
                </button>
            </div>
        </CreateButtonFieldWrapper>
    )
}
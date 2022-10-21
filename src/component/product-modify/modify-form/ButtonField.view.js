import { CreateButtonFieldWrapper } from "./CreateForm.styled";

export default function CreateButtonFieldView(props) {
    return (
        <CreateButtonFieldWrapper>
            <div>
                <button
                    type='button'
                    className='button-el'
                    onClick={(e) => props.onActionResetProductAndOptions(e)}
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
                >
                    수정
                </button>
            </div>
        </CreateButtonFieldWrapper>
    )
}
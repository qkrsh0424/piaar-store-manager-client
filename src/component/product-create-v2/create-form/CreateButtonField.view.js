import { CreateButtonFieldWrapper } from "./CreateForm.styled";

export default function CreateButtonFieldView(props) {
    return (
        <CreateButtonFieldWrapper>
            <div className='button-box'>
                <button
                    className='button-el'
                    onClick={() => props.onActionCancelCreateProduct()}
                >
                    취소
                </button>
                <button
                    type='submit'
                    className='button-el store-btn'
                >
                    저장
                </button>
            </div>
        </CreateButtonFieldWrapper>
    )
}
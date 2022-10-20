import { ButtonFieldWrapper } from "./CreateOptionDefaultNameModal.styled";

export default function ButtonFieldView(props) {
    return (
        <ButtonFieldWrapper>
            <div>
                <button
                    type='button'
                    className='button-el'
                    style={{ color: '#d15120' }}
                    onClick={() => props.onActionCloseOptionDefaultNameCreateModal()}
                >
                    취소
                </button>
            </div>
            <div>
                <button
                    type='submit'
                    className='button-el'
                    style={{ color: '#2d7ed1' }}
                >
                    적용
                </button>
            </div>
        </ButtonFieldWrapper>
    )
}
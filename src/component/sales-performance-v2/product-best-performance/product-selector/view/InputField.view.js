import { InputFieldWrapper } from "../ProductSelector.styled";

export default function InputFieldView(props) {
    return (
        <InputFieldWrapper>
            <input
                type='text'
                className='input-el'
                placeholder='상품명을 입력해주세요.'
                value={props.inputValue || ''}
                onChange={(e) => props.onChangeInputValue(e)}
            ></input>
        </InputFieldWrapper>
    )
}
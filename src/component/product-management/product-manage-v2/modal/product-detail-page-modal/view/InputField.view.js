import { InputFieldWrapper } from "../ProductDetailPageModal.styled";

export default function InputFieldView (props) {
    return (
        <InputFieldWrapper>
            <div className='input-label'>제목 : </div>
            <input
                type='text' 
                name='title'
                className='input-el'
                value={props.selectedDetailPage.title || ''}
                onChange={(e) => props.onChangeValueOfName(e)}
                placeholder='상세페이지 제목'
                required
            />
        </InputFieldWrapper>
    )
}
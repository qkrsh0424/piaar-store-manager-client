import { InputFieldWrapper } from "./ProductDetailPageModal.styled";

function Button({ element, style }) {
    return (
        <div className="button-box">
            <button
                className='button-el'
                type='submit'
                style={style}
            >{element}</button>
        </div>
    );
}

export default function InputFieldView(props) {
    return (
        <InputFieldWrapper>
            <div className='view-header-title'>
                <div className='info-box'>
                    <input type='text'
                        name='title'
                        className='input-item'
                        value={props.detailPage?.title || ''}
                        onChange={props.onChangeInputValue}
                        placeholder='상세페이지 제목'
                    />
                </div>
            </div>
            <div>
                <Button
                    element={props.isCreateData ? '저장' : '수정'}
                ></Button>
            </div>
        </InputFieldWrapper >
    );
}
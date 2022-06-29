import { InputFormFieldWrapper } from "./CreateSubOptionCodeModal.styled"

export default function InputFormFieldView(props) {
    return (
        <InputFormFieldWrapper>
            <form 
                onSubmit={(e) => props.onSubmitCreateSubOptionCode(e)}
            >
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                대체코드
                            </span>
                        </div>
                        <input
                            type="text"
                            className='form-control'
                            name='subOptionCode'
                            value={props.createData.subOptionCode}
                            onChange={(e) => props.onChangeInputValue(e)}
                            required
                        />
                    </div>
                </div>
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                메모
                            </span>
                        </div>
                        <input
                            type="text"
                            className='form-control'
                            name='memo'
                            value={props.createData.memo}
                            onChange={(e) => props.onChangeInputValue(e)}
                        />
                    </div>
                </div>
                <div className="submit-box">
                    <button type='submit'>등록</button>
                </div>
            </form>
        </InputFormFieldWrapper>
    )
}
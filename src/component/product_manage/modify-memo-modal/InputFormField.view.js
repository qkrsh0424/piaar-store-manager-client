import { InputFormFieldWrapper } from "./ModifyMemoModal.styled"

export default function InputFormFieldView(props) {
    return (
        <InputFormFieldWrapper>
            <form onSubmit={(e) => props.onSubmitModifyMemo(e)}>
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
                            value={props.selectedStatusData.memo ?? ''}
                            onChange={(e) => props.onActionChangeModifyMemo(e)}
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
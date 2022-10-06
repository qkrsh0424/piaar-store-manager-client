import { InputFieldWrapper } from "./CreateOptionDefaultNameModal.styled";

export default function InputFieldView(props) {
    return (
        <InputFieldWrapper>
            {props.optionDefaultNameList?.map((r, idx) => {
                return (
                    <div className='input-group'>
                        <div className='input-title-box'>
                            <div>
                                <button
                                    className='button-el'
                                    onClick={() => props.onActionDeleteDefaultName(r.id)}
                                >
                                    삭제
                                </button>
                            </div>
                            <div>옵션명{idx+1}</div>
                        </div>
                        <input
                            type='text'
                            className='input-value'
                            value={r.defaultName || ''}
                            placeholder={`옵션명${idx+1}`}
                        />
                    </div>
                )
            })}
            <div className='add-box'>
                <button
                    className='button-el'
                    onClick={props.onActionAddDefaultName}
                >
                    추가
                </button>
            </div>
        </InputFieldWrapper>
    );
}
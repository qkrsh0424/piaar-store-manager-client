import { InputFieldWrapper } from "../CreateOptionDefaultNameModal.styled";
import Ripple from "../../../../../module/button/Ripple"

export default function InputFieldView(props) {
    return (
        <InputFieldWrapper>
            <div className='input-wrapper'>
                <div className='input-group-box'>
                    <div className='input-title'>구분자</div>
                    <div className='input-value'>
                        <input
                            type='text'
                            name='separator'
                            placeholder={`옵션명 구분자 입력`}
                            onChange={(e) => props.onChangeSeparatorInputValue(e)}
                            value={props.separator || ''}
                            required
                        />
                    </div>
                </div>

                {props.optionDefaultNameList?.map((r, idx) => {
                    return (
                        <div key={'option-default-name-idx' + idx} className='input-group-box'>
                            <div className='input-title'>{idx + 1}. </div>
                            <div className='input-value'>
                                <input
                                    type='text'
                                    className='input-el'
                                    name='defaultName'
                                    value={r.defaultName || ''}
                                    placeholder={`옵션명${idx + 1}`}
                                    onChange={(e) => props.onChangeDefaultNameInputValue(e, idx)}
                                    required
                                />
                                <div>
                                    <button
                                        type='button'
                                        className='button-el'
                                        style={{ border: 'none', background: 'none' }}
                                        onClick={() => props.onActionDeleteDefaultNameRow(idx)}
                                    >
                                        <img
                                            className='button-icon'
                                            src='/assets/icon/delete_default_ff3060.svg'
                                            alt=""
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='add-box'>
                <button
                    type='button'
                    className='add-button-el'
                    onClick={() => props.onActionAddDefaultNameRow()}
                >
                    추가
                    <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                </button>
            </div>
        </InputFieldWrapper>
    );
}
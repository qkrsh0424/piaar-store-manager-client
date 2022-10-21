import Ripple from "../../../../module/button/Ripple";
import { InputFieldWrapper } from "./CreateOptionDefaultNameModal.styled";

export default function InputFieldView(props) {
    return (
        <InputFieldWrapper>
            <div className='body-wrapper'>
                <div className='input-group'>
                    <div className='input-title'>구분자</div>
                    <input
                        type='text'
                        className='input-value'
                        style={{ flex: 0 }}
                        name='separator'
                        placeholder={`옵션명 구분자 입력`}
                        onChange={(e) => props.onChangeSeparatorInputValue(e)}
                        value={props.separator || ''}
                        required
                    />
                </div>
                {props.optionDefaultNameList?.map((r, idx) => {
                    return (
                        <div key={r.id} className='input-group'>
                            <div className='input-title'>{idx + 1}. </div>
                            <div className='input-box'>
                                <input
                                    type='text'
                                    className='input-value'
                                    name='defaultName'
                                    value={r.defaultName || ''}
                                    placeholder={`옵션명${idx + 1}`}
                                    onChange={(e) => props.onChangeDefaultNameInputValue(e, idx)}
                                    required
                                />
                                <div className='button-box'>
                                    <button
                                        type='button'
                                        className='button-el'
                                        style={{ border: 'none', background: 'none' }}
                                        onClick={() => props.onActionDeleteDefaultNameRow(r.id)}
                                    >
                                        <img
                                            className='button-icon'
                                            src='/assets/icon/delete_default_ff3060.svg'
                                            alt=""
                                        ></img>
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
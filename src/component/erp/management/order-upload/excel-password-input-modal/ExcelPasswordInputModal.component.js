import { useReducer, useRef } from "react";
import { useEffect } from "react";
import { Container, HeaderFieldViewWrapper, InputFieldViewWrapper,ButtonFieldViewWrapper } from "./ExcelPasswordInputModal.styled";

function HeaderFieldView() {
    return (
        <HeaderFieldViewWrapper>
            <div>엑셀 암호 입력</div>
        </HeaderFieldViewWrapper>
    )
} 

function InputFieldView({passwordValue, onChangeExcelPassword, passwordInputRef}) {
    return (
        <InputFieldViewWrapper>
            <input ref={passwordInputRef} type='password' placeholder='설정된 비밀번호를 입력해주세요.' name='password' onChange={onChangeExcelPassword} value={passwordValue?.password || ''}></input>
        </InputFieldViewWrapper>
    )
}

function ButtonFieldView() {
    return (
        <ButtonFieldViewWrapper>
            <button
                type='submit'
                className='button-el'
            >
                확인
            </button>
        </ButtonFieldViewWrapper>
    )
}

const ExcelPasswordInputModalComponent = (props) => {
    const passwordInputRef = useRef();

    const [passwordValue, dispatchPasswordValue] = useReducer(passwordValueReducer, initialPasswordValue);

    useEffect(() => {
        if(!props.excelPassword) {
            return;
        }

        if(!props.excelPassword.isEncrypted) {
            return;
        }

        dispatchPasswordValue({
            type: 'SET_DATA',
            payload: props.excelPassword
        })

        passwordInputRef.current.focus();
    }, [props.excelPassword])

    const onChangeExcelPassword = (e) => {
        dispatchPasswordValue({
            type: 'CHANGE_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const onSubmitUploadExcelFile = (e) => {
        e.preventDefault();

        let password = passwordValue.password;
        props._onSubmit_uploadExcelFile(password);
    }

    return(
        <Container>
            <HeaderFieldView
            ></HeaderFieldView>

            <form
                className='form-el'
                onSubmit={onSubmitUploadExcelFile}
            >
                <InputFieldView
                    passwordValue={passwordValue}
                    passwordInputRef={passwordInputRef}

                    onChangeExcelPassword={onChangeExcelPassword}
                ></InputFieldView>
                <ButtonFieldView
                ></ButtonFieldView>
            </form>
        </Container>
    )
}

export default ExcelPasswordInputModalComponent;

const initialPasswordValue = null;

const passwordValueReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name] : action.payload.value
            }
        case 'CLEAR':
            return initialPasswordValue;
    }
}
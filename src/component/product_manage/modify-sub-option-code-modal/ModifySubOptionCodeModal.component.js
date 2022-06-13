import { useEffect, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Container } from "./ModifySubOptionCodeModal.styled";
import HeaderFieldView from "./HeaderField.view";
import InputFormFieldView from "./InputFormField.view";
import { isIncludeBlank } from "../../../utils/regexUtils";

const ModifySubOptionCodeModalComponent = (props) => {
    const [subOptionCode, dispatchSubOptionCode] = useReducer(subOptionCodeReducer, initialsubOptionCodeReducer);

    useEffect(() => {
        if(!props.selectedSubOptionCode) {
            return;
        }

        dispatchSubOptionCode({
            type: 'SET_DATA',
            payload: props.selectedSubOptionCode
        });
    }, [props.selectedSubOptionCode])

    const onChangeInputValue = (e) => {
        dispatchSubOptionCode({
            type: 'CHANGE_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const onSubmitModifySubOptionCode = async (e) => {
        e.preventDefault();

        if(isIncludeBlank(subOptionCode.subOptionCode)) {
            alert('대체옵션코드에 공백을 포함할 수 없습니다.');
            return;
        }

        await props.onSubmitModifySubOptionCode(subOptionCode);
    }

    return (
        subOptionCode &&
        <Container>
            <HeaderFieldView    
                onActionCloseModifySubOptionCodeModal={() => props.onActionCloseModifySubOptionCodeModal()}
            ></HeaderFieldView>

            <InputFormFieldView
                subOptionCode={subOptionCode}

                onSubmitModifySubOptionCode={(e) => onSubmitModifySubOptionCode(e)}
                onChangeInputValue={(e) => onChangeInputValue(e)}
            ></InputFormFieldView>
        </Container>
    )
}

export default ModifySubOptionCodeModalComponent;

const initialsubOptionCodeReducer = null;

const subOptionCodeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name] : action.payload.value
            }
        case 'CLEAR':
            return initialsubOptionCodeReducer;
        default: return { ...state };
    }
}
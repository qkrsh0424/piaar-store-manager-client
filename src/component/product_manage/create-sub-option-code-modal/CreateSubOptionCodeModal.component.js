import { useEffect, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
import { isIncludeBlank } from "../../../utils/regexUtils";
import { Container } from "./CreateSubOptionCodeModal.styled";
import HeaderFieldView from "./HeaderField.view";
import InputFormFieldView from "./InputFormField.view";

class SubOptionCode {
    constructor(productOption) {
        this.id = uuidv4();
        this.subOptionCode = '';
        this.memo = '';
        this.productOptionId = productOption.id;
        this.productOptionCode = productOption.code;
    }

    toJSON() {
        return {
            id: this.id,
            subOptionCode: this.subOptionCode,
            memo: this.memo,
            productOptionId: this.productOptionId,
            productOptionCode: this.productOptionCode
        }
    }
}

const CreateSubOptionCodeModalComponent = (props) => {
    const [createData, dispatchCreateData] = useReducer(createDataReducer, initialCreateDataReducer);

    useEffect(() => {
        if(createData) {
            return;
        }

        let data = new SubOptionCode(props.selectedProductOptionData).toJSON();
        dispatchCreateData({
            type: 'SET_DATA',
            payload: data
        });
    }, [])

    const onChangeInputValue = (e) => {
        dispatchCreateData({
            type: 'CHANGE_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const onSubmitCreateSubOptionCode = async (e) => {
        e.preventDefault();

        if(isIncludeBlank(createData.subOptionCode)) {
            alert('대체옵션코드에 공백을 포함할 수 없습니다.');
            return;
        }

        await props.onSubmitCreateSubOptionCode(createData);
    }

    return (
        createData &&
        <Container>
            <HeaderFieldView    
                onActionCloseCreateSubOptionCodeModal={() => props.onActionCloseCreateSubOptionCodeModal()}
            ></HeaderFieldView>

            <InputFormFieldView
                createData={createData}

                onSubmitCreateSubOptionCode={(e) => onSubmitCreateSubOptionCode(e)}
                onChangeInputValue={(e) => onChangeInputValue(e)}
            ></InputFormFieldView>
        </Container>
    )
}

export default CreateSubOptionCodeModalComponent;

const initialCreateDataReducer = null;

const createDataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name] : action.payload.value
            }
        case 'CLEAR':
            return initialCreateDataReducer;
        default: return { ...state };
    }
}
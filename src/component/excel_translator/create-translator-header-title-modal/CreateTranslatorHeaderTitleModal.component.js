import { Container } from "./CreateTranslatorHeaderTitleModal.styled";
import { useEffect, useReducer } from "react";
import CreateFormFieldView from "./CreateFormField.view";

const CreateTranslatorHeaderTitleModalComponent = (props) => {

    return (
        <Container>
            <CreateFormFieldView
                excelTitleInfo={props.excelTitleInfo}

                onChangeInputValue={(e) => props.onChangeInputValue(e)}
                onActionCreateTranslatorHeaderTitle={(e) => props.onActionCreateTranslatorHeaderTitle(e)}
            ></CreateFormFieldView>
        </Container>
    )
}

export default CreateTranslatorHeaderTitleModalComponent;

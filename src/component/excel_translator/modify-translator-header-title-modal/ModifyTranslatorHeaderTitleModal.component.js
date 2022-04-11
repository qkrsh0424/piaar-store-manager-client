import { Container } from "./ModifyTranslatorHeaderTitleModal.styled";
import { useEffect, useReducer } from "react";
import ModifyFormFieldView from "./ModifyFormField.view";

const ModifyTranslatorHeaderTitleComponent = (props) => {
    return (
        <Container>
            <ModifyFormFieldView
                excelTitleInfo={props.excelTitleInfo}

                onChangeInputValue={(e) => props.onChangeInputValue(e)}
                onActionModifyTranslatorHeaderTitle={(e) => props.onActionModifyTranslatorHeaderTitle(e)}
                onActionDeleteTranslatorHeaderTitle={(e) => props.onActionDeleteTranslatorHeaderTitle(e)}
            ></ModifyFormFieldView>
        </Container>
    )
}

export default ModifyTranslatorHeaderTitleComponent;

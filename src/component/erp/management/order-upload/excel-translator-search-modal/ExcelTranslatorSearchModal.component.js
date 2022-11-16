import { Container } from "./ExcelTranslatorSearchModal.styled";
import HeaderFieldView from "./HeaderField.view";
import TableFieldView from "./TableField.view";
import { getDefaultHeaderDetails } from "../../../../../static-data/erp/staticData";
import { useReducer } from "react";
import { useEffect } from "react";

const ExcelTranslatorSearchModalComponent = (props) => {
    const DEFAULT_HEADER_DETAILS = getDefaultHeaderDetails();
    const [allowedFields, dispatchAllowedFields] = useReducer(allowedFieldsReducer, initialAllowedFields);

    useEffect(() => {
        if (!DEFAULT_HEADER_DETAILS) {
            return;
        }

        dispatchAllowedFields({
            type: 'SET_DATA',
            payload: DEFAULT_HEADER_DETAILS.slice(1, 34)
        })

    }, [])

    return (
        <Container>
            <HeaderFieldView
                onActionCloseExcelTranslatorSearchModal={props.onActionCloseExcelTranslatorSearchModal}
            ></HeaderFieldView>
            <TableFieldView 
                selectedExcelTranslator={props.selectedExcelTranslator}
                allowedFields={allowedFields}
            ></TableFieldView>
        </Container>
    )
}

export default ExcelTranslatorSearchModalComponent;

const initialAllowedFields = null;

const allowedFieldsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialAllowedFields;
    }
}

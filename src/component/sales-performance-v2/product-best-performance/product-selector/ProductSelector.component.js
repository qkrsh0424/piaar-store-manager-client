import { useState } from "react";
import { Container } from "./ProductSelector.styled";
import CheckBoxControlView from "./view/CheckBoxControl.view";
import CheckBoxFieldView from "./view/CheckBoxField.view";
import InputFieldView from "./view/InputField.view";
import TextFieldView from "./view/TextField.view";

export default function ProductSelectorComponent(props) {
    const [inputValue, setInputValue] = useState('');

    const __handle = {
        action: {
            changeInputValue: (e) => {
                let value = e.target.value
                setInputValue(value);
            }
        }
    }

    return (
        <Container>
            <TextFieldView />

            <CheckBoxControlView
                onActionCheckAll={props.onActionCheckAll}
                onActionCheckCancelAll={props.onActionCheckCancelAll}
            />

            <InputFieldView
                inputValue={inputValue}
                onChangeInputValue={__handle.action.changeInputValue}
             />

            <CheckBoxFieldView
                salesProduct={props.salesProduct}
                onActionIsCheckedOne={props.onActionIsCheckedOne}
                onActionCheckOne={props.onActionCheckOne}
                inputValue={inputValue}
            />
        </Container>
    )
}

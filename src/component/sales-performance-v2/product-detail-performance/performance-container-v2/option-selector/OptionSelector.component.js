import { Container } from "./OptionSelector.styled";
import CheckBoxControlView from "./view/CheckBoxControl.view";
import CheckBoxFieldView from "./view/CheckBoxField.view";
import TextFieldView from "./view/TextField.view";

export default function OptionSelectorComponent(props) {
    return (
        <Container>
            <TextFieldView />

            <CheckBoxControlView
                onActionCheckAll={props.onActionCheckAll}
                onActionCheckCancelAll={props.onActionCheckCancelAll}
            />

            <CheckBoxFieldView
                options={props.options}
                onActionIsCheckedOne={props.onActionIsCheckedOne}
                onActionCheckOne={props.onActionCheckOne}
            />
        </Container>
    )
}

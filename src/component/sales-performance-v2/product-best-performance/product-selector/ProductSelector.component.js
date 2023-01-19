import { Container } from "./ProductSelector.styled";
import CheckBoxControlView from "./view/CheckBoxControl.view";
import CheckBoxFieldView from "./view/CheckBoxField.view";
import TextFieldView from "./view/TextField.view";

export default function ProductSelectorComponent(props) {

    return (
        <Container>
            <TextFieldView />

            <CheckBoxControlView
                onActionCheckAll={props.onActionCheckAll}
                onActionCheckCancelAll={props.onActionCheckCancelAll}
            />

            <CheckBoxFieldView
                salesProduct={props.salesProduct}
                onActionIsCheckedOne={props.onActionIsCheckedOne}
                onActionCheckOne={props.onActionCheckOne}
            />
        </Container>
    )
}

import { Container } from "./ProductSelector.styled";
import CheckBoxFieldView from "./view/CheckBoxField.view";
import TextFieldView from "./view/TextField.view";

export default function ProductSelectorComponent(props) {

    return (
        <Container>
            <TextFieldView
                onActionResetSelectedProduct={props.onActionResetSelectedProduct}
            />

            <CheckBoxFieldView
                salesProduct={props.salesProduct}
                onActionIsCheckedOne={props.onActionIsCheckedOne}
                onActionCheckOne={props.onActionCheckOne}
            />
        </Container>
    )
}

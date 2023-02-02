import { Container } from "./CategorySelector.styled";
import CheckBoxControlView from "./view/CheckBoxControl.view";
import CheckBoxFieldView from "./view/CheckBoxField.view";
import TextFieldView from "./view/TextField.view";

export default function CategorySelectorComponent(props) {
    return (
        <Container>
            <TextFieldView />

            <div className='selector-wrapper'>
                <CheckBoxControlView
                    onActionCheckAll={props.onActionCheckAll}
                    onActionCheckCancelAll={props.onActionCheckCancelAll}
                />

                <CheckBoxFieldView
                    category={props.category}
                    onActionIsCheckedOne={props.onActionIsCheckedOne}
                    onActionCheckOne={props.onActionCheckOne}
                />
            </div>
        </Container>
    )
}

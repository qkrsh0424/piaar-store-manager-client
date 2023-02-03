import { Container } from "./ChannelSelector.styled";
import CheckBoxControlView from "./view/CheckBoxControl.view";
import CheckBoxFieldView from "./view/CheckBoxField.view";
import TextFieldView from "./view/TextField.view";

export default function ChannelSelectorComponent(props) {
    return (
        <Container>
            <TextFieldView />

            <div className='selector-wrapper'>
                <CheckBoxControlView
                    onActionCheckAll={props.onActionCheckAll}
                    onActionCheckCancelAll={props.onActionCheckCancelAll}
                />

                <CheckBoxFieldView
                    salesChannel={props.salesChannel}
                    onActionIsCheckedOne={props.onActionIsCheckedOne}
                    onActionCheckOne={props.onActionCheckOne}
                />
            </div>
        </Container>
    )
}

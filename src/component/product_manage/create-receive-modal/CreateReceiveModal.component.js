import HeaderFieldView from "./HeaderField.view";
import InputFormFieldView from "./InputFormField.view";
import { Container } from "./CreateReceiveModal.styled";

const CreateReceiveModalComponent = (props) => {
    return (
        <Container>
            <HeaderFieldView
                onActionCloseCreateReceiveModal={() => props.onActionCloseCreateReceiveModal()}
            ></HeaderFieldView>

            <InputFormFieldView
                receiveAddData={props.receiveAddData}
                receiveAddMemo={props.receiveAddMemo}
                submitCheck={props.submitCheck}

                onActionChangeReceiveInputValue={(e, receiveId) => props.onActionChangeReceiveInputValue(e, receiveId)}
                onActionChangeReceiveMemoInputValue={(e) => props.onActionChangeReceiveMemoInputValue(e)}
                onSubmitCreateReceiveData={(e) => props.onSubmitCreateReceiveData(e)}
            ></InputFormFieldView>
        </Container>
    )
}

export default CreateReceiveModalComponent;
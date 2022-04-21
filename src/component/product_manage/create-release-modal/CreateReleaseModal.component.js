import HeaderFieldView from "./HeaderField.view";
import InputFormFieldView from "./InputFormField.view";
import { Container } from "./CreateReleaseModal.styled";

const CreateReleaseModalComponent = (props) => {
    return (
        <Container>
            <HeaderFieldView
                onActionCloseCreateReleaseModal={() => props.onActionCloseCreateReleaseModal()}
            ></HeaderFieldView>

            <InputFormFieldView
                releaseAddData={props.releaseAddData}
                releaseAddMemo={props.releaseAddMemo}
                submitCheck={props.submitCheck}

                onActionChangeReleaseInputValue={(e, releaseId) => props.onActionChangeReleaseInputValue(e, releaseId)}
                onActionChangeReleaseMemoInputValue={(e) => props.onActionChangeReleaseMemoInputValue(e)}
                onSubmitCreateReleaseData={(e) => props.onSubmitCreateReleaseData(e)}
            ></InputFormFieldView>
        </Container>
    )
}

export default CreateReleaseModalComponent;
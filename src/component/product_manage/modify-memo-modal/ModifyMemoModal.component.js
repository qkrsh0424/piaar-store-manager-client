import HeaderFieldView from "./HeaderField.view";
import InputFormFieldView from "./InputFormField.view";
import { Container } from "./ModifyMemoModal.styled";

const ModifyMemoModalComponent = (props) => {
    return (
        <Container>
            <HeaderFieldView
                onActionCloseModifyMemoModal={() => props.onActionCloseModifyMemoModal()}
            ></HeaderFieldView>

            <InputFormFieldView
                selectedStatusData={props.selectedStatusData}

                onActionChangeModifyMemo={(e) => props.onActionChangeModifyMemo(e)}
                onSubmitModifyMemo={(e) => props.onSubmitModifyMemo(e)}
            ></InputFormFieldView>
        </Container>
    )
}

export default ModifyMemoModalComponent;
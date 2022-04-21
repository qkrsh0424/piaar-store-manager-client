import { Container } from "./CreateUploadHeaderDetailModal.styled";
import { useEffect, useReducer } from "react";
import UploadHeaderDetailFormFieldView from "./UploadHeaderDetailFormField.view";

const CreateUploadHeaderDetailModalComponent = (props) => {

    return (
        <Container>
            <UploadHeaderDetailFormFieldView
                createUploadHeaderDetailState={props.createUploadHeaderDetailState}

                onActionAddFormCell={(e) => props.onActionAddFormCell(e)}
                onActionDeleteFormCell={(e, uploadHeaderId) => props.onActionDeleteFormCell(e, uploadHeaderId)}
                onActionMoveHeaderFormDown={(e, detailId) => props.onActionMoveHeaderFormDown(e, detailId)}
                onActionMoveHeaderFormUp={(e, detailId) => props.onActionMoveHeaderFormUp(e, detailId)}
                onActionStoreUploadHeaderForm={(e) => props.onActionStoreUploadHeaderForm(e)}
                onChangeUploadHeaderDetail={(e, detailId) => props.onChangeUploadHeaderDetail(e, detailId)}
            ></UploadHeaderDetailFormFieldView>
        </Container>
    )
}

export default CreateUploadHeaderDetailModalComponent;

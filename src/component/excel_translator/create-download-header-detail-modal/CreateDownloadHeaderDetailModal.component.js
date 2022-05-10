import { Container } from "./CreateDownloadHeaderDetailModal.styled";
import { useEffect, useReducer } from "react";
import DownloadHeaderDetailFormFieldView from "./DownloadHeaderDetailFormField.view";

const CreateDownloadHeaderDetailModalComponent = (props) => {

    return (
        <Container>
            <DownloadHeaderDetailFormFieldView
                updateDownloadHeaderForm={props.updateDownloadHeaderForm}

                onActionDeleteCell={(e, headerId) => props.onActionDeleteCell(e, headerId)}
                onActionSelectUploadHeader={(e, headerId) => props.onActionSelectUploadHeader(e, headerId)}
                onChangeInputValue={(e, headerId) => props.onChangeInputValue(e, headerId)}
                isChecked={(headerId) => props.isChecked(headerId)}
                checkOne={(e, headerId) => props.checkOne(e, headerId)}
                getUploadHeaderName={(targetCellNum) => props.getUploadHeaderName(targetCellNum)}
                onActionStoreDownloadHeaderForm={(e) => props.onActionStoreDownloadHeaderForm(e)}
            ></DownloadHeaderDetailFormFieldView>
        </Container>
    )
}

export default CreateDownloadHeaderDetailModalComponent;

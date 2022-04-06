import CancelIcon from '@mui/icons-material/Cancel';

import { HeaderFieldWrapper } from "./ModifyProductOptionModal.styled"

export default function HeaderFieldView(props) {
    return(
        <HeaderFieldWrapper>
            <div className="header-top">
                <div className="modal-title">옵션 수정</div>
                <div className="modal-close-btn">
                    <CancelIcon type="button" sx={{ fontSize: 33 }} onClick={() => props.onActionCloseCreateProductOptionModal()} />
                </div>
            </div>
        </HeaderFieldWrapper>
    )
}
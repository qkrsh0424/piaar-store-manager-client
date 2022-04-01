import CancelIcon from '@mui/icons-material/Cancel';

import { HeaderFieldWrapper } from "./ModifyProductDetailModal.styled"

export default function HeaderFieldView(props) {
    return(
        <HeaderFieldWrapper>
            <div className="header-top">
                <div className="modal-title">상세 추가</div>
                <div className="modal-close-btn">
                    <CancelIcon type="button" sx={{ fontSize: 33 }} onClick={() => props.onActionCloseModifyProductDetailModal()} />
                </div>
            </div>
        </HeaderFieldWrapper>
    )
}
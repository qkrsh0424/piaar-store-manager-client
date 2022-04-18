import CancelIcon from '@mui/icons-material/Cancel';

import { HeaderFieldWrapper } from "./ModifyProductModal.styled"

export default function HeaderFieldView(props) {
    return(
        <HeaderFieldWrapper>
            <div className="header-top">
                <div className="modal-title">상품 수정</div>
                <div className="modal-close-btn">
                    <CancelIcon type="button" sx={{ fontSize: 33 }} onClick={() => props.onActionCloseModifyProductModal()} />
                </div>
            </div>
        </HeaderFieldWrapper>
    )
}
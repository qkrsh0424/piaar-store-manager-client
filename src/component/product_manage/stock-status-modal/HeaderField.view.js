import CancelIcon from '@mui/icons-material/Cancel';

import { HeaderFieldWrapper } from "./StockStatusModal.styled"

export default function HeaderFieldView(props) {
    return(
        <HeaderFieldWrapper>
            <div className="header-top">
                <div className="modal-title">입출고 현황</div>
                <div className="modal-close-btn">
                    <CancelIcon type="button" sx={{ fontSize: 33 }} onClick={() => props.onActionCloseStockStatusModal()} />
                </div>
            </div>
        </HeaderFieldWrapper>
    )
}
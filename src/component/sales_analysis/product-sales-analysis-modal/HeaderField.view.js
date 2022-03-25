import CancelIcon from '@mui/icons-material/Cancel';

import { HeaderFieldWrapper } from "./ProductSalesAnalysisModal.styled";

export default function HeaderFieldView(props) {
    return (
        <HeaderFieldWrapper>
            <div className="modal-title">상품별 옵션랭킹 순위</div>
            <div className="modal-close-btn">
                <CancelIcon type="button" sx={{ fontSize: 33 }} onClick={() => props.onActionCloseProductSalesAnalysisModal()} />
            </div>
        </HeaderFieldWrapper>
    )
}
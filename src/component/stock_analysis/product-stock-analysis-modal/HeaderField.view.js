import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { HeaderFieldWrapper } from "./ProductStockAnalysisModal.styled";

export default function HeaderFieldView(props) {
    return (
        <HeaderFieldWrapper>
            <div className="header-top">
                <div className="modal-title">상품별 옵션 순위</div>
                <IconButton className="modal-close-btn" aria-label="close" onClick={() => props.onActionCloseProductStockAnalysisModal()}>
                    <CloseIcon />
                </IconButton>
            </div>
        </HeaderFieldWrapper>
    )
}
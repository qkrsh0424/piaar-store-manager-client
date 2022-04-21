import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { HeaderFieldWrapper } from "./CreateProductOptionModal.styled"

export default function HeaderFieldView(props) {
    return(
        <HeaderFieldWrapper>
            <div className="header-top">
                <div className="modal-title">옵션 추가</div>
                <IconButton className="modal-close-btn" aria-label="close" onClick={() => props.onActionCloseCreateProductOptionModal()}>
                    <CloseIcon />
                </IconButton>
            </div>
        </HeaderFieldWrapper>
    )
}
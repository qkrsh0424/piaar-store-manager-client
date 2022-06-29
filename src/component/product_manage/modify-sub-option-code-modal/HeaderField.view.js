import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { HeaderFieldWrapper } from "./ModifySubOptionCodeModal.styled"

export default function HeaderFieldView(props) {
    return(
        <HeaderFieldWrapper>
            <div className="header-top">
                <div className="modal-title">대체코드 수정</div>
                <IconButton className="modal-close-btn" aria-label="close" onClick={() => props.onActionCloseModifySubOptionCodeModal()}>
                    <CloseIcon />
                </IconButton>
            </div>
        </HeaderFieldWrapper>
    )
}
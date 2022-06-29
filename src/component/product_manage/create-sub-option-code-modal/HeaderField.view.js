import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { HeaderFieldWrapper } from "./CreateSubOptionCodeModal.styled"

export default function HeaderFieldView(props) {
    return(
        <HeaderFieldWrapper>
            <div className="header-top">
                <div className="modal-title">대체코드 생성</div>
                <IconButton className="modal-close-btn" aria-label="close" onClick={() => props.onActionCloseCreateSubOptionCodeModal()}>
                    <CloseIcon />
                </IconButton>
            </div>
        </HeaderFieldWrapper>
    )
}
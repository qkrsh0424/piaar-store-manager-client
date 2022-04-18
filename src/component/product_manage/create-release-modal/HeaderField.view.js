import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { HeaderFieldWrapper } from "./CreateReleaseModal.styled"

export default function HeaderFieldView(props) {
    return(
        <HeaderFieldWrapper>
            <div className="header-top">
                <div className="modal-title">출고등록</div>
                <IconButton className="modal-close-btn" aria-label="close" onClick={() => props.onActionCloseCreateReleaseModal()}>
                    <CloseIcon />
                </IconButton>
            </div>
        </HeaderFieldWrapper>
    )
}
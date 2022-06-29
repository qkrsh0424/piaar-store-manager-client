import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { HeaderFieldWrapper } from "./ExcelTranslatorSearchModal.styled";

export default function HeaderFieldView(props) {
    return (
        <HeaderFieldWrapper>
            <div className="header-top">
                <div className="modal-title">엑셀 양식 확인</div>
                <IconButton className="modal-close-btn" aria-label="close" onClick={() => props.onActionCloseExcelTranslatorSearchModal()}>
                    <CloseIcon />
                </IconButton>
            </div>
        </HeaderFieldWrapper>
    )
}
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { HeaderFieldWrapper } from "./CreateProductDetailModal.styled"

export default function HeaderFieldView(props) {
    return(
        <HeaderFieldWrapper>
            <div className="header-top">
                <div className="modal-title">상세 추가</div>
                <IconButton className="modal-close-btn" aria-label="close" onClick={() => props.onActionCloseCreateProductDetailModal()}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div className="info-text">* 기본으로 주어지는 데이터는 상품에 등록된 기본값입니다. 기본값을 설정하려면 상품의 상세데이터를 수정해주세요.</div>
        </HeaderFieldWrapper>
    )
}
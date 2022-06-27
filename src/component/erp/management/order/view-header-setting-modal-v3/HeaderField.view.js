import { HeaderFieldWrapper } from "./ViewHeaderSettingModal.styled";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function Title({ element }) {
    return (
        <div className='title-box'>
            {element}
        </div>
    );
}

export default function HeaderFieldView(props) {
    return (
        <HeaderFieldWrapper>
            <Title
                element={'뷰 헤더 설정'}
            ></Title>
            <IconButton className="modal-close-btn" aria-label="close" onClick={props.onActionCloseModal}>
                <CloseIcon />
            </IconButton>
        </HeaderFieldWrapper>
    );
}
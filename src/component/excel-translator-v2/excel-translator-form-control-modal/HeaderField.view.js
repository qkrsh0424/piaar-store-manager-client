import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { HeaderFieldWrapper } from './ExcelTranslatorFormControl.styled';

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
                element={'엑셀 헤더 양식 설정'}
            ></Title>
            <IconButton type='button' className="modal-close-btn" aria-label="close" onClick={props.onActionCloseModal}>
                <CloseIcon />
            </IconButton>
        </HeaderFieldWrapper>
    );
}
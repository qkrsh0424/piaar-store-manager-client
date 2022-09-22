import { HeaderFieldWrapper } from "./ReturnProductImageModal.styled";

export default function HeaderFieldView(props) {
    return (
        <HeaderFieldWrapper>
            <div className='title-box'>
                {props.element}
            </div>
        </HeaderFieldWrapper>
    );
}
import { InfoTextFieldWrapper } from "./ReleaseListModal.styled";

export default function InfoTextFieldView(props) {
    return (
        <InfoTextFieldWrapper>
            <div className='info-box'>
                {props.element}
            </div>
        </InfoTextFieldWrapper>
    );
}
import Ripple from "../../../../module/button/Ripple";
import { ButtonFieldWrapper } from "./ReturnProductImageModal.styled";

export default function ButtonFieldView(props) {
    return (
        <ButtonFieldWrapper>
            <div className="button-box">
                <button
                    type='button'
                    className='uploader-btn-el'
                    onClick={props.onActionClickReturnProductImageButton}
                >
                    이미지 업로드
                    <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                </button>
                <input type="file" accept="image/*"
                    id={'rpi_uploader'}
                    onClick={(e) => e.target.value=''}
                    onChange={props.onActionUploadReturnProductImageFile}
                    multiple
                />
            </div>
            
            <div className='submit-box'>
                <button
                    type='submit'
                    className='button-el'
                >
                    저장
                    <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                </button>
            </div>
        </ButtonFieldWrapper>
    );
}
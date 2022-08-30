import Ripple from "../../module/button/Ripple";
import { ButtonFieldWrapper } from "./ExcelTranslatorFormControl.styled";

export default function ButtonFieldView(props) {
    return (
        <ButtonFieldWrapper>
            <div className='flex-box'>
                <div>
                    <button
                        type='button'
                        className='button-el'
                        onClick={props.onActionResetExcelTranslatorViewOrder}
                    >
                        초기화
                        <Ripple color={'#e0e0e0'} duration={1000} />
                    </button>
                </div>
                <div>
                    <button
                        type='submit'
                        className='button-el'
                    >
                        저장
                        <Ripple color={'#e0e0e0'} duration={1000} />
                    </button>
                </div>
            </div>
        </ButtonFieldWrapper>
    );
}
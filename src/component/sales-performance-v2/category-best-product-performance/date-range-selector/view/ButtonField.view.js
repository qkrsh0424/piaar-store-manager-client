import { useDisabledButtonHook } from "../../../../hooks/button-disabled/useDisabledButtonHook";
import { ButtonFieldWrapper } from "../DateRangeSelector.styled";

export default function ButtonFieldView (props) {
    const [buttonDisabled, setButtonDisabled] = useDisabledButtonHook(false);

    const _onConfirm = async (e) => {
        e.preventDefault();

        setButtonDisabled(true);
        await props.onConfirm(e);
    }

    return (
        <ButtonFieldWrapper>
            <div>
                <button
                    className='button-item'
                    onClick={() => props.onClose() || {}}
                >
                    취소
                </button>
            </div>
            <div>
                <button
                    className='button-item confirm-btn'
                    disabled={buttonDisabled}
                    onClick={(e) => _onConfirm(e) || {}}
                >
                    확인
                </button>
            </div>
        </ButtonFieldWrapper>   
    )
}
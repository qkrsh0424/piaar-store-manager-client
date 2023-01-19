import { CheckBoxControlWrapper } from "../CategorySelector.styled";

export default function CheckBoxControlView(props) {
    return (
        <CheckBoxControlWrapper>
            <div>
                <button
                    className='button-el'
                    onClick={(e) => props.onActionCheckAll(e)}
                >
                    전체선택
                </button>
            </div>
            <div>
                <button
                    className='button-el'
                    onClick={(e) => props.onActionCheckCancelAll(e)}
                >
                    전체해제
                </button>
            </div>
        </CheckBoxControlWrapper>
    )
}
import { SelectorButtonFieldWrapper } from "./ReturnItemTable.styled";

export default function SelectorButtonFieldView(props) {
    return (
        <SelectorButtonFieldWrapper>
            <div className='flex-box'>
                <button
                    type='button'
                    className='button-el'
                    onClick={props.onActionCheckReturnItemAll}
                >전체 선택</button>
                <button
                    type='button'
                    className='button-el'
                    onClick={props.onActionReleaseReturnItemAll}
                >전체 해제</button>
            </div>
        </SelectorButtonFieldWrapper>
    );
}
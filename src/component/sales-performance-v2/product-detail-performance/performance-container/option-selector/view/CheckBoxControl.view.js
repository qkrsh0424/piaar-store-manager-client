import { CheckBoxControlWrapper } from "../OptionSelector.styled";

export default function CheckBoxControlView(props) {
    return (
        <CheckBoxControlWrapper>
            <div>
                <button
                    className='button-el'
                    onClick={(e) => props.onActionCheckAll(e)}
                >
                    <img
                        src='/assets/icon/check_all_default_000000.svg'
                        style={{ width: '25px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                    />
                </button>
            </div>
            <div>
                <button
                    className='button-el'
                    onClick={(e) => props.onActionCheckCancelAll(e)}
                >
                    <img
                        src='/assets/icon/check_remove_all_default_000000.svg'
                        style={{ width: '25px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                    />
                </button>
            </div>
        </CheckBoxControlWrapper>
    )
}
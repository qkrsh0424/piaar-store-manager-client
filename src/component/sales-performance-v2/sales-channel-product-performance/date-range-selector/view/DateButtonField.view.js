import { DateButtonFieldWrapper } from "../DateRangeSelector.styled";

export default function DateButtonFieldView (props) {
    return (
        <DateButtonFieldWrapper>
            <div className='button-box'>
                <button
                    type='button'
                    className='button-el'
                    onClick={() => props.onActionSearchDateRange(0, 0, -6)}
                >
                    지난 1주
                </button>
            </div>
            <div className='button-box'>
                <button
                    type='button'
                    className='button-el'
                    onClick={() => props.onActionSearchDateRange(0, 0, -13)}
                >
                    지난 2주
                </button>
            </div>
            <div className='button-box'>
                <button
                    type='button'
                    className='button-el'
                    onClick={() => props.onActionSearchDateRange(0, 0, -30)}
                >
                    지난 30일
                </button>
            </div>
            <div className='button-box'>
                <button
                    type='button'
                    className='button-el'
                    onClick={() => props.onActionSearchDateRange(0, 0, -90)}
                >
                    지난 90일
                </button>
            </div>
            <div className='button-box'>
                <button
                    type='button'
                    className='button-el'
                    onClick={() => props.onActionSearchMonthRange(0)}
                >
                    이번달
                </button>
            </div>
            <div className='button-box'>
                <button
                    type='button'
                    className='button-el'
                    onClick={() => props.onActionSearchMonthRange(-1)}
                >
                    지난달
                </button>
            </div>
        </DateButtonFieldWrapper>
    )
}
import CustomDatePicker from "../../../../../module/date-picker/CustomDatePicker";
import { DateRangeSelectorFieldWrapper } from "../SearchProductReceiveAndReleaseModal.styled";

export default function DateRangeSelectorFieldView(props) {
    return (
        <DateRangeSelectorFieldWrapper>
            <div className='date-selector-group'>
                <div className='date-selector-box'>
                    <CustomDatePicker
                        valueSize={14}
                        labelSize={12}
                        label={'시작일'}
                        selected={props.dateRange.startDate}
                        onChange={value => props.onChangeStartDateValue(value)}
                    ></CustomDatePicker>
                </div>
                <div className='date-selector-box'>
                    <CustomDatePicker
                        valueSize={14}
                        labelSize={12}
                        label={'종료일'}
                        selected={props.dateRange.endDate}
                        onChange={value => props.onChangeEndDateValue(value)}
                    ></CustomDatePicker>
                </div>
            </div>

            <div className='button-box'>
                <button
                    type='button'
                    className='button-el'
                    onClick={() => props.onActionConfirmSelectedDate()}
                >
                    조회
                </button>
            </div>
        </DateRangeSelectorFieldWrapper>
    )
}
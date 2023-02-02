import { DateSelectorFieldWrapper } from "../DateRangeSelector.styled";
import CustomDatePickerV2 from "../../../../module/date-picker/CustomDatePickerV2";

export default function DateSelectorFieldView (props) {
    return (
        <DateSelectorFieldWrapper>
            <div className='date-selector-box'>
                <CustomDatePickerV2
                    valueSize={14}
                    labelSize={12}
                    label={'시작일'}
                    selected={props.startDate}
                    onChange={value => props.onChangeStartDateValue(value)}
                ></CustomDatePickerV2>
            </div>
            <div className='date-selector-box'>
                <CustomDatePickerV2
                    valueSize={14}
                    labelSize={12}
                    label={'종료일'}
                    selected={props.endDate}
                    onChange={value => props.onChangeEndDateValue(value)}
                ></CustomDatePickerV2>
            </div>
        </DateSelectorFieldWrapper>
    )
}
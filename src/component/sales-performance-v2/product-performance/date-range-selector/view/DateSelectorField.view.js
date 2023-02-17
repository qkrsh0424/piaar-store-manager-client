import CustomDatePickerV2 from "../../../../module/date-picker/CustomDatePickerV2";
import { DateSelectorFieldWrapper } from "../DateRangeSelector.styled";

export default function DateSelectorFieldView (props) {
    return (
        <DateSelectorFieldWrapper>
            <div className='date-selector-box'>
                <div className='date-selector-box-title'>시작일</div>
                <CustomDatePickerV2
                    valueSize={14}
                    labelSize={12}
                    label={'시작일'}
                    selected={props.startDate}
                    pickerModeIndex={props.pickerModeIndex}
                    onChange={value => props.onChangeStartDateValue(value)}
                ></CustomDatePickerV2>
            </div>
            <div className='date-selector-box'>
                <div className='date-selector-box-title'>종료일</div>
                <CustomDatePickerV2
                    valueSize={14}
                    labelSize={12}
                    label={'종료일'}
                    selected={props.endDate}
                    pickerModeIndex={props.pickerModeIndex}
                    onChange={value => props.onChangeEndDateValue(value)}
                ></CustomDatePickerV2>
            </div>
        </DateSelectorFieldWrapper>
    )
}
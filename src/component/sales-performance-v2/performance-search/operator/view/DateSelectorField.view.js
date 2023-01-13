import CustomDatePicker from "../../../../module/date-picker/CustomDatePicker";
import { DateSelectorFieldWrapper } from "../Operator.styled";

export default function DateSelectorFieldView (props) {
    return (
        <DateSelectorFieldWrapper>
            <div className='label-item'>조회기간</div>
            <div className='flex-box'>
                <div className='date-selector-box'>
                    <CustomDatePicker
                        valueSize={14}
                        labelSize={12}
                        label={'시작일'}
                        selected={props.startDate}
                        onChange={value => props.onChangeStartDateValue(value)}
                    ></CustomDatePicker>
                </div>
                <div className='date-selector-box'>
                    <CustomDatePicker
                        valueSize={14}
                        labelSize={12}
                        label={'종료일'}
                        selected={props.endDate}
                        onChange={value => props.onChangeEndDateValue(value)}
                    ></CustomDatePicker>
                </div>
            </div>
        </DateSelectorFieldWrapper>
    )
}
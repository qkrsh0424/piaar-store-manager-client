import { DateSelectorFieldWrapper } from "./SearchOperator.styled";
import CustomDatePicker from '../../../../module/date-picker/CustomDatePicker';

export default function DateSelectorFieldView(props) {
    return (
        <DateSelectorFieldWrapper>
            <div className='label-item'>조회기간</div>
            <div
                className="quick-select-box"
            >
                <button
                    className="quick-select-button-el"
                    onClick={props.onActionSetDateToday}
                >오늘</button>
                <button
                    className="quick-select-button-el"
                    style={{
                        marginLeft:'-1px'
                    }}
                    onClick={props.onActionSetDate7Days}
                >최근 7일</button>
            </div>
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
    );
}
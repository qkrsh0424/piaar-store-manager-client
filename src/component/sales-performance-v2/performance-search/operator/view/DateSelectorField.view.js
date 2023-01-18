import { getWeekName } from "../../../../../utils/dateFormatUtils";
import CustomDatePicker from "../../../../module/date-picker/CustomDatePicker";
import { DateSelectorFieldWrapper } from "../Operator.styled";

const WEEK_NAME = getWeekName();

export default function DateSelectorFieldView (props) {
    return (
        <DateSelectorFieldWrapper>
            <div>
                <div className='label-item'>주문일시</div>
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
            </div>
            <div>
                <div className='label-item'>요일</div>
                <div className='search-data'>
                    <select
                        className='select-item'
                        value={props.dayIndex || ''}
                        onChange={props.onChangeDayNameValue}
                    >   
                        <option value=''>전체</option>
                        {WEEK_NAME.map((r, idx) => {
                            return (
                                <option
                                    key={'day_name_idx' + idx}
                                    value={idx+1}
                                >
                                    {r}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </DateSelectorFieldWrapper>
    )
}
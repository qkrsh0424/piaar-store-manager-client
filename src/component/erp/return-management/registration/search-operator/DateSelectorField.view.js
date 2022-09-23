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
                <select
                    className='select-item'
                    value={props.periodType || ''}
                    onChange={props.onChangePeriodType}
                >
                    <option value="">전체</option>
                    <option value='registration'>반품접수일</option>
                    <option value='release'>출고등록일</option>
                    <option value='channelOrderDate'>주문일시</option>
                </select>
                {props.periodType &&
                    <>
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
                    </>
                }
            </div>
        </DateSelectorFieldWrapper>
    );
}
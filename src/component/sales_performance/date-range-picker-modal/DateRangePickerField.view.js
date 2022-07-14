import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { DateRangePickerWrapper } from "./DateRangePickerModal.styled";

export default function DateRangePickerFieldView(props) {
    return (
        <DateRangePickerWrapper>
            <DateRange
                editableDateInputs={false}
                onChange={(date) => props.onChangeSelectedDate(date)}
                moveRangeOnFirstSelection={false}
                local="ko"
                ranges={[props.dateRange]}
            />
            <div className="confirm-btn" 
                onClick={props.onActionConfirmSelectedDate}
            >
                확인
            </div>
            <div>
                <div className='flex-box'>
                    <button type="button" className="date-range-btn" onClick={() => props.onActionSelectDataRange(0, 0, -6)}>지난 1주</button>
                    <button type="button" className="date-range-btn" onClick={() => props.onActionSelectDataRange(0, 0, -13)}>지난 2주</button>
                    <button type="button" className="date-range-btn" onClick={() => props.onActionSelectDataRange(0, -1, 0)}>지난 30일</button>
                    <button type="button" className="date-range-btn" onClick={() => props.onActionSelectDataRange(0, -3, 0)}>지난 90일</button>
                </div>
                <div className="flex-box">
                    <button type="button" className="date-range-btn month-select-btn" onClick={() => props.onActionSearchQuickMonth(0)}>이번달</button>
                    <button type="button" className="date-range-btn month-select-btn" onClick={() => props.onActionSearchQuickMonth(-1)}>지난달</button>
                </div>
            </div>
        </DateRangePickerWrapper>
    )
}
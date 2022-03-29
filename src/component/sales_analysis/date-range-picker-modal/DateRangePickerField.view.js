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
                ranges={[props.selectedDateRangeState]}
            />
            <div className="confirm-btn" 
                onClick={() => props.onActionSearchSalesAnalysis(props.selectedDateRangeState?.startDate, props.selectedDateRangeState?.endDate)}
            >
                확인
            </div>
        </DateRangePickerWrapper>
    )
}
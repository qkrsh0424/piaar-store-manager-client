import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DateRangePickerFieldView from "./DateRangePickerField.view";

import { Container } from "./DateRangePickerModal.styled";

const DateRangePickerModalComponent = (props) => {
    return (
        <Container>
            <DateRangePickerFieldView
                selectedDateRangeState={props.selectedDateRangeState}

                onChangeSelectedDate={(date) => props.onChangeSelectedDate(date)}
                onActionSearchSalesAnalysis={(startDate, endDate) => props.onActionSearchSalesAnalysis(startDate, endDate)}
            ></DateRangePickerFieldView>
        </Container>
    )
}

export default DateRangePickerModalComponent;
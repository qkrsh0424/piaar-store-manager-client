import { useEffect, useReducer } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DateRangePickerFieldView from "./DateRangePickerField.view";

import { Container } from "./DateRangePickerModal.styled";

const DateRangePickerModalComponent = (props) => {
    const [dateRange, dispatchDateRange] = useReducer(dateRangeReducer, initialDateRange);
    
    useEffect(() => {
        if(!props.dateRange) {
            return;
        }

        let data = {
            ...props.dateRange,
            startDate: new Date(props.dateRange.startDate),
            endDate: new Date(props.dateRange.endDate)
        }
        
        dispatchDateRange({
            type: 'INIT_DATA',
            payload: data
        })
    }, [props.dateRange])

    const onChangeSelectedDate = (date) => {
        let startDate = date.selection.startDate;
        let endDate = date.selection.endDate;

        dispatchDateRange({
            type: 'SET_DATA',
            payload: {
                startDate,
                endDate
            }
        })
    }

    const onActionConfirmSelectedDate = () => {
        props.onActionConfirmSelectedDateRange(dateRange);
    }

    const onActionSelectDataRange = (year, month, day) => {
        props.onActionSelectDataRange(year, month, day);
    }

    const onActionSearchQuickMonth = (month) => {
        props.onActionSearchQuickMonth(month);
    }

    return (
        <Container>
            {dateRange &&
                <DateRangePickerFieldView
                    dateRange={dateRange}

                    onChangeSelectedDate={onChangeSelectedDate}
                    onActionConfirmSelectedDate={onActionConfirmSelectedDate}
                    onActionSelectDataRange={onActionSelectDataRange}
                    onActionSearchQuickMonth={onActionSearchQuickMonth}
                ></DateRangePickerFieldView>
            }
        </Container>
    )
}

export default DateRangePickerModalComponent;

const initialDateRange = null;

const dateRangeReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'SET_DATA':
            return {
                ...state,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
            }
        case 'CLEAR':
            return initialDateRange;
        default: return { ...state }
    }
}
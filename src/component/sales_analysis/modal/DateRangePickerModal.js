import styled from 'styled-components';
import { DateRange } from "react-date-range";
import Dialog from '@material-ui/core/Dialog';
import React from "react";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DatePickerButton = styled.div`
    text-align: center;
    padding: 10px;
    background-color: rgb(229, 232, 237);
    transition: opacity 0.1s linear;
    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }
`;

const DateRangePickerModal = (props) => {
    return (
        <>
            <Dialog
                open={props.open}
                onClose={() => props.dateRangePickerControl().close()}
            >
                <DateRange
                    editableDateInputs={false}
                    onChange={(date) => props.dateRangePickerControl().changeReleasedData(date)}
                    moveRangeOnFirstSelection={false}
                    local="ko"
                    ranges={[props.selectedDateRangeState]}
                />
                <DatePickerButton onClick={() => props.dateRangePickerControl().selectDateRange(props.selectedDateRangeState?.startDate, props.selectedDateRangeState?.endDate)}>확인</DatePickerButton>
            </Dialog>
        </>
    )
}

export default DateRangePickerModal;
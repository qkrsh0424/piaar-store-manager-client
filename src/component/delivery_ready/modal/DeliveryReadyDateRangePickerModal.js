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

const DeliveryReadyDatePickerModal = (props) => {
    return (
        <>
            <Dialog
                open={props.open}
                onClose={() => props.__handleEventControl().deliveryReadyDateRangePicker().close()}
            >
                <DateRange
                    editableDateInputs={false}
                    onChange={(date) => props.__handleEventControl().deliveryReadyDateRangePicker().changeReleasedData(date)}
                    moveRangeOnFirstSelection={false}
                    local="ko"
                    ranges={[props.selectionRange]}
                />
                <DatePickerButton onClick={() => props.__handleEventControl().deliveryReadyDateRangePicker().selectDateRange(props.selectionRange.startDate, props.selectionRange.endDate)}>확인</DatePickerButton>
            </Dialog>
        </>
    )
}

export default DeliveryReadyDatePickerModal;
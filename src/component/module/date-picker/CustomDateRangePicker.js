import styled from "styled-components";
import PropTypes from 'prop-types';
import { DateRange } from 'react-date-range';

const Container = styled.div`
    .confirm-btn {
        text-align: center;
        padding: 10px;
        background-color: rgb(229, 232, 237);
        transition: opacity 0.1s linear;
    
        &:hover {
            opacity: 0.6;
        }
    }
`;

/**
 * 
 * @param {Object} props
 * @param {Object} props.selectedDateRange
 * @param {function} props.onChange
 * @param {function} props.onConfirm
 * @returns 
 */
const CustomDateRangePicker = ({ selectedDateRange, onChange, onConfirm, ...props }) => {
    return (
        <Container>
            <DateRange
                editableDateInputs={false}
                onChange={(date) => onChange(date)}
                moveRangeOnFirstSelection={false}
                local="ko"
                ranges={[selectedDateRange]}
            />
            <div className="confirm-btn"
                onClick={() => onConfirm()}
            >
                확인
            </div>
        </Container>
    );
}

CustomDateRangePicker.prototype = {
    selectedDateRange: PropTypes.object,
    onChange: PropTypes.func,
    onConfirm: PropTypes.func
}
export default CustomDateRangePicker;
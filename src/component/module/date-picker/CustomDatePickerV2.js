import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { forwardRef, useRef, useState } from 'react';

const Container = styled.div`
    font-weight: 400;

    .react-datepicker {
        /* height: 200px; */
        border: 1px solid var(--defaultBorderColor);
        box-shadow: var(--defaultBoxShadow);
    }

    .react-datepicker__header {
        background:white;
        padding: 15px;
    }

    .react-datepicker__navigation{
        top: 15px;
    }
    
    /* .react-datepicker-popper{
        z-index: 99;
    } */

    .react-datepicker__triangle{
        display: none;
    }

    .react-datepicker__day--selected {
        background-color: var(--piaar-main-color);
    }

    .react-datepicker__day--keyboard-selected {
        background-color: var(--piaar-main-color);
    }
`;

const ButtonBox = styled.div`
    .button-item{
        width: 100%;
        padding: 5px 0;
        background: white;
        border: 1px solid #e1e1e1;
        border-radius: 5px;
        cursor: pointer;
    }

    .button-label{
        color: #444;
        font-size: ${props => props.labelSize ? props.labelSize : 16}px;
    }

    .button-value{
        /* margin-top: 5px; */
        font-size: ${props => props.valueSize ? props.valueSize : 16}px;
        font-weight: 600;
        color: #444;
    }
`;

const CustomDatePickerV2 = (props) => {
    const calendar = useRef(null);

    const [currentDate, setCurrentDate] = useState();

    const cancelDatePicker = () => {
        calendar.current.setOpen(false);
    };

    const openDatePicker = () => {
        calendar.current.setOpen(true);
    };

    const closeDatePicker = () => {
        // setCurrentDate(startDate);
        calendar.current.setOpen(false);
    };

    // const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    //     <ButtonBox
    //         valueSize={props.valueSize}
    //         labelSize={props.labelSize}
    //     >
    //         <button className="button-item" onClick={onClick} ref={ref}>
    //             <div className='button-label'>{props.label || ''}</div>
    //             <div className='button-value'>{value || '날짜를 선택해 주세요.'}</div>
    //         </button>
    //     </ButtonBox>
    // ));

    return (
        <>
            <Container>
                <DatePicker
                    locale={ko}
                    dateFormat="yyyy-MM-dd"
                    selected={props.selected || null}
                    onChange={props.onChange}
                    // customInput={<ExampleCustomInput />}
                    // withPortal
                    shouldCloseOnSelect={false}
                    inline
                    ref={calendar}
                    disabledKeyboardNavigation
                >
                </DatePicker>
            </Container>
        </>
    );
}

const months = [

]
export default CustomDatePickerV2;
import { useState } from 'react';
import queryString from 'query-string';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';

import { DateRange } from 'react-date-range';

const Container = styled.div`
    & .rdrCalendarWrapper{
        width:100%;
    }

    & .rdrMonth{
        width:100%;
    }
`;

const AdaptBtn = styled.button`
    width:50%;
    border:none;
    padding:5px;
    background:#17a2b8;
    color:white;
`;

const SearchAllBtn = styled.button`
    width:50%;
    border:none;
    padding:5px;
    background:#fd7e14;
    color:white;
`;
const DateRangePickerModal = (props) => {
    const query = queryString.parse(window.location.search);

    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');
    const [dateRangeData, setDateRangeData] = useState([
        {
            startDate: query.startDate ? new Date(query.startDate) : new Date(),
            endDate: query.endDate ? new Date(query.endDate) : new Date(),
            key: 'selection'
        }
    ]);

    const dateRangeDataChange = (item) => {
        setDateRangeData([item.selection])
    }
    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={props.open}
                onClose={() => props.__handleEventControl().dateRangePicker().close()}
            >
                <Container>
                    <DateRange
                        editableDateInputs={true}
                        onChange={(item) => dateRangeDataChange(item)}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRangeData}
                    ></DateRange>
                    <SearchAllBtn type='button' onClick={() => props.__handleEventControl().dateRangePicker().searchAll()}>전체조회</SearchAllBtn>
                    <AdaptBtn type='button' onClick={() => props.__handleEventControl().dateRangePicker().adapt(dateRangeData[0])}>적용하기</AdaptBtn>

                </Container>

            </Dialog>
        </>
    );
}

export default DateRangePickerModal;
import { useState } from 'react';

import Dialog from '@material-ui/core/Dialog';

import { DateRange } from 'react-date-range';

const DateRangePickerModal = () => {
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={true}
            >
                <div>
                    <DateRange
                        editableDateInputs={true}
                        onChange={item => setState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                    ></DateRange>
                </div>

            </Dialog>
        </>
    );
}

export default DateRangePickerModal;
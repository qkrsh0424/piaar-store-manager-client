import { useEffect, useState, useReducer } from 'react';
import CommonModalComponent from '../../module/modal/CommonModalComponent';
import DateRangePickerModalComponent from '../date-range-picker-modal/DateRangePickerModal.component';
import DateSelectorFieldView from './DateSelectorField.view';
import HeaderFieldView from './HeaderField.view';

import { Container } from "./ReceiveAndReleaseModal.styled"
import ReceiveTableFieldView from './ReceiveTableField.view';
import ReleaseTableFieldView from './ReleaseTableField.view';

const ReceiveAndReleaseModalComponent = (props) => {
    const [selectedDateRangeState, dispatchSelectedDateRangeState] = useReducer(selectedDateRangeReducer, initialDateRangeState);
    const [dateRangeInfo, dispatchDateRangeInfo] = useReducer(dateRangeInfoReducer, initialDateRangeInfoState);
    const [dateRangePickerModalOpen, setDateRangePickerModalOpen] = useState(false);

    useEffect(() => {
        if (selectedDateRangeState) {
            return;
        }

        let date = {
            startDate: new Date(),
            endDate: new Date()
        }
        dispatchSelectedDateRangeState({
            type: 'INIT_DATA'
        });
        dispatchDateRangeInfo({
            type: 'SET_DATA',
            payload: date
        });
        props.onActionSearchReceiveAndRelease(date);
    }, []);

    useEffect(() => {

    })

    const onActionOpenDatePickerModal = () => {
        setDateRangePickerModalOpen(true);
    }

    const onActionCloseDatePickerModal = () => {
        setDateRangePickerModalOpen(false);
    }

    const onChangeSelectedDate = (date) => {
        let startDate = date.selection.startDate;
        let endDate = date.selection.endDate;

        dispatchSelectedDateRangeState({
            type: 'SET_DATA',
            payload: {
                startDate: startDate,
                endDate: endDate
            }
        });
    }

    const onActionSearchReceiveAndRelease = async () => {
        dispatchDateRangeInfo({
            type: 'SET_DATA',
            payload: selectedDateRangeState
        })

        await props.onActionSearchReceiveAndRelease(dateRangeInfo);
        onActionCloseDatePickerModal();
    }
    

    return (
        <Container>
            <HeaderFieldView
                onActionCloseReceiveAndReleaseModal={() => props.onActionCloseReceiveAndReleaseModal()}
            ></HeaderFieldView>

            <DateSelectorFieldView
                dateRangeInfo={dateRangeInfo}

                onActionOpenDatePickerModal={() => onActionOpenDatePickerModal()}
            ></DateSelectorFieldView>

            <ReceiveTableFieldView
                optionReceiveStatusData={props.optionReceiveStatusData}
            ></ReceiveTableFieldView>

            <ReleaseTableFieldView
                optionReleaseStatusData={props.optionReleaseStatusData}
            ></ReleaseTableFieldView>

            {/* Modal */}
            <CommonModalComponent
                open={dateRangePickerModalOpen}
                maxWidth={'xs'}
                fullWidth={false}

                onClose={onActionCloseDatePickerModal}
            >
                <DateRangePickerModalComponent
                    selectedDateRangeState={selectedDateRangeState}

                    onChangeSelectedDate={(date) => onChangeSelectedDate(date)}
                    onActionSearchReceiveAndRelease={(startDate, endDate) => onActionSearchReceiveAndRelease(startDate, endDate)}
                ></DateRangePickerModalComponent>
            </CommonModalComponent>
        </Container>
    )
}

export default ReceiveAndReleaseModalComponent;

const initialDateRangeState = null;
const initialDateRangeInfoState = null;

const selectedDateRangeReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return {
                ...state,
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection'
            }
        case 'SET_DATA':
            return {
                ...state,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate
            }
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}

const dateRangeInfoReducer = (state, action) => {
    switch(action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}
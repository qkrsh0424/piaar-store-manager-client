import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from 'query-string';
import { dateToYYYYMMDD, setStartDateOfPeriod } from "../../../utils/dateFormatUtils";
import CommonModalComponent from "../../module/modal/CommonModalComponent";
import DateRangePickerModalComponent from "../date-range-picker-modal/DateRangePickerModal.component";
import DateSelectorFieldView from "./DateSelectorField.view";
import { Container } from "./SearchOperator.styled"
import DropDownFieldView from "./DropDownField.view";

const SearchOperatorComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);
    const navigate = useNavigate();

    const [dateRange, dispatchDateRange] = useReducer(dateRangeReducer, initialDateRange);
    const [dateRangePickerModalOpen, setDateRangePickerModalOpen] = useState(false);
    const [searchItem, setSearchItem] = useState('total');

    useEffect(() => {
        if(dateRange) {
            return;
        }

        let endDate = query.endDate ?? new Date();
        let startDate = query.startDate ?? setStartDateOfPeriod(endDate, 0, 0, -13);

        dispatchDateRange({
            type: 'SET_DATA',
            payload: {
                startDate: startDate,
                endDate: endDate
            }
        });

        query.startDate = dateToYYYYMMDD(startDate);
        query.endDate = dateToYYYYMMDD(endDate);

        navigate({
            pathname: query.pathname,
            search: `?${qs.stringify(query)}`
        });
    }, []);

    const onActionOpenDatePickerModal = () => {
        setDateRangePickerModalOpen(true);
    }

    const onActionCloseDatePickerModal = () => {
        setDateRangePickerModalOpen(false);
    }

    const onActionConfirmSelectedDateRange = (date) => {
        dispatchDateRange({
            type: 'INIT_DATA',
            payload: date
        })

        query.startDate = dateToYYYYMMDD(date.startDate);
        query.endDate = dateToYYYYMMDD(date.endDate);

        navigate({
            pathname: query.pathname,
            search: `?${qs.stringify(query)}`
        });

        onActionCloseDatePickerModal();
    }

    const onActionSelectDataRange = (year, month, day) => {
        let endDate = new Date();
        let startDate = setStartDateOfPeriod(endDate, year, month, day);
        let dateInfo = { startDate, endDate };

        onActionConfirmSelectedDateRange(dateInfo);
    }

    const onChangeDropDownItem = (e) => {
        let target = e.target.value;
        setSearchItem(target);
        props._onAction_changeSearchItem(target);
    }

    return (
        <>
            <Container>
                <DropDownFieldView
                    searchItem={searchItem}
                    onChangeDropDownItem={onChangeDropDownItem}
                ></DropDownFieldView>

                <DateSelectorFieldView
                    dateRange={dateRange}

                    onActionOpenDatePickerModal={onActionOpenDatePickerModal}
                    onActionSelectDataRange={onActionSelectDataRange}
                ></DateSelectorFieldView>

            </Container>

            {/* Modal */}
            <CommonModalComponent
                open={dateRangePickerModalOpen}
                maxWidth={'xs'}
                fullWidth={false}

                onClose={onActionCloseDatePickerModal}
            >
                <DateRangePickerModalComponent
                    dateRange={dateRange}

                    onActionConfirmSelectedDateRange={onActionConfirmSelectedDateRange}
                ></DateRangePickerModalComponent>
            </CommonModalComponent>
        </>
    )
}

export default SearchOperatorComponent;

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
                key: 'selection'
            }
        case 'CLEAR':
            return initialDateRange;
        default: return { ...state }
    }
}
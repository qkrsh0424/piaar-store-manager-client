import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from 'query-string';
import { dateToYYYYMMDD, getEndDateOfMonth, getStartDateOfMonth, setStartDateOfPeriod } from "../../../utils/dateFormatUtils";
import CommonModalComponent from "../../module/modal/CommonModalComponent";
import DateRangePickerModalComponent from "../date-range-picker-modal/DateRangePickerModal.component";
import DateSelectorFieldView from "./DateSelectorField.view";
import { Container } from "./SearchOperator.styled"

const SearchOperatorComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);
    const navigate = useNavigate();

    const [dateRange, dispatchDateRange] = useReducer(dateRangeReducer, initialDateRange);
    const [dateRangePickerModalOpen, setDateRangePickerModalOpen] = useState(false);

    useEffect(() => {
        if(dateRange) {
            return;
        }

        // 기본 최근 2주 조회. 이미 조회된 값이 있다면 그 날짜값으로 조회
        let endDate = query.endDate ?? new Date();
        let startDate = query.startDate ?? setStartDateOfPeriod(endDate, 0, 0, -13);

        query.startDate = dateToYYYYMMDD(startDate);
        query.endDate = dateToYYYYMMDD(endDate);

        navigate({
            pathname: query.pathname,
            search: `?${qs.stringify(query)}`
        });

        dispatchDateRange({
            type: 'SET_DATA',
            payload: {
                startDate: startDate,
                endDate: endDate
            }
        });
    }, []);

    const onActionOpenDatePickerModal = () => {
        setDateRangePickerModalOpen(true);
    }

    const onActionCloseDatePickerModal = () => {
        setDateRangePickerModalOpen(false);
    }

    const onActionConfirmSelectedDateRange = (date) => {
        let start = date.startDate;
        let end = date.endDate;

        query.startDate = dateToYYYYMMDD(start);
        query.endDate = dateToYYYYMMDD(end);

        navigate({
            pathname: query.pathname,
            search: `?${qs.stringify(query)}`
        });

        dispatchDateRange({
            type: 'SET_DATA',
            payload: {
                startDate: start,
                endDate: end
            }
        })

        onActionCloseDatePickerModal();
    }

    const onActionSelectDataRange = (year, month, day) => {
        let endDate = new Date();
        let startDate = setStartDateOfPeriod(endDate, year, month, day);
        let dateInfo = { startDate, endDate };

        onActionConfirmSelectedDateRange(dateInfo);
    }
    
    const onActionSearchQuickMonth = (month) => {
        let date = new Date();
        let searchMonth = new Date(date.setMonth(date.getMonth() + month));
        let startDate = getStartDateOfMonth(searchMonth);
        let endDate = getEndDateOfMonth(searchMonth);
        let dateInfo = {startDate, endDate};
        
        onActionConfirmSelectedDateRange(dateInfo);
    }

    const onActionChangeAnalysisDateRange = (searchRange) => {
        props._onAction_changeDateRangeOfAnalysis(searchRange);
    }

    return (
        <>
            <Container>
                <DateSelectorFieldView
                    dateRange={dateRange}
                    analysisDateRange={props.analysisDateRange}

                    onActionOpenDatePickerModal={onActionOpenDatePickerModal}
                    onActionSelectDataRange={onActionSelectDataRange}
                    onActionChangeAnalysisDateRange={onActionChangeAnalysisDateRange}
                    onActionSearchQuickMonth={onActionSearchQuickMonth}
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
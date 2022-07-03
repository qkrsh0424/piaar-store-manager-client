import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "./SearchOperator.styled";
import qs from 'query-string';
import { useEffect, useReducer } from "react";
import DateSelectorFieldView from './DateSelectorField.view';
import ButtonFieldView from "./ButtonField.view";
import { dateToYYYYMMDD } from "../../../../../utils/dateFormatUtils";

const SearchOperatorComponent = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = qs.parse(location.search);

    const [startDate, dispatchStartDate] = useReducer(startDateReducer, initialStartDate);
    const [endDate, dispatchEndDate] = useReducer(endDateReducer, initialEndDate);

    useEffect(() => {
        let startDate = query.startDate;
        let endDate = query.endDate;
        
        if (startDate) {
            dispatchStartDate({
                type: 'SET_DATA',
                payload: new Date(startDate)
            })
        }

        if (endDate) {
            dispatchEndDate({
                type: 'SET_DATA',
                payload: new Date(endDate)
            })
        }
    }, [query.startDate, query.endDate])

    const onChangeStartDateValue = (value) => {
        dispatchStartDate({
            type: 'SET_DATA',
            payload: value
        })
    }
    const onChangeEndDateValue = (value) => {
        dispatchEndDate({
            type: 'SET_DATA',
            payload: value
        })
    }

    const onActionRouteToSearch = (e) => {
        e.preventDefault();

        if (startDate && !endDate) {
            alert('종료일 날짜를 선택해 주세요.')
            return;
        }

        if (!startDate && endDate) {
            alert('시작일 날짜를 선택해 주세요.')
            return;
        }

        if ((endDate - startDate < 0)) {
            alert('조회기간을 정확히 선택해 주세요.')
            return;
        }

        if (startDate && endDate) {
            query.startDate = dateToYYYYMMDD(startDate);
            query.endDate = dateToYYYYMMDD(endDate);
        }else{
            delete query.startDate;
            delete query.endDate;

            dispatchStartDate({
                type: 'CLEAR'
            })
            dispatchEndDate({
                type: 'CLEAR'
            })
        }

        navigate(qs.stringifyUrl({
            url: location.pathname,
            query: { ...query }
        }),
            {
                replace: true
            }
        )
    }

    const onActionSetDateToday = () => {
        let sDate = dateToYYYYMMDD(new Date());
        let eDate = dateToYYYYMMDD(new Date());

        query.startDate = sDate;
        query.endDate = eDate;

        navigate(qs.stringifyUrl({
            url: location.pathname,
            query: { ...query }
        }),
            {
                replace: true
            }
        )
    }

    const onActionSetDate7Days = () => {
        let today = new Date();

        let eDate = dateToYYYYMMDD(today);

        today.setDate(today.getDate() - 6);
        let sDate = dateToYYYYMMDD(today);

        query.startDate = sDate;
        query.endDate = eDate;

        navigate(qs.stringifyUrl({
            url: location.pathname,
            query: { ...query }
        }),
            {
                replace: true
            }
        )
    }

    return (
        <>
            <Container>
                <DateSelectorFieldView
                    startDate={startDate}
                    endDate={endDate}

                    onChangeStartDateValue={onChangeStartDateValue}
                    onChangeEndDateValue={onChangeEndDateValue}
                    onActionSetDateToday={onActionSetDateToday}
                    onActionSetDate7Days={onActionSetDate7Days}
                ></DateSelectorFieldView>
                <form onSubmit={(e) => onActionRouteToSearch(e)}>
                    <ButtonFieldView
                        onActionRouteToSearch={onActionRouteToSearch}
                    ></ButtonFieldView>
                </form>
            </Container>
        </>
    );
}
export default SearchOperatorComponent;

const initialStartDate = null;
const initialEndDate = null;

const startDateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialStartDate;
        default: return new Date();
    }
}

const endDateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialEndDate;
        default: return new Date();
    }
}

import { useEffect, useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { dateToYYYYMMDD, getEndDate, getEndDateOfMonth, getStartDate, getStartDateOfMonth, getTimeDiffWithUTC, isSearchablePeriod, setSubtractedDate } from "../../../../utils/dateFormatUtils";
import { Container } from "./Operator.styled";
import ButtonFieldView from "./view/ButtonField.view";
import DateButtonFieldView from "./view/DateButtonField.view";
import DateSelectorFieldView from "./view/DateSelectorField.view";

// 날짜검색 최대기간 92일
const SEARCHABLE_PERIOD = 92;

export default function OperatorComponent(props) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const {
        query,
        location,
        navigateParams
    } = useRouterHook();

    const {
        open: snackbarOpen,
        message: snackbarMessage,
        severity: snackbarSeverity,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnackbar,
    } = useBasicSnackbarHookV2();

    useEffect(() => {
        let date1 = location.state?.startDate ? location.state?.startDate : new Date(query.startDate);
        let date2 = location.state?.endDate ? location.state?.endDate : new Date(query.endDate);

        setStartDate(date1);
        setEndDate(date2);

        query.startDate = dateToYYYYMMDD(date1);
        query.endDate = dateToYYYYMMDD(date2);
        navigateParams({ replace : true });
    }, [])

    useEffect(() => {
        async function fetchInit() {
            let searchStartDate = location.state?.startDate ? getStartDate(location.state?.startDate) : getStartDate(query.startDate);
            let searchEndDate = location.state?.endDate ? getEndDate(location.state?.endDate) : getEndDate(query.endDate);
            let utcHourDifference = getTimeDiffWithUTC();

            let body = {
                startDate: searchStartDate,
                endDate: searchEndDate,
                utcHourDifference,
            }
            await props.onSubmitSearchPerformance(body);
        }

        fetchInit();
    }, []);

    const __handle = {
        action: {
            changeStartDate: (value) => {
                setStartDate(value);
            },
            changeEndDate: (value) => {
                setEndDate(value);
            },
            clearRoute: () => {
                setStartDate(null);
                setEndDate(null);

                props.onActionResetPerformance();
            },
            searchDateRange: (year, month, day) => {
                let end = new Date();
                let start = setSubtractedDate(end, year, month, day);
                setStartDate(start);
                setEndDate(end);
            },
            searchMonthRange: (month) => {
                let date = new Date();
                let searchMonth = new Date(date.setMonth(date.getMonth() + month));
                let start = getStartDateOfMonth(searchMonth);
                let end = month === 0 ? new Date() : getEndDateOfMonth(searchMonth);
        
                setStartDate(start);
                setEndDate(end);
            }
        },
        submit: {
            routeToSearch: (e) => {
                e.preventDefault();

                try{
                    if (startDate && !endDate) {
                        throw new Error('종료일 날짜를 선택해 주세요.')
                    }
    
                    if (!startDate && endDate) {
                        throw new Error('시작일 날짜를 선택해 주세요.')
                    }

                    if(!(startDate && endDate)) {
                        throw new Error('시작일과 종료일을 선택해 주세요.')
                    }
    
                    if ((endDate - startDate < 0)) {
                        throw new Error('조회기간을 정확히 선택해 주세요.')
                    }

                    if (!isSearchablePeriod(startDate, endDate, SEARCHABLE_PERIOD)) {
                        throw new Error(`조회기간은 최대 ${SEARCHABLE_PERIOD}일까지 가능합니다.`)
                    }
                } catch (err) {
                    let snackbarSetting = {
                        message: err?.message,
                        severity: 'error'
                    }
                    onActionOpenSnackbar(snackbarSetting);
                    return;
                }

                let searchStartDate = startDate ? getStartDate(startDate) : null;
                let searchEndDate = endDate ? getEndDate(endDate) : null;
                let utcHourDifference = getTimeDiffWithUTC();

                let body = {
                    startDate: searchStartDate,
                    endDate: searchEndDate,
                    utcHourDifference,
                }
                props.onSubmitSearchPerformance(body);

                query.startDate = dateToYYYYMMDD(startDate);
                query.endDate = dateToYYYYMMDD(endDate);
                navigateParams({ replace: true });
            }
        }
    }

    return (
        <Container>
            <DateSelectorFieldView
                startDate={startDate}
                endDate={endDate}
                onChangeStartDateValue={__handle.action.changeStartDate}
                onChangeEndDateValue={__handle.action.changeEndDate}
            />
            <form onSubmit={(e) => __handle.submit.routeToSearch(e)}>
                <div className='button-field'>
                    <DateButtonFieldView
                        onActionSearchDateRange={__handle.action.searchDateRange}
                        onActionSearchMonthRange={__handle.action.searchMonthRange}
                    />

                    <ButtonFieldView
                        onActionClearRoute={__handle.action.clearRoute}
                    />
                </div>
            </form>

            {/* Snackbar */}
            {snackbarOpen &&
                <BasicSnackbarHookComponentV2
                    open={snackbarOpen}
                    message={snackbarMessage}
                    onClose={onActionCloseSnackbar}
                    severity={snackbarSeverity}
                    vertical={'top'}
                    horizontal={'right'}
                    duration={4000}
                ></BasicSnackbarHookComponentV2>
            }
        </Container>
    )
}
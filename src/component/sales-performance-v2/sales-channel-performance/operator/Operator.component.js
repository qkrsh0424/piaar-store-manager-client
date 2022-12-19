import { useEffect, useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { dateToYYYYMMDD, getEndDateOfMonth, getStartDateOfMonth, isSearchablePeriod, setStartDateOfPeriod } from "../../../../utils/dateFormatUtils";
import { Container } from "./Operator.styled";
import ButtonFieldView from "./view/ButtonField.view";
import DateButtonFieldView from "./view/DateButtonField.view";
import DateSelectorFieldView from "./view/DateSelectorField.view";

// 날짜검색 최대기간 90일
const SEARCHABLE_PERIOD = 90;

export default function OperatorComponent(props) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const {
        location,
        query,
        navigateParams,
        navigateClearParams
    } = useRouterHook();

    const {
        open: snackbarOpen,
        message: snackbarMessage,
        severity: snackbarSeverity,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnackbar,
    } = useBasicSnackbarHookV2();

    useEffect(() => {
        let startDate = query.startDate;
        let endDate = query.endDate;
        
        if (startDate) {
            setStartDate(new Date(startDate));
        }

        if (endDate) {
            setEndDate(new Date(endDate));
        }
    }, [query.startDate, query.endDate])

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

                navigateClearParams({ replace: true });
            },
            searchDateRange: (year, month, day) => {
                let end = new Date();
                let start = setStartDateOfPeriod(endDate, year, month, day);
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
    
                    if ((endDate - startDate < 0)) {
                        throw new Error('조회기간을 정확히 선택해 주세요.')
                    }

                    if (!isSearchablePeriod(startDate, endDate, SEARCHABLE_PERIOD)) {
                        throw new Error('조회기간은 최대 90일까지 가능합니다.')
                    }

                    if (startDate && endDate) {
                        query.startDate = dateToYYYYMMDD(startDate);
                        query.endDate = dateToYYYYMMDD(endDate);
                    } else {
                        delete query.startDate;
                        delete query.endDate;
    
                        setStartDate(null);
                        setEndDate(null);
                    }
                } catch (err) {
                    let snackbarSetting = {
                        message: err?.message,
                        severity: 'error'
                    }
                    onActionOpenSnackbar(snackbarSetting);
                }

                navigateParams({ replace: true })
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
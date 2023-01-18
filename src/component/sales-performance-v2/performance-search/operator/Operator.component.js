import { useEffect, useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { dateToYYYYMMDD, getEndDate, getStartDate, getTimeDiffWithUTC, isSearchablePeriod } from "../../../../utils/dateFormatUtils";
import { Container } from "./Operator.styled";
import ButtonFieldView from "./view/ButtonField.view";
import DateSelectorFieldView from "./view/DateSelectorField.view";
import SearchFieldView from "./view/SearchField.view";

// 날짜검색 최대기간 92일
const SEARCHABLE_PERIOD = 92;

export default function OperatorComponent(props) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dayIndex, setDayIndex] = useState(null);
    const [salesYn, setSalesYn] = useState(null);

    const {
        query,
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
        if(props.startDate && props.endDate) {
            setStartDate(props.startDate);
            setEndDate(props.endDate);
        }

        if(props.salesYn) {
            setSalesYn(props.salesYn);
        }

        if(props.dayIndex) {
            setDayIndex(props.dayIndex);
        }
        
    }, [props.startDate, props.endDate, props.dayIndex, props.salesYn]);

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
            changeDayName: (e) => {
                let value = e.target.value;
                setDayIndex(value);
            },
            changeSalesYn: (e) => {
                let value = e.target.value;
                if(value === ''){ 
                    setSalesYn(null);
                }else {
                    setSalesYn(value);
                }
            }
        },
        submit: {
            routeToSearch: async (e) => {
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

                let body = {
                    startDate: startDate ? getStartDate(startDate) : null,
                    endDate: endDate ? getEndDate(endDate) : null,
                    salesYn: salesYn,
                    dayIndex: dayIndex,
                    utcHourDifference: getTimeDiffWithUTC()
                }

                delete query.page;

                navigateParams({ replace: true })
                await props.onSubmitSearchItem(body);
            }
        }
    }

    return (
        <Container>
            <DateSelectorFieldView
                startDate={startDate}
                endDate={endDate}
                dayIndex={dayIndex}
                onChangeStartDateValue={__handle.action.changeStartDate}
                onChangeEndDateValue={__handle.action.changeEndDate}
                onChangeDayNameValue={__handle.action.changeDayName}
            />
            
            <SearchFieldView
                salesYn={salesYn}
                onChangeSalesYnValue={__handle.action.changeSalesYn}
            />

            <form onSubmit={(e) => __handle.submit.routeToSearch(e)}>
                <ButtonFieldView
                    onActionClearRoute={__handle.action.clearRoute}
                />
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
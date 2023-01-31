import { useEffect, useState } from "react";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { dateToYYYYMMDD, getEndDate, getEndDateOfMonth, getStartDate, getStartDateOfMonth, getTimeDiffWithUTC, isSearchablePeriod, setSubtractedDate } from "../../../../utils/dateFormatUtils";
import GraphDataPagenationComponent from "../graph-data-pagenation/GraphDataPagenation.component";
import { Container } from "./Operator.styled";
import ButtonFieldView from "./view/ButtonField.view";
import DateButtonFieldView from "./view/DateButtonField.view";
import DateSelectorFieldView from "./view/DateSelectorField.view";
import SearchFieldView from "./view/SearchField.view";

// 날짜검색 최대기간 92일
const SEARCHABLE_PERIOD = 92;

export default function OperatorComponent(props) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [orderByColumn, setOrderByColumn] = useState('payAmount');
    const [pageIndex, setPageIndex] = useState(null);

    const{ 
        query,
        location,
        navigateParams
    } = useRouterHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

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
            let orderByColumn = 'payAmount';

            let body = {
                startDate: searchStartDate,
                endDate: searchEndDate,
                utcHourDifference,
                orderByColumn
            }

            props.onActionUpdateDetailSearchValue(body);
            await props.onSubmitSearchPerformance(body);
        }

        fetchInit();
    }, [])

    useEffect(() => {
        if(!props.productPerformance) {
            return;
        }

        __handle.action.updatePageIndex();
    }, [props.productPerformance])

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
                setPageIndex(null);
                setOrderByColumn('payAmount');
                
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
            },
            changeOrderByColumn: (e) => {
                let value = e.target.value;
                setOrderByColumn(value);
            },
            changePrevPageIndex: () => {
                setPageIndex(pageIndex - 1);
            },
            changeNextPageIndex: () => {
                setPageIndex(pageIndex + 1);
            },
            updatePageIndex: () => {
                let index = props.productPerformance?.number;
                setPageIndex(index);
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

                let searchStartDate = startDate ? getStartDate(startDate) : null;
                let searchEndDate = endDate ? getEndDate(endDate) : null;
                let utcHourDifference = getTimeDiffWithUTC();
                let page = pageIndex + 1;
                let searchOrderByColumn = orderByColumn ?? 'payAmount';

                let body = {
                    startDate: searchStartDate,
                    endDate: searchEndDate,
                    utcHourDifference,
                    page,
                    orderByColumn: searchOrderByColumn
                }
                
                props.onActionUpdateDetailSearchValue(body);
                props.onSubmitSearchPerformance(body);

                query.startDate = dateToYYYYMMDD(startDate);
                query.endDate = dateToYYYYMMDD(endDate);
                query.page = pageIndex+1;
                
                navigateParams({ replace: true });
            }
        }
    }

    return (
        <Container>
            <form onSubmit={(e) => __handle.submit.routeToSearch(e)}>
                <DateSelectorFieldView
                    startDate={startDate}
                    endDate={endDate}
                    onChangeStartDateValue={__handle.action.changeStartDate}
                    onChangeEndDateValue={__handle.action.changeEndDate}
                />
                
                <DateButtonFieldView
                    onActionSearchDateRange={__handle.action.searchDateRange}
                    onActionSearchMonthRange={__handle.action.searchMonthRange}
                />

                <SearchFieldView
                    checkedSwitch={props.checkedSwitch}
                    orderByColumn={orderByColumn}

                    onActionChangeOrderByColumn={__handle.action.changeOrderByColumn}
                />

                <GraphDataPagenationComponent
                    salesPayAmountData={props.productPerformance}
                    pageIndex={pageIndex}
                    
                    onChangePrevPageIndex={__handle.action.changePrevPageIndex}
                    onChangeNextPageIndex={__handle.action.changeNextPageIndex}
                />

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

            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}
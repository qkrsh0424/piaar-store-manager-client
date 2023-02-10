import { useEffect } from "react";
import { useState } from "react";
import useRouterHook from "../../../../../hooks/router/useRouterHook";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { dateToYYYYMMDD, getEndDate, getEndDateOfMonth, getStartDate, getStartDateOfMonth, getTimeDiffWithUTC, isSearchablePeriod, setSubtractedDate } from "../../../../../utils/dateFormatUtils";
import CommonModalComponentV2 from "../../../../module/modal/CommonModalComponentV2";
import { Container } from "./DateRangeSelector.styled";
import ButtonFieldView from "./view/ButtonField.view";
import DateButtonFieldView from "./view/DateButtonField.view";
import DateSelectorFieldView from "./view/DateSelectorField.view";

// 날짜검색 최대기간 1년
const SEARCHABLE_PERIOD = 365;

export default function DateRangeSelectorComponent(props) {
    const [datePickerModalOpen, setDatePickerModalOpen] = useState(false);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const {
        query,
        location,
        navigateParams,
    } = useRouterHook();

    const {
        open: snackbarOpen,
        message: snackbarMessage,
        severity: snackbarSeverity,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnackbar,
    } = useBasicSnackbarHookV2();

    useEffect(() => {
        if(!datePickerModalOpen) {
            return;
        }

        let date1 = setSubtractedDate(new Date(), 0, 0, -13);
        let date2 = new Date();
        
        if(query.startDate && query.endDate) {
            date1 = new Date(query.startDate);
            date2 = new Date(query.endDate);
        }
        setStartDate(date1);
        setEndDate(date2);
    }, [datePickerModalOpen])

    const __handle = {
        action: {
            changeStartDate: (value) => {
                setStartDate(value);
            },
            changeEndDate: (value) => {
                setEndDate(value);
            },
            openDatePickerModal: () => {
                setDatePickerModalOpen(true);
            },
            closeDatePickerModal: () => {
                setDatePickerModalOpen(false);
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

                    if (!props.selectedProduct) {
                        throw new Error('조회하려는 상품을 선택해주세요.')
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
                let productCodes = [props.selectedProduct.code];

                let body = {
                    startDate: searchStartDate,
                    endDate: searchEndDate,
                    utcHourDifference,
                    productCodes
                }

                props.onSubmitSearchPerformance(body);
                __handle.action.closeDatePickerModal();

                query.startDate = dateToYYYYMMDD(startDate);
                query.endDate = dateToYYYYMMDD(endDate);
                navigateParams({ replace: true });
            }
        }
    }

    return (
        <Container>
            <div className='common-calendar'>
                <button
                    className='button-el'
                    onClick={(e) => __handle.action.openDatePickerModal(e)}
                >
                    <img src='/assets/icon/calendar_default_ffffff.svg' width={40} />
                </button>
            </div>

            {datePickerModalOpen &&
                <CommonModalComponentV2
                    open={datePickerModalOpen}
                    element={
                        <Container>
                            <div>
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
                            </div>
                            <div>
                                <ButtonFieldView
                                    onConfirm={(e) => __handle.action.routeToSearch(e)}
                                    onClose={() => __handle.action.closeDatePickerModal()}
                                />
                            </div>
                        </Container>
                    }
                    maxWidth={'sm'}

                    onClose={() => __handle.action.closeDatePickerModal()}
                />
            }

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

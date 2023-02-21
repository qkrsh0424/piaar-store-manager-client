import { useEffect } from "react";
import { useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { dateToYYYYMMDD, getEndDate, getEndDateOfMonth, getStartDate, getStartDateOfMonth, getTimeDiffWithUTC, isSearchablePeriod, setSubtractedDate } from "../../../../utils/dateFormatUtils";
import Ripple from "../../../module/button/Ripple";
import CommonModalComponentV2 from "../../../module/modal/CommonModalComponentV2";
import { Container } from "./DateRangeSelector.styled";
import ButtonFieldView from "./view/ButtonField.view";
import DateButtonFieldView from "./view/DateButtonField.view";
import DateSelectorFieldView from "./view/DateSelectorField.view";
import SearchFieldView from "./view/SearchField.view";

const DATE_PICKER_MODE = [
    {
        mode: 'date',
        name: '일'
    },
    {
        mode: 'month',
        name: '월'
    }
]

// 날짜검색 최대기간 1년
const SEARCHABLE_PERIOD = 365;

export default function DateRangeSelectorComponent(props) {
    const [datePickerModalOpen, setDatePickerModalOpen] = useState(false);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [pickerModeIndex, setPickerModeIndex] = useState(0);
    const [periodType, setPeriodType] = useState('registration');

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
        if(!datePickerModalOpen) {
            return;
        }

        let date1 = setSubtractedDate(new Date(), 0, 0, -13);
        let date2 = new Date();
        
       if(query.startDate && query.endDate) {
            date1 = new Date(query.startDate);
            date2 = new Date(query.endDate);
        }

        if(query.periodType) {
            let searchPeriodType = query.periodType;
            setPeriodType(searchPeriodType);
        }

        setStartDate(date1);
        setEndDate(date2);
    }, [datePickerModalOpen])
    
    useEffect(() => {
        async function fetchInit() {
            let searchStartDate = setSubtractedDate(new Date(), 0, 0, -13);
            let searchEndDate = new Date();
            let periodType = query.periodType ?? 'registration';

            if (query.startDate && query.endDate) {
                searchStartDate = new Date(query.startDate);
                searchEndDate = new Date(query.endDate);
            }

            let body = {
                startDate: getStartDate(searchStartDate),
                endDate: getEndDate(searchEndDate),
                utcHourDifference: getTimeDiffWithUTC(),
                pageOrderByColumn: 'payAmount',
                periodType
            }
            
            await props.onSubmitSearchPerformance(body);
        }

        fetchInit();
    }, [])

    const __handle = {
        action: {
            changeStartDate: (value) => {
                let start = value;
                if(pickerModeIndex === 1) {
                    start = getStartDateOfMonth(value);
                }
                setStartDate(start);
            },
            changeEndDate: (value) => {
                let end = value;
                if(pickerModeIndex === 1) {
                    end = getEndDateOfMonth(value);
                }
                setEndDate(end);
            },
            openDatePickerModal: () => {
                setPickerModeIndex(0);
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
            changePickerMode: () => {
                let index = (parseInt(pickerModeIndex) + 1) % DATE_PICKER_MODE.length;
                setPickerModeIndex(index);

                let start = startDate;
                let end = endDate;

                if(pickerModeIndex === 1) {
                    start = getStartDateOfMonth(start);
                    end = getEndDateOfMonth(end);
                }
                setStartDate(start);
                setEndDate(end);
            },
            changePeriodType: (e) => {
                let value = e.target.value;
                setPeriodType(value);
            },
            routeToSearch: (e) => {
                e.preventDefault();

                try{
                    if(!periodType) {
                        throw new Error('날짜 검색 기준이 선택되지 않았습니다.')
                    }

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

                    query.startDate = dateToYYYYMMDD(startDate);
                    query.endDate = dateToYYYYMMDD(endDate);
                    query.periodType = periodType;
                    navigateParams({ replace: true });
                } catch (err) {
                    let snackbarSetting = {
                        message: err?.message,
                        severity: 'error'
                    }
                    onActionOpenSnackbar(snackbarSetting);
                    return;
                }

                let body = {
                    startDate: getStartDate(startDate),
                    endDate: getEndDate(endDate),
                    utcHourDifference: getTimeDiffWithUTC(),
                    pageOrderByColumn: props.detailSearchValue?.pageOrderByColumn ?? null,
                    periodType
                }

                props.onSubmitSearchPerformance(body);
                __handle.action.closeDatePickerModal();
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
                            <div className='select-box'>
                                <SearchFieldView
                                    periodType={periodType}
                                    onChangePeriodType={__handle.action.changePeriodType}    
                                />
                                <div>
                                    <button
                                        type='button'
                                        className='button-el'
                                        onClick={() => __handle.action.changePickerMode()}
                                    >
                                        {DATE_PICKER_MODE[pickerModeIndex].name} 검색
                                        <Ripple color={'#e0e0e0'} duration={1000} />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <DateSelectorFieldView
                                    startDate={startDate}
                                    endDate={endDate}
                                    pickerModeIndex={pickerModeIndex}
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
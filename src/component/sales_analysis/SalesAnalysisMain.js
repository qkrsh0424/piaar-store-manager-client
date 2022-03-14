import { useState, useEffect } from 'react';

import { withRouter } from 'react-router';

import { getStartDate, getEndDate, dateToYYMMDD } from '../../handler/dateHandler';

import { salesAnalysisDataConnect } from '../../data_connect/salesAnalysisDataConnect';
import BackdropLoading from '../loading/BackdropLoading';
import DrawerNavbarMain from '../nav/DrawerNavbarMain';
import SalesAnalysisBody from './SalesAnalysisBody';
import DateRangePickerModal from './modal/DateRangePickerModal';

const SalesAnalysisMain = () => {
    const [salesAnalysisItems, setSalesAnalysisItems] = useState(null);
    const [backdropLoading, setBackdropLoading] = useState(false);
    const [selectionRange, setSelectionRange] = useState(
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    );
    const [exSelectionRange, setExSelectionRange] = useState(
        {
            startDate: new Date(),
            endDate: new Date(),
        }
    );
    const [DateRangePickerModalOpen, setDateRangePickerModalOpen] = useState(false);
    const [selectedDateText, setSelectedDateText] = useState("날짜 선택");

    useEffect(() => {
        async function fetchInit() {
            setBackdropLoading(true);
            await __handleDataConnect().searchSalesAnalysis(selectionRange.startDate, selectionRange.endDate);
            setBackdropLoading(false);

            let today = new Date();
            setSelectedDateText(dateToYYMMDD(today) + " ~ " + dateToYYMMDD(today));
        }
        fetchInit();
    }, []);

    const __handleDataConnect = () => {
        return {
            searchSalesAnalysis: async function (startDate, endDate) {
                var start = startDate ? new Date(getStartDate(startDate)).toUTCString() : null;
                var end = endDate ? new Date(getEndDate(endDate)).toUTCString() : null;

                await salesAnalysisDataConnect().searchAll(start, end)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setSalesAnalysisItems(res.data.data);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            }
        }
    }

    const dateRangePickerControl = () => {
        return {
            open: function () {
                setSelectionRange({
                    ...selectionRange,
                    startDate: exSelectionRange.startDate,
                    endDate: exSelectionRange.endDate
                })
                setDateRangePickerModalOpen(true);
            },
            close: function () {
                setDateRangePickerModalOpen(false);
            },
            selectDateRange: async function (startDate, endDate) {
                setExSelectionRange({
                    ...exSelectionRange,
                    startDate: selectionRange.startDate,
                    endDate: selectionRange.endDate
                })
                __handleDataConnect().searchSalesAnalysis(startDate, endDate);
                setSelectedDateText(dateToYYMMDD(startDate) + " ~ " + dateToYYMMDD(endDate));
                this.close();
            },
            changeReleasedData: function (date) {
                setSelectionRange(date.selection);
            }
        }
    }

    return (
        <>
            <DrawerNavbarMain></DrawerNavbarMain>
            <BackdropLoading open={backdropLoading} />

            <SalesAnalysisBody
                salesAnalysisItems={salesAnalysisItems}
                selectedDateText={selectedDateText}

                dateRangePickerControl={dateRangePickerControl}
            ></SalesAnalysisBody>

            <DateRangePickerModal
                open={DateRangePickerModalOpen}
                selectionRange={selectionRange}

                dateRangePickerControl={dateRangePickerControl}
            ></DateRangePickerModal>
        </>
    )
}

export default withRouter(SalesAnalysisMain);
import { useState } from "react";
import CustomDateRangePicker from "../../../module/date-picker/CustomDateRangePicker";
import CommonModalComponent from "../../../module/modal/CommonModalComponent";
import CommonModalComponentV2 from "../../../module/modal/CommonModalComponentV2";
import DateRangeSelectorFieldView from "./DateRangeSelectorField.view";
import ReceiveStatusTableFieldView from "./ReceiveStatusTableField.view";
import ReleaseStatusTableFieldView from "./ReleaseStatusTableField.view";

const SearchProductReceiveAndReleaseModalComponent = (props) => {
    const [dateRangePickerModalOpen, setDateRangePickerModalOpen] = useState(false);
    const [dateRangeInfo, setDateRangeInfo] = useState({
        startDate: new Date(),
        endDate: new Date()
    });

    const [selectedDateRange, setSelectedDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    const __handle = {
        action: {
            openDateRangePickerModal: () => {
                setDateRangePickerModalOpen(true);
            },
            closeDateRangePickerModal: () => {
                setDateRangePickerModalOpen(false);
            },
            changeSelectedDate: (date) => {
                let startDate = date.selection.startDate;
                let endDate = date.selection.endDate;

                setSelectedDateRange({
                    ...selectedDateRange,
                    startDate,
                    endDate
                })
            },
            confirmSelectedDate: () => {
                let startDate = selectedDateRange.startDate;
                let endDate = selectedDateRange.endDate;

                setDateRangeInfo({
                    ...dateRangeInfo,
                    startDate,
                    endDate
                })

                props.onActionSearchProductReceiveAndRelease({startDate, endDate});
                __handle.action.closeDateRangePickerModal();
            },
            onCloseModal: () => {
                setDateRangeInfo(null);
                setSelectedDateRange(null);
                props.onActionCloseModal();
            }
        }
    }

    return (
        <>
            <CommonModalComponentV2
                open={props.modalOpen}
                title={'입출고 현황'}
                element={
                    <div style={{ padding: '20px 10px'}}>
                        <DateRangeSelectorFieldView
                            dateRangeInfo={dateRangeInfo}

                            onActionOpenDateRangePickerModal={__handle.action.openDateRangePickerModal}
                        />
                        <ReceiveStatusTableFieldView
                            optionReceiveStatus={props.optionReceiveStatus}
                        />
                        <ReleaseStatusTableFieldView
                            optionReleaseStatus={props.optionReleaseStatus}
                        />
                    </div>
                }
                maxWidth={'lg'}

                onClose={__handle.action.onCloseModal}
            />
            
            <CommonModalComponentV2
                open={dateRangePickerModalOpen}
                element={
                    <CustomDateRangePicker
                    selectedDateRange={selectedDateRange}
                    onChange={__handle.action.changeSelectedDate}
                    onConfirm={__handle.action.confirmSelectedDate}
                />
                }
                maxWidth={'xs'}
                fullWidth={false}

                onClose={__handle.action.closeDateRangePickerModal}
            >
            </CommonModalComponentV2>
        </>
    )
}

export default SearchProductReceiveAndReleaseModalComponent;
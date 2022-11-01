import { useState } from "react";
import CustomDateRangePicker from "../../../module/date-picker/CustomDateRangePicker";
import CommonModalComponentV2 from "../../../module/modal/CommonModalComponentV2";
import useProductReceiveAndReleaseHook from "../../hooks/useProductReceiveAndReleaseHook";
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

    const {
        optionReceiveStatus,
        optionReleaseStatus,
        modifyingId,

        reqSearchProductReceiveAndRelease,
        onChangeReceiveValueOfName,
        onChangeReleaseValueOfName,
        onActionSetModifyingId,
        onSubmitModifyReceiveMemo,
        onSubmitModifyReleaseMemo
    } = useProductReceiveAndReleaseHook({ optionIds: props.checkedOptionIdList, selectedDateRange});

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

                reqSearchProductReceiveAndRelease();
                __handle.action.closeDateRangePickerModal();
            },
            onCloseModal: () => {
                setDateRangeInfo(null);
                setSelectedDateRange(null);
                props.onActionCloseModal();
            },
            setModifyingId: (id) => {
                onActionSetModifyingId(id);
            },
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
                            optionReceiveStatus={optionReceiveStatus}
                            modifyingId={modifyingId}

                            onChangeInputValue={onChangeReceiveValueOfName}
                            onActionSetModifyingId={__handle.action.setModifyingId}
                            onSubmitModifyMemo={onSubmitModifyReceiveMemo}
                        />
                        <ReleaseStatusTableFieldView
                            optionReleaseStatus={optionReleaseStatus}
                            modifyingId={modifyingId}

                            onChangeInputValue={onChangeReleaseValueOfName}
                            onActionSetModifyingId={__handle.action.setModifyingId}
                            onSubmitModifyMemo={onSubmitModifyReleaseMemo}
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
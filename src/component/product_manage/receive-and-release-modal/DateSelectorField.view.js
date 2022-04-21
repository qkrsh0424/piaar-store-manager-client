import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';

import { dateToYYMMDD } from "../../../utils/dateFormatUtils";
import { DateSelectorFieldWrapper } from "./ReceiveAndReleaseModal.styled";

export default function DateSelectorFieldView(props) {
    return (
        <DateSelectorFieldWrapper>
            <div className="inline-box">
                <button type="button" className="date-selector-box" onClick={() => props.onActionOpenDatePickerModal()}>
                    <EventAvailableTwoToneIcon fontSize="small" color="action" />
                    {dateToYYMMDD(props.dateRangeInfo?.startDate)} ~ {dateToYYMMDD(props.dateRangeInfo?.endDate)}
                </button>
            </div>
        </DateSelectorFieldWrapper>
    )
}
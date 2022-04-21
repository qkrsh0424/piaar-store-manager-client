import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';

import { dateToYYMMDD } from "../../../utils/dateFormatUtils";
import { DateSelectorFieldWrapper } from "./Operator.styled";

export default function DateSelectorFieldView(props) {
    return (
        <DateSelectorFieldWrapper>
            <div className="inline-box">
                <button type="button" className="date-selector-box" onClick={() => props.onActionOpenDatePickerModal()}>
                    <EventAvailableTwoToneIcon fontSize="small" color="action" />
                    {dateToYYMMDD(props.dateRangeInfo?.startDate)} ~ {dateToYYMMDD(props.dateRangeInfo?.endDate)}
                </button>
            </div>
            <div className="date-control-box">
                <button type="button" className="date-range-btn" onClick={() => props.onActionSelectDataRange(0, 0, -2)}>3일</button>
                <button type="button" className="date-range-btn" onClick={() => props.onActionSelectDataRange(0, 0, -6)}>1주</button>
                <button type="button" className="date-range-btn" onClick={() => props.onActionSelectDataRange(0, 0, -13)}>2주</button>
                <button type="button" className="date-range-btn" onClick={() => props.onActionSelectDataRange(0, -1, 0)}>한달</button>
            </div>
        </DateSelectorFieldWrapper>
    )
}
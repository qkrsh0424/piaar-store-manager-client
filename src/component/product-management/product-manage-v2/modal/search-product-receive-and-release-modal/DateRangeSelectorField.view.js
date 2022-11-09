import { dateToYYYYMMDD } from "../../../../../utils/dateFormatUtils";
import { DateRangeSelectorFieldWrapper } from "./SearchProductReceiveAndReleaseModal.styled";

export default function DateRangeSelectorFieldView(props) {
    return (
        <DateRangeSelectorFieldWrapper>
            <button
                className='button-el'
                onClick={() => props.onActionOpenDateRangePickerModal()}
            >
                {dateToYYYYMMDD(props.dateRangeInfo?.startDate)} ~ {dateToYYYYMMDD(props.dateRangeInfo?.endDate)}
            </button>
        </DateRangeSelectorFieldWrapper>
    )
}
import { dateToYYMMDD } from "../../../utils/dateFormatUtils";
import { DateSelectorFieldWrapper } from "./SearchOperator.styled";

export default function DateSelectorFieldView(props) {
    return (
        <DateSelectorFieldWrapper>
            <div>
                <button type="button" className="date-selector-box" onClick={() => props.onActionOpenDatePickerModal()}>
                    {dateToYYMMDD(props.dateRange?.startDate)} ~ {dateToYYMMDD(props.dateRange?.endDate)}
                </button>
            </div>
            <div className="date-control-box">
                <div className="flex-box">
                    <button type="button" className="date-range-btn" onClick={() => props.onActionSelectDataRange(0, 0, -6)}>1주</button>
                    <button type="button" className="date-range-btn" onClick={() => props.onActionSelectDataRange(0, 0, -13)}>2주</button>
                    <button type="button" className="date-range-btn" onClick={() => props.onActionSelectDataRange(0, -1, 0)}>한달</button>
                </div>
                <div className="flex-box">
                    <button type="button" className={`analysis-range-btn ${props.analysisDateRange === 'date' ? 'selected' : ''}`} onClick={() => props.onActionChangeAnalysisDateRange('date')}>일</button>
                    <button type="button" className={`analysis-range-btn ${props.analysisDateRange === 'week' ? 'selected' : ''}`} onClick={() => props.onActionChangeAnalysisDateRange('week')}>주</button>
                    <button type="button" className={`analysis-range-btn ${props.analysisDateRange === 'month' ? 'selected' : ''}`} onClick={() => props.onActionChangeAnalysisDateRange('month')}>월</button>
                </div>
            </div>
        </DateSelectorFieldWrapper>
    )
}
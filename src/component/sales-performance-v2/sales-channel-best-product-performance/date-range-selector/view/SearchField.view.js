import { SearchFieldWrapper } from "../DateRangeSelector.styled";

export default function SearchFieldView(props) {
    return (
        <SearchFieldWrapper>
            <div>
                <select
                    className='select-item'
                    onChange={(e) => props.onChangePeriodType(e)}
                    value={props.periodType}
                >
                    <option value='registration'>주문 등록일</option>
                    <option value='channelOrderDate'>주문 일시</option>
                </select>
            </div>
        </SearchFieldWrapper>
    )
}
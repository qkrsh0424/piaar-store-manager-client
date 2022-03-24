import { ConditionSearchFieldWrapper } from "./Operator.styled";

export default function ConditionSearchFieldView(props) {
    return (
        <ConditionSearchFieldWrapper>
            <div className="grid-box">
                <select className="selector-style">
                    <option value="total">검색</option>
                    <option value="salesProdManagementName">상품명</option>
                    <option value="salesOptionManagementName">옵션명</option>
                    <option value="salesOptionCode">옵션코드</option>
                </select>

                <div>
                    <input className="search-input"
                        onChange={(e) => props.storeDropdownControl().onChangeSearchInputValue(e)}
                        name="searchValue"
                        value={props.searchInputValueState?.searchValue || ''}
                        disabled={props.searchInputValueState?.searchColumn === 'total' ? true : false}
                        required />
                </div>
                
                <div>
                    <button type="button" className="search-value-reset-btn">초기화</button>
                </div>
            </div>
        </ConditionSearchFieldWrapper>
    )
}
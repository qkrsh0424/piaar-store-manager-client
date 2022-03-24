import { ConditionSelectorFieldWrapper } from "./Operator.styled";

export default function ConditionSelectorFieldView(props) {
    return (
        <ConditionSelectorFieldWrapper>
            <div className="label-item">랭킹 기준 설정</div>
            <div className="grid-box">
                <select className="selector-style" onChange={(e) => props.onChangeStoreSelector(e)}>
                    <option value='total'>스토어 전체</option>
                    <option value='naver'>네이버</option>
                    <option value='coupang'>쿠팡</option>
                </select>

                <select className="selector-style" onChange={(e) => props.onChangeCategorySelector(e)}>
                    <option value='total'>카테고리 전체</option>
                </select>

                <select className="selector-style" onChange={(e) => props.onChangeCriterionSelector(e)}>
                    <option value='unit'>수량</option>
                    <option value='revenue'>매출</option>
                </select>
            </div>
        </ConditionSelectorFieldWrapper>
    )
}
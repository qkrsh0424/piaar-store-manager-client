import { ConditionSelectorFieldWrapper } from "./Operator.styled";

export default function ConditionSelectorFieldView(props) {
    return (
        <ConditionSelectorFieldWrapper>
            <div className="title-item">
                <div>재고자산 순위</div>
                <div className="info-text">* 최근 7일 동안 출고 기록이 없는 상품은 빨간색으로 표시됩니다.</div>
            </div>
            <div className="grid-box">
                <select className="selector-style" onChange={(e) => props.onChangeCategorySelector(e)} value={props.selctedCategoryCid || 0}>
                    <option value='0'>카테고리 전체</option>
                    {props.productCategoryList?.map((r, idx) => {
                        return (
                            <option key={'analysis-product-cateogry-idx' + idx} name='categoryName' value={r.cid}>{r.name}</option>
                        )
                    })}
                </select>
            </div>
        </ConditionSelectorFieldWrapper>
    )
}
import { RevenueOperatorFieldViewWrapper } from "./SalesPerformanceGraph.styled";

export default function RevenueOperatorFieldView(props) {
    return (
        <RevenueOperatorFieldViewWrapper>
            <div>
                <select
                    className='select-item'
                    value={props.searchItem ?? 'total'}
                    onChange={props.onChangeRevenueDropDownItem}
                >
                    <option value='total'>전체</option>
                    <option value='salesChannel'>판매스토어 별</option>
                    <option value='category'>카테고리 별</option>
                    <option value='product'>상품 별</option>
                </select>
            </div>
            <div className='checkbox-group'>
                <div>
                    <input
                        type='checkbox'
                        className='checkbox-input'
                        checked={props.hideSalesGraph}
                        name='sales'
                        onChange={props.onActionCheckOrderItem}
                    />
                    <span>판매 데이터 숨기기</span>
                </div>
            </div>
        </RevenueOperatorFieldViewWrapper>
    )
}

import { RevenueOperatorFieldViewWrapper } from "./SalesRevenueGraph.styled";

export default function RevenueOperatorFieldView(props) {
    return (
        <RevenueOperatorFieldViewWrapper>
            <div className='select-group'>
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
        </RevenueOperatorFieldViewWrapper>
    )
}

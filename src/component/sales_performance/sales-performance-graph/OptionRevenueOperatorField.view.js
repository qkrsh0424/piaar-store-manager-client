import { RevenueOperatorFieldViewWrapper } from "./SalesPerformanceGraph.styled";

export default function OptionRevenueOperatorFieldView(props) {
    return (
        <RevenueOperatorFieldViewWrapper>
            <div className='flex-box'>
                <div>
                    <select
                        className='select-item'
                        name='category'
                        value={props.productSearchItem.category ?? 'total'}
                        onChange={props.onChangeOptionRevenueDropDownItem}
                    >
                        <option value='total'>카테고리 검색</option>
                        {props.categoryList?.map((r, idx) => {
                            return (
                                <option key={'category-list-idx' + idx} value={r.cid}>{r.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <select
                        className='select-item'
                        name='product'
                        value={props.productSearchItem.product ?? 'total'}
                        onChange={props.onChangeOptionRevenueDropDownItem}
                    >
                        <option value='total'>상품 검색</option>
                        {props.productViewList?.map((r, idx) => {
                            return (
                                <option key={'product-list-idx' + idx} value={r.cid}>{r.defaultName}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </RevenueOperatorFieldViewWrapper>
    )
}

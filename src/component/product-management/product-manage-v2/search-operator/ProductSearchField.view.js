import { ProductSearchWrapper } from "./SearchOperator.styled";

export default function ProductSearchFieldView(props) {
    return (
        <ProductSearchWrapper>
            <div className='label-item'>상품</div>
            <div>
                <select
                    className='select-item'
                    value={props.productSearchHeaderName || ''}
                    onChange={props.onChangeProductSearchHeader}
                >
                    <option value=''>전체</option>
                    {props.productSearchHeader?.map(r => {
                        return (
                            <option key={'product_' + r.matchedHeaderName} value={r.matchedHeaderName}>{r.headerName}</option>
                        );
                    })}
                </select>

                {props.productSearchHeaderName &&
                    <input
                        type='text'
                        className='input-item'
                        value={props.productSearchQuery || ''}
                        onChange={props.onChangeProductSearchQuery}
                        placeholder='입력해주세요.'
                        autoFocus
                    ></input>
                }
            </div>
        </ProductSearchWrapper>
    )
}
import { OptionSearchWrapper } from "./SearchOperator.styled";

export default function OptionSearchFieldView(props) {
    return (
        <OptionSearchWrapper>
            <div className='label-item'>옵션</div>
            <div>
                <select
                    className='select-item'
                    value={props.optionSearchHeaderName || ''}
                    onChange={props.onChangeOptionSearchHeader}
                >
                    <option value=''>전체</option>
                    {props.optionSearchHeader?.map(r => {
                        return (
                            <option key={'product_' + r.matchedHeaderName} value={r.matchedHeaderName}>{r.headerName}</option>
                        );
                    })}
                </select>

                {props.optionSearchHeaderName &&
                    <input
                        type='text'
                        className='input-item'
                        value={props.optionSearchQuery || ''}
                        onChange={props.onChangeOptionSearchQuery}
                        placeholder='입력해주세요.'
                    ></input>
                }
            </div>
        </OptionSearchWrapper>
    )
}
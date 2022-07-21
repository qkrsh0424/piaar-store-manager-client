import { DetailSearchFieldWrapper } from "./SelectedGraphItemModal.styled";


export default function DetailSearchFieldView(props) {
    return (
        <DetailSearchFieldWrapper>
            <div className='label-item'>상세조건</div>
            <div className='flex-box'>

                <select
                    className='select-item'
                    value={props.searchColumnName || ''}
                    onChange={props.onChangeSearchColumnNameValue}
                >
                    <option value=''>전체</option>
                    {props.headerDetails?.map(r => {
                        if (r.allowedSearch) {
                            return (
                                <option key={r.matchedColumnName} value={r.matchedColumnName}>{r.originCellName}</option>
                            );
                        }
                        return null;
                    })}
                </select>
                {props.searchColumnName &&
                    <input
                        type='text'
                        className='input-item'
                        value={props.searchQuery || ''}
                        onChange={props.onChangeSearchQueryValue}
                        placeholder='입력해주세요.'
                    ></input>
                }
            </div>
        </DetailSearchFieldWrapper>
    );
}
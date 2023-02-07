import { SearchFieldWrapper } from "../Operator.styled";

export default function SearchFieldView(props) {
    return (
        <SearchFieldWrapper>
            <div className='button-box'>
                <div>
                    <button
                        type='button'
                        className={`button-el ${props.pageOrderByColumn === 'payAmount' ? 'checked' : ''}`}
                        onClick={(e) => props.onActionChangeOrderByColumn(e)}
                        value='payAmount'
                    >
                        매출 순
                    </button>
                </div>
                <div>
                    <button
                        type='button'
                        className={`button-el ${props.pageOrderByColumn === 'unit' ? 'checked' : ''}`}
                        onClick={(e) => props.onActionChangeOrderByColumn(e)}
                        value='unit'
                    >
                        수량 순
                    </button>
                </div>
            </div>
        </SearchFieldWrapper>
    )
}
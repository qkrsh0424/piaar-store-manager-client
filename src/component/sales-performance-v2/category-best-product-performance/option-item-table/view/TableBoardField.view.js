import { TableBoardFieldWrapper } from "../OptionItemTable.styled";

export default function TableBoardFieldView(props) {
    return (
        <TableBoardFieldWrapper>
            <div>
                <div className='table-title'>[옵션 성과]</div>
                <div className='table-info-text'>
                    <span>상품 매출 / 수량 순위에서 조회된 상품의 모든 옵션판매 데이터를 표시합니다. </span>
                </div>
            </div>
            <div className='flex-item convert-btn-box' style={{ gap: '5px' }}>
                <div>
                    <button
                        className={`button-el ${props.viewType === 'table' ? 'checked': ''}`}
                        onClick={(e) => {props.onChangeViewType(e)}}
                        value='table'
                    >
                        표
                    </button>
                </div>
                <div>
                    <button
                        className={`button-el ${props.viewType === 'graph' ? 'checked': ''}`}
                        onClick={(e) => {props.onChangeViewType(e)}}
                        value='graph'
                    >
                        그래프
                    </button>
                </div>
            </div>
        </TableBoardFieldWrapper>
    )
}
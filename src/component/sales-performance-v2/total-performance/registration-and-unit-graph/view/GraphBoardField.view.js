import { GraphBoardFieldWrapper } from "../RegistrationAndUnitGraph.styled";

export default function GraphBoardFieldView(props) {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>총 판매건 & 수량</div>
                <div className='graph-info-text'>
                    <span>조회된 기간의 총 판매건과 판매수량이 표시되며, </span>
                    <span>일/주/월 별로 데이터를 조회할 수 있습니다. </span>
                </div>
            </div>
            <div className='dimension-button-box'>
                <div>
                    <button
                        className={`button-el ${props.searchDimension === 'date' ? 'checked' : ''}`}
                        onClick={(e) => props.onActionChangeSearchDimension(e)}
                        value='date'
                    >
                        일
                    </button>
                </div>
                <div>
                    <button
                        className={`button-el ${props.searchDimension === 'week' ? 'checked' : ''}`}
                        onClick={(e) => props.onActionChangeSearchDimension(e)}
                        value='week'
                    >
                        주
                    </button>
                </div>
                <div>
                    <button
                        className={`button-el ${props.searchDimension === 'month' ? 'checked' : ''}`}
                        onClick={(e) => props.onActionChangeSearchDimension(e)}
                        value='month'
                    >
                        월
                    </button>
                </div>
            </div>
        </GraphBoardFieldWrapper>
    )
}
import { GraphBoardFieldWrapper } from "../PayAmountDayOfWeekGraph.styled";

export default function GraphBoardFieldView(props) {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>요일별 평균 매출액</div>
                <div className='graph-info-text'>
                    <span>상품별 요일 평균 판매액이 표시됩니다. </span>
                </div>
            </div>
        </GraphBoardFieldWrapper>
    )
}
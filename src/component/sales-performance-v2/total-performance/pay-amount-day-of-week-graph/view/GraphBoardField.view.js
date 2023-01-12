import { GraphBoardFieldWrapper } from "../PayAmountDayOfWeekGraph.styled";

export default function GraphBoardFieldView(props) {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>요일별 매출액</div>
                <div className='graph-info-text'>
                    <span>조회된 기간의 요일별 평균 판매액과 주차별 판매액이 표시됩니다. </span>
                </div>
            </div>
        </GraphBoardFieldWrapper>
    )
}
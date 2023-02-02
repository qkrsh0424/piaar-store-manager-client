import { GraphBoardFieldWrapper } from "../PayAmountGraph.styled";

export default function GraphBoardFieldView(props) {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>상품 매출액</div>
                <div className='graph-info-text'>
                    <span>선택된 상품의 판매액이 표시되며, </span>
                    <span>일별 조회 시 7일간 평균 차트를 확인할 수 있습니다. </span>
                </div>
            </div>
        </GraphBoardFieldWrapper>
    )
}
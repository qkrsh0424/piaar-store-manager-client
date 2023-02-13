import { GraphBoardFieldWrapper } from "../PayAmountGraph.styled";

export default function GraphBoardFieldView(props) {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>상품별 매출액</div>
                <div className='graph-info-text'>
                    <span>선택된 상품들의 상품별 총 판매액이 표시됩니다. </span>
                </div>
            </div>
        </GraphBoardFieldWrapper>
    )
}
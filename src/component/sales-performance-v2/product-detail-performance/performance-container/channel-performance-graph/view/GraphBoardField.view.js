import { GraphBoardFieldWrapper } from "../ChannelPerformanceGraph.styled";

export default function GraphBoardFieldView(props) {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>스토어별 상품 매출액</div>
                <div className='graph-info-text'>
                    <span>선택된 상품의 판매 스토어별 판매액이 표시됩니다.</span>
                </div>
            </div>
        </GraphBoardFieldWrapper>
    )
}
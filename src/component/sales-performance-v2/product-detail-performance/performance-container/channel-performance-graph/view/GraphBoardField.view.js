import { GraphBoardFieldWrapper } from "../ChannelPerformanceGraph.styled";

export default function GraphBoardFieldView(props) {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>스토어별 총 매출액</div>
                <div className='graph-info-text'>
                    <span>스토어별 총 판매액이 표시됩니다.</span>
                </div>
            </div>
        </GraphBoardFieldWrapper>
    )
}
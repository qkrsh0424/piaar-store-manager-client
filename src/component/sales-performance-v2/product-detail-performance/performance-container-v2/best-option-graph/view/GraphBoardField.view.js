import { GraphBoardFieldWrapper } from "../BestOptionGraph.styled";

export default function GraphBoardFieldView(props) {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>BEST 옵션</div>
                <div className='graph-info-text'>
                    <span>선택된 상품의 매출액, 판매수량 BEST15 옵션이 표시됩니다. </span>
                </div>
            </div>
        </GraphBoardFieldWrapper>
    )
}
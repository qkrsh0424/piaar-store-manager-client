import { GraphBoardFieldWrapper } from "../BestProductGraph.styled";

export default function GraphBoardFieldView(props) {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>[BEST 상품 매출 & 수량]</div>
                <div className='graph-info-text'>
                    <span>조회된 기간의 매출액, 판매수량 BEST15 상품이 표시됩니다. </span>
                </div>
            </div>
        </GraphBoardFieldWrapper>
    )
}
import { GraphBoardFieldWrapper } from "../BestCategoryGraph.styled";

export default function GraphBoardFieldView(props) {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>카테고리 판매 비율</div>
                <div className='graph-info-text'>
                    <span>조회된 기간 내에 판매된 상품의 카테고리별 매출액, 수량 비율을 표시합니다.</span>
                </div>
            </div>
        </GraphBoardFieldWrapper>
    )
}
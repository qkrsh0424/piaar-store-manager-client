import { GraphBoardFieldWrapper } from "../BestProductGraph.styled";

export default function GraphBoardFieldView(props) {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>[상품 매출 / 수량 순위]</div>
                <div className='graph-info-text'>
                    <span>상품의 매출액, 판매수량 순위가 표시됩니다. </span>
                    <span>매출, 수량 순으로 정렬해 판매 순위를 확인할 수 있습니다.</span>
                </div>
            </div>
        </GraphBoardFieldWrapper>
    )
}
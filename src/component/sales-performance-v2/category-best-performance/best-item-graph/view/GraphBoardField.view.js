import { GraphBoardFieldWrapper } from "../BestItemGraph.styled";

export default function GraphBoardFieldView(props) {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>[ {props.categoryName} ] 판매 BEST</div>
                <div className='graph-info-text'>
                    <span>해당 카테고리의 판매 매출액, 판매수량 BEST10 상품이 표시됩니다. </span>
                </div>
            </div>
        </GraphBoardFieldWrapper>
    )
}
import { GraphBoardFieldWrapper } from "../OptionItemTable.styled";

export default function GraphBoardFieldView(props) {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>[BEST 옵션 매출 & 수량]</div>
                <div className='graph-info-text'>
                    <span>상품 매출 & 수량 그래프에 표시되는 상품에 포함된 모든 옵션의 매출 & 수량이 표시됩니다. </span>
                </div>
            </div>
        </GraphBoardFieldWrapper>
    )
}
import { GraphBoardFieldWrapper } from "../RegistrationAndUnitGraph.styled";

export default function GraphBoardFieldView(props) {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>상품별 판매건 & 수량</div>
                <div className='graph-info-text'>
                    <span>선택된 스토어의 상품별 총 판매건과 판매수량이 표시됩니다. </span>
                </div>
            </div>
        </GraphBoardFieldWrapper>
    )
}
import { GraphBoardFieldWrapper } from "../RegistrationAndUnitGraph.styled";

export default function GraphBoardFieldView(props) {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>총 판매건 & 수량</div>
                <div className='graph-info-text'>
                    <span>조회된 기간의 총 판매건과 판매수량이 표시됩니다.</span>
                </div>
            </div>
        </GraphBoardFieldWrapper>
    )
}
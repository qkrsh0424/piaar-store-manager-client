import { GraphBoardFieldWrapper } from "../RegistrationAndUnitGraph.styled";

export default function GraphBoardFieldView(props) {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>판매스토어별 판매건 & 수량</div>
                <div className='graph-info-text'>
                    <span>선택된 스토어의 총 판매건과 판매수량이 표시되며, </span>
                    <span>일별 조회 시 7일간 평균 차트를 확인할 수 있습니다. </span>
                </div>
            </div>
        </GraphBoardFieldWrapper>
    )
}
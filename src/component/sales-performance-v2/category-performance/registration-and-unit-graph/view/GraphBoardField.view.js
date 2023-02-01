import Ripple from "../../../../module/button/Ripple";
import { GraphBoardFieldWrapper } from "../RegistrationAndUnitGraph.styled";

export default function GraphBoardFieldView(props) {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>카테고리별 판매건 & 수량</div>
                <div className='graph-info-text'>
                    <span>선택된 카테고리의 총 판매건과 판매수량이 표시되며, </span>
                    <span>일별 조회 시 7일간 평균 차트를 확인할 수 있습니다. </span>
                </div>
            </div>
            <div>
                <button
                    className='button-el'
                    onClick={() => props.onActionOpenDetailGraphSelectorModal()}
                >
                    그래프 분석
                    <Ripple color={'#e0e0e0'} duration={1000} />
                </button>
            </div>
        </GraphBoardFieldWrapper>
    )
}
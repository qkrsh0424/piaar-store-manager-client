import Ripple from "../../../../module/button/Ripple";
import { GraphBoardFieldWrapper } from "../PayAmountGraph.styled";

export default function GraphBoardFieldView(props) {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>판매스토어별 매출액</div>
                <div className='graph-info-text'>
                    <span>선택된 스토어의 총 판매액이 표시되며, </span>
                    <span>일별 조회 시 7일간 평균 차트를 확인할 수 있습니다. </span>
                </div>
            </div>
            <div>
                <button
                    className='button-el'
                    onClick={() => props.onActionOpenDetailGraphSelectorModal()}
                >
                    <img src='/assets/icon/graph_search_default_000000.svg' width={32}></img>
                    <Ripple color={'#e0e0e0'} duration={1000} />
                </button>
            </div>
        </GraphBoardFieldWrapper>
    )
}
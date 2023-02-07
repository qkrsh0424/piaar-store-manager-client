import Ripple from "../../../../module/button/Ripple";
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
            <div className='flex-item search-btn-box'>
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
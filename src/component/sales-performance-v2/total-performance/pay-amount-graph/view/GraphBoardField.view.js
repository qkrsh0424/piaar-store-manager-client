import { GraphBoardFieldWrapper } from "../PayAmountGraph.styled";

export default function GraphBoardFieldView () {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>총 매출액</div>
                <div className='graph-info'>총 매출액 그래프입니다.</div>
            </div>
            <div className='dimension-button-box'>
                <div>
                    <button
                        className='button-el'
                    >
                        일
                    </button>
                </div>
                <div>
                    <button
                        className='button-el'
                    >
                        주
                    </button>
                </div>
                <div>
                    <button
                        className='button-el'
                    >
                        월
                    </button>
                </div>
            </div>
        </GraphBoardFieldWrapper>
    )
}
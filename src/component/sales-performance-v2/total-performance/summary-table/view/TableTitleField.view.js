import { GraphBoardFieldWrapper } from "../SummaryTable.styled";

export default function TableTitleFieldView(props) {
    return (
        <GraphBoardFieldWrapper>
            <div>
                <div className='graph-title'>매출BEST</div>
                <div className='graph-info-text'>
                    <span>조회된 기간의 판매 데이터를 분석합니다. </span>
                    <span>판매 매출액 기준으로 정렬됩니다. </span>
                </div>
            </div>
        </GraphBoardFieldWrapper>
    )
}
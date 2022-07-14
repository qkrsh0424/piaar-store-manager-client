import { GraphAnalysisResultFieldWrapper } from "./SalesPerformanceGraph.styled";

const RevenueAnalysisFieldView = (props) => {
    return (
        <GraphAnalysisResultFieldWrapper>
            {props.searchItem === 'total' &&
                <div className='title-text'>[ 기간별 판매 매출액 ]</div>
            }
            {props.searchItem === 'salesChannel' &&
                <div className='title-text'>[ 스토어별 판매 매출액 ]</div>
            }
            {props.searchItem === 'category' &&
                <div className='title-text'>[ 카테고리별 판매 매출액 ]</div>
            }
            <div className='analysis-group'>
                {props.revenueAnalysisResult?.map((r, idx) => {
                    return (
                        <div key={'revenue-analysis-idx' + idx} className='analysis-value'>
                            <span className='value-info'>
                                <i className='icon-dot' style={{ backgroundColor: `${r.color}` }}></i>
                                {r.label}
                            </span>
                            <span>{r.value?.toLocaleString()} 원</span>
                        </div>
                    )
                })}
            </div>
        </GraphAnalysisResultFieldWrapper>
    )
}

export default RevenueAnalysisFieldView;
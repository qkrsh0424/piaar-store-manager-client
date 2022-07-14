import { GraphAnalysisResultFieldWrapper } from "./SalesPerformanceGraph.styled";

const OrderAnalysisFieldView = (props) => {
    return (
        <GraphAnalysisResultFieldWrapper>
            <div className='analysis-group'>
                <div className='title-text'>[ 기간별 총 주문건 & 수량 ]</div>
                <div className='analysis-group'>
                    {props.orderAnalysisResult?.map((r, idx) => {
                        return (
                            <div key={'order-analysis-idx' + idx} className='analysis-value'>
                                <span className='value-info'>
                                <i className='icon-dot' style={{ backgroundColor: `${r.color}` }}></i>
                                    {r.label} : 
                                </span>
                                <span>{r.value} 개</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </GraphAnalysisResultFieldWrapper>
    )
}

export default OrderAnalysisFieldView;
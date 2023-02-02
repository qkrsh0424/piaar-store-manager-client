import { toPriceUnitFormat } from "../../../../../../utils/numberFormatUtils";
import { GraphSummaryFieldWrapper } from "../ChannelPerformanceGraph.styled";

export default function GraphSummaryFieldView (props) {
    return (
        <GraphSummaryFieldWrapper>
            <div className='title'>[스토어별 총 매출액]</div>
            <div className='summary-box'>
                <ul>
                    {props.summaryData?.map((r, idx) => {
                        return (
                            <li key={'graph-summary' + idx} className='data-box'>
                                <div style={{ wordBreak: 'break-all' }}>
                                    <i className='icon-dot' style={{ backgroundColor: `${r.color}` }}></i>
                                    <span> {r.label} </span>
                                </div>
                                <div style={{ fontWeight: 700, minWidth: '80px', textAlign: 'right' }}>{toPriceUnitFormat(r.value)}</div>
                            </li>
                        )
                    })}
                    {!(props.summaryData && props.summaryData.length > 0) &&
                        <li>
                            <span>데이터가 존재하지 않습니다.</span>
                        </li>
                    }
                </ul>
            </div>
        </GraphSummaryFieldWrapper>
    )
}
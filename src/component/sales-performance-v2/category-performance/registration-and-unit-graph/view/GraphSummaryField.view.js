import { toPriceUnitFormat } from "../../../../../utils/numberFormatUtils";
import { GraphSummaryFieldWrapper } from "../RegistrationAndUnitGraph.styled";

export default function GraphSummaryFieldView (props) {
    return (
        <GraphSummaryFieldWrapper>
            <div className='title'>{props.title}</div>
            <div className='summary-box'>
                <ul>
                    {props.summaryData?.map((r, idx) => {
                        return (
                            <li key={'graph-summary' + idx} className='data-box'>
                                <div style={{ wordBreak: 'break-all' }}>
                                    <i className='icon-dot' style={{ backgroundColor: `${r.color}` }}></i>
                                    <span> {r.label} </span>
                                </div>
                                <div style={{ fontWeight: 700, minWidth: '80px', textAlign: 'right' }}>{(r.value || 0).toLocaleString()} 개</div>
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
import { toPriceUnitFormat } from "../../../../utils/numberFormatUtils";
import { ChannelPerformanceFieldWrapper } from "../Dashboard.styled";

export default function ChannelPerformanceFieldView ({ channelPerformanceData }) {
    return (
        <ChannelPerformanceFieldWrapper>
            {/* 어제 데이터 */}
            <DataBoxField
                performance={channelPerformanceData.yesterday}
                totalPayAmount={channelPerformanceData.yesterdaySalesPayAmount}
            />

            {/* 오늘 데이터 */}
            <DataBoxField
                performance={channelPerformanceData.today}
                totalPayAmount={channelPerformanceData.todaySalesPayAmount}
            />
        </ChannelPerformanceFieldWrapper>
    )
}

function DataBoxField({ performance, totalPayAmount }) {
    return (
        <div className='vertical-box'>
            <div className='vertical-group'>
                <div className='data-box'>
                    <div className='data-title'>스토어 판매 매출</div>
                    <div className='data-content'>
                        {performance?.map((r, idx) => {
                            return (
                                <div
                                    key={'dashboard-channel-idx' + idx}
                                    className='data-group'
                                >
                                    <div style={{ width: '110px' }}>
                                        {idx + 1}. {r.salesChannel}
                                    </div>
                                    <div>
                                        <span style={{ width: '70px', display: 'inline-block' }}>{((r.salesPayAmount / totalPayAmount) * 100).toFixed(1)}% </span>
                                        <span style={{ fontSize: '12px', fontWeight: '400' }}>({toPriceUnitFormat(r.salesPayAmount)})</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
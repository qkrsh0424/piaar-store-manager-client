import { dateToYYYYMMDD, setSubtractedDate } from "../../../../utils/dateFormatUtils";
import { toPriceUnitFormat } from "../../../../utils/numberFormatUtils";
import { ChannelPerformanceFieldWrapper, ChannelDataBox } from "../Dashboard.styled";

export default function ChannelPerformanceFieldView ({ channelPerformanceData }) {
    return (
        <ChannelPerformanceFieldWrapper>
            <DataBoxField
                datetime='yesterday'
                performance={channelPerformanceData.yesterdayData.channelPayAmount}
                totalPayAmount={channelPerformanceData.yesterdayData.totalPayAmount}
            />
            <DataBoxField
                datetime='today'
                performance={channelPerformanceData.todayData.channelPayAmount}
                totalPayAmount={channelPerformanceData.todayData.totalPayAmount}
            />
        </ChannelPerformanceFieldWrapper>
    )
}

const TODAY = new Date();
const YESTERDAY = setSubtractedDate(TODAY, 0, 0, -1);

function DataBoxField({ datetime, performance, totalPayAmount }) {
    return (
        <div className='vertical-box'>
            <div className='vertical-group'>
                <ChannelDataBox datetime={datetime}>
                    <div className='data-title'>
                        <span>스토어 판매 매출</span>
                    </div>
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
                                        <span style={{ width: '70px', display: 'inline-block' }}>{(totalPayAmount !== 0 ? (r.salesPayAmount / totalPayAmount) * 100 : 0).toFixed(1)}% </span>
                                        <span style={{ fontSize: '12px', fontWeight: '400' }}>({toPriceUnitFormat(r.salesPayAmount)})</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </ChannelDataBox>
            </div>
        </div>
    )
}
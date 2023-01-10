import { toPriceUnitFormat } from "../../../../utils/numberFormatUtils";
import { TrendInfoFieldWrapper, DashboardFieldWrapper, DataBox } from "../Dashboard.styled";

function TrendInfoField ({ dayInfo, trendValue}) {
    return (
        <TrendInfoFieldWrapper>
            <div className='trend-info-box'>
                <div>{dayInfo}</div>
                <div style={{ width: '80px' }}>
                    {trendValue >= 0 ?
                        <div className="trend-info" style={{ color: '#7a7bda' }}>
                            <img
                                src='/assets/icon/trending_up_fill_7A7BDA.svg'
                                style={{ width: '20px' }}
                                alt=""
                                loading='lazy'
                            />
                            <div>{Math.abs(trendValue)}%</div>
                        </div>
                        :
                        <div className="trend-info" style={{ color: '#e56767' }}>
                            <img
                                src='/assets/icon/trending_down_fill_E56767.svg'
                                style={{ width: '20px' }}
                                alt=""
                                loading='lazy'
                            />
                            <div>{Math.abs(trendValue)}%</div>
                        </div>
                    }
                </div>
            </div>
        </TrendInfoFieldWrapper>
    )
}

export default function DashboardFieldView({ todayData, yesterdayData }) {
    return (
        // TODO :: 여기도 함수만들어서 공통으로 뺄 수 있다
        <DashboardFieldWrapper>
            {/* YESTERDAY PERFORMANCE */}
            {yesterdayData &&
                <div className='vertical-box'>
                    <div className='vertical-group'>
                        <DataBox datetime='yesterday'>
                            <div className='data-content-group'>
                                <div className='data-title'>주문 금액</div>
                                <div className='data-content'>
                                    {toPriceUnitFormat(yesterdayData.orderPayAmount)}
                                </div>
                            </div>
                            <div className='info-box'>
                                <TrendInfoField
                                    dayInfo={`지난주 (${yesterdayData.dayNameOfAWeekAgo}) 대비`}
                                    trendValue={yesterdayData.orderPayAmountTrendByAWeekAgo}
                                />
                            </div>
                        </DataBox>
                        <DataBox datetime='yesterday'>
                            <div className='data-content-group'>
                                <div className='data-title'>판매 금액</div>
                                <div className='data-content'>
                                    {toPriceUnitFormat(yesterdayData.salesPayAmount)}
                                </div>
                            </div>
                            <div className='info-box'>
                                <TrendInfoField
                                    dayInfo={`지난주 (${yesterdayData.dayNameOfAWeekAgo}) 대비`}
                                    trendValue={yesterdayData.salesPayAmountTrendByAWeekAgo}
                                />
                            </div>
                        </DataBox>
                        <DataBox datetime='yesterday'>
                            <div className='data-content-group'>
                                <div className='data-title'>미판매 금액</div>
                                <div className='data-content'>
                                    {toPriceUnitFormat(yesterdayData.unsalesPayAmount)}
                                </div>
                            </div>
                            <div className='info-box'>
                                <TrendInfoField
                                    dayInfo={`지난주 (${yesterdayData.dayNameOfAWeekAgo}) 대비`}
                                    trendValue={yesterdayData.unsalesPayAmountTrendByAWeekAgo}
                                />
                            </div>
                        </DataBox>
                    </div>
                    
                    <div className='vertical-group'>
                        <DataBox datetime='yesterday'>
                            <div className='data-content-group'>
                                <div className='data-title'>주문 건수</div>
                                <div className='data-content'>
                                    {yesterdayData.orderRegistration} 건
                                </div>
                            </div>
                            <div className='info-box'>
                                <TrendInfoField
                                    dayInfo={`지난주 (${yesterdayData.dayNameOfAWeekAgo}) 대비`}
                                    trendValue={yesterdayData.orderRegistrationTrendByAWeekAgo}
                                />
                            </div>
                        </DataBox>
                        <DataBox datetime='yesterday'>
                            <div className='data-content-group'>
                                <div className='data-title'>판매 건수</div>
                                <div className='data-content'>
                                    {yesterdayData.salesRegistration} 건
                                </div>
                            </div>
                            <div className='info-box'>
                                <TrendInfoField
                                    dayInfo={`지난주 (${yesterdayData.dayNameOfAWeekAgo}) 대비`}
                                    trendValue={yesterdayData.salesRegistrationTrendByAWeekAgo}
                                />
                            </div>
                        </DataBox>
                        <DataBox datetime='yesterday'>
                            <div className='data-content-group'>
                                <div className='data-title'>미판매 건수</div>
                                <div className='data-content'>
                                    {yesterdayData.unsalesRegistration} 건
                                </div>
                            </div>
                            <div className='info-box'>
                                <TrendInfoField
                                    dayInfo={`지난주 (${yesterdayData.dayNameOfAWeekAgo}) 대비`}
                                    trendValue={yesterdayData.unsalesRegistrationTrendByAWeekAgo}
                                />
                            </div>
                        </DataBox>
                    </div>

                    <div className='vertical-group'>
                        <DataBox datetime='yesterday'>
                            <div className='data-content-group'>
                                <div className='data-title'>주문 수량</div>
                                <div className='data-content'>
                                    {yesterdayData.orderUnit} 개
                                </div>
                            </div>
                            <div className='info-box'>
                                <TrendInfoField
                                    dayInfo={`지난주 (${yesterdayData.dayNameOfAWeekAgo}) 대비`}
                                    trendValue={yesterdayData.orderUnitTrendByAWeekAgo}
                                />
                            </div>
                        </DataBox>
                        <DataBox datetime='yesterday'>
                            <div className='data-content-group'>
                                <div className='data-title'>판매 수량</div>
                                <div className='data-content'>
                                    {yesterdayData.salesUnit} 개
                                </div>
                            </div>
                            <div className='info-box'>
                                <TrendInfoField
                                    dayInfo={`지난주 (${yesterdayData.dayNameOfAWeekAgo}) 대비`}
                                    trendValue={yesterdayData.salesUnitTrendByAWeekAgo}
                                />
                            </div>
                        </DataBox>
                        <DataBox datetime='yesterday'>
                            <div className='data-content-group'>
                                <div className='data-title'>미판매 수량</div>
                                <div className='data-content'>
                                    {yesterdayData.unsalesUnit} 개
                                </div>
                            </div>
                            <div className='info-box'>
                                <TrendInfoField
                                    dayInfo={`지난주 (${yesterdayData.dayNameOfAWeekAgo}) 대비`}
                                    trendValue={yesterdayData.unsalesUnitTrendByAWeekAgo}
                                />
                            </div>
                        </DataBox>
                    </div>
                </div>
            }

            {/* TODAY PERFORMANCE */}
            {todayData &&
                <div className='vertical-box'>
                    <div className='vertical-group'>
                        <DataBox datetime='today'>
                            <div className='data-content-group'>
                                <div className='data-title'>주문 금액</div>
                                <div className='data-content'>
                                    {toPriceUnitFormat(todayData.orderPayAmount)}
                                </div>
                            </div>
                            <div className='info-box'>
                                <TrendInfoField
                                    dayInfo={`어제 (${todayData.dayNameOfYesterday}) 대비`}
                                    trendValue={todayData.orderPayAmountTrendByYesterday}
                                />
                                <TrendInfoField
                                    dayInfo={`지난주 (${todayData.dayNameOfAWeekAgo}) 대비`}
                                    trendValue={todayData.orderPayAmountTrendByAWeekAgo}
                                />
                            </div>
                        </DataBox>
                        <DataBox datetime='today'>
                            <div className='data-content-group'>
                                <div className='data-title'>판매 금액</div>
                                <div className='data-content'>
                                    {toPriceUnitFormat(todayData.salesPayAmount)}
                                </div>
                            </div>
                            <div className='info-box'>
                                <TrendInfoField
                                    dayInfo={`어제 (${todayData.dayNameOfYesterday}) 대비`}
                                    trendValue={todayData.salesPayAmountTrendByYesterday}
                                />
                                <TrendInfoField
                                    dayInfo={`지난주 (${todayData.dayNameOfAWeekAgo}) 대비`}
                                    trendValue={todayData.salesPayAmountTrendByAWeekAgo}
                                />
                            </div>
                        </DataBox>
                        <DataBox datetime='today'>
                            <div className='data-content-group'>
                                <div className='data-title'>미판매 금액</div>
                                <div className='data-content'>
                                    {toPriceUnitFormat(todayData.unsalesPayAmount)}
                                </div>
                            </div>
                            <div className='info-box'>
                                <TrendInfoField
                                    dayInfo={`어제 (${todayData.dayNameOfYesterday}) 대비`}
                                    trendValue={todayData.unsalesPayAmountTrendByYesterday}
                                />
                                <TrendInfoField
                                    dayInfo={`지난주 (${todayData.dayNameOfAWeekAgo}) 대비`}
                                    trendValue={todayData.unsalesPayAmountTrendByAWeekAgo}
                                />
                            </div>
                        </DataBox>
                    </div>

                    <div className='vertical-group'>
                        <DataBox datetime='today'>
                            <div className='data-content-group'>
                                <div className='data-title'>주문 건수</div>
                                <div className='data-content'>
                                    {todayData.orderRegistration} 건
                                </div>
                            </div>
                            <div className='info-box'>
                                <TrendInfoField
                                    dayInfo={`어제 (${todayData.dayNameOfYesterday}) 대비`}
                                    trendValue={todayData.orderRegistrationTrendByYesterday}
                                />
                                <TrendInfoField
                                    dayInfo={`지난주 (${todayData.dayNameOfAWeekAgo}) 대비`}
                                    trendValue={todayData.orderRegistrationTrendByAWeekAgo}
                                />
                            </div>
                        </DataBox>
                        <DataBox datetime='today'>
                            <div className='data-content-group'>
                                <div className='data-title'>판매 건수</div>
                                <div className='data-content'>
                                    {todayData.salesRegistration} 건
                                </div>
                            </div>
                            <div className='info-box'>
                                <TrendInfoField
                                    dayInfo={`어제 (${todayData.dayNameOfYesterday}) 대비`}
                                    trendValue={todayData.salesRegistrationTrendByYesterday}
                                />
                                <TrendInfoField
                                    dayInfo={`지난주 (${todayData.dayNameOfAWeekAgo}) 대비`}
                                    trendValue={todayData.salesRegistrationTrendByAWeekAgo}
                                />
                            </div>
                        </DataBox>
                        <DataBox datetime='today'>
                            <div className='data-content-group'>
                                <div className='data-title'>미판매 건수</div>
                                <div className='data-content'>
                                    {todayData.unsalesRegistration} 건
                                </div>
                            </div>
                            <div className='info-box'>
                                <TrendInfoField
                                    dayInfo={`어제 (${todayData.dayNameOfYesterday}) 대비`}
                                    trendValue={todayData.unsalesRegistrationTrendByYesterday}
                                />
                                <TrendInfoField
                                    dayInfo={`지난주 (${todayData.dayNameOfAWeekAgo}) 대비`}
                                    trendValue={todayData.unsalesRegistrationTrendByAWeekAgo}
                                />
                            </div>
                        </DataBox>
                    </div>

                    <div className='vertical-group'>
                        <DataBox datetime='today'>
                            <div className='data-content-group'>
                                <div className='data-title'>주문 수량</div>
                                <div className='data-content'>
                                    {todayData.orderUnit} 개
                                </div>
                            </div>
                            <div className='info-box'>
                                <TrendInfoField
                                    dayInfo={`어제 (${todayData.dayNameOfYesterday}) 대비`}
                                    trendValue={todayData.orderUnitTrendByYesterday}
                                />
                                <TrendInfoField
                                    dayInfo={`지난주 (${todayData.dayNameOfAWeekAgo}) 대비`}
                                    trendValue={todayData.orderUnitTrendByAWeekAgo}
                                />
                            </div>
                        </DataBox>
                        <DataBox datetime='today'>
                            <div className='data-content-group'>
                                <div className='data-title'>판매 수량</div>
                                <div className='data-content'>
                                    {todayData.salesUnit} 개
                                </div>
                            </div>
                            <div className='info-box'>
                                <TrendInfoField
                                    dayInfo={`어제 (${todayData.dayNameOfYesterday}) 대비`}
                                    trendValue={todayData.salesUnitTrendByYesterday}
                                />
                                <TrendInfoField
                                    dayInfo={`지난주 (${todayData.dayNameOfAWeekAgo}) 대비`}
                                    trendValue={todayData.salesUnitTrendByAWeekAgo}
                                />
                            </div>
                        </DataBox>
                        <DataBox datetime='today'>
                            <div className='data-content-group'>
                                <div className='data-title'>미판매 수량</div>
                                <div className='data-content'>
                                    {todayData.unsalesUnit} 개
                                </div>
                            </div>
                            <div className='info-box'>
                                <TrendInfoField
                                    dayInfo={`어제 (${todayData.dayNameOfYesterday}) 대비`}
                                    trendValue={todayData.unsalesUnitTrendByYesterday}
                                />
                                <TrendInfoField
                                    dayInfo={`지난주 (${todayData.dayNameOfAWeekAgo}) 대비`}
                                    trendValue={todayData.unsalesUnitTrendByAWeekAgo}
                                />
                            </div>
                        </DataBox>
                    </div>
                </div>
            }
        </DashboardFieldWrapper>
    )
}
import { getDayName } from "../../../../utils/dateFormatUtils";
import { getTrendPercentage, toPriceUnitFormat } from "../../../../utils/numberFormatUtils";
import { TrendInfoFieldWrapper, DashboardFieldWrapper, DataBox } from "../Dashboard.styled";

function TrendInfoField ({ dayInfo, trendValue}) {
    return (
        <TrendInfoFieldWrapper>
            <div className='trend-info-box'>
                <div>{dayInfo}</div>
                <div style={{ width: '80px' }}>
                    {trendValue >= 0 ?
                        <div className="trend-info" style={{ color: '#e56767' }}>
                            <img
                                src='/assets/icon/trending_up_fill_E56767.svg'
                                style={{ width: '20px' }}
                                alt=""
                                loading='lazy'
                            />
                            <div>{Math.abs(trendValue)}%</div>
                        </div>
                        :
                        <div className="trend-info" style={{ color: '#7a7bda' }}>
                            <img
                                src='/assets/icon/trending_down_fill_7A7BDA.svg'
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

export default function DashboardFieldView({ todayData, yesterdayData, prev7DaysData, prev8DaysData }) {
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
                                    dayInfo={`지난주 (${getDayName(prev8DaysData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(yesterdayData.orderPayAmount, prev8DaysData.orderPayAmount)}
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
                                    dayInfo={`지난주 (${getDayName(prev8DaysData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(yesterdayData.salesPayAmount, prev8DaysData.salesPayAmount)}
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
                                    dayInfo={`지난주 (${getDayName(prev8DaysData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(yesterdayData.unsalesPayAmount, prev8DaysData.unsalesPayAmount)}
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
                                    dayInfo={`지난주 (${getDayName(prev8DaysData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(yesterdayData.orderRegistration, prev8DaysData.orderRegistration)}
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
                                    dayInfo={`지난주 (${getDayName(prev8DaysData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(yesterdayData.salesRegistration, prev8DaysData.salesRegistration)}
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
                                    dayInfo={`지난주 (${getDayName(prev8DaysData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(yesterdayData.unsalesRegistration, prev8DaysData.unsalesRegistration)}
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
                                    dayInfo={`지난주 (${getDayName(prev8DaysData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(yesterdayData.orderUnit, prev8DaysData.orderUnit)}
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
                                    dayInfo={`지난주 (${getDayName(prev8DaysData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(yesterdayData.salesUnit, prev8DaysData.salesUnit)}
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
                                    dayInfo={`지난주 (${getDayName(prev8DaysData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(yesterdayData.unsalesUnit, prev8DaysData.unsalesUnit)}
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
                                    dayInfo={`어제 (${getDayName(yesterdayData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(todayData.orderPayAmount, yesterdayData.orderPayAmount)}
                                />
                                <TrendInfoField
                                    dayInfo={`지난주 (${getDayName(prev7DaysData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(todayData.orderPayAmount, prev7DaysData.orderPayAmount)}
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
                                    dayInfo={`어제 (${getDayName(yesterdayData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(todayData.salesPayAmount, yesterdayData.salesPayAmount)}
                                />
                                <TrendInfoField
                                    dayInfo={`지난주 (${getDayName(prev7DaysData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(todayData.salesPayAmount, prev7DaysData.salesPayAmount)}
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
                                    dayInfo={`어제 (${getDayName(yesterdayData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(todayData.unsalesPayAmount, yesterdayData.unsalesPayAmount)}
                                />
                                <TrendInfoField
                                    dayInfo={`지난주 (${getDayName(prev7DaysData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(todayData.unsalesPayAmount, prev7DaysData.unsalesPayAmount)}
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
                                    dayInfo={`어제 (${getDayName(yesterdayData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(todayData.orderRegistration, yesterdayData.orderRegistration)}
                                />
                                <TrendInfoField
                                    dayInfo={`지난주 (${getDayName(prev7DaysData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(todayData.orderRegistration, prev7DaysData.orderRegistration)}
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
                                    dayInfo={`어제 (${getDayName(yesterdayData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(todayData.salesRegistration, yesterdayData.salesRegistration)}
                                />
                                <TrendInfoField
                                    dayInfo={`지난주 (${getDayName(prev7DaysData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(todayData.salesRegistration, prev7DaysData.salesRegistration)}
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
                                    dayInfo={`어제 (${getDayName(yesterdayData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(todayData.unsalesRegistration, yesterdayData.unsalesRegistration)}
                                />
                                <TrendInfoField
                                    dayInfo={`지난주 (${getDayName(prev7DaysData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(todayData.unsalesRegistration, prev7DaysData.unsalesRegistration)}
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
                                    dayInfo={`어제 (${getDayName(yesterdayData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(todayData.orderUnit, yesterdayData.orderUnit)}
                                />
                                <TrendInfoField
                                    dayInfo={`지난주 (${getDayName(prev7DaysData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(todayData.orderUnit, prev7DaysData.orderUnit)}
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
                                    dayInfo={`어제 (${getDayName(yesterdayData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(todayData.salesUnit, yesterdayData.salesUnit)}
                                />
                                <TrendInfoField
                                    dayInfo={`지난주 (${getDayName(prev7DaysData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(todayData.salesUnit, prev7DaysData.salesUnit)}
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
                                    dayInfo={`어제 (${getDayName(yesterdayData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(todayData.unsalesUnit, yesterdayData.unsalesUnit)}
                                />
                                <TrendInfoField
                                    dayInfo={`지난주 (${getDayName(prev7DaysData.datetime)}) 대비`}
                                    trendValue={getTrendPercentage(todayData.unsalesUnit, prev7DaysData.unsalesUnit)}
                                />
                            </div>
                        </DataBox>
                    </div>
                </div>
            }
        </DashboardFieldWrapper>
    )
}
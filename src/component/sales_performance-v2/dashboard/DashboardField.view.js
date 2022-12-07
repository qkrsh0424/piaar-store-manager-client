import { toPriceUnitFormat } from "../../../utils/numberFormatUtils";
import { DashboardFieldWrapper } from "./Dashboard.styled";

export default function DashboardFieldView({ todayData, yesterdayData }) {
    return (
        <DashboardFieldWrapper>
            {/* YESTERDAY PERFORMANCE */}
            {yesterdayData &&
                <div className='vertical-box'>
                    <div className='vertical-box-info'>어제</div>
                    <div className='data-box'>
                        <div>
                            <span className='data-title'>주문 금액</span>
                            <div className='data-content'>
                                {toPriceUnitFormat(yesterdayData.orderPayAmount)}
                            </div>
                        </div>
                        <div className='info-box'>
                            <div className='trend-info-box'>
                                <span>지난주({yesterdayData.dayNameOfAWeekAgo}) 대비 </span>
                                <div style={{ width: '80px' }}>
                                    {yesterdayData?.orderPayAmountTrendByAWeekAgo > 0 ?
                                        <div className="trend-info" style={{ color: '#7a7bda' }}>
                                            <img
                                                src='/assets/icon/trending_up_fill_7A7BDA.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(yesterdayData.orderPayAmountTrendByAWeekAgo)}%</span>
                                        </div>
                                        :
                                        <div className="trend-info" style={{ color: '#e56767' }}>
                                            <img
                                                src='/assets/icon/trending_down_fill_E56767.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(yesterdayData.orderPayAmountTrendByAWeekAgo)}%</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='data-box'>
                        <div>
                            <span className='data-title'>판매 금액</span>
                            <div className='data-content'>
                                {toPriceUnitFormat(yesterdayData.salesPayAmount)}
                            </div>
                        </div>
                        <div className='info-box'>
                            <div className='trend-info-box'>
                                <span>지난주({yesterdayData.dayNameOfAWeekAgo}) 대비 </span>
                                <div style={{ width: '80px' }}>
                                    {yesterdayData.salesPayAmountTrendByAWeekAgo > 0 ?
                                        <div className="trend-info" style={{ color: '#7a7bda' }}>
                                            <img
                                                src='/assets/icon/trending_up_fill_7A7BDA.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(yesterdayData.salesPayAmountTrendByAWeekAgo)}%</span>
                                        </div>
                                        :
                                        <div className="trend-info" style={{ color: '#e56767' }}>
                                            <img
                                                src='/assets/icon/trending_down_fill_E56767.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(yesterdayData.salesPayAmountTrendByAWeekAgo)}%</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='data-box'>
                        <div>
                            <span className='data-title'>미판매 금액</span>
                            <div className='data-content'>
                                {toPriceUnitFormat(yesterdayData.unsalesPayAmount)}
                            </div>
                        </div>
                        <div className='info-box'>
                            <div className='trend-info-box'>
                                <span>지난주({yesterdayData.dayNameOfAWeekAgo}) 대비 </span>
                                <div style={{ width: '80px' }}>
                                    {yesterdayData.unsalesPayAmountTrendByAWeekAgo > 0 ?
                                        <div className="trend-info" style={{ color: '#7a7bda' }}>
                                            <img
                                                src='/assets/icon/trending_up_fill_7A7BDA.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(yesterdayData.unsalesPayAmountTrendByAWeekAgo)}%</span>
                                        </div>
                                        :
                                        <div className="trend-info" style={{ color: '#e56767' }}>
                                            <img
                                                src='/assets/icon/trending_down_fill_E56767.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(yesterdayData.unsalesPayAmountTrendByAWeekAgo)}%</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='data-box'>
                        <div>
                            <span className='data-title'>주문 건수</span>
                            <div className='data-content'>
                                {yesterdayData.orderRegistration} 건
                            </div>
                        </div>
                        <div className='info-box'>
                            <div className='trend-info-box'>
                                <span>지난주({yesterdayData.dayNameOfAWeekAgo}) 대비 </span>
                                <div style={{ width: '80px', marginLeft: '10px' }}>
                                    {yesterdayData.orderRegistrationTrendByAWeekAgo > 0 ?
                                        <div className="trend-info" style={{ color: '#7a7bda' }}>
                                            <img
                                                src='/assets/icon/trending_up_fill_7A7BDA.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(yesterdayData.orderRegistrationTrendByAWeekAgo)}%</span>
                                        </div>
                                        :
                                        <div className="trend-info" style={{ color: '#e56767' }}>
                                            <img
                                                src='/assets/icon/trending_down_fill_E56767.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(yesterdayData.orderRegistrationTrendByAWeekAgo)}%</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='data-box'>
                        <div>
                            <span className='data-title'>판매 건수</span>
                            <div className='data-content'>
                                {yesterdayData.salesRegistration} 건
                            </div>
                        </div>
                        <div className='info-box'>
                            <div className='trend-info-box'>
                                <span>지난주({yesterdayData.dayNameOfAWeekAgo}) 대비 </span>
                                <div style={{ width: '80px', marginLeft: '10px' }}>
                                    {yesterdayData.salesRegistrationTrendByAWeekAgo ?
                                        <div className="trend-info" style={{ color: '#7a7bda' }}>
                                            <img
                                                src='/assets/icon/trending_up_fill_7A7BDA.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(yesterdayData.salesRegistrationTrendByAWeekAgo)}%</span>
                                        </div>
                                        :
                                        <div className="trend-info" style={{ color: '#e56767' }}>
                                            <img
                                                src='/assets/icon/trending_down_fill_E56767.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(yesterdayData.salesRegistrationTrendByAWeekAgo)}%</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='data-box'>
                        <div>
                            <span className='data-title'>미판매 건수</span>
                            <div className='data-content'>
                                {yesterdayData.unsalesRegistration} 건
                            </div>
                        </div>
                        <div className='info-box'>
                            <div className='trend-info-box'>
                                <span>지난주({yesterdayData.dayNameOfAWeekAgo}) 대비 </span>
                                <div style={{ width: '80px', marginLeft: '10px' }}>
                                    {yesterdayData.unsalesRegistrationTrendByAWeekAgo ?
                                        <div className="trend-info" style={{ color: '#7a7bda' }}>
                                            <img
                                                src='/assets/icon/trending_up_fill_7A7BDA.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(yesterdayData.unsalesRegistrationTrendByAWeekAgo)}%</span>
                                        </div>
                                        :
                                        <div className="trend-info" style={{ color: '#e56767' }}>
                                            <img
                                                src='/assets/icon/trending_down_fill_E56767.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(yesterdayData.unsalesRegistrationTrendByAWeekAgo)}%</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {/* TODAY PERFORMANCE */}
            {todayData &&
                <div className='vertical-box'>
                    <div className='vertical-box-info'>오늘</div>
                    <div className='data-box'>
                        <div>
                            <span className='data-title'>주문 금액</span>
                            <div className='data-content'>
                                {toPriceUnitFormat(todayData.orderPayAmount)}
                            </div>
                        </div>
                        <div className='info-box'>
                            <div className='trend-info-box'>
                                <span>어제({todayData.dayNameOfYesterday}) 대비 </span>
                                <div style={{ width: '80px', marginLeft: '10px' }}>
                                    {todayData?.orderPayAmountTrendByYesterday > 0 ?
                                        <div className="trend-info" style={{ color: '#7a7bda' }}>
                                            <img
                                                src='/assets/icon/trending_up_fill_7A7BDA.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.orderPayAmountTrendByYesterday)}%</span>
                                        </div>
                                        :
                                        <div className="trend-info" style={{ color: '#e56767' }}>
                                            <img
                                                src='/assets/icon/trending_down_fill_E56767.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.orderPayAmountTrendByYesterday)}%</span>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='trend-info-box'>
                                <span>지난주({todayData.dayNameOfAWeekAgo}) 대비 </span>
                                <div style={{ width: '80px', marginLeft: '10px' }}>
                                    {todayData?.orderPayAmountTrendByAWeekAgo > 0 ?
                                        <div className="trend-info" style={{ color: '#7a7bda' }}>
                                            <img
                                                src='/assets/icon/trending_up_fill_7A7BDA.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.orderPayAmountTrendByAWeekAgo)}%</span>
                                        </div>
                                        :
                                        <div className="trend-info" style={{ color: '#e56767' }}>
                                            <img
                                                src='/assets/icon/trending_down_fill_E56767.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.orderPayAmountTrendByAWeekAgo)}%</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='data-box'>
                        <div>
                            <span className='data-title'>판매 금액</span>
                            <div className='data-content'>
                                {toPriceUnitFormat(todayData.salesPayAmount)}
                            </div>
                        </div>
                        <div className='info-box'>
                            <div className='trend-info-box'>
                                <span>어제({todayData.dayNameOfYesterday}) 대비 </span>
                                <div style={{ width: '80px' }}>
                                    {todayData?.salesPayAmountTrendByYesterday > 0 ?
                                        <div className="trend-info" style={{ color: '#7a7bda' }}>
                                            <img
                                                src='/assets/icon/trending_up_fill_7A7BDA.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.salesPayAmountTrendByYesterday)}%</span>
                                        </div>
                                        :
                                        <div className="trend-info" style={{ color: '#e56767' }}>
                                            <img
                                                src='/assets/icon/trending_down_fill_E56767.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.salesPayAmountTrendByYesterday)}%</span>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='trend-info-box'>
                                <span>지난주({todayData.dayNameOfAWeekAgo}) 대비 </span>
                                <div style={{ width: '80px' }}>
                                    {todayData.salesPayAmountTrendByAWeekAgo > 0 ?
                                        <div className="trend-info" style={{ color: '#7a7bda' }}>
                                            <img
                                                src='/assets/icon/trending_up_fill_7A7BDA.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.salesPayAmountTrendByAWeekAgo)}%</span>
                                        </div>
                                        :
                                        <div className="trend-info" style={{ color: '#e56767' }}>
                                            <img
                                                src='/assets/icon/trending_down_fill_E56767.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.salesPayAmountTrendByAWeekAgo)}%</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='data-box'>
                        <div>
                            <span className='data-title'>미판매 금액</span>
                            <div className='data-content'>
                                {toPriceUnitFormat(todayData.unsalesPayAmount)}
                            </div>
                        </div>
                        <div className='info-box'>
                            <div className='trend-info-box'>
                                <span>어제({todayData.dayNameOfYesterday}) 대비 </span>
                                <div style={{ width: '80px' }}>
                                    {todayData?.unsalesPayAmountTrendByYesterday > 0 ?
                                        <div className="trend-info" style={{ color: '#7a7bda' }}>
                                            <img
                                                src='/assets/icon/trending_up_fill_7A7BDA.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.unsalesPayAmountTrendByYesterday)}%</span>
                                        </div>
                                        :
                                        <div className="trend-info" style={{ color: '#e56767' }}>
                                            <img
                                                src='/assets/icon/trending_down_fill_E56767.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.unsalesPayAmountTrendByYesterday)}%</span>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='trend-info-box'>
                                <span>지난주({todayData.dayNameOfAWeekAgo}) 대비 </span>
                                <div style={{ width: '80px' }}>
                                    {todayData.unsalesPayAmountTrendByAWeekAgo > 0 ?
                                        <div className="trend-info" style={{ color: '#7a7bda' }}>
                                            <img
                                                src='/assets/icon/trending_up_fill_7A7BDA.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.unsalesPayAmountTrendByAWeekAgo)}%</span>
                                        </div>
                                        :
                                        <div className="trend-info" style={{ color: '#e56767' }}>
                                            <img
                                                src='/assets/icon/trending_down_fill_E56767.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.unsalesPayAmountTrendByAWeekAgo)}%</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='data-box'>
                        <div>
                            <span className='data-title'>주문 건수</span>
                            <div className='data-content'>
                                {todayData.orderRegistration} 건
                            </div>
                        </div>
                        <div className='info-box'>
                            <div className='trend-info-box'>
                                <span>어제({todayData.dayNameOfYesterday}) 대비 </span>
                                <div style={{ width: '80px' }}>
                                    {todayData.orderRegistrationTrendByYesterday > 0 ?
                                        <div className="trend-info" style={{ color: '#7a7bda' }}>
                                            <img
                                                src='/assets/icon/trending_up_fill_7A7BDA.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.orderRegistrationTrendByYesterday)}%</span>
                                        </div>
                                        :
                                        <div className="trend-info" style={{ color: '#e56767' }}>
                                            <img
                                                src='/assets/icon/trending_down_fill_E56767.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.orderRegistrationTrendByYesterday)}%</span>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='trend-info-box'>
                                <span>지난주({todayData.dayNameOfAWeekAgo}) 대비 </span>
                                <div style={{ width: '80px' }}>
                                    {todayData.orderRegistrationTrendByAWeekAgo ?
                                        <div className="trend-info" style={{ color: '#7a7bda' }}>
                                            <img
                                                src='/assets/icon/trending_up_fill_7A7BDA.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.orderRegistrationTrendByAWeekAgo)}%</span>
                                        </div>
                                        :
                                        <div className="trend-info" style={{ color: '#e56767' }}>
                                            <img
                                                src='/assets/icon/trending_down_fill_E56767.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.orderRegistrationTrendByAWeekAgo)}%</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='data-box'>
                        <div>
                            <span className='data-title'>판매 건수</span>
                            <div className='data-content'>
                                {todayData.salesRegistration} 건
                            </div>
                        </div>
                        <div className='info-box'>
                            <div className='trend-info-box'>
                                <span>어제({todayData.dayNameOfYesterday}) 대비 </span>
                                <div style={{ width: '80px' }}>
                                    {todayData.salesRegistrationTrendByYesterday > 0 ?
                                        <div className="trend-info" style={{ color: '#7a7bda' }}>
                                            <img
                                                src='/assets/icon/trending_up_fill_7A7BDA.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.salesRegistrationTrendByYesterday)}%</span>
                                        </div>
                                        :
                                        <div className="trend-info" style={{ color: '#e56767' }}>
                                            <img
                                                src='/assets/icon/trending_down_fill_E56767.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.salesRegistrationTrendByYesterday)}%</span>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='trend-info-box'>
                                <span>지난주({todayData.dayNameOfAWeekAgo}) 대비 </span>
                                <div style={{ width: '80px' }}>
                                    {todayData.salesRegistrationTrendByAWeekAgo ?
                                        <div className="trend-info" style={{ color: '#7a7bda' }}>
                                            <img
                                                src='/assets/icon/trending_up_fill_7A7BDA.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.salesRegistrationTrendByAWeekAgo)}%</span>
                                        </div>
                                        :
                                        <div className="trend-info" style={{ color: '#e56767' }}>
                                            <img
                                                src='/assets/icon/trending_down_fill_E56767.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.salesRegistrationTrendByAWeekAgo)}%</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='data-box'>
                        <div>
                            <span className='data-title'>미판매 건수</span>
                            <div className='data-content'>
                                {todayData.unsalesRegistration} 건
                            </div>
                        </div>
                        <div className='info-box'>
                            <div className='trend-info-box'>
                                <span>어제({todayData.dayNameOfYesterday}) 대비 </span>
                                <div style={{ width: '80px' }}>
                                    {todayData.unsalesRegistrationTrendByYesterday > 0 ?
                                        <div className='trend-info' style={{ color: '#7a7bda' }}>
                                            <img
                                                src='/assets/icon/trending_up_fill_7A7BDA.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.unsalesRegistrationTrendByYesterday)}%</span>
                                        </div>
                                        :
                                        <div className='trend-info' style={{ color: '#e56767' }}>

                                            <img
                                                src='/assets/icon/trending_down_fill_E56767.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.unsalesRegistrationTrendByYesterday)}%</span>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='trend-info-box'>
                                <span>지난주({todayData.dayNameOfAWeekAgo}) 대비 </span>
                                <div style={{ width: '80px' }}>
                                    {todayData.unsalesRegistrationTrendByAWeekAgo ?
                                        <div className="trend-info" style={{ color: '#7a7bda' }}>
                                            <img
                                                src='/assets/icon/trending_up_fill_7A7BDA.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.unsalesRegistrationTrendByAWeekAgo)}%</span>
                                        </div>
                                        :
                                        <div className="trend-info" style={{ color: '#e56767' }}>
                                            <img
                                                src='/assets/icon/trending_down_fill_E56767.svg'
                                                style={{ width: '20px' }}
                                                alt=""
                                                loading='lazy'
                                            />
                                            <span>{Math.abs(todayData.unsalesRegistrationTrendByAWeekAgo)}%</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </DashboardFieldWrapper>
    )
}
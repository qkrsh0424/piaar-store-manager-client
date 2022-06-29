import queryString from 'query-string';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// handler
import { dateToYYMMDDhhmmss, dateToYYMMDD } from '../../utils/dateFormatUtils';
import { numberWithCommas2 } from '../../utils/numberFormatUtils';

// component
import PagenationComponent1 from '../pagenation/PagenationComponent1';

const Container = styled.div`
    margin-bottom: 200px;
`;

const ItemGroupContainer = styled.div`
    /* padding:5px; */
`;


const ItemContainer = styled.div`
    
    margin: 5px 0;
    
`;

const ItemWrapper = styled.div`
    border-radius: 3px;
    border:1px solid ${props => props.accountbooktype == 'income' ? '#4682B4' : props.accountbooktype = 'expenditure' ? '#FF6347' : 'white'};
    background: ${props => props.accountbooktype == 'income' ? '#4682B440' : props.accountbooktype = 'expenditure' ? '#FF634740' : 'white'};
`;

const ItemHeaderWrapper = styled.div`
    display: grid;
    /* grid-template-columns: repeat(auto-fit, minmax(45%,1fr)); */
    grid-template-columns: 55% 30% 15%;
    padding:3px 8px;
    align-items: center;
    grid-gap: 2px;
    border-bottom: 1px solid #f1f1f1;

    & .delete-btn{
        cursor: pointer;
        border:1px solid #dc3545;
        border-radius: 3px;
        font-size: 12px;
        color:#dc3545;
        &:hover{
            background: #dc3545;
            border: 1px solid white;
            color:white;
        }
    }
`;

const ItemHeaderEl = styled.div`
    /* text-align: center; */
    font-weight: 700;
    color:#333;
    font-size: 1rem;
`;

const ItemBodyWrapper = styled.div`
    display: grid;
    /* grid-template-columns: repeat(auto-fit, minmax(30%,1fr)); */
    grid-template-columns: 15% 60% 25%;
    padding:3px 8px;
    grid-gap: 2px;
    border-bottom: 1px solid #f1f1f1;
`;

const ItemFooterWrapper = styled.div`
    display: grid;
    /* grid-template-columns: repeat(auto-fit, minmax(30%,1fr)); */
    grid-template-columns: 85% 15%;
    padding:3px 8px;
    grid-gap: 2px;
    border-bottom: 1px solid #f1f1f1;
`;

const ItemBodyEl = styled.div`
    /* text-align: center; */
    font-weight: 600;
    color:#333;
`;

const SearchOptionContainer = styled.div`

`;

const SearchOptionWrapper = styled.div`

`;
const SearchOptionGroup = styled.div`
    padding:5px;
`;
const SearchOptionDateRangeBtn = styled.button`
    width:100%;
    background: inherit;
    color:#494acc;
    border:2px solid #7a7bda;
    border-radius: 5px;
    font-size: 1.2rem;
    font-weight: 600;
    padding:5px;
`;

const SearchOptionCommonBtn = styled.button`
    width:100%;
    background: #fff;
    color:#333;
    border:1px solid #7a7bda;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: 700;
    padding:5px;
`;

const AccountBookBody = (props) => {
    let query = queryString.parse(window.location.search);

    const SearchOptionAccountBookTypeBtn = (props) => {
        let accbType = query.accbType;
        let type = '';
        switch (accbType) {
            case 'income':
                type = '수입';
                break;
            case 'expenditure':
                type = '지출';
                break;
            default:
                type = '전체';
                break;
        }
        return (
            <SearchOptionCommonBtn type='button' onClick={() => props.__handleEventControl().searchOptionChange().accountBookType(type)}>{type}</SearchOptionCommonBtn>
        );
    }

    const SearchOptionBankTypeBtn = (props) => {
        let bankType = query.bankType ? query.bankType : '전체';
        return (
            <SearchOptionCommonBtn type='button' onClick={() => props.__handleEventControl().searchOptionChange().bankType(bankType)}>{bankType}</SearchOptionCommonBtn>
        );
    }

    return (
        <>
            <Container className='container'>
                <SearchOptionContainer>
                    <SearchOptionWrapper>

                        <SearchOptionGroup className='row'>
                            <div className='col-12 p-1'>
                                <small>기간</small>
                                <SearchOptionDateRangeBtn type='button' onClick={() => props.__handleEventControl().dateRangePicker().open()}>{query.startDate ? dateToYYMMDD(query.startDate) : '전체'} ~ {query.endDate ? dateToYYMMDD(query.endDate) : '전체'}</SearchOptionDateRangeBtn>
                            </div>
                            <div className='col-4 p-1'>
                                <small>수입/지출</small>
                                <SearchOptionAccountBookTypeBtn
                                    {...props}
                                ></SearchOptionAccountBookTypeBtn>
                            </div>
                            <div className='col-4 p-1'>
                                <small>은행</small>
                                {props.bankTypeList ?
                                    <SearchOptionBankTypeBtn
                                        {...props}
                                    ></SearchOptionBankTypeBtn>
                                    :
                                    <SearchOptionCommonBtn>로딩중</SearchOptionCommonBtn>
                                }

                            </div>
                            <div className='col-4 p-1'>
                                <small>작성자</small>
                                <SearchOptionCommonBtn>All</SearchOptionCommonBtn>
                            </div>
                        </SearchOptionGroup>
                    </SearchOptionWrapper>
                </SearchOptionContainer>
                <div className='row'>
                    <div className='col-lg-6 p-1'>
                        <div style={{ border: '1px solid #f1f1f1', padding: '5px', margin: '5px 0', fontWeight: '800', borderRadius: '5px' }}>총 수입 : {props.sumIncomeData ? numberWithCommas2(props.sumIncomeData.sum) : '계산중...'} 원</div>
                        <div style={{ border: '1px solid #f1f1f1', padding: '5px', margin: '5px 0', fontWeight: '800', borderRadius: '5px' }}>총 지출 : {props.sumExpenditureData ? numberWithCommas2(props.sumExpenditureData.sum) : '계산중...'} 원</div>
                        <div style={{ border: '1px solid #f1f1f1', padding: '5px', margin: '5px 0', fontWeight: '800', borderRadius: '5px' }}>남은금액 : {props.sumIncomeData && props.sumExpenditureData ? numberWithCommas2(props.sumIncomeData?.sum + props.sumExpenditureData.sum) : '계산중...'} 원</div>
                        <div style={{ border: '1px solid #f1f1f1', padding: '5px', margin: '5px 0', fontWeight: '800', borderRadius: '5px' }}>
                            {query.accbType == 'income' ?
                                <button type='button' style={{ fontWeight: '700', color: 'white', border: '1px solid #FF634780', borderRadius: '5px', background: '#FF634750', width: '100%' }} onClick={() => props.__handleEventControl().expenditureType().viewModalOpen()} disabled>지출내역상세</button>
                                :
                                <button type='button' style={{ fontWeight: '700', color: 'white', border: '1px solid #FF6347', borderRadius: '5px', background: '#FF6347e0', width: '100%' }} onClick={() => props.__handleEventControl().expenditureType().viewModalOpen()}>지출내역상세</button>
                            }

                        </div>
                    </div>
                    <div className='col-lg-6 p-1'>
                        <ItemGroupContainer>
                            {props.itemDataList && props.itemDataList.map(r => {
                                return (
                                    <ItemContainer key={r.accountBook.id}>
                                        <ItemWrapper
                                            accountbooktype={r.accountBook.accountBookType}
                                        >
                                            <ItemHeaderWrapper>
                                                <ItemHeaderEl>{dateToYYMMDDhhmmss(r.accountBook.regDate)}</ItemHeaderEl>
                                                <ItemHeaderEl className='text-center'>{r.accountBook.bankType}</ItemHeaderEl>
                                                <ItemHeaderEl type='button' className='text-center delete-btn' onClick={() => props.__handleEventControl().removeItemOne(r.accountBook.id)}>삭제</ItemHeaderEl>

                                            </ItemHeaderWrapper>
                                            <ItemBodyWrapper>
                                                <ItemBodyEl>{r.accountBook.accountBookType == 'income' ? '수입' : r.accountBook.accountBookType == 'expenditure' ? '지출' : 'Null'}</ItemBodyEl>
                                                <ItemBodyEl className='text-center'>{numberWithCommas2((r.accountBook.money))} 원</ItemBodyEl>
                                                <ItemBodyEl className='text-center'>{r.user.name}</ItemBodyEl>
                                            </ItemBodyWrapper>
                                            <ItemFooterWrapper>
                                                <ItemBodyEl style={{ fontWeight: 800, color: '#444', fontSize: '13px' }}>{r.accountBook.desc}</ItemBodyEl>
                                                {r.accountBook.accountBookType == 'expenditure' ?
                                                    <ItemBodyEl type='button' className='text-center' onClick={() => props.__handleEventControl().expenditureType().settingModalOpen(r.accountBook.id)} style={{ fontWeight: 800, color: '#1199dc', fontSize: '13px', textAlign: 'right' }}>{r.accountBook.expenditureTypeId ? r.expenditureType.expenditureType : '미설정'}</ItemBodyEl>
                                                    :
                                                    <></>
                                                }
                                            </ItemFooterWrapper>
                                        </ItemWrapper>
                                    </ItemContainer>
                                );
                            })}

                        </ItemGroupContainer>
                    </div>
                </div>

                {props.pagenation &&
                    <>
                        <div className='text-right' style={{ fontSize: '14px', fontWeight: 700 }}>
                            총 개수 : {props.pagenation.itemSize}
                        </div>
                        <PagenationComponent1
                            pagenation={props.pagenation}
                        ></PagenationComponent1>
                    </>
                }
                <div className='pt-3 mt-3 pb-3 text-center' style={{fontWeight:'700', lineHeight:'2'}}>
                    <div>
                        [우리은행]
                        <br/>
                        1005-904-157972 양태영(삼마이)
                    </div>
                    <div>
                        [농협은행]
                        <br/>
                        301-5003-6206-81 양태영(삼마이)
                    </div>
                    <div>
                        [오프라인(시티은행)]
                        <br/>
                        252-30410-265-01 박세훈
                    </div>
                </div>

            </Container>
        </>
    );
}

export default AccountBookBody;
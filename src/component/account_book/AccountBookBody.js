import queryString from 'query-string';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// handler
import { dateToYYMMDDhhmmss, dateToYYMMDD } from '../../handler/dateHandler';
import { numberWithCommas2 } from '../../handler/numberHandler';

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
    background: #bb6c06;
    color:white;
    border:1px solid #bb6c06;
    border-radius: 5px;
    font-size: 1.2rem;
    font-weight: 600;
    padding:5px;
`;

const SearchOptionCommonBtn = styled.button`
    width:100%;
    background: #fff;
    color:#333;
    border:1px solid #bb6c06;
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
                type = '??????';
                break;
            case 'expenditure':
                type = '??????';
                break;
            default:
                type = '??????';
                break;
        }
        return (
            <SearchOptionCommonBtn type='button' onClick={() => props.__handleEventControl().searchOptionChange().accountBookType(type)}>{type}</SearchOptionCommonBtn>
        );
    }

    const SearchOptionBankTypeBtn = (props) => {
        let bankType = query.bankType ? query.bankType : '??????';
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
                                <small>??????</small>
                                <SearchOptionDateRangeBtn type='button' onClick={() => props.__handleEventControl().dateRangePicker().open()}>{query.startDate ? dateToYYMMDD(query.startDate) : '??????'} ~ {query.endDate ? dateToYYMMDD(query.endDate) : '??????'}</SearchOptionDateRangeBtn>
                            </div>
                            <div className='col-4 p-1'>
                                <small>??????/??????</small>
                                <SearchOptionAccountBookTypeBtn
                                    {...props}
                                ></SearchOptionAccountBookTypeBtn>
                            </div>
                            <div className='col-4 p-1'>
                                <small>??????</small>
                                {props.bankTypeList ?
                                    <SearchOptionBankTypeBtn
                                        {...props}
                                    ></SearchOptionBankTypeBtn>
                                    :
                                    <SearchOptionCommonBtn>?????????</SearchOptionCommonBtn>
                                }

                            </div>
                            <div className='col-4 p-1'>
                                <small>?????????</small>
                                <SearchOptionCommonBtn>All</SearchOptionCommonBtn>
                            </div>
                        </SearchOptionGroup>
                    </SearchOptionWrapper>
                </SearchOptionContainer>
                <div className='row'>
                    <div className='col-lg-6 p-1'>
                        <div style={{ border: '1px solid #f1f1f1', padding: '5px', margin: '5px 0', fontWeight: '800', borderRadius: '5px' }}>??? ?????? : {props.sumIncomeData ? numberWithCommas2(props.sumIncomeData.sum) : '?????????...'} ???</div>
                        <div style={{ border: '1px solid #f1f1f1', padding: '5px', margin: '5px 0', fontWeight: '800', borderRadius: '5px' }}>??? ?????? : {props.sumExpenditureData ? numberWithCommas2(props.sumExpenditureData.sum) : '?????????...'} ???</div>
                        <div style={{ border: '1px solid #f1f1f1', padding: '5px', margin: '5px 0', fontWeight: '800', borderRadius: '5px' }}>???????????? : {props.sumIncomeData && props.sumExpenditureData ? numberWithCommas2(props.sumIncomeData.sum + props.sumExpenditureData.sum) : '?????????...'} ???</div>
                        <div style={{ border: '1px solid #f1f1f1', padding: '5px', margin: '5px 0', fontWeight: '800', borderRadius: '5px' }}>
                            {query.accbType == 'income' ?
                                <button type='button' style={{ fontWeight: '700', color: 'white', border: '1px solid #FF634780', borderRadius: '5px', background: '#FF634750', width: '100%' }} onClick={() => props.__handleEventControl().expenditureType().viewModalOpen()} disabled>??????????????????</button>
                                :
                                <button type='button' style={{ fontWeight: '700', color: 'white', border: '1px solid #FF6347', borderRadius: '5px', background: '#FF6347e0', width: '100%' }} onClick={() => props.__handleEventControl().expenditureType().viewModalOpen()}>??????????????????</button>
                            }

                        </div>
                    </div>
                    <div className='col-lg-6 p-1'>
                        <ItemGroupContainer>
                            {props.itemDataList && props.itemDataList.map(r => {
                                return (
                                    <ItemContainer key={r.id}>
                                        <ItemWrapper
                                            accountbooktype={r.accountBookType}
                                        >
                                            <ItemHeaderWrapper>
                                                <ItemHeaderEl>{dateToYYMMDDhhmmss(r.regDate)}</ItemHeaderEl>
                                                <ItemHeaderEl className='text-center'>{r.bankType}</ItemHeaderEl>
                                                <ItemHeaderEl type='button' className='text-center delete-btn' onClick={() => props.__handleEventControl().removeItemOne(r.id)}>??????</ItemHeaderEl>

                                            </ItemHeaderWrapper>
                                            <ItemBodyWrapper>
                                                <ItemBodyEl>{r.accountBookType == 'income' ? '??????' : r.accountBookType == 'expenditure' ? '??????' : 'Null'}</ItemBodyEl>
                                                <ItemBodyEl className='text-center'>{numberWithCommas2((r.money))} ???</ItemBodyEl>
                                                <ItemBodyEl className='text-center'>{r.user.name}</ItemBodyEl>
                                            </ItemBodyWrapper>
                                            <ItemFooterWrapper>
                                                <ItemBodyEl style={{ fontWeight: 800, color: '#444', fontSize: '13px' }}>{r.desc}</ItemBodyEl>
                                                {r.accountBookType == 'expenditure' ?
                                                    <ItemBodyEl type='button' className='text-center' onClick={() => props.__handleEventControl().expenditureType().settingModalOpen(r.id)} style={{ fontWeight: 800, color: '#1199dc', fontSize: '13px', textAlign: 'right' }}>{r.expenditureType.expenditureType ? r.expenditureType.expenditureType : '?????????'}</ItemBodyEl>
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
                            ??? ?????? : {props.pagenation.itemSize}
                        </div>
                        <PagenationComponent1
                            pagenation={props.pagenation}
                        ></PagenationComponent1>
                    </>
                }
                <div className='pt-3 mt-3 pb-3 text-center' style={{fontWeight:'700', lineHeight:'2'}}>
                    <div>
                        [????????????]
                        <br/>
                        1005-904-157972 ?????????(?????????)
                    </div>
                    <div>
                        [????????????]
                        <br/>
                        301-5003-6206-81 ?????????(?????????)
                    </div>
                    <div>
                        [????????????(????????????)]
                        <br/>
                        252-30410-265-01 ?????????
                    </div>
                </div>

            </Container>
        </>
    );
}

export default AccountBookBody;
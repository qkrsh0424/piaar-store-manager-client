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
    padding:5px;
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
    grid-template-columns: 75% 25%;
    padding:3px 8px;
    align-items: center;
    grid-gap: 2px;
    border-bottom: 1px solid #f1f1f1;
`;

const ItemHeaderEl = styled.div`
    /* text-align: center; */
    font-weight: 700;
    color:#333;
    font-size: 17px;
`;

const ItemBodyWrapper = styled.div`
    display: grid;
    /* grid-template-columns: repeat(auto-fit, minmax(30%,1fr)); */
    grid-template-columns: 15% 60% 25%;
    padding:3px 8px;
    grid-gap: 2px;
`;

const ItemFooterWrapper = styled.div`
    padding:3px 8px;
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
        let bankType = query.bankType;
        let type = '';
        switch (bankType) {
            case '우리은행':
                type = '우리은행';
                break;
            case '농협은행':
                type = '농협은행';
                break;
            case '카카오뱅크':
                type = '카카오뱅크';
                break;
            default:
                type = '전체';
                break;
        }
        return (
            <SearchOptionCommonBtn type='button' onClick={() => props.__handleEventControl().searchOptionChange().bankType(type)}>{type}</SearchOptionCommonBtn>
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
                                <SearchOptionCommonBtn>박세훈</SearchOptionCommonBtn>
                            </div>
                        </SearchOptionGroup>
                    </SearchOptionWrapper>
                </SearchOptionContainer>
                <div className='row'>
                    <div className='col-lg-6 p-0'>
                        <div>총 수입 : {props.sumIncomeData ? props.sumIncomeData.sum : '계산중...'}</div>
                        <div>총 지출 : {props.sumExpenditureData ? props.sumExpenditureData.sum : '계산중...'}</div>
                        <div>남은금액 : {props.sumIncomeData && props.sumExpenditureData ? props.sumIncomeData.sum + props.sumExpenditureData.sum : '계산중...'}</div>
                    </div>
                    <div className='col-lg-6 p-0'>
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

                                            </ItemHeaderWrapper>
                                            <ItemBodyWrapper>
                                                <ItemBodyEl>{r.accountBookType == 'income' ? '수입' : r.accountBookType == 'expenditure' ? '지출' : 'Null'}</ItemBodyEl>
                                                <ItemBodyEl className='text-center'>{numberWithCommas2((r.money))} 원</ItemBodyEl>
                                                <ItemBodyEl className='text-center'>{r.name}</ItemBodyEl>
                                            </ItemBodyWrapper>
                                            <ItemFooterWrapper>
                                                <ItemBodyEl>{r.desc}</ItemBodyEl>
                                            </ItemFooterWrapper>
                                        </ItemWrapper>
                                    </ItemContainer>
                                );
                            })}

                        </ItemGroupContainer>
                    </div>
                </div>
                {props.pagenation &&
                    <PagenationComponent1
                        pagenation={props.pagenation}
                    ></PagenationComponent1>
                }

            </Container>
        </>
    );
}

export default AccountBookBody;
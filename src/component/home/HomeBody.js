import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Container = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
`;

const LinkGroup = styled.div`
    position: absolute;
    width: 90%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 5%);
    padding-bottom: 100px;
`;

const GroupBox = styled.div`
    padding-bottom: 20px;
`;

const GroupTitle = styled.div`
    font-weight: 700;
    font-size: 1.2rem;
    padding: 20px;
    color: #0500af;
`;

const LinkBox = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* grid-template-rows: minmax(10vh, 10vh); */
    grid-gap: 15px;

    @media only screen and (max-width: 992px){
        grid-template-columns: 1fr;
    }
`;

const CustomLink = styled(Link)`
    border:3px double #7d7ada;
    border-radius: 10px;
    padding:5px;
    padding: 25px 0;
    text-align: center;
    font-size: 1.2rem;
    color:#7d7ada;
    font-weight: 600;
    background: linear-gradient(to bottom right, #f0fcff, #ecf1ff);
    box-shadow: 5px 5px 5px -1px #00000020;

    &:hover{
        text-decoration: none;
        border:3px double white;
        background: rgba(122, 123, 218, 0.88);
        transition-duration: 0.2s;
        color:white;
    }
    
    @media only screen and (max-width:992px){
        font-size: 1.3rem;
        padding: 0;
    }

    @media only screen and (max-width:335px){
        font-size: 1rem;
    }
    
`;

const CustomLink2 = styled.a`
    border:3px double #7d7ada;
    border-radius: 10px;
    padding:5px;
    padding: 25px 0;
    text-align: center;
    font-size: 1.2rem;
    color:#7d7ada;
    font-weight: 600;
    background: linear-gradient(to bottom right, #f0fcff, #ecf1ff);
    box-shadow: 5px 5px 5px -1px #00000020;

    &:hover{
        text-decoration: none;
        border:3px double white;
        background: rgba(122, 123, 218, 0.88);
        transition-duration: 0.2s;
        color:white;
    }
    
    @media only screen and (max-width:992px){
        font-size: 1.3rem;
        padding: 0;
    }

    @media only screen and (max-width:335px){
        font-size: 1rem;
    }
    
`;

const HomeBody = () => {
    const userRdx = useSelector(state => state.user);

    // 상품등록 후 이동할 페이지 설정
    let routerState = {
        routerUrl: '/products'
    }

    return (
        <>
            <Container>
                <LinkGroup>
                    <GroupBox>
                        <GroupTitle>상품 관리</GroupTitle>
                        <LinkBox>
                            <CustomLink to='/products'>상품 재고관리</CustomLink>
                            <CustomLink to='/products/create' state={routerState}>상품 등록</CustomLink>
                            <CustomLink to='/product-detail'>상품 상세정보</CustomLink>
                        </LinkBox>
                    </GroupBox>

                    {userRdx.userInfo && !(userRdx.userInfo?.roles.includes("ROLE_LOGISTICS")) &&
                        <>
                            <GroupBox>
                                <GroupTitle>분석기</GroupTitle>
                                <LinkBox>
                                    {/* <CustomLink2 href='https://analytics.piaar.co.kr'>분석기</CustomLink2> */}
                                    <CustomLink to='/sales-analysis'>판매 랭킹</CustomLink>
                                    <CustomLink to='/stock-analysis'>재고 자산</CustomLink>
                                    <CustomLink to='/stock-cycle'>재고 주기</CustomLink>
                                </LinkBox>
                            </GroupBox>

                            <GroupBox>
                                <GroupTitle>피아르</GroupTitle>
                                <LinkBox>
                                    <CustomLink to='/erp/management/order-upload'>피아르 주문 & 출고 관리</CustomLink>
                                    <CustomLink to='/erp/return-management/registration'>피아르 반품 관리</CustomLink>
                                    <CustomLink to='/sales-performance'>판매 성과</CustomLink>
                                </LinkBox>
                            </GroupBox>

                            {/* <GroupBox>
                                <GroupTitle>네이버</GroupTitle>
                                <LinkBox>
                                    <CustomLink to='/delivery-ready/naver'>배송준비</CustomLink>
                                    <CustomLink to='/order-registration/naver'>대량등록</CustomLink>
                                    <CustomLink to='/shipment/packing-list/naver'>데이터 추출기</CustomLink>
                                    <CustomLink to='/sales-rate/naver'>주문통합검색 판매량 추출기</CustomLink>
                                </LinkBox>
                            </GroupBox>

                            <GroupBox>
                                <GroupTitle>쿠팡</GroupTitle>
                                <LinkBox>
                                    <CustomLink to='/delivery-ready/coupang'>배송준비</CustomLink>
                                    <CustomLink to='/shipment/packing-list/coupang'>배송준비 데이터 추출기</CustomLink>
                                </LinkBox>
                            </GroupBox> */}

                            <GroupBox>
                                <GroupTitle>기타</GroupTitle>
                                <LinkBox>
                                    {
                                        userRdx.userInfo && 
                                            (([userRdx.userInfo.roles].some(r => ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_SUPERADMIN"].includes(r)))
                                        ) ?
                                            <CustomLink to='/account-book'>부기관리</CustomLink>
                                            :
                                            <></>
                                    }
                                    <CustomLink to='/commute-record'>출/퇴근 기록</CustomLink>
                                    <CustomLink to='/excel-translator'>엑셀 변환기</CustomLink>
                                </LinkBox>
                            </GroupBox>
                        </>
                    }
                </LinkGroup>

            </Container>
        </>
    );
}

export default HomeBody;
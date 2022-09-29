import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';

const Container = styled.div`
`;
const ContentContainer = styled.div`
    padding:50px 0;
`;

const LinkContainer = styled.div`
    padding:10px;
    width:100%;

    button {
        width: 100%;
    }
`;

const LinkEl = styled(Link)`
    font-size:20px;
`;

const CustomLink = styled(Link)`
    
    display: inline-block;
    width: 100%;
    padding:5px;
    text-align: center;
    font-size: 1rem;
    color:#7d7ada;
    font-weight: 600;
    border-left:3px solid #7d7ada00;
    transition: 0.3s;
    border-radius: 30px;

    &:hover{
        text-decoration: none;
        /* border-left:3px solid #7d7ada; */
        color:#7d7ada;
        background-color: #F2ECFF;
    }
    
`;

const CustomLink2 = styled.a`
    display: inline-block;
    width: 100%;
    padding:5px;
    text-align: center;
    font-size: 1rem;
    color:#7d7ada;
    font-weight: 600;
    border-left:3px solid #7d7ada00;
    transition: 0.3s;
    border-radius: 30px;

    &:hover{
        text-decoration: none;
        /* border-left:3px solid #7d7ada; */
        color:#7d7ada;
        background-color: #F2ECFF;
    }
    
`;

const DrawerNavbarSiderComponent = (props) => {
    const userRdx = useSelector(state => state.user);
    return (
        <>
            {userRdx.isLoading == false ?
                <Container>
                    <Drawer
                        className={'MySideDrawer'}
                        anchor={'left'}
                        open={props.open}
                        onClose={() => props.__handleEventControl().drawer().close()}
                    >
                        <ContentContainer
                            onClick={() => props.__handleEventControl().drawer().close()}
                            onKeyDown={() => props.__handleEventControl().drawer().close()}
                        >
                            <div style={{textAlign:'center', fontWeight:'700'}}>{userRdx.userInfo && userRdx.userInfo.username} 님 안녕하세요.</div>
                            <LinkContainer>
                                <CustomLink to='/'>메인페이지</CustomLink>
                            </LinkContainer>
                            {
                                userRdx.userInfo && (userRdx.userInfo.roles.includes("ROLE_ADMIN") || userRdx.userInfo.roles.includes("ROLE_MANAGER")) ?
                                    <LinkContainer>
                                        <CustomLink to='/account-book'>부기관리</CustomLink>
                                    </LinkContainer>
                                    :
                                    <></>
                            }
                            <LinkContainer>
                                <CustomLink to='/products'>상품 재고관리</CustomLink>
                            </LinkContainer>
                            <LinkContainer>
                                <CustomLink to='/product-detail'>상품 상세정보</CustomLink>
                            </LinkContainer>
                            {userRdx.userInfo && !userRdx.userInfo.roles.includes("ROLE_LOGISTICS") &&
                                <>
                                    <LinkContainer>
                                        <CustomLink to='/erp/management/order-upload'>피아르 주문&출고 관리</CustomLink>
                                    </LinkContainer>
                                    <LinkContainer>
                                        <CustomLink to='/commute-record'>출퇴근기록</CustomLink>
                                    </LinkContainer>
                                    <LinkContainer>
                                        <CustomLink to='/excel-translator'>엑셀 변환기</CustomLink>
                                    </LinkContainer>
                                    <LinkContainer>
                                        <CustomLink to='/sales-analysis'>판매 랭킹</CustomLink>
                                    </LinkContainer>

                                    {/* <LinkContainer>
                                        <CustomLink to='/delivery-ready/naver'>네이버 배송준비</CustomLink>
                                    </LinkContainer>
                                    <LinkContainer>
                                        <CustomLink to='/delivery-ready/coupang'>쿠팡 배송준비</CustomLink>
                                    </LinkContainer>
                                    <LinkContainer>
                                        <CustomLink to='/order-registration/naver'>네이버 대량등록</CustomLink>
                                    </LinkContainer>
                                    <LinkContainer>
                                        <CustomLink2 href='https://analytics.piaar.co.kr'>분석기</CustomLink2>
                                    </LinkContainer>
                                    <LinkContainer>
                                        <CustomLink to='/shipment/packing-list/naver'>네이버 배송준비<br />데이터 추출기</CustomLink>
                                    </LinkContainer>
                                    <LinkContainer>
                                        <CustomLink to='/shipment/packing-list/coupang'>쿠팡 배송준비<br />데이터 추출기</CustomLink>
                                    </LinkContainer>
                                    <LinkContainer>
                                        <CustomLink to='/sales-rate/naver'>네이버 주문통합검색<br />판매량 추출기</CustomLink>
                                    </LinkContainer> */}
                                    {/* <LinkContainer>
                                        <CustomLink to='/order-confirm'>발주확인건</CustomLink>
                                    </LinkContainer> */}
                                    {/* <LinkContainer>
                                        <CustomLink to='/waybill'>오늘보낼것</CustomLink>
                                    </LinkContainer> */}
                                </>
                            }
                            <LinkContainer>
                                <form onSubmit={(e) => props.__handleEventControl().logoutSubmit(e)}>
                                    <button type='submit' className='btn btn-sm btn-outline-danger btn-block'>로그아웃</button>
                                </form>
                            </LinkContainer>
                        </ContentContainer>
                    </Drawer>
                </Container>
                :
                <></>
            }

        </>
    );
}

export default DrawerNavbarSiderComponent;
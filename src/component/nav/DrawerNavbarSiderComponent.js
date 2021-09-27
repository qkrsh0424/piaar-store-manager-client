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
    &:hover{
        text-decoration: none;
        border-left:3px solid #7d7ada;
        color:#7d7ada;
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
                                <CustomLink to='/order-confirm'>발주확인건</CustomLink>
                            </LinkContainer>
                            <LinkContainer>
                                <CustomLink to='/waybill'>오늘보낼것</CustomLink>
                            </LinkContainer>
                            <LinkContainer>
                                <CustomLink to='/shipment/packing-list/naver'>네이버 배송준비<br />데이터 추출기</CustomLink>
                            </LinkContainer>
                            <LinkContainer>
                                <CustomLink to='/shipment/packing-list/coupang'>쿠팡 배송준비<br />데이터 추출기</CustomLink>
                            </LinkContainer>
                            <LinkContainer>
                                <CustomLink to='/sales-rate/naver'>네이버 주문통합검색<br />판매량 추출기</CustomLink>
                            </LinkContainer>
                            <LinkContainer>
                                <CustomLink to='/products'>OUR PRODUCT</CustomLink>
                            </LinkContainer>
                            <LinkContainer>
                                <CustomLink to='/delivery-ready/naver'>네이버 배송준비<br />발주서 다운로드</CustomLink>
                            </LinkContainer>

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
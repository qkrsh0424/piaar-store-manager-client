import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
    height: 100%;
`;

const LinkGroup = styled.div`
    position: absolute;
    width: 90%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
`;

const LinkBox = styled.div`
    margin:10px 0;
`;

const CustomLink = styled(Link)`
    margin-bottom: 30px;
    display: inline-block;
    width: 100%;
    border:3px double #7d7ada;
    border-radius: 5px;
    padding:5px;
    text-align: center;
    font-size: 1.5rem;
    color:#7d7ada;
    font-weight: 600;
    box-shadow: 5px 5px 5px -1px #00000020;
    &:hover{
        text-decoration: none;
        border:3px double white;
        background: #7d7ada;
        color:white;
    }
    
    @media only screen and (max-width:992px){
        font-size: 1.3rem;
    }

    @media only screen and (max-width:335px){
        font-size: 1rem;
    }
    
`;

const HomeBody = () => {
    const userRdx = useSelector(state => state.user);

    return (
        <>
            <Container>
                <LinkGroup>
                    <LinkBox>
                        {
                            userRdx.userInfo && (userRdx.userInfo.roles.includes("ROLE_ADMIN") || userRdx.userInfo.roles.includes("ROLE_MANAGER")) ?
                                <CustomLink to='/account-book'>부기관리</CustomLink>
                                :
                                <></>
                        }
                        <CustomLink to='/products'>상품관리</CustomLink>
                        <CustomLink to='/shipment/packing-list/naver'>네이버 배송준비 데이터 추출기</CustomLink>
                        <CustomLink to='/shipment/packing-list/coupang'>쿠팡 배송준비 데이터 추출기</CustomLink>
                        <CustomLink to='/sales-rate/naver'>네이버 주문통합검색 판매량 추출기</CustomLink>

                    </LinkBox>
                </LinkGroup>

            </Container>
        </>
    );
}

export default HomeBody;
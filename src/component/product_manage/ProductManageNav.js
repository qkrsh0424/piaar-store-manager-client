import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Container = styled.div`
`;

const CommonLinkGroupContainer = styled.div`
    position:fixed;
    bottom:0;
    width:100%;
    overflow: hidden;
    z-index: 999;
    background-color: #eef1ff;
`;

const CommonLinkGroupWrapper = styled.div`
    padding:20px;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 10px;
    align-items: center;

    @media only screen and (max-width: 576px) {
        grid-template-columns: repeat(2, 1fr);
        padding: 0 20px;
        height: 100px;
    }
`;

const CommonLinkEl = styled(Link)`
    display: inline-block;
    padding:0.7rem;
    border-radius: 5px;
    text-align: center;
    background: ${props => props.color ? props.color : 'skyblue'};
    width:100%;
    font-size: 1.2rem;
    font-weight: 700;
    color:white;

    &:hover{
        color:#f1f1f1;
        text-decoration: none;
    }

    @media only screen and (max-width: 576px) {
        font-size: 12px;
        font-weight: 600;
    }
`;

const NavControlBtn = styled.button`
    display: inline-block;
    padding:0.7rem;
    border:none;
    border-radius: 5px;
    text-align: center;
    background: ${props => props.color ? props.color : 'skyblue'};
    width:100%;
    font-size: 1.2rem;
    font-weight: 700;
    color:white;

    &:hover{
        color:#f1f1f1;
        text-decoration: none;
    }

    @media only screen and (max-width: 576px) {
        font-size: 12px;
        font-weight: 600;
    }
`;

const ProductManageNav = (props) => {
    let location = useLocation();

    let routerState = {
        prevUrl: location.pathname
    }

    return (
        <>
            <Container>
                <CommonLinkGroupContainer>
                    <CommonLinkGroupWrapper>
                        <div>
                            <CommonLinkEl
                                to={{
                                    pathname:'/products/create',
                                    state:routerState
                                }}
                                color={'#7a7bdae0'}
                            >상품등록</CommonLinkEl>
                        </div>
                        <div>
                            <NavControlBtn
                                type='button'
                                color={'#7a7bdae0'}
                                onClick={()=>props.__handleEventControl().release().addModalOpen()}
                            >출고등록</NavControlBtn>
                        </div>
                        <div>
                            <NavControlBtn
                                type='button'
                                color={'#7a7bdae0'}
                                onClick={()=>props.__handleEventControl().receive().addModalOpen()}
                            >입고등록</NavControlBtn>
                        </div>
                        <div>
                            <NavControlBtn
                                type='button'
                                color={'#7a7bdae0'}
                                onClick={()=>props.__handleEventControl().receiveAndRelease().receiveAndReleaseStatusModalOpen()}
                            >입출고확인</NavControlBtn>
                        </div>
                    </CommonLinkGroupWrapper>
                </CommonLinkGroupContainer>
            </Container>
        </>
    );
}

export default ProductManageNav;
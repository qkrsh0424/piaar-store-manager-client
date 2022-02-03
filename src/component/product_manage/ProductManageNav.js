import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

const Container = styled.div`

`;

const CommonLinkGroupContainer = styled.div`
    position:fixed;
    bottom:0;
    width:100%;
    overflow: hidden;
    z-index: 999;
`;

const CommonLinkGroupWrapper = styled.div`
    padding:20px;
    text-align: center;
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
`;

const ReceiveReleaseBtn = styled.button`
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
`;
const ProductManageNav = (props) => {
    let routerState = {
        prevUrl: props.location.pathname
    }

    return (
        <>
            <Container>
                <CommonLinkGroupContainer>
                    <CommonLinkGroupWrapper className='row'>
                        <div className='col-3 mb-2'>
                            <CommonLinkEl
                                to={{
                                    pathname:'/products/create',
                                    state:routerState
                                }}
                                color={'#7a7bdae0'}
                                // color={'#333333e0'}
                            >상품등록</CommonLinkEl>
                        </div>
                        <div className='col-3 mb-2'>
                            <ReceiveReleaseBtn
                                type='button'
                                color={'#7a7bdae0'}
                                // color={'#333333e0'}
                                onClick={()=>props.__handleEventControl().release().addModalOpen()}
                            >출고등록</ReceiveReleaseBtn>
                        </div>
                        <div className='col-3 mb-2'>
                            <ReceiveReleaseBtn
                                type='button'
                                color={'#7a7bdae0'}
                                // color={'#333333e0'}
                                onClick={()=>props.__handleEventControl().receive().addModalOpen()}
                            >입고등록</ReceiveReleaseBtn>
                        </div>
                        <div className='col-3 mb-2'>
                            <ReceiveReleaseBtn
                                type='button'
                                color={'#7a7bdae0'}
                                // color={'#333333e0'}
                                onClick={()=>props.__handleEventControl().productOption().receiveAndReleaseStatusModalOpen()}
                            >입출고확인</ReceiveReleaseBtn>
                        </div>
                    </CommonLinkGroupWrapper>
                </CommonLinkGroupContainer>
            </Container>
        </>
    );
}

export default withRouter(ProductManageNav);
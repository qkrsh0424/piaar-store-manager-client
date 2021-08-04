import styled from 'styled-components';
import {Link} from 'react-router-dom';

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
    padding:1rem;
    border-radius: 5px;
    text-align: center;
    background: ${props=>props.color ? props.color : 'skyblue'};
    width:100%;
    font-size: 1.5rem;
    font-weight: 700;
    color:white;

    &:hover{
        color:#f1f1f1;
        text-decoration: none;
    }
`;
const AccountBookNav = (props) => {

    return (
        <>
            <Container>
                <CommonLinkGroupContainer>
                    <CommonLinkGroupWrapper className='row'>
                        <div className='col-6 mb-2'>
                            <CommonLinkEl
                                to={'/products/create'}
                                color={'#4682B4e0'}
                            >상품등록</CommonLinkEl>
                        </div>
                        <div className='col-6 mb-2'>
                            <CommonLinkEl
                                to={'#'}
                                color={'#FF6347e0'}
                            >I'm a button</CommonLinkEl>
                        </div>
                    </CommonLinkGroupWrapper>
                </CommonLinkGroupContainer>
            </Container>
        </>
    );
}

export default AccountBookNav;
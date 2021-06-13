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
    
`;

const HomeBody = () => {
    return (
        <>
            <Container>
                <LinkGroup>
                    <LinkBox>
                        <CustomLink to='/account-book'>부기관리</CustomLink>
                    </LinkBox>
                </LinkGroup>

            </Container>
        </>
    );
}

export default HomeBody;
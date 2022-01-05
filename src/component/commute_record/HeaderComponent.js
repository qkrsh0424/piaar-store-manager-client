import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
    padding-top: 30px;
    text-align: center;
    font-size: 20px;
    font-weight: 800;
    color:#fff;
`;

const HeaderComponent = () => {
    const userRdx = useSelector(state => state.user);

    return (
        <>
            <Container>
                노동 인민명 : {userRdx?.userInfo.username} 봇
            </Container>
        </>
    );
}

export default HeaderComponent;
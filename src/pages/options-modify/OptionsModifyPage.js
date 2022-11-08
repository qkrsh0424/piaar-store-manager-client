import styled from 'styled-components';
import DrawerNavbarMain from '../../component/nav/DrawerNavbarMain';
import OptionsModifyComponent from '../../component/options-modify-v2';

const Container = styled.div`

`;

const OptionsModifyPage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <OptionsModifyComponent></OptionsModifyComponent>
            </Container>
        </>
    )
}

export default OptionsModifyPage;
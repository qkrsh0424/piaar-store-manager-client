import styled from 'styled-components';
import ErpReturnManagementNavbar from '../../../../component/erp/return-management/navbar/ErpReturnManagementNavbar';
import RegistrationComponent from '../../../../component/erp/return-management/registration';
import DrawerNavbarMain from '../../../../component/nav/DrawerNavbarMain';

const Container = styled.div`

`;

const ErpReturnManagementRegistrationPage = (props) => {
    return (
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <ErpReturnManagementNavbar></ErpReturnManagementNavbar>
                <RegistrationComponent></RegistrationComponent>
            </Container>
        </>
    );
}
export default ErpReturnManagementRegistrationPage;
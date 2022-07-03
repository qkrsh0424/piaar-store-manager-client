import styled from 'styled-components';
import DashboardComponent from '../../../../component/erp/management/dashboard';
import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
import DrawerNavbarMain from '../../../../component/nav/DrawerNavbarMain';
const Container = styled.div`

`;

const ErpManagementDashboardPage = (props) => {
    return (
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <ErpManagementNavbar></ErpManagementNavbar>
                <DashboardComponent></DashboardComponent>
            </Container>
        </>
    );
}
export default ErpManagementDashboardPage;
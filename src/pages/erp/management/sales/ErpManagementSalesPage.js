import styled from 'styled-components';
import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
import SalesComponent from '../../../../component/erp/management/sales';
import DrawerNavbarMain from '../../../../component/nav/DrawerNavbarMain';
const Container = styled.div`

`;

const ErpManagementSalesPage = (props) => {
    return (
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <ErpManagementNavbar></ErpManagementNavbar>
                <SalesComponent></SalesComponent>
            </Container>
        </>
    );
}
export default ErpManagementSalesPage;
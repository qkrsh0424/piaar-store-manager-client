import styled from 'styled-components';
import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
import SalesComponent from '../../../../component/erp/management/sales';
import DrawerNavbarComponent from '../../../../component/nav/DrawerNavbarComponent';
const Container = styled.div`

`;

const ErpManagementSalesPage = (props) => {
    return (
        <>
            <Container>
                <DrawerNavbarComponent></DrawerNavbarComponent>
                <ErpManagementNavbar></ErpManagementNavbar>
                <SalesComponent></SalesComponent>
            </Container>
        </>
    );
}
export default ErpManagementSalesPage;
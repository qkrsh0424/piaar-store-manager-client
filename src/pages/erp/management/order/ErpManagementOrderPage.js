import styled from 'styled-components';
import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
import OrderComponent from '../../../../component/erp/management/order';
import DrawerNavbarComponent from '../../../../component/nav/DrawerNavbarComponent';
const Container = styled.div`

`;

const ErpManagementOrderPage = (props) => {
    return (
        <>
            <Container>
                <DrawerNavbarComponent></DrawerNavbarComponent>
                <ErpManagementNavbar></ErpManagementNavbar>
                <OrderComponent></OrderComponent>
            </Container>
        </>
    );
}
export default ErpManagementOrderPage;
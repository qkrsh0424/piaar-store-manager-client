import styled from 'styled-components';
import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
import OrderComponent from '../../../../component/erp/management/order';
import DrawerNavbarMain from '../../../../component/nav/DrawerNavbarMain';
const Container = styled.div`

`;

const ErpManagementOrderPage = (props) => {
    return (
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <ErpManagementNavbar></ErpManagementNavbar>
                <OrderComponent></OrderComponent>
            </Container>
        </>
    );
}
export default ErpManagementOrderPage;
import styled from 'styled-components';
import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
import ErpOrderUploadComponent from '../../../../component/erp/management/order-upload';
import DrawerNavbarMain from '../../../../component/nav/DrawerNavbarMain';
const Container = styled.div`

`;

const ErpManagementOrderUploadPage = (props) => {
    return (
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <ErpManagementNavbar></ErpManagementNavbar>
                <ErpOrderUploadComponent></ErpOrderUploadComponent>
            </Container>
        </>
    );
}
export default ErpManagementOrderUploadPage;
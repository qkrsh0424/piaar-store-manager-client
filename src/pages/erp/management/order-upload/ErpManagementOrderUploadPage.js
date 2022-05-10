import styled from 'styled-components';
import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
import ErpOrderUploadComponent from '../../../../component/erp/management/order-upload';
import DrawerNavbarComponent from '../../../../component/nav/DrawerNavbarComponent';
const Container = styled.div`

`;

const ErpManagementOrderUploadPage = (props) => {
    return (
        <>
            <Container>
                <DrawerNavbarComponent></DrawerNavbarComponent>
                <ErpManagementNavbar></ErpManagementNavbar>
                <ErpOrderUploadComponent></ErpOrderUploadComponent>
            </Container>
        </>
    );
}
export default ErpManagementOrderUploadPage;
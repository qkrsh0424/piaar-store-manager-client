import styled from 'styled-components';
import ErpReturnManagementNavbar from '../../../../component/erp/return-management/navbar/ErpReturnManagementNavbar';
import RejectedComponent from '../../../../component/erp/return-management/rejected';
import DrawerNavbarMain from '../../../../component/nav/DrawerNavbarMain';

const Container = styled.div`

`;

const ErpReturnManagementRejectedPage = (props) => {
    return (
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <ErpReturnManagementNavbar></ErpReturnManagementNavbar>
                <RejectedComponent></RejectedComponent>
            </Container>
        </>
    );
}
export default ErpReturnManagementRejectedPage;
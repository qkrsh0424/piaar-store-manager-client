import styled from 'styled-components';
import ErpReturnManagementNavbar from '../../../../component/erp/management/navbar/ErpReturnManagementNavbar';
import CompletedComponent from '../../../../component/erp/return-management/completed';
import DrawerNavbarMain from '../../../../component/nav/DrawerNavbarMain';

const Container = styled.div`

`;

const ErpReturnManagementCompletedPage = (props) => {
    return (
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <ErpReturnManagementNavbar></ErpReturnManagementNavbar>
                <CompletedComponent></CompletedComponent>
            </Container>
        </>
    );
}
export default ErpReturnManagementCompletedPage;
import styled from 'styled-components';
import ErpReturnManagementNavbar from '../../../../component/erp/management/navbar/ErpReturnManagementNavbar';
import CollectedComponent from '../../../../component/erp/return-management/collected';
import DrawerNavbarMain from '../../../../component/nav/DrawerNavbarMain';

const Container = styled.div`

`;

const ErpReturnManagementCollectedPage = (props) => {
    return (
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <ErpReturnManagementNavbar></ErpReturnManagementNavbar>
                <CollectedComponent></CollectedComponent>
            </Container>
        </>
    );
}
export default ErpReturnManagementCollectedPage;
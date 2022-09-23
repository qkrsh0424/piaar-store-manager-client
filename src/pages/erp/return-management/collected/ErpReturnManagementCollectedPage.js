import styled from 'styled-components';
import CollectedComponent from '../../../../component/erp/return-management/collected';
import ErpReturnManagementNavbar from '../../../../component/erp/return-management/navbar/ErpReturnManagementNavbar';
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
import styled from 'styled-components';
import ErpReturnManagementNavbar from '../../../../component/erp/management/navbar/ErpReturnManagementNavbar';
import DrawerNavbarMain from '../../../../component/nav/DrawerNavbarMain';

const Container = styled.div`

`;

const ErpReturnManagementCollectingPage = (props) => {
    return (
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <ErpReturnManagementNavbar></ErpReturnManagementNavbar>
                {/* <CollectingComponent></CollectingComponent> */}
            </Container>
        </>
    );
}
export default ErpReturnManagementCollectingPage;
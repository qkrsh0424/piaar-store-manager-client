import styled from 'styled-components';
import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
import ReleaseCompleteComponent from '../../../../component/erp/management/release-complete';
import DrawerNavbarMain from '../../../../component/nav/DrawerNavbarMain';
const Container = styled.div`

`;

const ErpManagementReleaseCompletePage = (props) => {
    return (
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <ErpManagementNavbar></ErpManagementNavbar>
                <ReleaseCompleteComponent></ReleaseCompleteComponent>
            </Container>
        </>
    );
}
export default ErpManagementReleaseCompletePage;
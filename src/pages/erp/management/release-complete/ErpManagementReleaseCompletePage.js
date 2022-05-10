import styled from 'styled-components';
import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
import ReleaseCompleteComponent from '../../../../component/erp/management/release-complete';
import DrawerNavbarComponent from '../../../../component/nav/DrawerNavbarComponent';
const Container = styled.div`

`;

const ErpManagementReleaseCompletePage = (props) => {
    return (
        <>
            <Container>
                <DrawerNavbarComponent></DrawerNavbarComponent>
                <ErpManagementNavbar></ErpManagementNavbar>
                <ReleaseCompleteComponent></ReleaseCompleteComponent>
            </Container>
        </>
    );
}
export default ErpManagementReleaseCompletePage;
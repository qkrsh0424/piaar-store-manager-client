import styled from 'styled-components';
import ErpManagementExcelForm from '../../../../component/erp/management/excel-form';
import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
import DrawerNavbarMain from '../../../../component/nav/DrawerNavbarMain';

const Container = styled.div`

`;

const ErpManagementExcelFormPage = (props) => {
    return (
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <ErpManagementNavbar></ErpManagementNavbar>
                <ErpManagementExcelForm></ErpManagementExcelForm>
            </Container>
        </>
    );
}
export default ErpManagementExcelFormPage;
import styled from 'styled-components';
import ErpManagementExcelForm from '../../../../component/erp/management/excel-form';
import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
import DrawerNavbarComponent from '../../../../component/nav/DrawerNavbarComponent';

const Container = styled.div`

`;

const ErpManagementExcelFormPage = (props) => {
    return (
        <>
            <Container>
                <DrawerNavbarComponent></DrawerNavbarComponent>
                <ErpManagementNavbar></ErpManagementNavbar>
                <ErpManagementExcelForm></ErpManagementExcelForm>
            </Container>
        </>
    );
}
export default ErpManagementExcelFormPage;
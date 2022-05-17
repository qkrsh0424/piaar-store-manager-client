import styled from 'styled-components';
import ErpManagementExcelForm from '../../../../component/erp/management/excel-form';
import ErpManagementExcelFormV2 from '../../../../component/erp/management/excel-form-v2';
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
                <ErpManagementExcelFormV2></ErpManagementExcelFormV2>
            </Container>
        </>
    );
}
export default ErpManagementExcelFormPage;
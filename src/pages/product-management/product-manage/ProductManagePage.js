import styled from 'styled-components';
import DrawerNavbarMain from '../../../component/nav/DrawerNavbarMain';
import ProductManagementNavbar from '../../../component/product-management/navbar/ProductManagementNavbar';
import ProductManageComponent from '../../../component/product-management/product-manage-v2';

const Container = styled.div`
`;

const ProductManagePage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarMain />
                <ProductManagementNavbar />
                <ProductManageComponent />
            </Container>
        </>
    )
}

export default ProductManagePage;
import styled from 'styled-components';
import DrawerNavbarMain from '../../../component/nav/DrawerNavbarMain';
import ProductManagementNavbar from '../../../component/product-management/navbar/ProductManagementNavbar';
import ProductCategoryModifyComponent from '../../../component/product-management/product-category-modify';

const Container = styled.div`
    position: relative;
`;

const ProductCategoryModifyPage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarMain />
                <ProductManagementNavbar />
                <ProductCategoryModifyComponent />
            </Container>
        </>
    )
}

export default ProductCategoryModifyPage;
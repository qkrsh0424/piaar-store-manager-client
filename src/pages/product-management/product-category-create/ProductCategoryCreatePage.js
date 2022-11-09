import styled from 'styled-components';
import DrawerNavbarMain from '../../../component/nav/DrawerNavbarMain';
import ProductManagementNavbar from '../../../component/product-management/navbar/ProductManagementNavbar';
import ProductCategoryCreateComponent from '../../../component/product-management/product-category-create';

const Container = styled.div`
    position: relative;
`;

const ProductCategoryCreatePage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarMain />
                <ProductManagementNavbar />
                <ProductCategoryCreateComponent />
            </Container>
        </>
    )
}

export default ProductCategoryCreatePage;
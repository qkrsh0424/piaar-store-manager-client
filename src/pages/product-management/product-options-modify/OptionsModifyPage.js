import styled from 'styled-components';
import DrawerNavbarMain from '../../../component/nav/DrawerNavbarMain';
import ProductManagementNavbar from '../../../component/product-management/navbar/ProductManagementNavbar';
import ProductOptionsModifyComponent from '../../../component/product-management/product-options-modify-v2';
// import ProductOptionsModifyComponent from '../../component/product-options-modify-v2';

const Container = styled.div`
    position: relative;
    height: 100%;
    min-height: 100vh;
    background-color: var(--piaar-background-color);
`;

const ProductOptionsModifyPage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarMain />
                <ProductManagementNavbar />
                <ProductOptionsModifyComponent />
            </Container>
        </>
    )
}

export default ProductOptionsModifyPage;
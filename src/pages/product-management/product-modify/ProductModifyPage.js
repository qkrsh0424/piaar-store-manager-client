import styled from 'styled-components';
import DrawerNavbarMain from '../../../component/nav/DrawerNavbarMain';
import ProductManagementNavbar from '../../../component/product-management/navbar/ProductManagementNavbar';
import ProductModifyComponent from '../../../component/product-management/product-modify-v2';
// import ProductModifyComponent from '../../component/product-modify-v2';

const Container = styled.div`

`;

const ProductModifyPage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <ProductManagementNavbar />
                <ProductModifyComponent></ProductModifyComponent>
            </Container>
        </>
    )
}

export default ProductModifyPage;
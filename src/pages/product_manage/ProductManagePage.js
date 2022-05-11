import styled from 'styled-components';
import DrawerNavbarMain from '../../component/nav/DrawerNavbarMain';
import ProductManageComponent from '../../component/product_manage';

const Container = styled.div`

`;

const ProductManagePage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <ProductManageComponent></ProductManageComponent>
            </Container>
        </>
    )
}

export default ProductManagePage;
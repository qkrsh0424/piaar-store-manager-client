import styled from 'styled-components';
import DrawerNavbarMain from '../../component/nav/DrawerNavbarMain';
import ProductDetailComponent from '../../component/product_detail';

const Container = styled.div`

`;

const ProductDetailPage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <ProductDetailComponent></ProductDetailComponent>
            </Container>
        </>
    )
}

export default ProductDetailPage;
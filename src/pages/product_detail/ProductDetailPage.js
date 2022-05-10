import styled from 'styled-components';
import DrawerNavbarComponent from "../../component/nav/DrawerNavbarComponent";
import ProductDetailComponent from '../../component/product_detail';

const Container = styled.div`

`;

const ProductDetailPage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarComponent></DrawerNavbarComponent>
                <ProductDetailComponent></ProductDetailComponent>
            </Container>
        </>
    )
}

export default ProductDetailPage;
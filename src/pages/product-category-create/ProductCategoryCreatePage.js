import styled from 'styled-components';
import DrawerNavbarMain from '../../component/nav/DrawerNavbarMain';
import ProductCategoryCreateComponent from '../../component/product-category-create';

const Container = styled.div`

`;

const ProductCategoryCreatePage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <ProductCategoryCreateComponent></ProductCategoryCreateComponent>
            </Container>
        </>
    )
}

export default ProductCategoryCreatePage;
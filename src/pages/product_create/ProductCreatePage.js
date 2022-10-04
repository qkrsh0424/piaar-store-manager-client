import styled from 'styled-components';
import DrawerNavbarMain from '../../component/nav/DrawerNavbarMain';
import ProductCreateComponent from '../../component/product_create_v2';
// import ProductCreateComponent from '../../component/product_create_form';

const Container = styled.div`

`;

const ProductCreatePage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <ProductCreateComponent></ProductCreateComponent>
            </Container>
        </>
    )
}

export default ProductCreatePage;
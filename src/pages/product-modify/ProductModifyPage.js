import styled from 'styled-components';
import DrawerNavbarMain from '../../component/nav/DrawerNavbarMain';
import ProductModifyComponent from '../../component/product-modify';

const Container = styled.div`

`;

const ProductModifyPage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <ProductModifyComponent></ProductModifyComponent>
            </Container>
        </>
    )
}

export default ProductModifyPage;
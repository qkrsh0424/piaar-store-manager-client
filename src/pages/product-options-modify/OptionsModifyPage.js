import styled from 'styled-components';
import DrawerNavbarMain from '../../component/nav/DrawerNavbarMain';
import ProductOptionsModifyComponent from '../../component/product-options-modify-v2';

const Container = styled.div`

`;

const ProductOptionsModifyPage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <ProductOptionsModifyComponent></ProductOptionsModifyComponent>
            </Container>
        </>
    )
}

export default ProductOptionsModifyPage;
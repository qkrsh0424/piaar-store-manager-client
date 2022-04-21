import styled from 'styled-components';
import DrawerNavbarComponent from "../../component/nav/DrawerNavbarComponent";
import ProductManageComponent from '../../component/product_manage';

const Container = styled.div`

`;

const ProductManagePage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarComponent></DrawerNavbarComponent>
                <ProductManageComponent></ProductManageComponent>
            </Container>
        </>
    )
}

export default ProductManagePage;
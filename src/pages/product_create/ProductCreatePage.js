import styled from 'styled-components';
import ProductCreateComponent from '../../component/product_create_form';

const Container = styled.div`

`;

const ProductDetailPage = (props) => {
    return(
        <>
            <Container>
                <ProductCreateComponent></ProductCreateComponent>
            </Container>
        </>
    )
}

export default ProductDetailPage;
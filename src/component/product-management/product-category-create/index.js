import styled from "styled-components";
import CreateFormComponent from "./create-form/CreateForm.component";

const Container = styled.div`
    background-color: var(--piaar-background-color);
    min-height: 100vh;
    height: 100%;
    padding: 30px 30px 150px 230px;
    margin: 0 auto;
`

const ProductCategoryCreateComponent = (props) => {
    return (
        <Container>
            <CreateFormComponent />
        </Container>
    )
}

export default ProductCategoryCreateComponent;

import styled from "styled-components";
import ModifyFormComponent from "./modify-form/ModifyForm.component";

const Container = styled.div`
    background-color: var(--piaar-background-color);
    min-height: 100vh;
    height: 100%;
    padding: 30px 30px 150px 230px;
    margin: 0 auto;
`

const ProductCategoryModifyComponent = (props) => {
    return (
        <Container>
            <ModifyFormComponent />
        </Container>
    )
}

export default ProductCategoryModifyComponent;

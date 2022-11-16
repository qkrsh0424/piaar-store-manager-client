import styled from "styled-components";
import ModifyFormComponent from "./modify-form/ModifyForm.component";

const Container = styled.div`
    height: 100%;
    padding: 30px 30px 150px 230px;
    margin: 0 auto;

    @media screen and (max-width: 992px) {
        padding-left: 30px;
        padding-top: 60px;
    }
`;

const ProductModifyComponent = (props) => {
    return (
        <Container>
            <ModifyFormComponent />
        </Container>
    )
}

export default ProductModifyComponent;
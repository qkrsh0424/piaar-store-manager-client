import styled from "styled-components";
import ModifyFormComponent from "./modify-form/ModifyForm.component";

const Container = styled.div`
    height: 100%;
    padding: 60px 30px 150px 230px;
    margin: 0 auto;
    transition: all 0.5s;

    padding-left: ${props=> !props.navbarOpen && '30px'};

    @media screen and (max-width: 768px) {
        padding-left: 30px !important;
    }
`;

const ProductOptionsModifyComponent = (props) => {

    return (
        <Container navbarOpen={props.navbarOpen}>
            <ModifyFormComponent />
        </Container>
    )
}

export default ProductOptionsModifyComponent;
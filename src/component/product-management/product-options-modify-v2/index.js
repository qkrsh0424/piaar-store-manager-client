import { useEffect, useState } from "react";
import styled from "styled-components";
import { productOptionDataConnect } from "../../../data_connect/productOptionDataConnect";
import { BackdropHookComponent, useBackdropHook } from "../../../hooks/backdrop/useBackdropHook";
import useRouterHook from "../../../hooks/router/useRouterHook";
import ModifyFormComponent from "./modify-form/ModifyForm.component";

const Container = styled.div`
    height: 100%;
    padding: 30px 30px 150px 230px;
    margin: 0 auto;
`;

const ProductOptionsModifyComponent = (props) => {

    return (
        <Container>
            <ModifyFormComponent />
        </Container>
    )
}

export default ProductOptionsModifyComponent;
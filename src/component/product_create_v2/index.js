import { useEffect, useState } from "react";
import styled from "styled-components";
import { productCategoryDataConnect } from "../../data_connect/productCategoryDataConnect";
import CreateFormComponent from "./create_form/CreateForm.component";

const Container = styled.div`

`;

const ProductCreateComponent = (props) => {
    const [categoryList, setCategoryList] = useState(null);

    useEffect(() => {
        async function fetchInit() {
            // onActionOpenBackdrop();
            await __reqSearchProductCategory();
            // onActionCloseBackdrop();
        }
        fetchInit();
    }, []);

    const __reqSearchProductCategory = async () => {
        await productCategoryDataConnect().searchList()
            .then(res => {
                if(res.status === 200 && res.data && res.data.message === 'success') {
                    setCategoryList(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    return (
        <Container>
            <CreateFormComponent
                categoryList={categoryList}
            ></CreateFormComponent>
        </Container>
    )
}

export default ProductCreateComponent;
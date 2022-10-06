import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { productCategoryDataConnect } from "../../data_connect/productCategoryDataConnect";
import { productDataConnect } from "../../data_connect/productDataConnect";
import { BackdropHookComponent, useBackdropHook } from "../../hooks/backdrop/useBackdropHook";
import CreateFormComponent from "./create_form/CreateForm.component";

const Container = styled.div`
    background-color: #edf0f5;
    min-height: 100vh;
    height: 100%;
    padding-bottom: 50px;
`;

const ProductCreateComponent = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [categoryList, setCategoryList] = useState(null);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await __reqSearchProductCategory();
            onActionCloseBackdrop();
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

    const __reqCreateProductAndOptions = async (body) => {
        await productDataConnect().createProductAndOptions(body)
            .then(res => {
                if (res.status === 200 && res.data && res.data.message === 'success') {
                    navigate(location.state.prevUrl);
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const _onSubmit_createProductAndOptions = async (body) => {
        await __reqCreateProductAndOptions(body);
    }

    return (
        <Container>
            <CreateFormComponent
                categoryList={categoryList}

                onActionOpenBackdrop={onActionOpenBackdrop}
                onActionCloseBackdrop={onActionCloseBackdrop}

                _onSubmit_createProductAndOptions={_onSubmit_createProductAndOptions}
            ></CreateFormComponent>

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default ProductCreateComponent;
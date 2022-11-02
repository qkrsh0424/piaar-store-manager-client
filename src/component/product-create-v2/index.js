import styled from "styled-components";
import { productDataConnect } from "../../data_connect/productDataConnect";
import { BackdropHookComponent, useBackdropHook } from "../../hooks/backdrop/useBackdropHook";
import useProductCategoryHook from "../../hooks/product-category/useProductCategoryHook";
import useRouterHook from "../../hooks/router/useRouterHook";
import CreateFormComponent from "./create-form/CreateForm.component";

const Container = styled.div`
    background-color: var(--piaar-background-color);
    min-height: 100vh;
    height: 100%;
    padding-bottom: 50px;
`

const ProductCreateComponent = (props) => {
    const {
        location,
        navigateUrl
    } = useRouterHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const {
        productCategoryList
    } = useProductCategoryHook();

    const __handle = {
        req: {
            createProductAndOptions: async (body) => {
                await productDataConnect().createProductAndOptions(body)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            let data = {
                                pathname: location.state.routerUrl
                            }
                            navigateUrl(data);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            }
        },
        submit: {
            createProductAndOptions: async (body) => {
                await __handle.req.createProductAndOptions(body);
            }
        }
    }

    return (
        <Container>
            <CreateFormComponent
                categoryList={productCategoryList}

                _onSubmit_createProductAndOptions={__handle.submit.createProductAndOptions}
                onActionOpenBackdrop={onActionOpenBackdrop}
                onActionCloseBackdrop={onActionCloseBackdrop}
            />
            
            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default ProductCreateComponent;
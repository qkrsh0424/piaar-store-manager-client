import { useEffect, useState } from "react";
import styled from "styled-components";
import { productDataConnect } from "../../data_connect/productDataConnect";
import { BackdropHookComponent, useBackdropHook } from "../../hooks/backdrop/useBackdropHook";
import useProductCategoryHook from "../../hooks/product-category/useProductCategoryHook";
import useRouterHook from "../../hooks/router/useRouterHook";
import ModifyFormComponent from "./modify-form/ModifyForm.component";

const Container = styled.div`
    background-color: var(--piaar-background-color);
    min-height: 100vh;
    height: 100%;
    padding-bottom: 50px;
`;

const ProductModifyComponent = (props) => {
    // const [productAndOptions, setProductAndOptions] = useState(null);
    const [product, setProduct] = useState(null);

    const {
        location,
        query,
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

    useEffect(() => {
        async function fetchInit() {
            let productId = query.productId;
            onActionOpenBackdrop();
            await __handle.req.searchOneForProduct(productId)
            onActionCloseBackdrop();
        }

        fetchInit();        
    }, [])

    const __handle = {
        req: {
            modifyProduct: async (body) => {
                await productDataConnect().modifyProduct(body)
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
            },
            searchOneForProduct: async (id) => {
                await productDataConnect().searchOne(id)
                    .then(res => {
                        if(res.status === 200 && res.data && res.data.message === 'success'){
                            console.log(res.data.data);
                            setProduct(res.data.data);
                        }
                    })
            }
        },
        submit: {
            modifyProduct: async (body) => {
                await __handle.req.modifyProduct(body);
            }
        }
    }

    return (
        <Container>
            <ModifyFormComponent
                categoryList={productCategoryList}
                product={product}

                _onSubmit_modifyProduct={__handle.submit.modifyProduct}
            />

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default ProductModifyComponent;
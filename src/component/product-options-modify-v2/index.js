import { useEffect, useState } from "react";
import styled from "styled-components";
import { productOptionDataConnect } from "../../data_connect/productOptionDataConnect";
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

const ProductOptionsModifyComponent = (props) => {
    const [options, setOptions] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);

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
            setSelectedProductId(productId);

            onActionOpenBackdrop();
            await __handle.req.searchBatchByProductId(productId)
            onActionCloseBackdrop();
        }

        fetchInit();        
    }, [])

    const __handle = {
        req: {
            modifyOptions: async (body) => {
                await productOptionDataConnect().updateBatch(selectedProductId, body)
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
            searchBatchByProductId: async (id) => {
                await productOptionDataConnect().searchBatchByProductId(id)
                    .then(res => {
                        if(res.status === 200 && res.data && res.data.message === 'success'){
                            setOptions(res.data.data);
                        }
                    })
            }
        },
        submit: {
            modifyOptions: async (body) => {
                await __handle.req.modifyOptions(body);
            }
        }
    }

    return (
        <Container>
            <ModifyFormComponent
                categoryList={productCategoryList}
                options={options}

                _onSubmit_modifyOptions={__handle.submit.modifyOptions}
            />

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}

export default ProductOptionsModifyComponent;
import _ from "lodash";
import { useEffect, useState } from "react";
import useRouterHook from "../../../../../hooks/router/useRouterHook";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../../hooks/snackbar/useBasicSnackbarHookV2";
import ProductListModalComponent from "./modal/product-list/ProductListModal.component";
import { Container } from "./Operator.styled";
import SearchFieldView from "./view/SearchField.view";

export default function OperatorComponent(props) {
    const [productListModalOpen, setProductListModalOpen] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const {
        location,
    } = useRouterHook();

    const {
        open: snackbarOpen,
        message: snackbarMessage,
        severity: snackbarSeverity,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnackbar,
    } = useBasicSnackbarHookV2();

    useEffect(() => {
        if(!props.products) {
            return;
        }

        if(!location.state?.productCodes) {
            return;
        }

        let productCodes = location.state?.productCodes[0];
        props.onActionChangeSelectedProduct(productCodes);
    }, [location.state, props.products])

    const __handle = {
        action: {
            openProductListModal: (e) => {
                e.preventDefault();

                setProductListModalOpen(true);
            },
            closeProductListModal: () => {
                setProductListModalOpen(false);
            },
            selectProduct: (productCode) => {
                props.onActionChangeSelectedProduct(productCode);
                __handle.action.closeProductListModal();
                setSelectedCategory(null);
            }
        }
    }

    return (
        <>
            <Container>
                <SearchFieldView
                    products={props.products}
                    selectedProduct={props.selectedProduct}
                    selectedCategory={selectedCategory}

                    onActionOpenProductListModal={__handle.action.openProductListModal}
                    onActionRouteCategoryPerformancePage={__handle.action.routeCategoryPerformancePage}
                />
            </Container>

            {productListModalOpen &&
                <ProductListModalComponent
                    products={props.products}
                    modalOpen={productListModalOpen}

                    onActionSelectedProduct={__handle.action.selectProduct}
                    onActionCloseModal={__handle.action.closeProductListModal}
                />
            }

            {/* Snackbar */}
            {snackbarOpen &&
                <BasicSnackbarHookComponentV2
                    open={snackbarOpen}
                    message={snackbarMessage}
                    onClose={onActionCloseSnackbar}
                    severity={snackbarSeverity}
                    vertical={'top'}
                    horizontal={'right'}
                    duration={4000}
                ></BasicSnackbarHookComponentV2>
            }
        </>
    )
}
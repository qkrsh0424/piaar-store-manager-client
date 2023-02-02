import _ from "lodash";
import { useEffect, useState } from "react";
import useRouterHook from "../../../../../hooks/router/useRouterHook";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { getEndDate, getStartDate } from "../../../../../utils/dateFormatUtils";
import ProductListModalComponent from "./modal/product-list/ProductListModal.component";
import { Container } from "./Operator.styled";
import SearchFieldView from "./view/SearchField.view";

export default function OperatorComponent(props) {
    const [productListModalOpen, setProductListModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const {
        query,
        location,
        navigateUrl
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

    useEffect(() => {
        if(!props.selectedProduct) {
            return;
        }

        __handle.action.updateSelectedCategory();
    }, [props.selectedProduct])

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
            },
            updateSelectedCategory: () => {
                let category = props.categories?.filter(r => r.cid === props.selectedProduct.productCategoryCid)[0];
                setSelectedCategory(category);
            },
            routeCategoryPerformancePage: () => {
                let searchStartDate = query.startDate ? getStartDate(query.startDate) : null;
                let searchEndDate = query.endDate ? getEndDate(query.endDate) : null;
                let productCategoryNames = selectedCategory.name ? [selectedCategory.name] : null;

                let detailSearchValue = {
                    searchStartDate,
                    searchEndDate,
                    productCategoryNames
                }

                let data = {
                    pathname: '/sales-performance/category',
                    state: detailSearchValue
                }

                navigateUrl(data);
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
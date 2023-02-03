import { useEffect, useState } from "react";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../hooks/snackbar/useBasicSnackbarHookV2";
import ProductListModalComponent from "./modal/product-list/ProductListModal.component";
import { Container } from "./Operator.styled";
import ButtonFieldView from "./view/ButtonField.view";
import SearchFieldView from "./view/SearchField.view";

export default function OperatorComponent(props) {
    const [products, setProducts] = useState(null);
    const [selectedProductAndOptions, setSelectedProductAndOptions] = useState([]);

    const [productListModalOpen, setProductListModalOpen] = useState(false);

    const {
        open: snackbarOpen,
        message: snackbarMessage,
        severity: snackbarSeverity,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnackbar,
    } = useBasicSnackbarHookV2();

    useEffect(() => {
        if(!props.productAndOptions) {
            return;
        }

        __handle.action.initProductAndOption();
    }, [props.productAndOptions])

    const __handle = {
        action: {
            clearRoute: () => {
                props.onActionResetPerformance();
                setSelectedProductAndOptions([]);
            },
            initProductAndOption: () => {
                let productData = [...new Set(props.productAndOptions.map(r => JSON.stringify(r.product)))].map(r => JSON.parse(r));
                setProducts(productData);
            },
            openProductListModal: (e) => {
                e.preventDefault();

                setProductListModalOpen(true);
            },
            closeProductListModal: () => {
                setProductListModalOpen(false);
            },
            selectProduct: (productId) => {
                let selectedProduct = selectedProductAndOptions.some(r => r.product.id === productId);
                if(selectedProduct){
                    return;
                }

                if(selectedProductAndOptions.length > 4) {
                    let snackbarSetting = {
                        message: '조회 상품은 최대 5개 입니다.',
                        severity: 'error'
                    }
                    onActionOpenSnackbar(snackbarSetting);
                    return;
                }

                let product = products.filter(r => r.id === productId)[0];
                let options = props.productAndOptions.filter(r => r.product.id === product.id).map(r => r.option);
                let data = [{
                    product,
                    options: options
                }]
                setSelectedProductAndOptions([...selectedProductAndOptions, ...data]);
            },
            removeOptionOne: (e, optionId) => {
                e.stopPropagation();

                let updatedProductAndOptions = selectedProductAndOptions.map(r => {
                    let options = r.options.filter(r2 => r2.id !== optionId);

                    return {
                        ...r,
                        options
                    }
                })
                // 해당 상품에 대한 옵션이 모두 제거되면 상품도 제거
                updatedProductAndOptions = updatedProductAndOptions.filter(r => r.options?.length > 0);

                setSelectedProductAndOptions(updatedProductAndOptions);
            },
            removeProduct: (e, productId) => {
                e.stopPropagation();

                let updatedProductAndOptions = selectedProductAndOptions.filter(r => r.product.id !== productId);
                setSelectedProductAndOptions(updatedProductAndOptions);
            },
            changeSelectedProductAndOption: () => {
                props.onActionChangeSelectedOption(selectedProductAndOptions);
            }
        }
    }

    return (
        <>
            <Container>
                <SearchFieldView
                    products={products}
                    productAndOptions={props.productAndOptions}
                    selectedProductAndOptions={selectedProductAndOptions}

                    onActionOpenProductListModal={__handle.action.openProductListModal}
                    onActionRemoveOptionOne={__handle.action.removeOptionOne}
                    onActionRemoveProduct={__handle.action.removeProduct}
                />
                <ButtonFieldView
                    onActionClearRoute={__handle.action.clearRoute}
                    onActionChangeSelectedProductAndOptions={__handle.action.changeSelectedProductAndOption}
                />
            </Container>

            {productListModalOpen &&
                <ProductListModalComponent
                    products={products}
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
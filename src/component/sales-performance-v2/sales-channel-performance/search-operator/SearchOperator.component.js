import { useEffect, useState } from "react";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import CommonModalComponent from "../../../module/modal/CommonModalComponent";
import useProductAndOptionHook from "./hooks/useProductAndOptionHook";
import OptionListModalComponent from "./modal/option-list/OptionListModal.component";
import ProductListModalComponent from "./modal/product-list/ProductListModal.component";
import { Container } from "./SearchOperator.styled";
import ButtonFieldView from "./view/ButtonField.view";
import OptionSearchFieldView from "./view/OptionSearchField.view";
import ProductSearchFieldView from "./view/ProductSearchField.view";

export default function SearchOperatorComponent(props) {
    const [products, setProducts] = useState(null);
    const [options, setOptions] = useState(null);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const [productListModalOpen, setProductListModalOpen] = useState(false);
    const [optionListModalOpen, setOptionListModalOpen] = useState(false);

    const {
        query
    } = useRouterHook();

    const {
        productAndOptions,
        reqSearchAllRelatedProduct
    } = useProductAndOptionHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await reqSearchAllRelatedProduct();
            onActionCloseBackdrop();
        }

        fetchInit();
    }, [])

    useEffect(() => {
        if(!productAndOptions) {
            return;
        }

        __handle.action.initProductAndOption();
    }, [productAndOptions])


    const __handle = {
        action: {
            initProductAndOption: () => {
                let productData = [...new Set(productAndOptions.map(r => JSON.stringify(r.product)))].map(r => JSON.parse(r));
                setProducts(productData);
            },
            openProductListModal: (e) => {
                e.preventDefault();

                setProductListModalOpen(true);
            },
            closeProductListModal: () => {
                setProductListModalOpen(false);
            },
            updateSelectedProduct: (productId) => {
                let product = products.filter(r => r.id === productId)[0];
                setSelectedProduct(product);

                let optionData = productAndOptions.filter(r => r.product.id === productId)?.map(r => r.option);
                setOptions(optionData);
                setSelectedOption(null);

                __handle.action.closeProductListModal();
            },
            openOptionListModal: (e) => {
                e.preventDefault();

                setOptionListModalOpen(true);
            },
            closeOptionListModal: () => {
                setOptionListModalOpen(false);
            },
            updateSelectedOption: (optionId) => {
                let option = options.filter(r => r.id === optionId)[0];
                setSelectedOption(option);

                __handle.action.closeOptionListModal();
            },
        }
    }
    return (
        <Container>
            <form>
                <div className='button-box'>
                    <ProductSearchFieldView
                        selectedProduct={selectedProduct}
                        onActionOpenProductListModal={__handle.action.openProductListModal}
                    />

                    <OptionSearchFieldView
                        selectedOption={selectedOption}
                        onActionOpenOptionListModal={__handle.action.openOptionListModal}
                    />
                </div>


                <ButtonFieldView
                />
            </form>

            <BackdropHookComponent
                open={backdropOpen}
            />

            {/* 상품선택 모달 */}
            <CommonModalComponent
                open={productListModalOpen}
                maxWidth={'xs'}

                onClose={__handle.action.closeProductListModal}
            >
                <ProductListModalComponent
                    products={products}

                    onActionSelectedProduct={__handle.action.updateSelectedProduct}
                />
            </CommonModalComponent>
            
            {/* 옵션선택 모달 */}
            <CommonModalComponent
                open={optionListModalOpen}
                maxWidth={'xs'}

                onClose={__handle.action.closeOptionListModal}
            >
                <OptionListModalComponent
                    options={options}

                    onActionSelectedOption={__handle.action.updateSelectedOption}
                />
            </CommonModalComponent>
        </Container>
    )
}
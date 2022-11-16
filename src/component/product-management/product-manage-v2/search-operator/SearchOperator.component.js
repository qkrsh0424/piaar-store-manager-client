import { getOptionSearchHeader, getProductSearchHeader } from "../../../../static-data/product-manage/productManageStaticData";
import ButtonFieldView from "./ButtonField.view";
import CategorySearchFieldView from "./CategorySearchField.view";
import OptionSearchFieldView from "./OptionSearchField.view";
import ProductSearchFieldView from "./ProductSearchField.view";
import { Container } from "./SearchOperator.styled";
import useSearchOperatorHook from "../hooks/useSearchOperatorHook";
import useProductCategoryHook from "../hooks/useProductCategoryHook";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import { useEffect } from "react";

const productSearchHeader = getProductSearchHeader();
const optionSearchHeader = getOptionSearchHeader();

const OperatorComponent = (props) => {
    const {
        productCategoryList : categoryList,

        reqSearchAllProductCategory
    } = useProductCategoryHook();

    const {
        productSearchHeaderName,
        optionSearchHeaderName,
        categorySearchQuery,
        productSearchQuery,
        optionSearchQuery,

        onChangeCategorySearchQuery,
        onChangeProductSearchHeader,
        onChangeOptionSearchHeader,
        onChangeProductSearchQuery,
        onChangeOptionSearchQuery,
        onSubmitRouteToSearch,
        onActionClearRoute
    } = useSearchOperatorHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(() => {
        async function fetchInit() {
            onActionOpenBackdrop();
            await reqSearchAllProductCategory();
            onActionCloseBackdrop();
        }

        fetchInit();
    }, [])

    return (
        <Container>
            <form onSubmit={(e) => onSubmitRouteToSearch(e)}>
                <CategorySearchFieldView
                    categoryList={categoryList}
                    categorySearchQuery={categorySearchQuery}

                    onChangeCategorySearchQuery={onChangeCategorySearchQuery}
                ></CategorySearchFieldView>

                <ProductSearchFieldView
                    productSearchHeader={productSearchHeader}
                    productSearchHeaderName={productSearchHeaderName}
                    productSearchQuery={productSearchQuery}

                    onChangeProductSearchHeader={onChangeProductSearchHeader}
                    onChangeProductSearchQuery={onChangeProductSearchQuery}
                ></ProductSearchFieldView>

                <OptionSearchFieldView
                    optionSearchHeader={optionSearchHeader}
                    optionSearchHeaderName={optionSearchHeaderName}
                    optionSearchQuery={optionSearchQuery}

                    onChangeOptionSearchHeader={onChangeOptionSearchHeader}
                    onChangeOptionSearchQuery={onChangeOptionSearchQuery}
                ></OptionSearchFieldView>

                <ButtonFieldView
                    onActionClearRoute={onActionClearRoute}

                ></ButtonFieldView>
            </form>

            <BackdropHookComponent 
                open={backdropOpen}
            />
        </Container>
    )
}

export default OperatorComponent;

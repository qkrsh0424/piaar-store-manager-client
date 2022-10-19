import { getOptionSearchHeader, getProductSearchHeader } from "../../../static-data/product-manage/productManageStaticData";
import ButtonFieldView from "./ButtonField.view";
import CategorySearchFieldView from "./CategorySearchField.view";
import OptionSearchFieldView from "./OptionSearchField.view";
import ProductSearchFieldView from "./ProductSearchField.view";
import { Container } from "./SearchOperator.styled";
import useProductCategoryHook from "../../../hooks/product_category/useProductCategoryHook";
import useSearchOperatorHook from "../hooks/useSearchOperatorHook";

const productSearchHeader = getProductSearchHeader();
const optionSearchHeader = getOptionSearchHeader();

const OperatorComponent = (props) => {
    const {
        productCategoryList : categoryList
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
        </Container>
    )
}

export default OperatorComponent;

import { useEffect, useReducer } from "react";
import CategorySelectorFieldView from "./CategorySelectorField.view";
import ProductSelectorFieldView from "./ProductSelectorField.view";
import { Container } from "./Selector.styled";

const SelectorComponent = (props) => {

    const onChangeCategoryValue = (e) => {
        let categoryId =  e.target.value;

        props._onAction_changeCategory(categoryId);
    }

    const onChangeProductValue = (e) => {
        let productId = e.target.value;

        props._onAction_changeProduct(productId);
    }

    return (
        <Container>
            <CategorySelectorFieldView
                categoryList={props.categoryList}

                onChangeCategoryValue={(e) => onChangeCategoryValue(e)}
            ></CategorySelectorFieldView>
            <ProductSelectorFieldView
                productViewList={props.productViewList}
                selectedProductId={props.selectedProductId}

                onChangeProductValue={(e) => onChangeProductValue(e)}
            ></ProductSelectorFieldView>
        </Container>
    )
}

export default SelectorComponent;

const initialProductList = null;

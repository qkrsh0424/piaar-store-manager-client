import { useEffect, useReducer } from "react";
import CategorySelectorFieldView from "./CategorySelectorField.view";
import ProductSelectorFieldView from "./ProductSelectorField.view";
import { Container } from "./Selector.styled";

const SelectorComponent = (props) => {
    const [productViewList, dispatchProductViewList] = useReducer(productViewListReducer, initialProductViewList);

    useEffect(() => {
        if(!props.productList) {
            return;
        }

        if(!props.selectedCategoryId) {
            return;
        }

        let data = [...props.productList];
        if(props.selectedCategoryId !== 'total') {
            data = props.productList?.filter(r => r.category.id === props.selectedCategoryId);
        }

        dispatchProductViewList({
            type: 'INIT_DATA',
            payload: data
        })
    }, [props.selectedCategoryId, props.productList])

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
                productViewList={productViewList}
                selectedProductId={props.selectedProductId}

                onChangeProductValue={(e) => onChangeProductValue(e)}
            ></ProductSelectorFieldView>
        </Container>
    )
}

export default SelectorComponent;

const initialProductViewList = null;

const productViewListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialProductViewList;
        default: return { ...state };
    }
}


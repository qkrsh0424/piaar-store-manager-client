import { useEffect, useReducer } from "react";
import CategorySelectorFieldView from "./CategorySelectorField.view";
import ProductSelectorFieldView from "./ProductSelectorField.view";
import { Container } from "./Selector.styled";

const SelectorComponent = (props) => {
    const [productList, dispatchProductList] = useReducer(productListReducer, initialProductList);
    
    useEffect(() => {
        if(!props.selectedCategoryId) {
            return;
        }

        if(!props.productList) {
            return;
        }

        let data = props.productList;
        if(props.selectedCategoryId !== 'total') {
            data = props.productList.filter(r => r.category.id === props.selectedCategoryId);
        }

        dispatchProductList({
            type: 'INIT_DATA',
            payload: data
        })
    }, [props.selectedCategoryId])

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
                productList={productList}
                selectedProductId={props.selectedProductId}

                onChangeProductValue={(e) => onChangeProductValue(e)}
            ></ProductSelectorFieldView>
        </Container>
    )
}

export default SelectorComponent;

const initialProductList = null;

const productListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialProductList;
        default:
            return state;
    }
}

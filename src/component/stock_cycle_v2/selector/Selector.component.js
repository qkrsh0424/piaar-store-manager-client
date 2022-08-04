import { useEffect, useReducer } from "react";
import { Container } from "./Selector.styled"
import SelectorFieldView from "./SelectorField.view";

const SelectorComponent = (props) => {
    const [productViewList, dispatchProductViewList] = useReducer(productViewListReducer, initialProductViewList);
    
    useEffect(() => {
        if(!(props.categoryList && props.productList)) {
            return;
        }

        let product = props.productList;
        if(props.selectedCategory !== 'total') {
            product = props.productList.filter(r => r.category.id === props.selectedCategory.id);
        }
        
        dispatchProductViewList({
            type: 'INIT_DATA',
            payload: product
        })
    }, [props.productList, props.selectedCategory])

    const onChangeSelectedCategory = (e) => {
        props._onAction_changeSelectedCategory(e);
    }

    const onChangeSelectedProduct = (e) => {
        props._onAction_changeSelectedProduct(e);
    }

    return (
        <Container>
            <SelectorFieldView
                categoryList={props.categoryList}
                productViewList={productViewList}
                selectedCategory={props.selectedCategory}
                selectedProduct={props.selectedProduct.product}

                onChangeSelectedCategory={onChangeSelectedCategory}
                onChangeSelectedProduct={onChangeSelectedProduct}
            ></SelectorFieldView>
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
        default:
            return {...state};
    }
}
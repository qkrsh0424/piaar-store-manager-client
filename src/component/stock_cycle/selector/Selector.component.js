import { useEffect, useReducer } from "react";
import { Container } from "./Selector.styled"
import SelectorFieldView from "./SelectorField.view";

import { CheckBoxFieldWrapper } from "./Selector.styled";
import { useState } from "react";

function CheckBoxField({ element, onClick, checked, name}) {
    return (
        <CheckBoxFieldWrapper >
            <div
                className={`checkbox-group ${name === 'showOutOfStockOption' ? 'out-of-stock' : ''}`}
                onClick={onClick}
            >
                <input
                    type='checkbox'
                    className='checkbox-input'
                    checked={checked}
                    name={name}
                    readOnly    // div로 event처리를 위해
                />
                <span>{element}</span>
            </div>
        </CheckBoxFieldWrapper>
    )
}

const SelectorComponent = (props) => {
    const [productViewList, dispatchProductViewList] = useReducer(productViewListReducer, initialProductViewList);
    const [searchInput, setSearchInput] = useState(null);

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
        setSearchInput(null);
        props._onAction_changeSelectedCategory(e);
    }

    const onChangeSelectedProduct = (e) => {
        setSearchInput(null);
        props._onAction_changeSelectedProduct(e);
    }

    const onActionChangeHideNonReleaseOption = (e) => {
        e.stopPropagation();

        props._onAction_changeHideNonReleaseOpiton();
    }

    const onActionChangeShowOutOfStockOption = (e) => {
        e.stopPropagation();

        props._onAction_changeShowOutOfStockOption();
    }

    const onChangeSearchInput = (e) => {
        let value = e.target.value;
        setSearchInput(value);
    }

    const onActionSearchProduct = () => {
        props._onAction_searchProduct(searchInput);
        onActionResetSearchInput();
    }

    const onActionResetSearchInput = () => {
        setSearchInput(null);
    }

    const onActionConfirmSelectedProduct = (value) => {
        props._onAction_searchProduct(value);
        onActionResetSearchInput();
    }

    return (
        <Container>
            <SelectorFieldView
                categoryList={props.categoryList}
                productViewList={productViewList}
                selectedCategory={props.selectedCategory}
                selectedProduct={props.selectedProduct}
                searchInput={searchInput}

                onChangeSelectedCategory={onChangeSelectedCategory}
                onChangeSelectedProduct={onChangeSelectedProduct}
                onChangeSearchInput={onChangeSearchInput}
                onActionSearchProduct={onActionSearchProduct}
                onActionResetSearchInput={onActionResetSearchInput}
                onActionConfirmSelectedProduct={onActionConfirmSelectedProduct}
            ></SelectorFieldView>
            
            <div className='checkbox-wrapper'>
                <CheckBoxField
                    element={'(W1-8) 미판매 상품 숨기기'}
                    checked={props.hideNonReleaseOption}
                    name={'hideNonReleaseOption'}
                    onClick={onActionChangeHideNonReleaseOption}
                ></CheckBoxField>
                <CheckBoxField
                    element={'재고부족 예상 상품 표시'}
                    checked={props.showOutOfStockOption}
                    name={'showOutOfStockOption'}
                    onClick={onActionChangeShowOutOfStockOption}
                ></CheckBoxField>
            </div>
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
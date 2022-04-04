import { useState, useEffect, useReducer } from 'react';

import { Container } from "./CategorySelector.styled";
import CategorySelectorFieldView from './CategorySelectorField.view';

const CategorySelectorComponent = (props) => {

    const onChangeCategoryCidValue = (categoryCid) => {
        props._onAction_selectProductCategory(categoryCid);
    }

    return(
        <Container>
            <CategorySelectorFieldView
                createProductData={props.createProductData}
                categoryList={props.categoryList}

                onChangeCategoryCidValue={(categoryCid) => onChangeCategoryCidValue(categoryCid)}
            ></CategorySelectorFieldView>
        </Container>
    )
}

export default CategorySelectorComponent;
import { useState, useEffect, useReducer } from 'react';

import { Container } from "./Header.styled";
import HeaderFieldView from './HeaderField.view';

const HeaderComponent = (props) => {

    const onChangeStockReflectedSelector = () => {
        props._onAction_stockReflectedSelector();
    }
    
    return(
        <Container>
            <HeaderFieldView
                createProductData={props.createProductData}

                onChangeStockReflectedSelector={() => onChangeStockReflectedSelector()}
            ></HeaderFieldView>
        </Container>
    )
}

export default HeaderComponent;

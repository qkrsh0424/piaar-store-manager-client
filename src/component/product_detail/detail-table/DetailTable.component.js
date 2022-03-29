import { useState, useEffect, useReducer } from 'react';
import DetailInfoTableFieldView from './DetailInfoTableField.view';
import ArrowField from './DetailTable.styled';

import { Container } from "./DetailTable.styled";
import OptionInfoTableFieldView from './OptionInfoTableField.view';
import ProductInfoTableFieldView from './ProductInfoTableField.view';

const DetailTableComponent = (props) => {

    return(
        <Container>
            <ProductInfoTableFieldView
            ></ProductInfoTableFieldView>

            <OptionInfoTableFieldView
            ></OptionInfoTableFieldView>
            
            <DetailInfoTableFieldView
            ></DetailInfoTableFieldView>
        </Container>
    )
}

export default DetailTableComponent;
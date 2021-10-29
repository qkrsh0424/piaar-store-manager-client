import {useState, useEffect} from 'react';
import { withRouter } from 'react-router';

import ProductInformationBody from "./ProductInformationBody";

const ProductInformationMain = (props) => {
    return (
        <>
            <ProductInformationBody
            ></ProductInformationBody>
        </>
    )
}

export default withRouter(ProductInformationMain);
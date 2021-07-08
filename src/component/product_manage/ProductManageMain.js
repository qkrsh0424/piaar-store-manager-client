import axios from 'axios';
import { useEffect, useState } from 'react';

// component
import DrawerNavbarMain from '../nav/DrawerNavbarMain';
import ProductManageBody from './ProductManageBody';

const ProductManageMain = () => {
    return (
        <>
            <DrawerNavbarMain></DrawerNavbarMain>
            <ProductManageBody

            ></ProductManageBody>
        </>
    );
}

export default ProductManageMain;
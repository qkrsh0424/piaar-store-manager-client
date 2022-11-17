import { useState } from 'react';
import styled from 'styled-components';
import DrawerNavbarMain from '../../../component/nav/DrawerNavbarMain';
import ProductManagementNavbar from '../../../component/product-management/navbar/ProductManagementNavbar';
import ProductOptionsModifyComponent from '../../../component/product-management/product-options-modify-v2';

const Container = styled.div`
    position: relative;
    height: 100%;
    min-height: 100vh;
    background-color: var(--piaar-background-color);
`;

const ProductOptionsModifyPage = () => {
    const [navbarOpen, setNavbarOpen] = useState(true);

    const onActionOpenNavbar = () => {
        setNavbarOpen(true);
    }
    
    const onActionCloseNavbar = () => {
        setNavbarOpen(false);
    }

    return(
        <>
            <Container>
                <DrawerNavbarMain />
                <ProductManagementNavbar
                    navbarOpen={navbarOpen}

                    onActionOpenNavbar={onActionOpenNavbar}
                    onActionCloseNavbar={onActionCloseNavbar}
                />
                <ProductOptionsModifyComponent
                    navbarOpen={navbarOpen}
                />
            </Container>
        </>
    )
}

export default ProductOptionsModifyPage;
import { useState } from 'react';
import styled from 'styled-components';
import DrawerNavbarMain from '../../../component/nav/DrawerNavbarMain';
import CategoryPerformanceComponent from '../../../component/sales-performance-v2/category-performance';
import ManagementNavbar from '../../../component/sales-performance-v2/navbar/ManagementNavbar';

const Container = styled.div`
    position: relative;
    height: 100%;
    min-height: 100vh;
    background-color: var(--piaar-background-color);
`;

const CategoryPerformancePage = () => {
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
                <DrawerNavbarMain></DrawerNavbarMain>
                <ManagementNavbar
                    navbarOpen={navbarOpen}

                    onActionOpenNavbar={onActionOpenNavbar}
                    onActionCloseNavbar={onActionCloseNavbar}
                />
                <CategoryPerformanceComponent
                    navbarOpen={navbarOpen}
                />
            </Container>
        </>
    )
}

export default CategoryPerformancePage;
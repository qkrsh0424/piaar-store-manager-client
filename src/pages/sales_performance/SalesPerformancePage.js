import { useState } from 'react';
import styled from 'styled-components';
import DrawerNavbarMain from '../../component/nav/DrawerNavbarMain';
// import SalesPerformanceComponent from '../../component/sales_performance';
import SalesPerformanceComponentV2 from '../../component/sales_performance-v2/dashboard';
import ManagementNavbar from '../../component/sales_performance-v2/navbar/ManagementNavbar';

const Container = styled.div`
    position: relative;
    height: 100%;
    min-height: 100vh;
    background-color: var(--piaar-background-color);
`;

const SalesPerformancePage = () => {
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
                <SalesPerformanceComponentV2
                    navbarOpen={navbarOpen}
                />
            </Container>
        </>
    )
}

export default SalesPerformancePage;
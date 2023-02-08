import { useEffect, useState } from 'react';
import styled from 'styled-components';
import DrawerNavbarMain from '../../../component/nav/DrawerNavbarMain';
import SalesPerformanceDashboardComponent from '../../../component/sales-performance-v2/dashboard';
// import SalesPerformanceComponent from '../../component/sales_performance';
import ManagementNavbar from '../../../component/sales-performance-v2/navbar/ManagementNavbar';
import useRouterHook from '../../../hooks/router/useRouterHook';

const Container = styled.div`
    position: relative;
    height: 100%;
    min-height: 100vh;
    background-color: var(--piaar-background-color);
`;

const SalesPerformanceDashboardPage = () => {
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
                <SalesPerformanceDashboardComponent
                    navbarOpen={navbarOpen}
                />
            </Container>
        </>
    )
}

export default SalesPerformanceDashboardPage;
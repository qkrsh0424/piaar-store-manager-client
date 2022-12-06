import styled from 'styled-components';
import DrawerNavbarMain from '../../component/nav/DrawerNavbarMain';
// import SalesPerformanceComponent from '../../component/sales_performance';
import SalesPerformanceComponentV2 from '../../component/sales_performance-v2';

const Container = styled.div`

`;

const SalesPerformancePage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <SalesPerformanceComponentV2></SalesPerformanceComponentV2>
            </Container>
        </>
    )
}

export default SalesPerformancePage;
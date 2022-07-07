import styled from 'styled-components';
import DrawerNavbarMain from '../../component/nav/DrawerNavbarMain';
import SalesAnalysisComponent from '../../component/sales_analysis';

const Container = styled.div`

`;

const SalesAnalysisPage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <SalesAnalysisComponent></SalesAnalysisComponent>
            </Container>
        </>
    )
}

export default SalesAnalysisPage;
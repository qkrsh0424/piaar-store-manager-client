import styled from 'styled-components';
import DrawerNavbarComponent from "../../component/nav/DrawerNavbarComponent";
import SalesAnalysisComponent from '../../component/sales_analysis';

const Container = styled.div`

`;

const SalesAnalysisPage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarComponent></DrawerNavbarComponent>
                <SalesAnalysisComponent></SalesAnalysisComponent>
            </Container>
        </>
    )
}

export default SalesAnalysisPage;
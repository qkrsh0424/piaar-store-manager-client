import styled from 'styled-components';
import DrawerNavbarMain from '../../component/nav/DrawerNavbarMain';
import StockAnalysisComponent from '../../component/stock_analysis';

const Container = styled.div`

`;

const StockAnalysisPage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <StockAnalysisComponent></StockAnalysisComponent>
            </Container>
        </>
    )
}

export default StockAnalysisPage;
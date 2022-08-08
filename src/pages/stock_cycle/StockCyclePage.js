import styled from 'styled-components';
import DrawerNavbarMain from '../../component/nav/DrawerNavbarMain';
import StockCycleComponent from '../../component/stock_cycle_v3';

const Container = styled.div`

`;

const StockCyclePage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <StockCycleComponent></StockCycleComponent>
            </Container>
        </>
    )
}

export default StockCyclePage;
import styled from 'styled-components';
import ExcelTranslatorComponent from '../../component/excel_translator';
import DrawerNavbarMain from '../../component/nav/DrawerNavbarMain';

const Container = styled.div`

`;

const ExcelTranslatorPage = () => {
    return(
        <>
            <Container>
                <DrawerNavbarMain></DrawerNavbarMain>
                <ExcelTranslatorComponent></ExcelTranslatorComponent>
            </Container>
        </>
    )
}

export default ExcelTranslatorPage;
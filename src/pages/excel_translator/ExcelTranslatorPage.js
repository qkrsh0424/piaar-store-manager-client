import styled from 'styled-components';
import ExcelTranslatorComponent from '../../component/excel_translator';
import DrawerNavbarComponent from "../../component/nav/DrawerNavbarComponent";

const Container = styled.div`

`;

const ExcelTranslatorPage = (props) => {
    return(
        <>
            <Container>
                <DrawerNavbarComponent></DrawerNavbarComponent>
                <ExcelTranslatorComponent></ExcelTranslatorComponent>
            </Container>
        </>
    )
}

export default ExcelTranslatorPage;
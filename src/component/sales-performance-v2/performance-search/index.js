import styled from "styled-components"
import { BackdropHookComponent, useBackdropHook } from "../../../hooks/backdrop/useBackdropHook";
import ItemTableComponent from "./item-table/ItemTable.component";
import OperatorComponent from "./operator/Operator.component";

const Container = styled.div`
    height: 100%;
    padding: 60px 30px 150px 230px;
    margin: 0 auto;
    transition: all 0.5s;

    padding-left: ${props=> !props.navbarOpen && '30px'};

    @media screen and (max-width: 768px) {
        padding-left: 30px !important;
    }
`;

function PageTitleFieldView({ title }) {
    return (
        <div>
            <div className='page-title'>{title}</div>
        </div>
    )
}

export default function PerformanceSearchComponent(props) {

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    return (
        <Container navbarOpen={props.navbarOpen}>
            <PageTitleFieldView title={'성과 검색'} />

            <OperatorComponent
                
            />

            <ItemTableComponent
                
            />
            
            <BackdropHookComponent
                open={backdropOpen}
            />
        </Container>
    )
}
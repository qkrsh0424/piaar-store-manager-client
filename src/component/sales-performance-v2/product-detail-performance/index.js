import styled from "styled-components";
import PerformanceContainerComponent from "./performance-container";

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

export default function ProductDetailPerformanceComponent (props) {
    return (
        <Container navbarOpen={props.navbarOpen}>
            <PageTitleFieldView title={'상품 - 상세 성과'} />

            <PerformanceContainerComponent />
        </Container>
    )
}
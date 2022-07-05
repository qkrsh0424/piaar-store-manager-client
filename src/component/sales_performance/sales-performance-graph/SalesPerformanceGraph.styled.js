import styled from "styled-components";

const Container = styled.div`
    padding: 2%;
`;

const GraphTitleFieldWrapper = styled.div`
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: 600;
`;

const RevenueGraphFieldWrapper = styled.div`
    padding: 20px;
    margin-bottom: 20px;
    height: 400px;
`;

const OrderAnalysisGraphFieldWrapper = styled.div`
    padding: 20px;
    height: 400px;
`;

const TableFieldWrapper = styled.div`
    padding: 20px;
    height: 400px;
    text-align: center;
`;

export {
    Container,
    RevenueGraphFieldWrapper,
    GraphTitleFieldWrapper,
    OrderAnalysisGraphFieldWrapper,
    TableFieldWrapper
}
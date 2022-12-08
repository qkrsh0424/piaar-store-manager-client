import styled from "styled-components";

const Container = styled.div`
    padding: 20px 0;
    
    .graph-box {
        background-color: white;
        border-radius: 10px;
    }
`;

const GraphBoardFieldWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;

    .dimension-button-box {
        display: flex;
    }
`;

const GraphBodyFieldWrapper = styled.div`

`;

const GraphSummaryFieldWrapper = styled.div`

`;

export {
    Container,
    GraphBoardFieldWrapper,
    GraphBodyFieldWrapper,
    GraphSummaryFieldWrapper
}
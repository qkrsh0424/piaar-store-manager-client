import styled from "styled-components";

const Container = styled.div`
    background-color: white;
    border-radius: 10px;
    margin-bottom: 30px;

    .content-box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        padding: 20px;
        overflow: auto;
    }
`;

const GraphBoardFieldWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--defaultBorderColor);
    padding: 20px;

    .graph-title {
        font-size : 1.2rem;
        font-weight: 700;
    }

    .graph-info-text {
        font-size: 14px;
    }
`;

const GraphBodyFieldWrapper = styled.div`
    min-width: 1000px;
    min-height: 230px;
    display: flex;
    justify-content: space-around;
    width: 100%;

    .half-type-graph {
        width: 45%;

        @media screen and (max-width: 992px) {
            width: 100%;
            flex-direction: column;
        }
    }

    .graph-title {
        font-weight: 600;
    }

    .graph-wrapper {
        height: 180px;
    }
`;

export {
    Container,
    GraphBoardFieldWrapper,
    GraphBodyFieldWrapper
}
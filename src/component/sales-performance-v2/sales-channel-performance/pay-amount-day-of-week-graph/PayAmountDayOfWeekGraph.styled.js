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
    min-height: 400px;
    width: 100%;

    .graph-wrapper {
        height: 400px;
    }
`;

export {
    Container,
    GraphBoardFieldWrapper,
    GraphBodyFieldWrapper
}
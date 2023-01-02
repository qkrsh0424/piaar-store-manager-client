import styled from "styled-components";

const Container = styled.div`
    background-color: white;
    border-radius: 10px;
    margin-bottom: 30px;

    .content-box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 10px;
        padding: 20px;
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

    .right-el-box {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .dimension-button-box {
        display: flex;
    }

    .dimension-button-box .button-el {
        width: 40px;
        height: 40px;
        background-color: var(--defaultButtonColor);
        border: 1px solid var(--defaultBorderColor);
        
        &.checked {
            background-color: #555;
            border: 1px solid #555;
            color: white;
        }
    }
`;

const GraphBodyFieldWrapper = styled.div`
    min-width: 1000px;
    min-height: 400px;
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

    .graph-wrapper {
        height: 400px;
    }
`;

export {
    Container,
    GraphBoardFieldWrapper,
    GraphBodyFieldWrapper
}
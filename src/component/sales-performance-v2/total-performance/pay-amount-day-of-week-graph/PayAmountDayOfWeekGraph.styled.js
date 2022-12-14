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

const GraphSummaryFieldWrapper = styled.div`
    min-width: 250px;
    width: 20%;
    height: 400px;

    .title {
        font-size: 1.1rem;
        font-weight: 700;
        padding: 10px;
        text-align: center;
        height: 50px;
    }

    ul {
        list-style: none;
        padding: 10px;
    }

    ul li {
        height: 38px;
        margin-bottom: 10px;
        border-bottom: 1px solid rgb(222, 222, 222);

        &:last-child {
            margin-bottom: 0;
        }
    }

    ul li .icon-dot {
        position: relative;
        margin-right: 10px;
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 50%;
        vertical-align: middle;
    }

    .data-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
    }
`;

export {
    Container,
    GraphBoardFieldWrapper,
    GraphBodyFieldWrapper,
    GraphSummaryFieldWrapper
}
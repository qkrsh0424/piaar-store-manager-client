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

    .vertical-half-type-summary {
        display: flex;
        flex-direction: column;
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

   .button-el{
        overflow: hidden;
        position: relative;
        width: 45px;
        height: 45px;
        padding: 2px;
        border-radius: 5px;
        background: #fff;
        border: 1px solid var(--defaultBorderColor);
        font-size: 16px;
        cursor: pointer;
        -webkit-transition: all .1s;
        transition: all .1s;

        :hover {
            background-color: #fafafa;
        }

        @media all and (max-width:992px) {
            margin: 0;
            width: 80px;
            font-size: 14px;
        }
    }
`;

const GraphBodyFieldWrapper = styled.div`
    min-width: 1000px;
    min-height: 400px;
    width: 80%;

    .graph-wrapper {
        height: 400px;
    }
`;

const GraphSummaryFieldWrapper = styled.div`
    min-width: 280px;
    width: 20%;
    height: 400px;
    overflow: auto;
    background-color: #fafafa;
    border-radius: 10px;
    border: 1px solid #efefef;

    .title {
        font-size: 1.1rem;
        font-weight: 700;
        padding: 10px;
        text-align: center;
        height: 50px;
    }

    .summary-box {
        height: 350px;
        overflow: auto;

        @media screen and (max-width: 992px) {
            font-size: 14px;
        }
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
        height: auto;
    }
`;

export {
    Container,
    GraphBoardFieldWrapper,
    GraphBodyFieldWrapper,
    GraphSummaryFieldWrapper
}
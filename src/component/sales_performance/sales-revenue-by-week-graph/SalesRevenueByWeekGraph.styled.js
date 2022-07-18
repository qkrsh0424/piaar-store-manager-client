import styled from "styled-components";

const Container = styled.div`
    padding: 2%;

    .graph-group {
        padding: 10px 0;
    }

    .flex-box {
        display: flex;
        justify-content: space-around;
        align-items: center;

        @media screen and (max-width: 992px) {
            flex-wrap: wrap;
        }
    }
`;

const GraphTitleFieldWrapper = styled.div`
    font-size: 1.1rem;
    font-weight: 700;
    padding: 20px 0;

    .title {
        width: 100%;
        background-color: #e1e1e1bb;
        color: #000;
        text-align: center;
        padding: 5px 0;
    }

    .info-text {
        font-size: 14px;
        color: var(--erp-main-color);
        padding: 10px;
        width: 100%;
        text-align: right;
    }
`;

const GraphFieldWrapper = styled.div`
    padding: 20px;
    margin-bottom: 20px;
    min-height: 300px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;

    .graph-wrapper {
        height: 400px;
    }

    .half-type-graph {
        width: 45%;
        height: 400px;

        @media screen and (max-width: 992px) {
            width: 100%;
            flex-direction: column;
            height: 300px;
        }
    }

    .md-height-graph {
        height: 300px;
    }

    .checkbox-group {
        display: flex;
        gap: 15px;
        padding: 1% 2%;
        font-weight: 600;
    }

    .checkbox-input {
        margin: 5px;
    }
`;

export{
    Container,
    GraphTitleFieldWrapper,
    GraphFieldWrapper
}
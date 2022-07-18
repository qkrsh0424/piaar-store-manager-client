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

    .graph-wrapper {
        height: 400px;
    }
`;

const GraphAnalysisResultFieldWrapper = styled.div`
    width: 400px;
    height: 340px;
    border-radius: 5px;
    box-shadow: 0px 0px 7px 3px #eee;
    padding: 10px;

    @media screen and (max-width: 992px) {
        height: 200px;
    }

    .analysis-group {
        overflow: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        height: 80%;
    }

    .title-text {
        font-weight: 700;
        padding: 10px;
        text-align: center;
        height: 50px;
    }

    .value-info {
        font-weight: 500;
        font-size: 1rem;
        color: #444;

        @media screen and (max-width: 992px) {
            font-size: 12px;
        }
    }

    .analysis-value {
        border-bottom: 1px solid #dedede;
        font-size: 1.1rem;
        display : flex;
        justify-content: space-between;
        align-items : center;
        font-weight: 700;
        padding: 8px 10px;
        color: #3a3b88;

        @media screen and (max-width: 992px) {
            font-size: 12px;
        }
    }

    .icon-dot {
        position: relative;
        margin-right: 5px;
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 50%;
        vertical-align: middle;
    }
`;

export{
    Container,
    GraphTitleFieldWrapper,
    GraphFieldWrapper,
    GraphAnalysisResultFieldWrapper
}
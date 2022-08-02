import styled from "styled-components";

const Container = styled.div`
`;

const AnalysisGraphFieldWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #ffffff;
    padding: 0 10px;
    min-height: 300px;
    border-radius: 10px;
    margin: 10px 0;
    overflow: auto;
    box-shadow: 1px 1px 10px 3px #e1e2f577;

    .chart-title {
        font-size: 16px;
        font-weight: 600;
        padding: 10px;
    }

    .chart-group {
        display: flex;
        align-items: center;
        min-height: 350px;
        padding: 20px;
        justify-content: flex-start;

        @media screen and (max-width: 992px) {
            justify-content: flex-start;
        }
    }

    .graph-wrapper {
        padding: 10px;
        height: 170px;
        width: 400px;
    }
`;

const TitleFieldWrapper = styled.div`
    font-size: 1.1rem;
    font-weight: 700;
    padding-top: 20px;

    .title {
        width: 100%;
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

export {
    Container,
    AnalysisGraphFieldWrapper,
    TitleFieldWrapper
}
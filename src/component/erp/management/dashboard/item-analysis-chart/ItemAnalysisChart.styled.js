import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
    padding-bottom: 100px;
`;

const ChartFieldWrapper = styled.div`

    .chart-title {
        font-size: 16px;
        font-weight: 600;
        padding: 20px;
    }
    
    .chart-group-wrapper {
        margin-top: 20px;
    }

    .chart-group {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        box-shadow: 1px 1px 10px 3px #e1e2f577;
        border-radius: 10px;
        min-height: 350px;

        @media screen and (max-width: 992px) {
            flex-direction: column;
            overflow: auto;
        }
    }

    .chart-box {
        width: 25%;

        @media screen and (max-width: 992px) {
            width: 200px;
        }
    }
`;

const DefaultChartFieldWrapper  = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-height: 300px;

    @media screen and (max-width: 992px) {
        flex-direction: column;
    }

    .chart-title {
        font-size: 14px;
        font-weight: 600;
        padding: 10px;
    }

    .chart-box {
        width: 400px;
        height: 200px;

        @media screen and (max-width: 992px) {
            width: 250px;
        }
    }
`;

export {
    Container,
    ChartFieldWrapper,
    DefaultChartFieldWrapper
}
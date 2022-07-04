import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
    padding-bottom: 100px;
`;

const DefaultChartFieldWrapper  = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-height: 300px;
    
    @media screen and (max-width: 992px) {
        flex-direction: column;
        gap: 50px;
    }

    .chart-title {
        font-size: 14px;
        font-weight: 600;
        padding: 10px;
    }

    .chart-box {
        width: 30%;
        height: 200px;

        @media screen and (max-width: 992px) {
            width: 85%;
            height: 150px;
        }
    }
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
        justify-content: space-around;
        box-shadow: 1px 1px 10px 3px #e1e2f577;
        border-radius: 10px;
        min-height: 350px;
        padding: 20px;
        overflow: auto;

        @media screen and (max-width: 992px) {
            justify-content: flex-start;
        }
    }

    .chart-box {
        width: 400px;
        height: 150px;
        margin-right: 30px;
    }
`;

export {
    Container,
    ChartFieldWrapper,
    DefaultChartFieldWrapper
}
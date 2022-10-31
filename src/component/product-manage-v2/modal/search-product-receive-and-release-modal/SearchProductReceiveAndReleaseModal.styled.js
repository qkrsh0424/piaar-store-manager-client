import styled from "styled-components";

const Container = styled.div`

`;

const DateRangeSelectorFieldWrapper = styled.div`
    padding-bottom: 20px;

    .button-el {
        width: 280px;
        border-radius: 2px;
        border: 1px solid var(--piaar-main-color);
        background-color: var(--piaar-main-color);
        color: white;
        font-size: 16px;
        font-weight: 500;

        @media screen and (max-width: 992px) {
            font-size: 14px;
        }

        @media screen and (max-width: 768px) {
            width: 100%;
        }
    }
`;

const StockStatusFieldWrapper = styled.div`
    min-height: 30vh;
    max-height: 30vh;
    margin-bottom: 30px;
    border: 1px solid #c8c8c8;
    overflow: auto;

    table {
        min-width: 1000px;
    }

    table thead tr {
        vertical-align: middle !important;
        text-align: center;
    }

    table tbody th, td {
        vertical-align: middle !important;
        text-align: center;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 400;

        @media screen and (max-width: 992px) {
            font-size: 12px;
        }
    }

    .fixed-header {
        position: sticky;
        top: 0px;
        background: #f1f1f1;
        z-index: 10;
        font-size: 14px;
        height: 35px;

        @media screen and (max-width: 992px) {
            font-size: 12px;
        }
    }
`;

export {
    Container,
    DateRangeSelectorFieldWrapper,
    StockStatusFieldWrapper
}
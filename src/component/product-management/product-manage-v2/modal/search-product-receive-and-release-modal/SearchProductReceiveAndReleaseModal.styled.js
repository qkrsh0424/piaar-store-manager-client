import styled from "styled-components";

const Container = styled.div`

`;

const DateRangeSelectorFieldWrapper = styled.div`
    padding: 0 20px;
    display: flex;
    justify-content: flex-start;

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
        height: 60px;

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

    .memo-box {
        display: flex;
        place-content: center;
    }

    .input-el {
        /* width: 90%; */
        /* border: 1px solid #c8c8c8; */
        /* padding: 0 5px; */
        text-align: center;
        width: 90%;
    }

    .button-el {
        width: 25px;
        height: 25px;
        position: relative;
        overflow: hidden;
        padding: 0;

        border: none;
        background-color: inherit;
        border-radius: 50%;

        :hover {
            transition: 0.15s;
            transform: scale(1.1);
        }
    }
`;

export {
    Container,
    DateRangeSelectorFieldWrapper,
    StockStatusFieldWrapper
}
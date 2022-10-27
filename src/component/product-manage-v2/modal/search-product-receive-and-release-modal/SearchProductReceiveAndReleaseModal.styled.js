import styled from "styled-components";

const Container = styled.div`

`;

const SearchProductReceiveAndReleaseModalFieldWrapper = styled.div`
    max-height: 50vh;
    overflow: auto;

    table thead tr {
        vertical-align: middle !important;
        text-align: center;
    }

    table tbody th, td {
        vertical-align: middle !important;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .fixed-header {
        position: sticky;
        top: -1px;
        background: #f1f1f1;
        z-index: 10;
        font-size: 14px;
        /* height: 30px; */
    }

    .input-el {
        padding: 5px;
        width: 90%;
    }

    .button-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .button-el {
        width: 80px;
        border-radius: 2px;
        border: 1px solid #c8c8c8;
        background-color: #f7f7f7;
        color: #444;
    }
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
    }


`;

const StockStatusFieldWrapper = styled.div`
    min-height: 30vh;
    max-height: 30vh;
    margin-bottom: 30px;
    border: 1px solid #c8c8c8;
    overflow: auto;

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
    }

    .fixed-header {
        position: sticky;
        top: 0px;
        background: #f1f1f1;
        z-index: 10;
        font-size: 14px;
        height: 35px;
    }
`;

export {
    Container,
    SearchProductReceiveAndReleaseModalFieldWrapper,
    DateRangeSelectorFieldWrapper,
    StockStatusFieldWrapper
}
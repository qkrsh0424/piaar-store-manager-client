import styled from "styled-components";

const Container = styled.div`
    background-color: white;
    border-radius: 10px;
    margin-bottom: 30px;
`;

const GraphBoardFieldWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border-bottom: 1px solid var(--defaultBorderColor); */
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

const TableFieldWrapper = styled.div`
    min-width: 1000px;
    min-height: 400px;
    overflow: auto;
    text-align: center;
    font-size: 14px;

    .table-wrapper {
        height: 400px;
    }

    .fixed-header {
        /* background-color: #f5f5f5; */
        background-color: #fff;
        height: 35px;
        position: sticky;
        top: 0;
        z-index:10;
        box-shadow: 0 -1.5px 0 0 var(--erp-main-color) inset;
    }

    table {
        position:relative;
        text-align: center;
        /* width: fit-cont; */
        table-layout: fixed;
        border: none;
        word-break: break-all;
    }

    table thead {
        width: 100%;
    }

    table tbody .first-tr {
        background-color: #2c73d222 !important;
        font-weight: 500;
        color: #000;
    }

    table tbody tr {
        border: 1px solid #eee;
        height: 40px;
        color: #555;
        transition: 1ms;

        :hover{
            background: #2c73d210;
        }
    }

    .highlight-td {
        font-weight: 700;
        
        /* :hover {
            background-color: #2c73d232;
            color: white;
            cursor: pointer;
        } */
    }
`;

export {
    Container,
    GraphBoardFieldWrapper,
    TableFieldWrapper
}
import styled from "styled-components";

const Container = styled.div`
    background-color: white;
    border-radius: 10px;
    margin-bottom: 30px;
    
    .content-box {
        overflow: auto;
    }
`;

const TableBoardFieldWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--defaultBorderColor);
    padding: 20px;

    @media screen and (max-width: 992px) {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    .table-title {
        font-size : 1.2rem;
        font-weight: 700;
    }

    .table-info-text {
        font-size: 14px;
    }

    .right-el-box {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .convert-btn-box {
        @media screen and (max-width: 992px) {
            width: 100%;
            justify-content: flex-end;
        }
    }
    
    .button-el {
        padding: 5px 10px;
        background-color: var(--defaultButtonColor);
        border: 1px solid var(--defaultBorderColor);
        border-radius: 5px;
        transition: 0.2s;

        :hover {
            background-color: var(--defaultHoverColor);
        }
        
        &.checked {
            background-color: #555;
            border: 1px solid #555;
            color: white;
        }
    }
`;

const TableFieldWrapper = styled.div`
    min-width: 1000px;
    text-align: center;
    font-size: 14px;

    @media screen and (max-width: 992px) {
        font-size: 12px;
    }

    .table-wrapper {
        min-height: 400px;
    }

    .fixed-header {
        background-color: #465265;
        height: 40px;
        position: sticky;
        top: 0;
        z-index:5;
        color: white;
        box-shadow: 0 -1.5px 0 0 #465265 inset;
    }

    table {
        position:relative;
        text-align: center;
        table-layout: fixed;
        border: none;
        word-break: break-all;
    }

    table thead {
        width: 100%;
    }

    table tbody tr {
        border: 1px solid #eee;
        /* color: #555; */
        transition: 1ms;
    }
    
    .item-tr {
        :hover{
            background: #2c73d210;
        }
    }

    .highlight-td {
        font-weight: 700;
    }

    table tbody th, td {
        vertical-align: middle !important;
        text-align: center;
        font-size: 14px;
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        @media screen and (max-width: 992px) {
            font-size: 12px;
        }
    }

    .highlight{
        display: inline-block;
        position:relative;
        font-weight: 700;
    }

    .highlight:after{
        content:"";
        position: absolute;
        bottom:0;
        left:0;
        width: 100%;
        height: 7px;
        display: inline-block;
        background: #b9c2e160;
    }
`;

const GraphBodyFieldWrapper = styled.div`
    min-width: 1000px;
    min-height: 400px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    .half-type-graph {
        width: 45%;

        @media screen and (max-width: 992px) {
            width: 100%;
            flex-direction: column;
        }
    }

    .graph-title {
        font-weight: 600;
    }

    .graph-wrapper {
        height: 250px;
    }
`;

export {
    Container,
    TableBoardFieldWrapper,
    TableFieldWrapper,
    GraphBodyFieldWrapper
}
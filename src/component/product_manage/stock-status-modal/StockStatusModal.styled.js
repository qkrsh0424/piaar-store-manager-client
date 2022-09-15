import styled, { css } from 'styled-components';

const Container = styled.div`
`;

const HeaderFieldWrapper = styled.div`
    padding: 1% 2%;
    padding-bottom: 10px;
    border-bottom: 1px solid #000;

    .header-top {
        display: flex;
        justify-content: space-between;
        align-items: center
    }

    .modal-title {
        font-size: 1.3rem;
        font-weight: 700;

        @media only screen and (max-width:576px){
            font-size: 16px;
        }
    }

    .modal-close-btn {
        color: #5c5c7e;

        &:hover {
            color: #80808b;
        }
    }
`;

const TableFieldWrapper = styled.div`
    padding: 10px;

    .status-box {
        font-weight: 400;
        padding: 15px 5px;
    }

    .status-box .color-box {
        border: none;
        margin: 4px;
        padding: 5px 15px;
        background: #c8cef7;
    }

    .release-item {
        background: #d8def5 !important;
    }

    .fixed-header {
        position: sticky;
        top: -1px;
        z-index: 5;
        background-color: #fff;
    }

    .table-container {
        height: 500px;
        overflow: auto;
        text-align: center;
        overflow: auto;
    }

    table{
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
        border: none;
        border: 1px solid #c8c8c8;
    }

    table thead tr th {
        background: #fff;
        border-bottom: 1px solid #e9e9e9;
    }

    tbody tr {
        border: 1px solid #e9e9e9;
        background: #c8cef7;

        .status-memo {
            :hover {
                cursor: pointer;
                opacity: 0.8;
                background: #acb3e1;
                color: white;
            }
        }
    }

    tbody .release-list {
        background: #d8def5;
    }
`;


export {
    Container,
    HeaderFieldWrapper,
    TableFieldWrapper
}
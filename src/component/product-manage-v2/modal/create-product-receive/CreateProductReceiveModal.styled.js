import styled from "styled-components";

const Container = styled.div`

`;

const CreateProductReceiveModalFieldWrapper = styled.div`
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

    .tooltip-box {
        padding: 10px;
        border-radius: 3px;
        width: 230px;
        background-color: #fff;
        border: 1px solid #d8d8d8;
        position: absolute;
        box-shadow: 0px 0px 6px 2px #d8d8d8;
        z-index: 12;
        left: 10px;
    }

    .tooltip-box .button-box {
        padding-top: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 2px;
    }
`;


export {
    Container,
    CreateProductReceiveModalFieldWrapper
}
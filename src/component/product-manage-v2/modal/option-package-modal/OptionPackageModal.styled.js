import styled from "styled-components";

const Container = styled.div``;

const InfoFieldWrapper = styled.div`
    .info-group {
        margin-top: 3px;
        display: flex;
        gap: 20px;
        font-weight: 500;
        font-size: 16px;

        @media screen and (max-width:992px){
            font-size: 14px;
            display: block;
        }
    }

    .info-name {
        width: 100px;
        color: #737373;
    }
`;

const InputFieldWrapper = styled.div`
    margin-top: 20px;

    .input-el{
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #e1e1e1;
        padding: 10px 5px;

        &:focus{
            outline: none;
        }
    }
`;

const ListFieldWrapper = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    min-height: 35vh;
    max-height: 35vh;
    overflow: auto;
    /* padding: 0 20px; */
    white-space: pre-line;

    .flex-box { 
        display: flex;
        justify-content: space-between;
    }

    .control-button-item{
        width: 100%;
        padding: 10px 0;
        font-size: 14px;
        font-weight: 500;
        background: white;
        border: 1px solid #00000000;
        cursor: pointer;

        &:hover{
            background:#e1e1e160;
        }

        &:disabled{
            cursor: not-allowed;
        }
    }

    .highlight{
        font-weight : bold; 
        color:#FF0000;
    }

    .button-item{
        padding: 7px 20px;
        text-align: left;
        width: 100%;
        background: white;
        border: none;
        border-bottom: 1px solid #e8e8e8;
        cursor: pointer;

        &:hover{
            background: #e1e1e160;
        }

        &:active {
            background: #efefef;
        }
    }
`;

const TableFieldWrapper = styled.div`
    margin: 20px 0;

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
    }

    .fixed-header {
        position: sticky;
        top: 0px;
        background: #f1f1f1;
        z-index: 10;
        height: 34px;
    }

    .button-el {
        width: 30px;
        height: 30px;
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

    .input-el {
        width: 90%;
        padding: 2px 5px;
        border: 1px solid #aaaaaa;
    }
`;

const ButtonFieldWrapper = styled.div`
    padding: 3px;
    display: flex;
    gap: 6px;
    justify-content: flex-end;

    .button-el {
        width: 140px;
        position: relative;
        overflow: hidden;
        padding: 7px;

        border: 1px solid #c8c8c8;
        background-color: #f7f7f7;
        border-radius: 2px;
        font-size: 14px;
        font-weight: 600;

        :hover {
            cursor: pointer;
        }
    }
`;

export {
    Container,
    InfoFieldWrapper,
    InputFieldWrapper,
    ListFieldWrapper,
    TableFieldWrapper,
    ButtonFieldWrapper
}
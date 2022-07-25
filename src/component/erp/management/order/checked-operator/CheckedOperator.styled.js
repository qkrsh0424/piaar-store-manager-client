import styled from 'styled-components';

const Container = styled.div`
    margin-top: 10px;
    `;

const OperatorFieldWrapper = styled.div`
    padding: 0 30px;
    
    @media only screen and (max-width:768px){
        padding: 0 10px;
    }
    `;

const ControlWrapper = styled.div`
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
    .title-box {
        font-size: 14px;
        font-weight: 600;

        @media all and (max-width:992px){
            font-size: 11px;
        }
    }

`;

const TableFieldWrapper = styled.div`
    padding-bottom: 30px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }

    .table-box{
        height: 200px;
        overflow: auto;
        border: 1px solid #e0e0e0;

        @media only screen and (max-width:768px){
            font-size: 10px;
        }
    }

    table{
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
        border: none;
    }

    table thead tr th{
        vertical-align: middle !important;
        text-align: center;
        background: #fff;
        border-bottom: 1px solid #c0c0c0;
        color: #000;
        font-weight: 700;
        padding: 10px;
        font-size: 12px;

        @media all and (max-width: 992px){
            font-size: 10px;
            padding: 10px 5px;
        }
    }

    table tbody .tr-highlight{
        background: #ececec;
    }

    table tbody tr td{
        padding: 7px 5px;
        vertical-align: middle !important;
        border-bottom: 1px solid #e0e0e0;
        text-align: center;
        font-size: 11px;
        color: #444;
        font-weight: 500;
        line-height: 1.5;
        word-break: keep-all;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        height: 43px;

        @media all and (max-width: 992px){
            font-size: 10px;
        }
    }

    table tbody tr .td-highlight {
        color: #ff4949;
    }

    .table-box .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
    }

    .table-box::-webkit-scrollbar{
        background: #e1e1e130;
        height:7px;
        width: 5px;
    }

    .table-box::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    .table-box::-webkit-scrollbar-thumb{
        background-color: #00000010;
        border-radius: 10px;
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    @media all and (max-width:992px){
        margin-top: 0;
    }

    .button-box{
        margin-right: 5px;
        margin-top: 5px;
    }

    .button-box .button-el{
        position: relative;
        overflow: hidden;
        padding: 3px 7px;
        border: 1px solid #e0e0e0;
        background: white;
        border-radius: 0;

        font-size: 14px;
        font-weight: 500;
        color: #000;

        cursor: pointer;

        transition: all .1s;

        &:hover{
            transform: scale(1.02);
            background: #2C73D2;
            border: 1px solid #2C73D2;
            color: white;
        }

        @media all and (max-width:992px){
            font-size: 11px;
        }
    }

    .button-box .warning-button-el{
        position: relative;
        overflow: hidden;
        padding: 3px 7px;
        border: 1px solid #ff605c;
        background: white;
        border-radius: 0;

        font-size: 14px;
        font-weight: 600;
        color: #ff605c;

        cursor: pointer;

        transition: all .1s;

        &:hover{
            transform: scale(1.02);
            background: #ff605c;
            border: 1px solid #ff605c;
            color: white;
        }

        @media all and (max-width:992px){
            font-size: 11px;
        }
    }

    .button-box .danger-button-el{
        position: relative;
        overflow: hidden;
        padding: 3px 7px;
        border: 1px solid #ff605c;
        background: #ff605c;
        border-radius: 0;

        font-size: 14px;
        font-weight: 600;
        color: white;

        cursor: pointer;

        transition: all .1s;

        &:hover{
            transform: scale(1.02);
            background: #ff605c;
            border: 1px solid #ff605c;
            color: white;
        }

        @media all and (max-width:992px){
            font-size: 11px;
        }
    }
`;

export {
    Container,
    OperatorFieldWrapper,
    ControlWrapper,
    ButtonWrapper,
    TableFieldWrapper
}
import styled from 'styled-components';

const Container = styled.div`
    
`;

const HeaderFieldWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e1e1e1;

    .title-box{
        padding: 10px 20px;
        font-size: 20px;
        font-weight: 700;

        @media all and (max-width:992px){
            padding: 10px 10px;
            font-size: 16px;
        }
    }
`;

const TableFieldWrapper = styled.div`
    padding: 0 20px;

    .info-text {
        font-size: 14px;
        font-weight: 700;
        padding: 10px;
    }

    .table-box{
        height: 150px;
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

    table tbody tr{
        &:hover{
            background: #0000000a;
        }
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
        
        &:hover{
            background: #2C73D260;
            color: white;
            font-weight: 600;
        }
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

const InputFieldWrapper = styled.div`
    margin-top: 10px;
    padding: 0 20px;

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

const HeaderControlBox = styled.div`
    padding: 10px 20px;

    @media all and (max-width:992px){
        padding: 10px 10px;
    }

    .button-item{
        position: relative;
        margin-left: 20px;
        
        width: 40px;
        height: 40px;

        background: #2C73D2;
        border:none;
        border-radius: 50%;

        transition: 0.4s;

        cursor: pointer;
        &:hover{
            transform: rotate(-360deg);
            background: #309FFF
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);
            background: #7DC2FF;
        }

        @media all and (max-width:992px){
            margin-left: 10px;
            width: 32px;
            height: 32px;
        }
    }

    .icon-item{
        width: 25px;
        height: 25px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        @media all and (max-width:992px){
            width: 20px;
            height: 20px;
        }
    }

    .icon-item img{
        width: 100%;
    }
`;

const ContentWrapper = styled.div`
    margin-bottom: 50px;
    min-height: 400px;
`;

const InputBox = styled.div`
    margin-top: 10px;
    padding: 0 20px;
    .input-item{
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
    margin-bottom: 20px;
    min-height: 50vh;
    max-height: 50vh;
    overflow: auto;
    padding: 0 20px;
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
        padding: 10px 20px;
        text-align: left;
        width: 100%;
        background: white;
        border: 1px solid #00000000;
        cursor: pointer;

        &:hover{
            background: #e1e1e160;
        }
    }
`;

const ConfirmMessageFieldWrapper = styled.div`
    margin-top: 10px;
    white-space: pre-line;

    .flex-box { 
        display: flex;
        justify-content: space-between;
    }

    .button-el{
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
`;

export {
    Container,
    HeaderFieldWrapper,
    InputFieldWrapper,
    HeaderControlBox,
    ContentWrapper,
    InputBox,
    ListFieldWrapper,
    ConfirmMessageFieldWrapper,
    TableFieldWrapper
}
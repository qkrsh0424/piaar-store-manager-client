import styled from 'styled-components';

const Container = styled.div`
    .selector-box {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        
        @media screen and (max-width: 992px){
            align-items: flex-start;
            flex-direction: column-reverse;
        }
    }

    .tip-text {
        /* padding-bottom: 5px; */
    }
`;

const TableFieldWrapper = styled.div`
    padding: 0 30px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }

    .table-box{
        height: 500px;
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

    table .col-5-3 {
        width:50px;

        @media all and (max-width:992px){
            width:30px;
        }
    }

    table .col-15-13{
        width:150px;

        @media all and (max-width:992px){
            width:130px;
        }
    }

    table thead tr th{
        vertical-align: middle !important;
        text-align: center;
        background: #fff;
        /* border-bottom: 1px solid #c0c0c0; */
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

    table tbody .tr-active{
        background: #2C73D230 !important;
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
        
        /* &:hover{
            background: #2C73D260;
            color: white;
            font-weight: 600;
        } */
    }

    table tbody tr .td-highlight {
        background: #d9e9ff60;

        &:hover{
            background: #2C73D260;
            color: white;
            font-weight: 600;
            cursor: pointer;
        }
    }

    table tbody tr .user-duplication {
        color: #ff0000;
    }

    .option-code-item{
        cursor: pointer;
    }

    .table-box .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
        box-shadow: 0 -0.5px 0 0 #e0e0e0 inset;
    }

    .table-box .fixed-col-left {
        position: sticky;
        background: white;
        left: 0;
        z-index:10;
        box-shadow: -0.5px 0 0 0 #e0e0e0 inset;
    }

    .table-box .fixed-col-left2 {
        position: sticky;
        background: white;
        left: 70px;
        z-index:10;
        box-shadow: -0.5px 0 0 0 #e0e0e0 inset;
    }

    .table-box .fixed-col-right {
        position: sticky;
        background: white;
        right: 0;
        z-index:10;
        box-shadow: 0.5px 0 0 0 #e0e0e0 inset;
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

    .fix-button-el{
        width: 25px;
        height: 25px;
        position: relative;

        padding: 0; 

        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 3px;

        cursor: pointer;

        &:hover{
            background: #2C73D2;
            border: 1px solid #2C73D2;

            & .fix-button-icon{
                opacity: 1;
                filter: invert(100%);
            }
        }

        @media all and (max-width: 992px){
            width: 18px;
            height: 18px;
        }
    }

    .fix-button-icon{
        width: 90%;
        position: absolute;
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);
        opacity: 0.6;
    }
`;

const SelectorButtonFieldWrapper = styled.div`
    margin-top: 10px;
    padding: 0 30px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }

    .flex-box{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        border-collapse: collapse;

        .button-el:nth-of-type(2){
            margin-left: -1px;
        }
    }

    .select-item {
        width: 200px;
        height: 30px;
        padding: 5px;
        border: 1px solid #e0e0e0;
        border-bottom: none;
        border-radius: 0;
        font-size: 14px;
        -webkit-appearance: none;
        -moz-appearance: none; 
        appearance: none;
        background:url('/assets/icon/down_arrow_gray_icon.png') no-repeat right 5px center;

        &:focus{
            outline: none;
        }

        @media all and (max-width:992px) {
            width: 100%;
        }
    }

    .button-el{
        position: relative;
        overflow: hidden;
        border: 1px solid #e0e0e0;
        border-bottom: none;
        background: white;
        width: 80px;
        height: 30px;
        font-weight: 700;
        font-size: 12px;
        color:#000;

        cursor: pointer;

        &:hover{
            background: #e0e0e040;
        }
    }
`;

const SelectorRadioFieldWrapper = styled.div`
    /* margin-top: 20px; */
    padding: 0 30px;
    font-size: 14px;
    font-weight: 700;

    .radio-label {
        font-size: 14px;
        font-weight: 700;
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
        height: 10px;
        display: inline-block;
        background: #b9c2e160;
    }
`;

const TipFieldWrapper = styled.div`
    margin: 5px 0;
    padding:0 40px;
    display: flex;
    flex-direction: row-reverse;

    font-size: 14px;

    @media all and (max-width:992px){
        padding:0 10px;
        font-size: 12px;
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
        height: 10px;
        display: inline-block;
        background: #b9c2e160;
    }
`;

export {
    Container,
    TableFieldWrapper,
    SelectorButtonFieldWrapper,
    SelectorRadioFieldWrapper,
    TipFieldWrapper
}
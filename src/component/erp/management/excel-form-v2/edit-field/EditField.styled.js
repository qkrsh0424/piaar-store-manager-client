import styled from "styled-components";

const Container = styled.div`
    width: 50%;
    flex:1;

    @media all and (max-width: 992px){
        width: 100%;
        margin-top: 20px;
    }
`;

const Wrapper = styled.div`
    padding-bottom: 10px;
    border: 1px solid #e1e1e1;
    border-radius: 3px;
`;

const HeaderFieldWrapper = styled.div`
    padding: 10px;
    border-bottom: 1px solid #e1e1e1;
    
    .flex-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title-el{
        font-size: 18px;
        font-weight: 600;
    }

    .button-box{

    }

    .button-el{
        overflow: hidden;
        position: relative;
        width:40px;
        height:40px;

        background: #ff3060;
        border: 1px solid #ff306000;
        border-radius: 50%;

        cursor: pointer;

        transition: all .3s;
        &:hover{
            transform: scale(1.05);
        }
    }

    .button-icon{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        width: 26px;
        height: 26px;

    }
`;

const TitleWrapper = styled.div`
    margin-top: 10px;
    padding: 0 10px;
    .title{
        font-size: 18px;
        font-weight: 600;
    }
`;

const DefaultHeaderTableWrapper = styled.div`
    margin-top: 10px;
    padding: 0 10px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

const DefaultHeaderTableBox = styled.div`
	overflow: auto;
    border: 1px solid #e1e1e1;

    table{
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
        border: none;
    }

    table tbody tr{
        &:hover{
            background: #309FFF40;
        }
    }

    table tbody tr td{
        padding: 7px 5px;
        vertical-align: middle !important;
        border-bottom: 1px solid #309FFF20;
        text-align: center;
        font-size: 12px;
        color: #444;
        font-weight: 500;
        line-height: 1.5;
        word-break: keep-all;

        &:hover{
            background: #309FFF80;
            color: white;
            font-weight: 600;
        }
    }

    table thead tr th{
        vertical-align: middle !important;
        text-align: center;
        background: #f1f1f180;
        color: #888;
        padding: 10px;
        font-size: 14px;
    }

    .th-active{
        background: white;
        color: #444;
    }

    & .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
    }

    &::-webkit-scrollbar{
        background: #e1e1e130;
        height:3px;
        width: 5px;
    }

    &::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #309FFF;
        border-radius: 10px;
    }

    @media only screen and (max-width:768px){
        font-size: 10px;
    }
`;

const UpdateHeaderTableWrapper = styled.div`
    margin-top: 10px;
    padding: 0 10px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

const UpdateHeaderTableBox = styled.div`
	overflow: auto;
    border: 1px solid #e1e1e1;

    table{
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
        border: none;
    }

    table thead tr th {
        vertical-align: middle !important;
        text-align: center;
        background: 'white';
        color: '#444';
        padding: 10px;
        font-size: 14px;
    }
    
    table tbody tr{
        &:hover{
            /* background: #309FFF40; */
        }
    }

    table tbody tr td{
        padding: 7px 5px;
        vertical-align: middle;
        /* border-bottom: 1px solid #e1e1e1; */
        text-align: center;
        font-size: 14px;
        color: #444;
        font-weight: 500;
        line-height: 1.5;
        word-break: keep-all;

        &:hover{
            /* background: #309FFF80;
            color: white; */
            font-weight: 600;
        }
    }

    td .td-label{
        font-size: 14px;
        color: #444;
        margin-bottom: 5px;
    }

    td .flex-box{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    & .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
    }

    .button-item{
        position: relative;
        
        width: 30px;
        height: 30px;

        background: #2C73D2;
        border:none;
        border-radius: 50%;

        transition: 0.4s;

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

    .input-item{
        text-align: center;
        border: 1px solid #e1e1e1;
        border-radius: 5px;
        padding: 10px 0;

        &:focus{
            outline: none;
        }
    }

    &::-webkit-scrollbar{
        background: #e1e1e130;
        height:3px;
        width: 5px;
    }

    &::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #309FFF;
        border-radius: 10px;
    }

    @media only screen and (max-width:768px){
        font-size: 10px;
    }
`;

const ViewDetailSelectBox = styled.div`
    /* position: relative;
    overflow: hidden;
    padding: 15px 0;
    text-align: center;
    cursor: pointer;
    &:hover{
        background: #e1e1e160;
    } */
    padding:10px;
    .grid-wrapper{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
    }

    .cellName-box{
        padding: 5px;
    }

    .button-wrapper{
        display: flex;
        justify-content: flex-end;
    }

    .button-el{
        padding:0;
        line-height: 1;
        width: 100px;
        height: 30px;
        margin-left: 10px;
        background: white;
        border:1px solid #e0e0e0;
    }
`;

const DeleteButtonFieldWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    padding: 0 10px;

    .button-el{
        overflow: hidden;
        position: relative;
        width:40px;
        height:40px;

        background: #ff3060;
        border: 1px solid #ff306000;
        border-radius: 50%;

        cursor: pointer;

        transition: all .3s;
        &:hover{
            transform: scale(1.05);
        }
    }

    .button-icon{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        width: 26px;
        height: 26px;

    }
`;

const UpdateButtonFieldWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    padding: 0 10px;

    .button-el{
        overflow: hidden;
        position: relative;
        width:150px;
        height:40px;

        background: #2C73D2;
        border: 1px solid #2C73D200;
        border-radius: 3px;

        font-size: 16px;
        font-weight: 600;
        color: white;

        cursor: pointer;

        transition: all .3s;
        &:hover{
            transform: scale(1.05);
        }
    }
`;

const DownloadFormWrapper = styled.div`
    .head-wrapper{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding:0 10px;
        margin-top: 10px;
    }

    .title{
        font-size: 18px;
        font-weight: 600;
    }

    .add-field-button{
        padding:5px 8px;
        line-height: 1;
        border: 1px solid #e0e0e0;
        background: white;
        font-size: 14px;
    }

    .body-wrapper{
        margin-top: 10px;
        padding:0 10px;
    }

    .list-wrapper{
        border: 1px solid #e0e0e0;
        overflow: auto;
        width:100%;
        /* min-height: 300px; */

        &::-webkit-scrollbar{
            background: #e1e1e130;
            height:3px;
            width: 5px;
        }

        &::-webkit-scrollbar-track{
            border-radius: 10px;
        }
        &::-webkit-scrollbar-thumb{
            background-color: #00000020;
            border-radius: 10px;
        }
    }

    .list-box{
        width:100%;

        .list-item:nth-last-child(1){
            border-bottom: none;
        }

        @media all and (max-width: 992px){
            width: 300%;
        }
    }

    .list-item{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e0e0e0;
        background: white;
    }

    .list-item-content{
        position:relative;
        padding: 8px 3px;
        text-align: center;
        font-size: 14px;
    }

    .w-4p{
        width:4%;
    }

    .w-18p{
        width:18%;
    }

    .w-9p{
        width:9%;
    }

    .w-6p{
        width:6%;
    }

    .text-center{
        text-align: center;
    }

    .bold-600{
        font-weight: 600;
    }

    .pt-8{
        padding-top:8px;
    }

    .pb-8{
        padding-bottom:8px;
    }

    .item-content-blind{
        position: absolute;
        z-index: 10;
        top: 0;
        left: 5%;
        width:90%;
        height: 100%;
        background:#f0f0f0;
        margin-left: auto;
        margin-right: auto;
        /* background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 4px,
            transparent 1px,
            #00000040 7px
        ),
        linear-gradient(
            to bottom,
            transparent,
            transparent
        ) */
    }

    .viewDetail-add-button{
        padding:3px 8px;
        line-height: 1;
        font-size: 12px;
        font-weight: 500;
        border:1px solid #e0e0e0;
        background: white;

        &:focus{
            outline: none;
        }
    }

    .table-input-el{
        position: relative;
        border: 1px solid #e0e0e0;
        box-sizing: border-box;
        width: 100%;
        background:white;
        &:focus{
            z-index: 11;
            transition: .3s;
            outline: none;
            transform: scale(1.2);
        }
    }

    .switch-button{
        padding:0;
        width:40px;
        height: 20px;
        line-height: 1;
        background:white;
        border:1px solid #000;
        font-size: 12px;

        &:focus{
            outline: none;
        }
    }

    .switch-button-on{
        background:#37c20b;
        border: 1px solid #37c20b;
        color:white;
    }

    .switch-button-off{
        background:#ff3060;
        border: 1px solid #ff3060;
        color:white;
    }

    .delete-button-el{
        position:relative;
        padding:0;
        width:30px;
        height: 30px;
        line-height: 1;
        background:#ff3060;
        border:1px solid #ff3060;
        border-radius: 50%;
        font-size: 12px;

        &:focus{
            outline: none;
        }
    }

    .delete-button-icon{
        width:20px;
        height: 20px;
    }
`;

export {
    Container,
    Wrapper,
    HeaderFieldWrapper,
    TitleWrapper,
    DefaultHeaderTableWrapper,
    DefaultHeaderTableBox,
    UpdateHeaderTableWrapper,
    UpdateHeaderTableBox,
    ViewDetailSelectBox,
    DeleteButtonFieldWrapper,
    UpdateButtonFieldWrapper,

    DownloadFormWrapper,
}
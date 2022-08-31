import styled from 'styled-components';

const Container = styled.div`
    margin-bottom: 100px;
`;

const TableFieldWrapper = styled.div`
    
    padding: 10px 30px;

    @media all and (max-width: 992px){
        padding: 10px 10px;
    }

    .table-box{
        height: 80vh;
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
        background:#fff;
        color: #000;
        padding: 10px;
        font-size: 12px;
        font-weight: 700;
        border-bottom: 1px solid #e0e0e0;
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
        color: #000;
        font-weight: 500;
        line-height: 1.5;
        word-break: keep-all;

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

    .table-box .fixed-col {
        position: sticky;
        background: white;
        left: 0;
        z-index:11;
        border-right: 1px solid #e0e0e060;
    }

    .table-box .fixed-col-right {
        position: sticky;
        background: white;
        right: 0;
        z-index:10;
        border-left: 1px solid #e0e0e060;
        box-shadow: -6px 0 10px -7px #e0e0e0;
    }

    .table-box .fixed-col-right-2 {
        position: sticky;
        background: white;
        right: 48px;
        z-index:10;
        border-left: 1px solid #e0e0e060;
        box-shadow: -6px 0 10px -7px #e0e0e0;
    }

    .table-box .delete-button-el{
        position: relative;
        overflow: hidden;
        width:28px;
        height: 28px;
        background: #ff3060;
        border: 1px solid #ff3060;
        border-radius: 2px;

        cursor: pointer;

        &:hover{
            transform: scale(1.02);
        }
    }

    .table-box .delete-button-el .delete-button-icon{
        width:80%;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
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
        background:#00000010;
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
    
    .table-box .edit-button-el {
        background-color: #d2d2d2;
        border: 1px solid #d2d2d2;

        &:hover{
            background: #676767;
            border: 1px solid #676767;

            & .fix-button-icon{
                opacity: 1;
                filter: invert(100%);
            }
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

export {
    Container,
    TableFieldWrapper
}
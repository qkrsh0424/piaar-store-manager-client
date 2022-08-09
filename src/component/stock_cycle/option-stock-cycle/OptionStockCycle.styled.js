import styled from "styled-components";

const Container = styled.div`
    overflow: auto;
    margin-bottom: 100px;
    padding: 20px;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;

    .product-cycle-group {
        margin-bottom: 50px;
        box-shadow: 1px 1px 10px #e0e0ef;
        border-radius: 5px;
    }

    .product-cycle-group  .cycle-title {
        font-size: 1.1rem;
        font-weight: 700;
        text-align: center;
        padding: 7px 0;
        border: 1px solid #e4e4e4;
        color: 444;
        background-color: #e4e4e4;
        border-radius: 5px 5px 0 0;
    }

    .data-wrapper {
        display: flex;

        @media all and (max-width:992px){
            flex-direction: column;
        }
    }

    .option-box {
        overflow-y: scroll;
        height: 600px;
        background-color: white;
    }

    .option-stock-cycle-box {
        padding: 20px 30px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        @media all and (max-width:992px){
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
        }
    }

    .out-of-stock-unit {
        font-weight: 700;
        color: #444;
    }

    .highlight{
        display: inline-block;
        position:relative;
        color: #ff0000;
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
        background: #fe010024;
    }

    .product-box {
        display: inline-block;
        padding: 20px;
        border-right: 1px solid #c2c2c2;

        @media screen and (max-width: 992px){
            display: flex;
            align-items: center;
            gap: 20px;
            border-right: none;
            border-bottom: 1px solid #c2c2c2;
            flex-wrap: wrap;
        }
    }

    .info-box {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
    }
`;

const ImageFieldWrapper = styled.div`
    .image-wrapper {
        width: 200px;
        height: 200px;

        @media screen and (max-width: 992px) {
            width: 100px;
            height: 100px;
        }
    }

    .image-box {
        position: relative;
        padding-bottom: 100%; // 1:1
    }

    img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        transition: .5s;
        border:1px solid #d4d4d4;
    }
`;

const TextInfoFieldWrapper = styled.div`
    font-weight: 600;
    font-size: 14px;
    
    .data-group {
        padding-top: 2px;
    }

    .product-data-group {
        font-size: 16px;
        padding-top: 10px;

        @media screen and (max-width: 992px) {
            display: flex;
            font-size: 12px;
            padding-top: 5px;
        }
    }

    .out-of-stock-unit {
        color: #ff0000;
    }

    @media screen and (max-width: 992px) {
        font-size: 12px;
    }
`;

const TableFieldWrapper = styled.div`
    width:80%;
    text-align: center;
    overflow: auto;
    border: 1px solid #e0e0e0;
    background-color: white;
    font-size: 14px;

    @media only screen and (max-width:992px){
        width: 100%;
    }

    @media only screen and (max-width:768px){
        font-size: 10px;
    }

    .fixed-header {
        background-color: #ededed;
        height: 35px;
        position: sticky;
        top: 0;
        z-index:10;
        border: 1px solid #e7e7e7;
    }

    .fixed-col {
        background-color: #ededed;
        position: sticky;
        left: 0;
        z-index:10;
        font-weight: 800;
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

    table tbody .first-tr {
        background-color: #F1EDFFBB !important;
        font-weight: 600;
        color: #000;
    }

    table tbody tr {
        border: 1px solid #eee;
        height: 30px;
        color: #555;

        :hover{
            background: #00000006;
        }
    }

    table tbody td {
        border: 1px solid #e7e7e7;
    }

    .td-highlight{
        color: #ff0000;
        font-weight: 700;
    }

    .promotion-option {
        font-weight: 700;
        color: #6868ff !important;
    }
`;

export {
    Container,
    ImageFieldWrapper,
    TextInfoFieldWrapper,
    TableFieldWrapper
}
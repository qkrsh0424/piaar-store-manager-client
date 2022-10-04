import styled from "styled-components";

const Container = styled.div`
    padding: 50px 0;
    overflow: auto;
    padding-bottom: 150px;
    max-width: 1280px;
    margin: 0 auto;
    overflow: hidden;
`;

const CategorySelectorWrapper = styled.div`
    padding-top: 15px;
    
    .title-wrapper {
        border: 1px solid #888;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title-box {
        font-size: 1.3rem;
        font-weight: 600;
        padding:15px;
        
        @media only screen and (max-width:425px){
            padding: 15px 0;
        }
    }

    .icon-dot, .icon-must {
        display: inline-block;
        background-color: #ff545c;
        border-radius: 50%;
        vertical-align: middle;
    }

    .icon-must {
        position: relative;
        margin-left: 5px;
        width: 6px;
        height: 6px;
    }

    .button-box {
        padding: 10px;
    }

    .button-el {
        width: 40px;
        height: 40px;
        position: relative;
        overflow: hidden;
        padding: 0;

        background: white;
        border: 1px solid #888;
        border-radius: 3px;

        cursor: pointer;
    }

    .body-wrapper {
        display: flex;
        align-items: center;
        padding: 20px 30px;
        border: 1px solid #888;
        border-radius: 4px;
    }

    .select-item {
        width: 300px;
        height: 50px;
        padding: 10px;
        border: 1px solid #d0d0d0;
        border-radius: 0;
        font-size: 16px;
        -webkit-appearance: none;
        -moz-appearance: none; 
        appearance: none;
        background:url('/assets/icon/down_arrow_gray_icon.png') no-repeat right 5px center;

        &:focus{
            outline: none;
        }

        @media all and (max-width:992px) {
            width: 100%;
            margin: 10px 0 0 0;
        }
    }
`;

const ProductInfoInputWrapper = styled.div`
    padding-top: 15px;
    
    .title-wrapper {
        border: 1px solid #888;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title-box {
        font-size: 1.3rem;
        font-weight: 600;
        padding:15px;
        
        @media only screen and (max-width:425px){
            padding: 15px 0;
        }
    }

    .icon-dot, .icon-must {
        display: inline-block;
        background-color: #ff545c;
        border-radius: 50%;
        vertical-align: middle;
    }

    .icon-must {
        position: relative;
        margin-left: 5px;
        width: 6px;
        height: 6px;
    }

    .button-box {
        padding: 10px;
    }

    .button-el {
        width: 40px;
        height: 40px;
        position: relative;
        overflow: hidden;
        padding: 0;

        background: white;
        border: 1px solid #888;
        border-radius: 3px;

        cursor: pointer;
    }

    .body-wrapper {
        padding: 20px 30px;
        border: 1px solid #888;
        border-radius: 4px;
    }

    .image-wrapper {
        width: 200px;
    }

    .image-box {
        position: relative;
        padding-bottom: 100%; // 1:1
    }

    .image-box img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        transition: .2s;
        border:1px solid #cccaca;
        border-radius: 5px;
        cursor: pointer;

        :hover {
            opacity: 0.3;
        }
    }

    .body-wrapper .input-group {
        display: flex;
        align-items: center;
        padding: 15px 0;
        font-size: 16px;
        border-bottom: 1px solid #dfdfdf;
    }

    .body-wrapper .image-group {
        justify-content: flex-start;
    }

    .body-wrapper .input-group .title-text {
        width: 200px;
        padding: 10px;
        font-weight: 500;
    }

    .body-wrapper .input-group input {
        flex: 1;
        border: 1px solid #cccaca;
        border-radius: 4px;
        padding: 0 5px;
        height: 40px;
    }

    .stock-reflect-btn .button-el {
        width: 200px;
        margin-right: 5px;
    }
`;

const OptionInfoInputWrapper = styled.div`
    padding-top: 15px;

    .title-wrapper {
        border: 1px solid #888;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title-box {
        font-size: 1.3rem;
        font-weight: 600;
        padding:15px;
        
        @media only screen and (max-width:425px){
            padding: 15px 0;
        }
    }

    .icon-dot, .icon-must {
        display: inline-block;
        background-color: #ff545c;
        border-radius: 50%;
        vertical-align: middle;
    }

    .icon-must {
        position: relative;
        margin-left: 5px;
        width: 6px;
        height: 6px;
    }

    .button-box {
        padding: 10px;
    }

    .button-el {
        width: 40px;
        height: 40px;
        position: relative;
        overflow: hidden;
        padding: 0;

        background: white;
        border: 1px solid #888;
        border-radius: 3px;

        cursor: pointer;
    }

    .body-wrapper {
        padding: 20px 30px;
        border: 1px solid #888;
        border-radius: 4px;
    }

    .body-wrapper .batch-reg-box {
        width: 70%;
        margin: 0 auto;
    }

    .body-wrapper .input-group {
        display: flex;
        align-items: center;
        padding: 15px 0;
        font-size: 16px;
        border-bottom: 1px solid #dfdfdf;
    }

    .body-wrapper .input-group .title-text {
        width: 200px;
        padding: 10px;
        font-weight: 500;
    }

    .body-wrapper .input-group input {
        flex: 1;
        border: 1px solid #cccaca;
        border-radius: 4px;
        padding: 0 5px;
        height: 40px;
    }

    .batch-reg-box .input-group {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 0;
        font-size: 16px;
        color: #444;
        border-bottom: 1px solid #dfdfdf;
    }

    .batch-reg-box .input-group .title-text {
        width: 150px;
        padding: 10px;
        font-weight: 500;
    }

    .batch-reg-box .input-group input {
        border: 1px solid #cccaca;
        border-radius: 4px;
        padding: 0 5px;
        height: 40px;
    }

    .batch-reg-box .reg-btn {
        margin: 5px 0;
        padding: 3px 0;
        width: 100%;
        border: 1px solid #efefef;
        background-color: #efefef;
        border-radius: 3px;
    }

    .body-wrapper .inner-wrapper {
        padding-bottom: 50px;
    }

    .inner-wrapper .sub-title-text {
        font-weight: 600;
        font-size: 1.2rem;
        padding: 15px 0;
    }

    .info-text {
        display: block;
        font-size: 14px;
        padding: 7px 0;
        color: var(--erp-main-color);
    }

    .table-bottom-box {
        text-align: center;
    }

    .add-btn {
        width: 200px;
        padding: 5px;
        border: 1px solid #dfdfdf;
        background-color: #dfdfdf;
        border-radius: 3px;
    }

    .table-box .delete-button-el {
        position: relative;
        overflow: hidden;
        width: 35px;
        height: 35px;
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
`;

const TableFieldWrapper = styled.div`
    padding: 0 30px;
    overflow: hidden;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }

    .table-box {
        overflow: auto;
    }

    table {
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
        color: #000;
        font-weight: 700;
        padding: 10px 3px;
        font-size: 16px;

        @media all and (max-width: 992px){
            font-size: 10px;
            padding: 10px 5px;
        }
    }

    table tbody tr td{
        position:relative;
        padding: 7px 5px;
        vertical-align: middle !important;
        border-bottom: 1px solid #e0e0e0;
        text-align: center;
        font-size: 14px;
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

    .input-value {
        border: 1px solid #d0d0d0;
        text-align: center;
        height: 38px;
    }
`;

export {
    Container,
    CategorySelectorWrapper,
    ProductInfoInputWrapper,
    OptionInfoInputWrapper,
    TableFieldWrapper
}
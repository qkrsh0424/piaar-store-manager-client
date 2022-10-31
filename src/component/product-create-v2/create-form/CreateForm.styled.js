import styled from "styled-components";

const Container = styled.div`
    padding: 30px 10px 150px 10px;
    max-width: 1280px;
    margin: 0 auto;

    .slide-up {
        /* animation: dropdown-slide-up 0.3s ease-in-out; */
        display: none;
    }

    .slide-down {
        /* height: auto !important;
        animation: dropdown-slide-down 0.3s ease-in-out; */
        display: block;
    }
`;

const PageTitleFieldWrapper = styled.div`
    padding: 10px;
    font-size: 1.4rem;
    font-weight: 700;
`;

const CategorySelectorWrapper = styled.div`
    padding-top: 15px;

    .title-wrapper {
        position: relative;
        z-index: 10;
        background-color: white;
        border: 1px solid #dbdde2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }

    .title-box {
        font-size: 1.3rem;
        font-weight: 600;
        padding:15px;

        @media only screen and (max-width:992px){
            font-size: 1rem;
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
        border: 1px solid white;
        border-radius: 3px;

        cursor: pointer;
    }

    .body-wrapper {
        background-color: white;
        position: relative;
        top: -5px;
        border: 1px solid #dbdde2;
        overflow: hidden;
    }

    .body-wrapper .inner-wrapper {
        padding: 20px 30px;
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
        position: relative;
        z-index: 10;
        background-color: white;
        border: 1px solid #dbdde2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }

    .title-box {
        font-size: 1.3rem;
        font-weight: 600;
        padding:15px;
        
        @media only screen and (max-width:992px){
            font-size: 1rem;
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
        border: 1px solid white;
        border-radius: 3px;

        cursor: pointer;
    }

    .body-wrapper {
        background-color: white;
        position: relative;
        /* height: 0px; */
        top: -5px;
        border: 1px solid #dbdde2;
        overflow: hidden;
    }

    .body-wrapper .inner-wrapper {
        padding: 20px 30px;
    }

    .image-wrapper {
        width: 200px;
    }

    .image-box {
        position: relative;
        padding-bottom: 100%; // 1:1
    }

    .image-box .image-control-box {
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 0px;
        z-index: 10;
        width: 100%;
        background-color: #0909093b;
        border-radius: 0 0 4px 4px;
    }

    .image-control-box .button-el {
        width: 50%;
        border: none;
        background: none;
        border-radius: 0;
        transition: 0.2s;

        :hover {
            background-color: #09090985;
        }
    }

    .image-box input {
        display: none;
    }

    .image-box img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        border:1px solid #cccaca;
        border-radius: 5px;
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

        @media screen and (max-width: 992px) {
            font-size: 14px;
        }
    }

    .body-wrapper .input-group input {
        flex: 1;
        border: 1px solid #cccaca;
        padding: 0 5px;
        height: 40px;
    }

    .stock-reflect-btn .button-el {
        width: 200px;
        border-radius: 0;
        transition: 0.1s;
        border: 1px solid #cccaca;

        :hover {
            background-color: var(--piaar-main-color);
            color: white;
        }
    }

    .btn-active {
        background-color: var(--piaar-main-color);
        font-weight: 600;
        color: white
    }
`;

const OptionInfoInputWrapper = styled.div`
    padding-top: 15px;

    .title-wrapper {
        position: relative;
        z-index: 10;
        background-color: white;
        border: 1px solid #dbdde2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }

    .title-box {
        font-size: 1.3rem;
        font-weight: 600;
        padding:15px;
        
        @media only screen and (max-width:992px){
            font-size: 1rem;
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
        border: 1px solid white;
        border-radius: 3px;

        cursor: pointer;
    }

    .body-wrapper {
        position: relative;
        background-color: white;
        top: -5px;
        border: 1px solid #dbdde2;
        overflow: hidden;
    }

    .body-wrapper .batch-reg-box {
        width: 80%;
        margin: 0 auto;
        border: 1px solid #dfdfdf;
        overflow: auto;

        @media screen and (max-width: 992px){
            width: 100%;
            padding: 20px;
        }
    }

    .batch-reg-box .input-box {
        padding: 10px 30px;
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

        @media screen and (max-width: 992px) {
            font-size: 14px;
        }
    }

    .body-wrapper .input-group input {
        flex: 1;
        border: 1px solid #cccaca;
        padding: 0 5px;
        height: 40px;
    }

    .batch-reg-box .input-group {
        display: flex;
        align-items: center;
        padding: 15px 0;
        font-size: 16px;
        color: #444;
        border-bottom: 1px solid #dfdfdf;
    }

    .batch-reg-box .input-group .title-text {
        width: 150px;
        padding: 10px;
        font-weight: 500;

        @media screen and (max-width: 992px) {
            font-size: 14px;
        }
    }

    .batch-reg-box .input-value {
        border: 1px solid #cccaca;
        padding: 0 5px;
        height: 40px;
    }

    .batch-reg-box .input-group .modal-open-btn {
        height: 40px;
        padding: 0 10px;
        border: 1px solid #cccaca;
    }

    .batch-reg-box .reg-btn {
        padding: 6px 0;
        width: 100%;
        border: 1px solid var(--piaar-main-color);
        background-color: var(--piaar-main-color);
        font-weight: 600;
        color: white;
    }

    .body-wrapper .inner-wrapper {
        padding: 20px 30px 40px 30px;
    }

    .inner-wrapper .sub-title-text {
        font-weight: 600;
        font-size: 1.2rem;
        padding: 15px 0;

        @media screen and (max-width: 992px) {
            font-size: 1rem;
        }
    }

    .info-text {
        display: block;
        font-size: 14px;
        padding: 7px 0;
        color: var(--erp-main-color);

        @media screen and (max-width: 992px) {
            font-size: 12px;
        }
    }

    .table-bottom-box {
        text-align: center;
    }

    .add-btn {
        width: 250px;
        padding: 6px;
        border: 1px solid var(--piaar-main-color);
        background-color: var(--piaar-main-color);
        color: white;
        font-weight: 600;
        border-radius: 3px;
    }

    .delete-button-el {
        position: relative;
        overflow: hidden;
        width: 30px;
        height: 30px;

        cursor: pointer;

        :hover{
            transform: scale(1.05);
        }
    }

    .delete-button-el .delete-button-icon{
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
        font-weight: 600;
        padding: 10px 3px;
        font-size: 16px;
    }

    table thead tr .button-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    table thead tr th .button-el {
        width: 70px;
        border-radius: 2px;
        border: 1px solid #c8c8c8;
        background-color: #f7f7f7;
        color: #444;
        font-size: 14px;
        height: 30px;
    }

    table tbody tr td{
        position:relative;
        padding: 7px 5px;
        vertical-align: middle !important;
        border-bottom: 1px solid #e0e0e0;
        background-color: #fff;
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
    }

    .input-value {
        border: 1px solid #d0d0d0;
        text-align: center;
        height: 38px;
    }

    .button-box {
        padding: 0px;
    }
`;

const CreateButtonFieldWrapper = styled.div`
    padding: 25px;
    width: 100%;
    height: 80px;
    background-color: #ecedef;
    border-top: 1px solid #d5d5d5;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 20;

    @media screen and (max-width: 992px) {
        height: auto;
        padding: 10px;
    }

    .button-box {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
        height: 100%;

        @media screen and (max-width: 992px) {
            flex-direction: column;
            width: 100%;   
        }
    }

    .button-el {
        width: 200px;
        padding: 10px;
        border: 1px solid #727b90;
        background-color: #8991a3;
        color: white;
        border-radius: 3px;
        font-weight: 700;
        transition: 0.3s;

        :hover {
            transition: 0.1s;
            transform: scale(1.02);
        }

        @media screen and (max-width: 992px) {
            width: 100%;
            font-size: 14px;
            font-weight: 600;
            padding: 3px;
        }
    }

    .store-btn {
        border: 1px solid var(--piaar-main-color);
        background-color: var(--piaar-main-color);
    }
`;

const BatchRegTooltipWrapper = styled.div`
    .tooltip-box {
        padding: 10px;
        border-radius: 3px;
        width: 230px;
        background-color: #fff;
        border: 1px solid #d8d8d8;
        position: absolute;
        box-shadow: 0px 0px 6px 2px #d8d8d8;
        z-index: 12;
    }

    .tooltip-box .button-box {
        padding-top: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 2px;
    }

    .input-el {
        border: 1px solid #c8c8c8;
    }
`;

export {
    Container,
    PageTitleFieldWrapper,
    CategorySelectorWrapper,
    ProductInfoInputWrapper,
    OptionInfoInputWrapper,
    TableFieldWrapper,
    CreateButtonFieldWrapper,
    BatchRegTooltipWrapper
}
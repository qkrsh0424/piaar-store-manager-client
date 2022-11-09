import styled from "styled-components";

const Container = styled.div`
    /* max-width: 1280px; */
`;

const PageTitleFieldWrapper = styled.div`
  
`;

const CategorySelectorWrapper = styled.div`
    margin-top: 15px;
    background-color: white;
    border-radius: 10px;
    box-shadow: var(--defaultBoxShadow);

    .title-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }

    .title-label {
        font-size: 1.3rem;
        font-weight: 600;
        padding:15px;

        @media only screen and (max-width:992px){
            font-size: 1rem;
        }
    }

    .arrow-btn-box {
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
        border-radius: 50%;
        transition: 0.1s;
        
        cursor: pointer;
        
        :hover {
            background-color: var(--defaultHoverColor);
        }
    }

    .inner-content {
        padding: 20px 30px;
        border-top: 1px solid var(--defaultBorderColor)
    }

    .select-item {
        width: 350px;
        height: 50px;
        padding: 10px;
        border: 1px solid #d0d0d0;
        border-radius: 5px;
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
    margin-top: 15px;
    background-color: white;
    border-radius: 10px;
    box-shadow: var(--defaultBoxShadow);

    .title-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }

    .title-label {
        font-size: 1.3rem;
        font-weight: 600;
        padding:15px;
        
        @media only screen and (max-width:992px){
            font-size: 1rem;
        }
    }

    .arrow-btn-box {
        padding: 10px;
    }

    .arrow-btn-box .button-el {
        width: 40px;
        height: 40px;
        position: relative;
        overflow: hidden;
        padding: 0;

        background: white;
        border: 1px solid white;
        border-radius: 50%;
        transition: 0.1s;

        cursor: pointer;
        
        :hover {
            background-color: var(--defaultHoverColor);
        }
    }

    .inner-content {
        padding: 20px 30px;
        border-top: 1px solid var(--defaultBorderColor)
    }

    .image-wrapper {
        width: 200px;
    }

    .image-box {
        position: relative;
        padding-bottom: 100%; // 1:1
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

    .inner-content .input-group-box {
        display: flex;
        align-items: center;
        padding: 15px 0;
        font-size: 16px;
        border-bottom: 1px solid #dfdfdf;

        &:last-child{
            border-bottom: none;
        }

        @media screen and (max-width: 992px) {
            flex-direction: column;
            align-items: flex-start;
        }
    }
    
    .control-label {
        width: 200px;
        padding: 10px;
        font-weight: 500;

        @media screen and (max-width: 992px) {
            font-size: 14px;
        }
    }

    .input-group-box input {
        flex: 1;

        @media screen and (max-width: 992px) {
            width: 100%;
            flex: none;
        }
    }

    .toggle-btn-box {
        gap: 5px;
    }

    .toggle-btn-box .button-el {
        width: 200px;
        height: 48px;
        border-radius: 0;
        transition: 0.1s;
        border: 1px solid #cccaca;
        border-radius: 5px;
        background-color: white;

        :hover {
            background-color: var(--piaar-main-color);
            color: white;
        }

        @media screen and (max-width: 992px) {
            width: 100px;
        }
    }

    .btn-active {
        background-color: var(--piaar-main-color) !important;
        font-weight: 600;
        color: white
    }
`;

const ImageControlFieldWrapper = styled.div`

    .image-control-box {
        display: flex;
        align-items: center;
        position: absolute;
        z-index: 10;
        height: 40px;
        width: 200px;
        bottom: 0px;
        background-color: #0909093b;
        border-radius: 0 0 4px 4px;
    }

    .image-control-box .button-el {
        width: 50%;
        height: 100%;
        border: none;
        background: none;
        transition: 0.2s;

        :hover {
            background-color: #09090985;
        }
    }
`;

const OptionInfoInputWrapper = styled.div`
    margin-top: 15px;
    background-color: white;
    border-radius: 10px;
    box-shadow: var(--defaultBoxShadow);

    .title-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }

    .title-label {
        font-size: 1.3rem;
        font-weight: 600;
        padding:15px;
        
        @media only screen and (max-width:992px){
            font-size: 1rem;
        }
    }

    .arrow-btn-box {
        padding: 10px;
    }

    .arrow-btn-box .button-el {
        width: 40px;
        height: 40px;
        position: relative;
        overflow: hidden;
        padding: 0;

        background: white;
        border: 1px solid white;
        border-radius: 50%;
        transition: 0.1s;

        cursor: pointer;

        :hover {
            background-color: var(--defaultHoverColor);
        }
    }

    .inner-content {
        padding: 20px 30px;
        border-top: 1px solid var(--defaultBorderColor)
    }

    .inner-title-label {
        font-weight: 600;
        font-size: 1.2rem;
        padding: 0 30px;

        @media screen and (max-width: 992px) {
            font-size: 1rem;
        }
    }

    .batch-reg-box {
        width: 80%;
        margin: 0 auto;
        border: 1px solid #dfdfdf;
        overflow: auto;
        border-radius: 5px;

        @media screen and (max-width: 992px){
            width: 100%;
        }
    }
    
    .batch-reg-box .input-group-box {
        display: flex;
        align-items: center;
        padding: 15px 0;
        font-size: 16px;
        color: #444;
        border-bottom: 1px solid #dfdfdf;

        :last-child {
            border-bottom: none;
        }

        @media screen and (max-width: 992px) {
            flex-direction: column;
            align-items: flex-start;
        }
    }

    .batch-reg-box .input-group-box .control-label {
        width: 150px;
        padding: 10px;
        font-weight: 500;

        @media screen and (max-width: 992px) {
            font-size: 14px;
        }
    }

    .batch-reg-box .input-group-box .modal-open-btn {
        height: 48px;
        width: 40px;
        padding: 0 10px;
        border: 1px solid #cccaca;
        border-left: none;
        border-radius: 0 5px 5px 0;
    }

    .batch-reg-box .reg-btn {
        padding: 6px 0;
        width: 100%;
        height: 48px;
        border: 1px solid var(--piaar-main-color);
        background-color: var(--piaar-main-color);
        font-weight: 600;
        color: white;
        border-radius: 0 0 5px 5px;
    }

    .control-label .button-el {
        width: 120px;
        border-radius: 2px;
        border: 1px solid var(--defaultBorderColor);
        background-color: var(--defaultButtonColor);
        color: #444;
        height: 30px;
        font-size: 14px;
    }

    .input-group-box input {
        flex: 1;

        @media screen and (max-width: 992px) {
            width: 100%;
            flex: none;
        }
    }

    .option-list {
        margin-top: 20px;
        padding: 30px;
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
        height: 48px;
        padding: 6px;
        border: 1px solid var(--piaar-main-color);
        background-color: var(--piaar-main-color);
        color: white;
        font-weight: 600;
        border-radius: 3px;

        @media screen and (max-width: 992px) {
            width: 100%;
        }
    }

    .delete-button-el {
        position: relative;
        overflow: hidden;
        width: 38px;
        height: 38px;

        cursor: pointer;

        :hover{
            transform: scale(1.05);
        }
    }

    .delete-button-el .delete-button-icon {
        width:80%;
        position: absolute;
        top:50%;
        left:50%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }
`;

const TableFieldWrapper = styled.div`
    padding: 20px 30px;
    overflow: hidden;

    @media all and (max-width: 992px){
        padding: 20px 0;
    }

    table {
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
    }

    table thead tr th {
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
        border: 1px solid var(--defaultBorderColor);
        background-color: var(--defaultButtonColor);
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

    .arrow-btn-box {
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
        height: 48px;

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

    .tooltip-box .arrow-btn-box {
        padding-top: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 2px;
    }

    .input-el {
        height: 38px;
        border-radius: 5px;
    }

    .tooltip-box .button-el {
        width: 70px;
        border-radius: 2px;
        border: 1px solid var(--defaultBorderColor);
        background-color: var(--defaultButtonColor);
        color: #444;
        font-size: 14px;
        height: 30px;
    }
`;

export {
    Container,
    PageTitleFieldWrapper,
    CategorySelectorWrapper,
    ProductInfoInputWrapper,
    ImageControlFieldWrapper,
    OptionInfoInputWrapper,
    TableFieldWrapper,
    CreateButtonFieldWrapper,
    BatchRegTooltipWrapper
}
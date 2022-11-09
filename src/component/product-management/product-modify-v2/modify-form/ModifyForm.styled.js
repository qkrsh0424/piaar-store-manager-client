import styled from "styled-components";

const Container = styled.div`
`;

const PageTitleFieldWrapper = styled.div`
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

const CreateButtonFieldWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
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
        flex-direction: column;
        padding: 10px;
    }

    .button-box {
        display: flex;
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
    ProductInfoInputWrapper,
    ImageControlFieldWrapper,
    CreateButtonFieldWrapper,
    BatchRegTooltipWrapper
}
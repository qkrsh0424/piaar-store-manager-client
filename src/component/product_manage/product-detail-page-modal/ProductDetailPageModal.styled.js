import styled from "styled-components";

const Container = styled.div`

`;

const HeaderFieldWrapper = styled.div`
    padding: 1% 2%;
    padding-bottom: 10px;
    border-bottom: 1px solid #000;

    .header-top {
        display: flex;
        justify-content: space-between;
        align-items: center
    }

    .modal-title {
        font-size: 1.2rem;
        font-weight: 700;

        @media only screen and (max-width:576px){
            font-size: 16px;
        }
    }

    .modal-close-btn {
        color: #5c5c7e;

        &:hover {
            color: #80808b;
        }
    }
`;

const SelectorFieldWrapper = styled.div`
    padding: 20px 10px;

    .selector-box {
        width: 350px;
        padding: 10px;

        @media screen and (max-width: 992px){
            width: 100%;
        }
    }

    .flex-box {
        display: flex;
        align-items: center;
        gap: 5px;
        flex-wrap: wrap;
    }

    .selector-control-box {
        padding: 0 10px;
    }

    .image-button-el{
        position: relative;
        overflow: hidden;
        width:30px;
        height: 30px;
        background: white;
        border: 1px solid #212529;
        border-radius: 2px;

        cursor: pointer;

        :hover{
            transform: scale(1.02);
        }

        :disabled {
            background-color: #cacaca;
            cursor: not-allowed;
        }
    }

    .image-button-icon{
        width:80%;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
    }

    .button-el{
        font-size: 13px;
        font-weight: 600;
        width: 50px;
        padding: 5px;
        color: #000;
        vertical-align: middle;
        background: white;
        /* border-radius: 2px; */
        border: 1px solid #d9d9d9;
        transition: opacity 0.1s linear;

        &:hover{
            cursor: pointer;
            /* background: #2C73D2; */
            background: var(--erp-main-color);
            border: 1px solid #2C73D2;
            color: #fff;
            transition: 0.2s;
            transform: scale(1.03);
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);
        }

        @media only screen and (max-width:992px){
            width: 80px;
            font-size: 10px;
        }
    }
`

const InputFieldWrapper  = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    .button-el{
        font-size: 14px;
        font-weight: 700;
        width: 140px;
        padding: 10px;
        vertical-align: middle;
        background: var(--erp-main-color);
        border: 1px solid var(--erp-main-color);
        transition: opacity 0.1s linear;
        color: #fff;

        &:hover{
            cursor: pointer;
            background: #fff;
            border: 1px solid #e0e0e0;
            color: #444;
            transition: 0.2s;
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);
        }

        @media only screen and (max-width:992px){
            width: 80px;
            font-size: 10px;
        }
    }

    .input-item {
        /* margin: 0 10px; */
        width: 330px;
        height: 40px;
        border: none;
        border-bottom: 1px solid #d9d9d9;
        border-radius: 3px;
        padding: 0 15px;
        font-size: 14px;
        font-weight: 600;
        box-sizing: border-box;

        @media screen and (max-width: 992px){
            width: 100%;
        }
    }

    .file-upload-input-item {
        /* display: none; */
    }

    .view-header-title {
        color: #000;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 10px;
    }

    .info-box {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .image-button-el{
        position: relative;
        overflow: hidden;
        width: 40px;
        height: 40px;
        background: none;
        border: 1px solid #fff;
        border-radius: 50%;
        transition: 0.2s;
        margin: 5px;

        cursor: pointer;

        :hover {
            transform: scale(1.05);
            background-color: #e0e0e0;
        }
    }
`;

const ImageSelectorWrapper = styled.div`
    min-height: 45vh;

    input {
        display: none;
    }
    
    .delete-btn {
        color: #dc3545;
        border: 1px solid #ced4da;
        background-color: white;
    }

    .image-wrapper {
        margin: 0 auto;
        width: 80%;
    }

    .image-box {
        min-height: 40vh;
        max-height: 40vh;
        overflow: auto;
        position: relative;
        /* padding-bottom: 100%; // 1:1 */
    }

    .image-box .no-image {
        width: 300px;
    }

    img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        /* height: 100%; */
        transition: .2s;
        border:1px solid #cccaca;
        border-radius: 5px;
        cursor: pointer;

        :hover {
            opacity: 0.3;
        }
    }
`;

export {
    Container,
    HeaderFieldWrapper,
    SelectorFieldWrapper,
    InputFieldWrapper,
    ImageSelectorWrapper
}
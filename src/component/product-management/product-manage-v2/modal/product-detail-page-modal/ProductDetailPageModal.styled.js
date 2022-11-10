import styled from "styled-components";

const SelectorFieldWrapper = styled.div`
    /* text-align: left; */
    display: flex;
    align-content: center;
    gap: 5px;
    margin: 10px 0;

    .select-item{
        width: 270px;
        height: 48px;
        padding: 5px;
        border: 1px solid var(--defaultBorderColor);
        border-radius: 5px;
        font-size: 14px;
        -webkit-appearance: none;
        -moz-appearance: none; 
        appearance: none;
        background:url('/assets/icon/down_arrow_gray_icon.png') no-repeat right 5px center;

        &:focus{
            outline: none;
        }

        :hover {
            cursor: pointer;
        }

        @media all and (max-width:992px) {
            margin: 10px 0 0 0;
            width: 100%;
        }
    }

    .control-btn-box {
        gap: 5px;
    }

    .button-el {
        position: relative;
        overflow: hidden;
        width: 48px;
        height: 48px;
        border-radius: 5px;

        border: 1px solid var(--defaultBorderColor);
        background-color: #fff;

        :disabled {
            background-color: var(--defaultButtonColor);
            cursor: not-allowed;
        }
    }
`;

const InputFieldWrapper = styled.div`
    display: flex;
    padding: 30px 0;

    .input-el {
        border: none;
        border-bottom: 1px solid var(--defaultBorderColor);
        border-radius: 0;
        width: 320px;
        font-weight: 600;
        box-shadow: none;
        font-size: 16px;
    }
`;

const ImageFieldWrapper = styled.div`
    margin: 0 auto;
    min-height: 50vh;
    max-height: 50vh;
    width: 430px;
    overflow: auto;

    input {
        display: none;
    }
    
    .delete-btn {
        color: #dc3545;
        border: 1px solid #ced4da;
        background-color: white;
    }

    .image-wrapper {
        width: 100%;
        /* position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%); */
    }

    .image-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .image-box .no-image {
        width: 430px;
    }

    img {
        width: 100%;
        transition: .2s;
        border:1px solid #cccaca;
        border-radius: 5px;
    }

    .download-btn {
        border: 1px solid #efefef;
        padding: 3px 10px;
        float: right;
        margin-right: 50px;
    }
`;

const ImageControlFieldWrapper = styled.div`
    position: relative;

    .image-control-box {
        display: flex;
        align-items: center;
        position: absolute;
        z-index: 10;
        height: 40px;
        width: 430px;
        top: 0;
        background-color: #0909093b;
        border-radius: 4px 4px 0 0;
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

    .image-box {
        position: absolute;
    }
`;

export {
    SelectorFieldWrapper,
    InputFieldWrapper,
    ImageFieldWrapper,
    ImageControlFieldWrapper
}
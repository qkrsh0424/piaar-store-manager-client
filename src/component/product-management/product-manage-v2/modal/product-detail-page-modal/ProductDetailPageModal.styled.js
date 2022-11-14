import styled from "styled-components";

const SelectorFieldWrapper = styled.div`
    /* text-align: left; */
    display: flex;
    align-content: center;
    gap: 5px;
    margin: 10px;

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

    @media screen and (max-width: 992px) {
        flex-wrap: wrap;
    }
`;

const InputFieldWrapper = styled.div`
    display: flex;
    place-items: center;
    padding: 10px;
    overflow: auto;
    flex-wrap: wrap;

    .input-label {
        font-size: 16px;
        font-weight: 600;
        margin: 0 10px;
    }

    .input-el {
        border: none;
        border-bottom: 1px solid var(--defaultBorderColor);
        border-radius: 0;
        width: 300px;
        font-weight: 600;
        box-shadow: none;
        font-size: 16px;
    }
`;

const ImageFieldWrapper = styled.div`
    padding: 10px;
    width: 100%;

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
        /* min-height: 50vh; */
        max-height: 50vh;
        overflow: auto;
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

    .image-control-box {
        display: flex;
        align-items: center;
        position: relative;
        z-index: 10;
        height: 40px;
        bottom: 4px;
        background-color: #8991a3;
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

export {
    SelectorFieldWrapper,
    InputFieldWrapper,
    ImageFieldWrapper,
    ImageControlFieldWrapper
}
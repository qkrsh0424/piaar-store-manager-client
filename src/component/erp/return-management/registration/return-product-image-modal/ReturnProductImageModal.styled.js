import styled from "styled-components";

const Container = styled.div`
    min-height: 70vh;
    max-height: 70vh;
`;

const HeaderFieldWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e1e1e1;

    .title-box{
        padding: 10px 20px;
        font-size: 20px;
        font-weight: 700;

        @media all and (max-width:992px){
            padding: 10px 10px;
            font-size: 16px;
        }
    }
`;

const ButtonFieldWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 10px;

    input {
        display: none;
    }

    .uploader-btn-el {
        overflow: hidden;
        position: relative;
        padding: 5px;
        width: 240px;
        background: white;
        border: 1px solid #c9c9c9;
        border-radius: 2px;
        font-size: 16px;
        cursor: pointer;
        -webkit-transition: all .1s;
        transition: all .1s;

        @media all and (max-width:992px) {
            margin: 0;
            width: 80px;
            font-size: 14px;
        }

        :hover {
            opacity: 0.8;
            transform: scale(1.02);
        }
    }

    .button-el{
        float: right;
        overflow: hidden;
        position: relative;
        padding: 5px;
        width: 150px;
        background: var(--erp-main-color);
        border: 1px solid var(--erp-main-color);
        border-radius: 2px;
        font-size: 16px;
        font-weight: 600;
        color: white;
        cursor: pointer;
        -webkit-transition: all .1s;
        transition: all .1s;

        @media all and (max-width:992px) {
            margin: 0;
            width: 80px;
            font-size: 14px;
        }

        :hover {
            transform: scale(1.02);
        }
    }
`;

const InfoTextFieldWrapper = styled.div`
    padding: 5px 20px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }

    .info-box{
        font-size: 14px;
        color: #ff4444;
        word-break: keep-all;

        @media all and (max-width: 992px){
            font-size: 12px;
        }
    }
`;

const ImageFieldWrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding-bottom: 50px;
    
    .image-wrapper {
        width: 400px;
        overflow: auto;
    }

    .image-box {
        position: relative;
        padding-bottom: 100%; // 1:1
        border-radius: 5px;
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
            opacity: 0.5;
        }
    }
`;

export {
    Container,
    HeaderFieldWrapper,
    ButtonFieldWrapper,
    InfoTextFieldWrapper,
    ImageFieldWrapper
}
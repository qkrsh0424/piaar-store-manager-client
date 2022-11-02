import styled from "styled-components";

const Container = styled.div`
    min-width: 400px;
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
        font-weight: 600;

        @media all and (max-width:992px){
            padding: 10px 10px;
            font-size: 16px;
        }
    }
`;

const InfoFieldWrapper = styled.div`
    padding: 10px 20px;
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: var(--erp-main-color);
`;

const InputFieldWrapper = styled.div`
    margin: 10px 20px;
    border: 1px solid var(--defaultBorderColor);
    box-shadow: var(--defaultBoxShadow);
    border-radius: 5px;

    .input-group-box {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 15px 0;
        font-size: 16px;
        border-bottom: 1px solid #dfdfdf;
    }

    .input-title {
        width: 70px;
        text-align: center;

        @media screen and (max-width: 992px) {
            font-size: 12px;
        }
    }

    .input-value {
        display: flex;
        flex: 1;
    }

    .input-value .input-el {
        flex: 1;
    }

    .input-title-box {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 140px;
    }

    .button-el {
        position: relative;
        overflow: hidden;
        width: 48px;
        height: 48px;
        cursor: pointer;
        transition: 0.2s;
        border-radius: 50%;

        :hover {
            transform: scale(1.1);
        }
    }

    .button-el .button-icon {
        width:60%;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
    }

    .add-button-el {
        width: 100%;
        padding: 5px 0;
        transition: 0.1s;
        background-color: var(--defaultButtonColor);
        border: none;
        border-radius: 0 0 5px 5px;
        overflow: hidden;
        position: relative;
        -webkit-transition: all .2s;
        transition: all .2s;
    }
`;

const ButtonFieldWrapper = styled.div`
    height: 40px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .button-el {
        width: 100%;
        height: 100%;
        border: 1px solid #00000000;
        background-color: white;

        &:hover{
            background:#e1e1e160;
        }
    }
`;

export {
    Container,
    HeaderFieldWrapper,
    InputFieldWrapper,
    InfoFieldWrapper,
    ButtonFieldWrapper
}
import styled from "styled-components";

const Container = styled.div`
    margin: 20px 0 20px 0;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(219, 221, 226);
    border-radius: 10px;
`;

const ButtonFieldWrapper = styled.div`

    .flex-box{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
    }

    .button-box{
        padding-left: 10px;
    }

    .button-el{
        overflow: hidden;
        position: relative;
        padding: 5px;
        width: 150px;
        background: rgb(137, 145, 163);
        border: 1px solid rgb(114, 123, 144);
        border-radius: 2px;
        font-size: 16px;
        font-weight: 600;
        color: white;
        cursor: pointer;
        -webkit-transition: all .1s;
        transition: all .1s;

        &:hover{
            transform: scale(1.02);
        }
        
        @media all and (max-width:992px) {
            margin: 0;
            width: 80px;
            font-size: 14px;
        }
    }
`;

const CheckBoxFieldWrapper = styled.div`
    font-size: 16px;

    .selector-box {
        padding: 15px 10px;
        align-items: center;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: flex-start
    }

    .button-box {
        :hover {
            transition: 0.1s;
            transform: scale(1.02);
        }
    }
    
    .button-el {
        transition: 0.1s;
        /* width: 120px; */
        /* height: 30px; */
        padding: 2px 25px;
        border: 1px solid var(--defaultBorderColor);
        background-color: var(--defaultButtonColor);
        border-radius: 20px;
        font-size: 16px;
        box-shadow: var(--defaultBoxShadow);
        
        &.button-active {
            border: 1px solid var(--piaar-main-color);
            background-color: var(--piaar-main-color);
            color: white;
        }

        @media screen and (max-width: 992px) {
            width: 80px;
            height: 25px;
            font-size: 12px;
        }
    }
`;

const TextFieldWrapper = styled.div`
    color: var(--erp-main-color);
    font-size: 14px;
    font-weight: 600;
`;

export {
    Container,
    ButtonFieldWrapper,
    CheckBoxFieldWrapper,
    TextFieldWrapper
}
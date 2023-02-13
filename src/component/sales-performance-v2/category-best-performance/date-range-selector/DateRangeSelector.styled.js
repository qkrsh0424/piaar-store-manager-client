import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    .common-calendar .button-el {
        position: fixed;
        background-color: var(--piaar-main-color);
        border: 1px solid var(--piaar-main-color);
        box-shadow: 1px 1px 10px #484b6c78;
        right: 40px;
        bottom: 40px;
        text-align: center;
        border-radius: 50%;
        padding: 15px;
        z-index: 10;
        transition: 0.2s;

        &:hover {
            transform: scale(1.1);
        }
    }
`;

const DateSelectorFieldWrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    gap: 5px;
    min-height: 360px;
    overflow: hidden;

    @media screen and (max-width: 992px) {
        flex-direction: column;
    }
    
    .date-selector-box {
        width: 50%;
        position: static;

        @media screen and (max-width: 992px) {
            width: 100%;
        }
    }

    .date-selector-box-title {
        font-weight: 700;
        padding: 10px;
        margin: 0 auto;
    }
`;

const DateButtonFieldWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;

    @media screen and (max-width: 992px) {
        flex-direction: column;
    }

    .button-box {
        width: 100px;
        padding: 4px 2px;

        @media screen and (max-width: 992px) {
            width: 100%;
        }
    }
    
    .button-el {
        width: 100%;
        height: 38px;
        border-radius: 5px;
        background-color: #fff;
        border: 1px solid #fff;
        -webkit-transition: all .1s;
        transition: all .1s;

        &:hover{
            transform: scale(1.02);
        }
        
        @media all and (max-width:992px) {
            margin: 0;
            font-size: 14px;
        }
    }
`;

const ButtonFieldWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    
    .button-item {
        width: 100%;
        padding: 10px 0;
        font-size: 14px;
        font-weight: 500;
        background: rgb(137, 145, 163);
        border: 1px solid #00000000;
        cursor: pointer;
        color: white;

        &.confirm-btn {
            background-color: var(--piaar-main-color);
        }
    }
`;

export {
    Container,
    DateSelectorFieldWrapper,
    DateButtonFieldWrapper,
    ButtonFieldWrapper
}
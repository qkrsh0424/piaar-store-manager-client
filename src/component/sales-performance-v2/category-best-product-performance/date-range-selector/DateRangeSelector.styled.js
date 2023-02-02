import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    .common-calendar .button-el {
        position: fixed;
        background-color: var(--piaar-main-color);
        border: 1px solid var(--piaar-main-color);
        box-shadow: var(--defaultBoxShadow);
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
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 5px;
    
    .date-selector-box {
        width: 350px;

        @media screen and (max-width: 992px) {
            width: 100%;
        }
    }
`;

const DateButtonFieldWrapper = styled.div`
    padding: 10px 20px;

    .button-box {
        width: 100px;
        padding: 4px 2px;

        @media screen and (max-width: 992px) {
            width: 80px;
        }
    }
    
    .button-el {
        width: 100%;
        height: 30px;
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
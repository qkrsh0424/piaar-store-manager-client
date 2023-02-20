import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    .select-box {
        padding: 10px 20px;
        padding-bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .select-box .button-el {
        background-color: #fff;
        border: 1px solid #e0e0e0;
        width: 80px;
        height: 40px;
        font-weight: 600;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        -webkit-transition: all .1s;
        transition: all .1s;

        &:hover {
            background-color: var(--defaultHoverColor);
        }
    }

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

const SearchFieldWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 5px;

    .select-item {
        width: 200px;
        height: 40px;
        padding: 5px;
        border: 1px solid #e0e0e0;
        border-bottom: none;
        border-radius: 5px;
        font-size: 14px;
        -webkit-appearance: none;
        -moz-appearance: none; 
        appearance: none;
        background:url('/assets/icon/down_arrow_gray_icon.png') no-repeat right 5px center;
        background-color: white;

        &:focus{
            outline: none;
        }

        @media all and (max-width:992px) {
            width: 100%;
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
        width: 250px;
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
    SearchFieldWrapper,
    DateSelectorFieldWrapper,
    DateButtonFieldWrapper,
    ButtonFieldWrapper
}
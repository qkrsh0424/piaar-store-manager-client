import styled, { css } from 'styled-components';

const Container = styled.div`
    padding: 10px 20px;
`;

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
`;

const TitleSelectorWrapper = styled.div`
    display: flex;
    padding: 20px 0px;
    /* align-items: center; */
    flex-wrap: wrap;

    @media only screen and (max-width: 992px) {
        width: 100%;
        padding: 10px;
        grid-template-columns: 100%;
        row-gap: 20px;
        place-content: center;
        flex-direction: column;
    }

    .selector {
        text-align: center;
        width: 350px;

        @media only screen and (max-width: 992px) {
            width: 100%;
        }
    }

    .select-item{
        margin: 0 10px;
        width: 320px;
        height: 50px;
        padding: 10px;
        border: 1px solid #989fb7;
        border-radius: 0;
        font-size: 14px;
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

    .button-box {
        display: flex;

        @media only screen and (max-width: 992px) {
            justify-content: flex-end;
        }
    }

    div button {
        background: #989fb7;
        color:white;
        border:1px solid #989fb7;
        border-radius: 3px;
        margin-left: 5px;
        padding: 8px;

        &:hover {
            opacity: 0.8;
            cursor: pointer;
        }

        @media only screen and (max-width: 992px) {
            padding: 6px;
        }
    }

    .invert-icon {
        opacity: 1;
        filter: invert(100%);
    }
`;

export {
    Container,
    HeaderContainer,
    TitleSelectorWrapper
}
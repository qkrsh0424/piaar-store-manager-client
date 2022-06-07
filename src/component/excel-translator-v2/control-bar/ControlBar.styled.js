import styled, { css } from 'styled-components';

const Container = styled.div`
    padding: 10px 20px;
`;

const HeaderContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @media screen and (max-width: 992px){
        grid-template-columns: repeat(1, 1fr);
    }
`;

const TitleSelectorWrapper = styled.div`
    display: grid;
    grid-template-columns: 50% auto;
    padding: 20px 0px;
    align-items: center;

    @media only screen and (max-width: 992px) {
        padding: 10px;
        grid-template-columns: 100%;
        row-gap: 20px;
        place-content: center;
    }

    .selector {
        text-align: center;

        @media only screen and (max-width: 992px) {
            font-size: 10px;
            grid-row: end;
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
`;

export {
    Container,
    HeaderContainer,
    TitleSelectorWrapper
}
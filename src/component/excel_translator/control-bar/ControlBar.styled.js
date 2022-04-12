import styled, { css } from 'styled-components';

const Container = styled.div`
    padding: 15px 20px;
`;

const HeaderContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

const TitleSelectorWrapper = styled.div`
    display: flex;
    text-align: center;
    align-items: center;

    .selector {
        width: 50%;
    }

    div button {
        background: #989fb7;
        color:white;
        border:1px solid #989fb7;
        border-radius: 3px;
        margin-left: 5px;
        padding: 10px;

        &:hover {
            opacity: 0.8;
            cursor: pointer;
        }

        @media only screen and (max-width: 992px) {
            padding: 6px;
        }
    }
`;

const DataControlFieldWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
    text-align: center;
    align-items: center;


    @media only screen and (max-width: 992px){
        grid-template-columns: none;
        grid-template-rows: repeat(1, 1fr);
    }

    form {
        margin: 10px;

        @media only screen and (max-width: 992px){
            margin: 0 auto;
            width: 100%;
        }
    }

    form label {
        font-size: 1rem;
        display: inline-block;
        margin: 4px;
        width: 100%;
        padding: 3% 0%;
        color: white;
        text-align: center;
        vertical-align: middle;
        background-color: #a9b3d5;
        border-radius: 3px;
        transition: 0.15s linear;
        font-weight: 600;

        &:hover {
            opacity: 0.8;
            cursor: pointer;
        }

        @media only screen and (max-width:992px){
            padding: 1.5% 0%;
        }

        @media only screen and (max-width:768px){
            font-size: 14px;
        }

        @media only screen and (max-width:576px){
            font-size: 12px;
        }
    }

    form input {
        font-size: 20px;
        width: 100%;
        display: none;
    }

    form button {
        font-size: 1rem;
        width: 100%;
        padding: 3% 0%;
        margin: 4px;
        color: white;
        vertical-align: middle;
        background-color: #a9b3d5;
        border-radius: 3px;
        border: none;
        transition: 0.15s linear;
        font-weight: 600;

        &:hover {
            opacity: 0.8;
            cursor: pointer;
        }

        @media only screen and (max-width:992px){
            padding: 1.5% 0%;
        }

        @media only screen and (max-width:768px){
            font-size: 14px;
        }

        @media only screen and (max-width:576px){
            font-size: 12px;
        }
    }
`;

export {
    Container,
    HeaderContainer,
    TitleSelectorWrapper,
    DataControlFieldWrapper
}
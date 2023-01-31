import styled from "styled-components";

const Container = styled.div`
    margin: 20px 0 20px 0;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(219, 221, 226);
    border-radius: 10px;
`;

const SearchFieldWrapper = styled.div`
    padding: 10px 0;
    display: flex;

    .button-box {
        display: flex;
        gap: 3px;
    }

    .button-box .button-el {
        width: 80px;
        height: 30px;
        background-color: var(--defaultButtonColor);
        border: 1px solid var(--defaultBorderColor);
        border-radius: 5px;
        
        &.checked {
            background-color: #555 !important;
            border: 1px solid #555;
            color: white;
        }

        &:hover {
            background-color: var(--defaultHoverColor);
        }
    }
`;

const DateSelectorFieldWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    
    .date-selector-box{
        width: 300px;

        @media screen and (max-width: 992px) {
            width: 100%;
        }
    }
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

const DateButtonFieldWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    padding: 5px 0;

    .button-box {
        width: 120px;
        padding: 4px 2px;

        @media screen and (max-width: 992px) {
            width: 80px;
        }
    }
    
    .button-el {
        width: 100%;
        height: 30px;
        border-radius: 5px;
        background-color: var(--defaultButtonColor);
        border: 1px solid var(--defaultBorderColor);
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

export {
    Container,
    DateSelectorFieldWrapper,
    SearchFieldWrapper,
    ButtonFieldWrapper,
    DateButtonFieldWrapper
}
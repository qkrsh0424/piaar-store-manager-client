import styled from "styled-components";

const Container = styled.div`
    margin: 20px 0 20px 0;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(219, 221, 226);
    border-radius: 10px;
`;

const SearchFieldWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 0;

    .search-box {
        width: 200px;

        @media screen and (max-width: 992px) {
            width: 100%;
        }
    }
    
    .search-box .button-el {
        width: 100%;
        padding: 5px 0;
        height: 48px;
        background: white;
        border: 1px solid #e1e1e1;
        border-radius: 5px;
    }

    .option-box {
        flex: 1;
        background-color: #f7f7f7;
        overflow: auto;
        border-radius: 5px;
        max-height: 150px;
        border: 1px solid #e1e1e1;
        padding: 10px;
    }

    .option-box .selector-box {
        padding: 0 10px;
        align-items: center;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
        min-height: 48px;        
    }

    .option-box .button-box {
        position: relative;

        :hover {
            transition: 0.1s;
            transform: scale(1.02);
        }
    }

    .option-box .button-el {
        transition: 0.1s;
        padding: 0 10px;
        height: 35px;
        border-radius: 5px;
        font-size: 14px;
        border: 1px solid #6b727d;
        background-color: #6b727d;
        box-shadow: var(--defaultBoxShadow);
        color: white;
        
        &.odd-item {
            background-color: #868e99;
            border: 1px solid #868e99;
        }

        @media screen and (max-width: 992px) {
            width: 80px;
            height: 25px;
            font-size: 12px;
        }
    }

    .option-box .close-box {
        position: absolute;
        right: -5px;
        top: -5px;
        
        :hover {
            cursor: pointer;
        }
    }

    .close-button-box {
        position: relative;
        background-color: white;
        border: 0.5px solid var(--defaultBorderColor);
        box-shadow: var(--defaultBoxShadow);
        border-radius: 50%;
        height: 15px;
        width: 15px;
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
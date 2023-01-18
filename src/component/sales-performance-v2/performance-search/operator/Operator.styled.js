import styled from "styled-components";

const Container = styled.div`
    margin: 20px 0 20px 0;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(219, 221, 226);
    border-radius: 10px;
`;

const DateSelectorFieldWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    .label-item{
        margin: 0 10px;
        font-size: 14px;
        font-weight: 600;
        color: #444;

        @media all and (max-width:992px) {
            margin: 10px 0 0 0;
            width: 100%;
        }
    }

    .flex-box {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .date-selector-box {
        width: 300px;

        @media screen and (max-width: 992px) {
            width: 100%;
        }
    }

    .select-item {
        width: 80px;
        height: 50px;
        padding: 10px;
        border: 1px solid #e1e1e1;
        border-radius: 5px;
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
`;

const SearchFieldWrapper = styled.div`

    .search-box {
        display: flex;
        align-items: center;
    }

    .search-column-box {
        display: flex;
        place-content: center;
        gap: 10px;
        padding: 0 10px;
    }

    .search-column-box .button-el {
        border: 1px solid var(--piaar-main-color);
        background-color: var(--piaar-main-color);
        color: white;
        transition: 0.1s;
        padding: 2px 25px;
        border-radius: 20px;
        font-size: 16px;
        box-shadow: var(--defaultBoxShadow);
    }

    .search-column {
        padding: 10px 0;
    }

    .search-data {
        /* border: 1px solid #e1e1e1; */
        height: 50px;
        border-radius: 5px;
    }

    .label-item {
        margin: 0 10px;
        font-size: 14px;
        font-weight: 600;
        color: #444;

        @media all and (max-width:992px) {
            margin: 0 0;
        }
    }

    .select-item {
        width: 300px;
        height: 50px;
        padding: 10px;
        border: 1px solid #e1e1e1;
        border-radius: 5px;
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

    .input-el {
        border: 1px solid #e1e1e1;
        width: 300px;
    }
`;

const ButtonFieldWrapper = styled.div`

    .flex-box{
        display: flex;
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

export {
    Container,
    DateSelectorFieldWrapper,
    SearchFieldWrapper,
    ButtonFieldWrapper
}
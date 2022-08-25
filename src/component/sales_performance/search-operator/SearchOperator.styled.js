import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    border-bottom: 1px solid #ccc;
`;

const DateSelectorFieldWrapper = styled.div`
    padding: 10px;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;

    .date-selector-box {
        font-size: 15px;
        font-weight: 500;
        width: 300px;
        height: 35px;
        vertical-align: middle;
        background-color: var(--piaar-main-color);
        color: white;
        border: 1px solid var(--piaar-main-color);
        -webkit-transition: opacity 0.1s linear;
        transition: 0.2s;

        :hover {
            background-color: #B9B4EB;
            border: 1px solid #B9B4EB;
        }

        @media only screen and (max-width:992px){
            width: 100%;
        }
    }

    .date-control-box {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        flex-wrap: wrap;
    }

    .flex-box {
        display: flex;
        gap: 5px;
        padding: 3px 0;
    }

    .analysis-range-btn {
        padding: 3px 20px;
        background-color: #aaa;
        color: white;
        border: 1px solid #aaa;
        transition: 0.2s;

        :hover {
            background-color: #999;
            border: 1px solid #999;
        }
    }

    .selected {
        background-color: #444 !important;
    }
`;

const InfoTextFieldWrapper = styled.div`
    padding: 0 10px;
    font-size: 14px;
    font-weight: 700;
    color: var(--erp-main-color);
`;

const CheckBoxFieldWrapper = styled.div`
    display: flex;
    padding: 0 2%;
    font-weight: 600;
    flex-direction: row-reverse;

    .checkbox-group {
        display: flex;
        gap: 10px;

        :hover {
            cursor: pointer;
        }
    }

    .checkbox-input {
        margin: 5px;
    }
`;

export {
    Container,
    DateSelectorFieldWrapper,
    InfoTextFieldWrapper,
    CheckBoxFieldWrapper
}
import styled from "styled-components";

const Container = styled.div`
    padding: 2%;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const DateSelectorFieldWrapper = styled.div`
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-end;

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
        gap: 5px;
    }
    
    .date-range-btn {
        padding: 3px 20px;
        background-color: var(--piaar-main-color);
        color: white;
        border: 1px solid var(--piaar-main-color);
        transition: 0.3s;

        :hover {
            background-color: #B9B4EB;
            border: 1px solid #B9B4EB;
        }
    }
`;

const DropDownFieldViewWrapper = styled.div`
    .select-item{
        width: 300px;
        height: 35px;
        padding: 0 10px;
        margin: 0 10px;
        border: 1px solid #ccc;
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
            margin: 10px 0 0 0;
            width: 100%;
        }
    }
`;

export {
    Container,
    DateSelectorFieldWrapper,
    DropDownFieldViewWrapper
}
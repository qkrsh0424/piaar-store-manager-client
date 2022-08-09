import styled from "styled-components";

const Container = styled.div`
    border-bottom: 1px solid #444;
    padding: 0 20px;

    .checkbox-wrapper {
        padding: 10px 0;
    }
`;

const SelectorWrapper = styled.div`
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    width: 100%;

    .select-item {
        width: 250px;
        height: 40px;
        padding: 0 10px;
        border: 1px solid #444;
        border-radius: 0;
        font-size: 14px;
        -webkit-appearance: none;
        -moz-appearance: none; 
        appearance: none;
        background:url('/assets/icon/down_arrow_gray_icon.png') no-repeat right 5px center;

        &:focus{
            outline: none;
        }
    }
`;

const CheckBoxFieldWrapper = styled.div`
    padding: 2px 0;
    font-weight: 600;

    .checkbox-group {
        display: inline-block;
        
        :hover {
            cursor: pointer;
        }
    }

    .checkbox-input {
        margin: 5px;
    }

    .out-of-stock {
        color: #ff0000;
    }
`;

export {
    Container,
    SelectorWrapper,
    CheckBoxFieldWrapper
}
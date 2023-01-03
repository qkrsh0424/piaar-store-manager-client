import styled from "styled-components";

const Container = styled.div`

`;

const InputFieldWrapper = styled.div`
    margin-top: 10px;
    padding: 0 20px;

    .input-el{
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #e1e1e1;
        padding: 10px 5px;

        &:focus{
            outline: none;
        }
    }
`;

const ListFieldWrapper = styled.div`
    margin-top: 10px;
    margin-bottom: 20px;
    min-height: 50vh;
    max-height: 50vh;
    overflow: auto;
    padding: 0 20px;
    white-space: pre-line;

    .flex-box { 
        display: flex;
        justify-content: space-between;
    }

    .control-button-item{
        width: 100%;
        padding: 10px 0;
        font-size: 14px;
        font-weight: 500;
        background: white;
        border: 1px solid #00000000;
        cursor: pointer;

        &:hover{
            background:#e1e1e160;
        }

        &:disabled{
            cursor: not-allowed;
        }
    }

    .highlight{
        font-weight : bold; 
        color:#FF0000;
    }

    .button-el{
        padding: 10px 20px;
        text-align: left;
        width: 100%;
        background-color: white;
        border: 1px solid #00000000;
        cursor: pointer;
        transition: 0.1s;
        border-bottom: 1px solid #efefef;

        &:hover{
            background: #e1e1e160;
        }
    }

    .total-button {
        background-color: #f7f7f7;
    }
`;

export {
    Container,
    InputFieldWrapper,
    ListFieldWrapper
}
import styled from "styled-components";

const Container = styled.div`

`;

const GraphOperatorFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 20px;

    .button-box {
        display: flex;
    }

    .button-box .button-el {
        width: 40px;
        height: 40px;
        background-color: var(--defaultButtonColor);
        border: 1px solid var(--defaultBorderColor);
        
        &.checked {
            background-color: #555;
            border: 1px solid #555;
            color: white;
        }
    }
`;

export {
    Container,
    GraphOperatorFieldWrapper
}
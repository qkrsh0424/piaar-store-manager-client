import styled from "styled-components";

const Container = styled.div`

`;

const GraphOperatorFieldWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 20px;

    @media screen and (max-width: 992px) {
        flex-direction: column;
    }

    .common-box {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .button-box {
        display: flex;
        gap: 3px;
    }

    .button-box .button-el {
        width: 40px;
        height: 40px;
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

    .button-box .data-control-btn {
        width: 100px;
        height: 40px;
        background-color: var(--defaultButtonColor);
        border: 1px solid var(--defaultBorderColor);
        border-radius: 5px;
    }
`;

export {
    Container,
    GraphOperatorFieldWrapper
}
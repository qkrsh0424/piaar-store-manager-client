import styled from "styled-components";

const Container = styled.div`

`;

const BoxFieldWrapper = styled.div`
    padding-bottom: 30px;

    .button-box {
        width: 90%;
        margin: 0 auto;
        margin-bottom: 10px;
        
        :last-child {
            margin-bottom: 0;
        }
    }
    
    .button-el {
        width: 100%;
        padding: 10px;
        border: 1px solid var(--defaultBorderColor);
        background-color: var(--defaultButtonColor);
        box-shadow: var(--defaultBoxShadow);
        font-size: 1.2rem;
        border-radius: 10px;
        transition: 0.15s;

        :hover {
            background-color: var(--defaultHoverColor);
        }
    }
`;

export {
    Container,
    BoxFieldWrapper
}
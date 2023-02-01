import styled from "styled-components";

const Container = styled.div`
    padding: 5px 20px;
`;

const BoxFieldWrapper = styled.div`
    padding-bottom: 30px;

    .button-box {
        width: 100%;
        margin: 0 auto;
        margin-bottom: 10px;
        
        :last-child {
            margin-bottom: 0;
        }
    }
    
    .button-el {
        width: 100%;
        padding: 10px;
        border: 1px solid #e1e1e1;
        background-color: white;
        box-shadow: var(--defaultBoxShadow);
        font-size: 1.2rem;
        border-radius: 10px;
        transition: 0.15s;
        display: flex;
        align-items: center;
        justify-content: center;

        :hover {
            background-color: var(--defaultHoverColor);
        }

        @media screen and (max-width: 992px) {
            flex-direction: column;
            font-size: 14px;
        }
    }
    
    .sub-info-text {
        font-size: 1rem;
        padding: 0 10px;

        @media screen and (max-width: 992px) {
            font-size: 12px;
        }
    }
`;

export {
    Container,
    BoxFieldWrapper
}
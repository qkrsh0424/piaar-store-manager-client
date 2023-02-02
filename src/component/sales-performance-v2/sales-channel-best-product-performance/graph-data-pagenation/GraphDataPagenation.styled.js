import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    align-items: flex-end;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

const SelectedInfoFieldWrapper = styled.div`
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--erp-main-color);
`;

const OrderBySelectorFieldWrapper = styled.div`
    display: flex;
    gap: 3px;

    .button-el {
        width: 80px;
        height: 30px;
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
`;

export {
    Container,
    SelectedInfoFieldWrapper,
    OrderBySelectorFieldWrapper
}
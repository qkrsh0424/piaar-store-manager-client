import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    margin-top: 10px;
    padding: 0 20px;
    @media all and (max-width: 992px){
        padding: 0 10px;
    }

    justify-content: space-between;
    align-items: flex-end;
`;

const SelectedInfoFieldWrapper = styled.div`
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--erp-main-color);
`;

export {
    Container,
    SelectedInfoFieldWrapper
}
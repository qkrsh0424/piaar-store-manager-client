import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    /* margin-bottom: 30px; */
    /* padding: px; */
    /* justify-content: flex-end; */
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

export {
    Container,
    SelectedInfoFieldWrapper
}
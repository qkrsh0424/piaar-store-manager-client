import styled from 'styled-components';

const Container = styled.div`

`;

const DateRangePickerWrapper = styled.div`
    .confirm-btn {
        text-align: center;
        padding: 10px;
        background-color: rgb(229, 232, 237);
        transition: opacity 0.1s linear;
    
        &:hover {
            opacity: 0.6;
        }
    }
`;

export {
    Container,
    DateRangePickerWrapper
}
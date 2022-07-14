import styled from 'styled-components';

const Container = styled.div`

`;

const DateRangePickerWrapper = styled.div`
    .confirm-btn {
        text-align: center;
        padding: 10px;
        background-color: rgb(229, 232, 237);
        transition: opacity 0.1s linear;
        margin-bottom: 5px;
    
        &:hover {
            opacity: 0.6;
            cursor: pointer;
        }
    }

    .flex-box {
        display: flex;
    }

    .date-range-btn {
        padding: 7px;
        background-color: rgb(206 214 230);
        color: #444;
        width: 50%;
        font-size: 14px;
        font-weight: 600;
        border: 1px solid #fff;
        transition: 0.3s;

        :hover {
            background-color: rgb(61, 145, 255);
            border: 1px solid rgb(61, 145, 255);
            color: white;
        }

        @media screen and (max-width: 992px) {
            width: 100%;
            font-size: 12px;
        }
    }
`;

export {
    Container,
    DateRangePickerWrapper
}
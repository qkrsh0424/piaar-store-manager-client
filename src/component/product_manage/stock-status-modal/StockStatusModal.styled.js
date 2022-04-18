import styled, { css } from 'styled-components';

const Container = styled.div`
`;

const HeaderFieldWrapper = styled.div`
    padding: 2%;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #000;

    .header-top {
        display: flex;
        justify-content: space-between;
    }

    .modal-title {
        font-size: 1.3rem;
        font-weight: 700;

        @media only screen and (max-width:576px){
            font-size: 16px;
        }
    }

    .modal-close-btn {
        color: #5c5c7e;

        &:hover {
            color: #80808b;
        }
    }   

    .info-text {
        color: red;
        padding: 10px 0;
    }
`;

const TableFieldWrapper = styled.div`
    padding: 10px;

    .status-box {
        font-weight: 400;
        padding: 10px;
    }

    .status-box span {
        border: none;
        margin: 4px;
        padding: 5px 15px;
        border-radius: 3px;
        background: #c8cef7;
    }

    .status-box .release-box {
        background: #d8def5;
    }

    li {
        list-style: none;
        text-align: center;
    }

    .data-container {
        min-height: 50vh;
        max-height: 50vh;
        overflow: auto;
    }

    .data-container li {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        border: 1px solid #e9e9e9;
        background: #c8cef7;

        .status-memo {
            :hover {
                cursor: pointer;
                opacity: 0.8;
                background: #acb3e1;
                color: white;
            }
        }
    }

    .data-container .release-list {
        background: #d8def5;
    }

    .data-container li div {
        overflow: hidden;
        height: auto;
        font-size: 1rem;
        padding: 2px;
        text-align: center;
        border-right: 1px solid #e9e9e9;
    }
`;


export {
    Container,
    HeaderFieldWrapper,
    TableFieldWrapper
}
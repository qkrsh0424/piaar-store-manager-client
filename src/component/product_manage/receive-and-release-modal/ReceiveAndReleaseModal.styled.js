import styled, { css } from 'styled-components';

const Container = styled.div`
    padding-bottom: 20px;
`;

const HeaderFieldWrapper = styled.div`
    padding: 1% 2%;
    padding-bottom: 10px;
    border-bottom: 1px solid #000;

    .header-top {
        display: flex;
        justify-content: space-between;
        align-items: center
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

const DateSelectorFieldWrapper = styled.div`
    padding: 10px;

    .inline-box {
        display: inline;
    }

    .date-selector-box {
        border-radius: 4px;
        background-color: rgb(185 190 211);
        border: 1px solid transparent;
        text-align: center;
        width: 300px;
        display: inline;
        padding: 3px;
        font-weight: 400;
        transition: 0.25s;

        &:hover {
            background-color: rgb(185 190 211 / 40%);
        }

        @media only screen and (max-width:992px){
            width: 100%;
        }
    }
`;

const TableFieldWrapper = styled.div`
    margin: 10px;
    margin-bottom: 20px;
    min-height: 40vh;
    max-height: 40px;
    border: 1px solid #f3f5ff;
    box-shadow: 1px 1px 10px #efefef;
    overflow: auto;
    border-radius: 5px;
    font-size: 14px;

    .fixed-header {
        position: sticky;
        top: -1px;
        background: #d8def5;
        z-index:10;
        padding: 2px;
        font-size: 16px;

        @media only screen and (max-width:576px){
            font-size: 14px;
        }
    }

    table th, td {
        vertical-align: middle !important;
        text-align: center;
        width: 150px;
        border-right: 1px solid #f3f5ff;
    }

    table tbody tr {
        border-bottom: 1px solid #f3f5ff;
    }
`;


export {
    Container,
    HeaderFieldWrapper,
    DateSelectorFieldWrapper,
    TableFieldWrapper
}
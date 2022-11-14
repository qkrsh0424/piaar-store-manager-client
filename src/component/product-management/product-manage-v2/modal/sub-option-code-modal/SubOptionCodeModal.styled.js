import styled from "styled-components";

const Container = styled.div``;

const InfoFieldWrapper = styled.div`
    .info-group {
        margin-top: 3px;
        display: flex;
        gap: 20px;
        font-weight: 500;
        font-size: 16px;

        @media screen and (max-width:992px){
            font-size: 14px;
            display: block;
        }
    }

    .info-name {
        width: 100px;
        color: #737373;
    }
`;

const TableFieldWrapper = styled.div`
    margin: 20px 0;
    min-height: 30vh;
    max-height: 30vh;
    overflow: auto;

    table thead tr {
        vertical-align: middle !important;
        text-align: center;
    }

    table tbody th, td {
        vertical-align: middle !important;
        text-align: center;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 60px;
    }

    .fixed-header {
        position: sticky;
        top: 0px;
        background: #f1f1f1;
        z-index: 10;
        height: 34px;
    }

    .button-el {
        width: 30px;
        height: 30px;
        position: relative;
        overflow: hidden;
        padding: 0;

        border: none;
        background-color: inherit;
        border-radius: 50%;

        :hover {
            transition: 0.15s;
            transform: scale(1.1);
        }
    }

    .input-el {
        width: 90%;
        text-align: center;
        border: 1px solid #aaaaaa;
    }
`;

const ButtonFieldWrapper = styled.div`
    text-align: center;
    padding: 3px;
    
    :hover {
        cursor: pointer;
    }
    
    .button-el {
        width: 100%;
        position: relative;
        overflow: hidden;
        padding: 0;

        /* border: 1px solid #c8c8c8;
        background-color: #e8e8e8; */
        border: 1px solid var(--piaar-main-color);
        background-color: var(--piaar-main-color);
        border-radius: 2px;

        :active {
            transition: 0.15s;
            opacity: 0.8;
        }
    }
`;

export {
    Container,
    InfoFieldWrapper,
    TableFieldWrapper,
    ButtonFieldWrapper
}
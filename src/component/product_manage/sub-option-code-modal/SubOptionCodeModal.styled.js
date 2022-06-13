import styled, { css } from 'styled-components';

const Container = styled.div`
`;

const HeaderFieldWrapper = styled.div`
    padding: 1% 2%;
    padding-bottom: 10px;
    border-bottom: 1px solid #000;

    .header-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
`;

const ProductOptionCodeInfoWrapper = styled.div`
    padding: 2%;

    .info-group {
        margin-top: 3px;
        display: flex;
        gap: 20px;
        font-weight: 600;
        font-size: 1.1rem;

        @media screen and (max-width:992px){
            font-size: 14px;
            display: block;
        }
    }

    .info-name {
        width: 100px;
        font-weight: 500;
        color: #737373;
    }
`;

const TableFieldWrapper = styled.div`
    padding: 10px;

    @media screen and (max-width: 992px){
        font-size: 14px;
    }

    .fixed-header {
        font-size: 1rem;
        font-weight: 700;
        text-align: center;
        position: sticky;
        top: -1px;
        z-index: 10;
        background-color: #f3f3f3;
        padding: 5px 0px;

        @media screen and (max-width: 992px){
            font-size: 16px;
        }
    }

    .table-container {
        overflow: auto;
        min-height: 40vh;
        max-height: 40vh;
        text-align: center;
    }

    table tbody tr td {
        vertical-align: middle !important;
    }

    .sub-option-code {
        font-weight: 600;
    }

    .button-el{
        overflow: hidden;
        position: relative;
        width:30px;
        height:30px;

        /* background: #ff3060;
        border: 1px solid #ff306000; */
        background: inherit;
        border: none;
        /* border-radius: 50%; */

        cursor: pointer;

        transition: all .3s;
        &:hover{
            transform: scale(1.05);
            opacity: 0.3;
        }
    }

    .add-el {
        display: flex;
        height:30px;
        width: 100%;

        &:hover{
            transform: none;
        }
    }

    .button-icon {
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        width: 26px;
        height: 26px;
    }

    .add-box {
        margin-top: 5px;
        background-color: #babaff;
        text-align: center;
        align-items: center;
        border-radius: 3px;

        &:hover{
            cursor: pointer;
        }
    }
`;

export {
    Container,
    HeaderFieldWrapper,
    ProductOptionCodeInfoWrapper,
    TableFieldWrapper
}
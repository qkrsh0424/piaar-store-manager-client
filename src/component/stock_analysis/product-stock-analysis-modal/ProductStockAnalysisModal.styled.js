import styled from 'styled-components';

const Container = styled.div`
    background: linear-gradient(to bottom right, #dce3f6, #f0fcff);
    padding-bottom: 4%;
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
`;

const ImageFieldWrapper = styled.div`
    padding: 3%;
    padding-bottom: 1%;

    .img-wrapper {
        width: 20%;

        @media only screen and (max-width: 768px) {
            width: 35%;
        }

        @media only screen and (max-width:320px){
            width: 45%;
        }
    }

    .img-box {
        position: relative;
        padding-bottom: 100%; // 1:1
    }

    img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        transition: .5s;
        border:1px solid #f1f1f1;
    }
`;

const TableFieldWrapper = styled.div`
    padding: 3%;
    padding-top: 1%;
    font-size: 14px;

    .table-box {
        height: 40vh;
        overflow: auto;
        border: 1px solid #e0e0e0;
        background-color: white;

        @media only screen and (max-width:576px){
            font-size: 10px;
        }
    }

    table {
        position:relative;
        text-align: center;
        /* width: fit-cont; */
        table-layout: fixed;
        border: none;
        word-break: break-all;
    }

    table thead {
        width: 100%;
    }

    table thead tr th {
        vertical-align: middle !important;
        text-align: center;
        background: #e7e7e7;
        padding: 10px;
        font-size: 14px;
        font-weight: 700;
        border-bottom: 1px solid #e0e0e0;
        /* width: 200px; */

        @media screen and (max-width:576px){
            font-size: 10px;
        }
    }

    table tbody tr {
        background: white;
        border: 1px solid #eee;
        transition: 0.2s;

        :hover{
            background-color: rgb(146 153 181 / 10%);
        }
    }

    .table-box .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
    }

    .total-info {
        display: flex;
        float: right;
        font-weight: 600;

        @media only screen and (max-width:576px){
            font-size: 10px;
        }
    }

    .total-info div {
        padding: 10px;
    }

    table tbody .bad-stock {
        color: #ff0000;
    }

`;

export {
    Container,
    HeaderFieldWrapper,
    ImageFieldWrapper,
    TableFieldWrapper
}
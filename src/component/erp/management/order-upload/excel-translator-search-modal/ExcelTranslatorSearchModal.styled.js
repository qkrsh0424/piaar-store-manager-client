import styled from 'styled-components';

const Container = styled.div`
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
        font-size: 1.2rem;
        font-weight: 600;

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

const TableFieldWrapper = styled.div`
    padding: 2%;

    .form-header-title {
        font-size: 1.1rem;
        padding: 10px 0;
        font-weight: 600;
    }

    .title-name {
        color: #2C73D2;
        font-weight: 700;
    }

    .form-header-box { 
        padding: 50px 0;
    }

    .table-box {
        overflow: auto;
    }

    .large-cell {
        width: 200px;
    }

    table thead tr th {
        vertical-align: middle !important;
        text-align: center;
        width: 100px;
        height: 40px;
        border-right: 1px solid #efefef;
        background-color: #777777;
        font-size: 14px;
        font-weight: 500;
        color: white;
    }

    table tbody tr td {
        vertical-align: middle !important;
        text-align: center;
        width: 100px;
        height: 40px;
        border-right: 1px solid #efefef;
        font-size: 14px;
        font-weight: 400;
        color: #000;
    }

    table tbody tr {
        border-bottom: 1px solid #a7a7a740;
    }

    @media only screen and (max-width:576px){
        font-size: 12px;
    }
`;

export {
    Container,
    HeaderFieldWrapper,
    TableFieldWrapper
}
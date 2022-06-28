import styled from 'styled-components';

const Container = styled.div`
    padding-bottom: 4%;
`;

const HeaderFieldWrapper = styled.div`
    padding: 10px 20px;
    border-bottom: 1px solid #e1e1e1;

    .header-top {
        display: flex;
        justify-content: space-between;
        align-items: center
    }

    .modal-title {
        font-size: 18px;
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
        font-size: 14px;
        padding: 10px 0;
        font-weight: 600;
    }

    .title-name {
        color: #444;
        font-weight: 700;
    }

    .form-header-box { 
        padding: 30px 0;
    }

    .table-box {
        overflow: auto;
        border: 1px solid #77777740;
    }

    table thead tr th {
        vertical-align: middle !important;
        text-align: center;
        width: 200px;
        background-color: #777777;
        font-size: 12px;
        color: white;
    }

    table tbody tr td {
        vertical-align: middle !important;
        text-align: center;
        font-size: 12px;
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
import styled from 'styled-components';

const Container = styled.div`
`;

const TableFieldWrapper = styled.div`
    padding: 10px 0;

    .table-box{
        height: 80vh;
        overflow: auto;
        border: 1px solid #e0e0e0;

        @media only screen and (max-width:768px){
            font-size: 10px;
        }
    }

    table{
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
        border: none;
    }

    table thead tr th{
        vertical-align: middle !important;
        text-align: center;
        background: #e7e7e7;
        padding: 10px;
        font-size: 14px;
        font-weight: 700;
        border-bottom: 1px solid #e0e0e0;
        /* width: 200px; */
    }

    .table-box .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
    }
`;


export {
    Container,
    TableFieldWrapper
}
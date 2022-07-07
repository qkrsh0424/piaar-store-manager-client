import styled from "styled-components";

const Container = styled.div`
    padding: 2%;
    margin-bottom: 100px;

    .graph-group {
        padding-bottom: 5%;
    }
`;

const GraphTitleFieldWrapper = styled.div`
    padding: 10px 20px;
    font-size: 1.1rem;
    font-weight: 700;
`;

const RevenueGraphFieldWrapper = styled.div`
    padding: 20px;
    margin-bottom: 20px;
    height: 400px;
`;

const OrderAnalysisGraphFieldWrapper = styled.div`
    padding: 20px;

    .graph-wrapper {
        height: 400px;
    }
`;

const TableFieldWrapper = styled.div`
    text-align: center;
    height: 70vh;
    overflow: auto;
    border: 1px solid #e0e0e0;
    background-color: white;
    box-shadow: 2px 2px 10px #b0b2b799;
    font-size: 14px;

    @media only screen and (max-width:768px){
        font-size: 10px;
    }

    .fixed-header {
        background-color: #ededed;
        height: 35px;
        position: sticky;
        top: 0;
        z-index:10;
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

    table tbody .first-tr {
        background-color: #F1EDFFBB !important;
        font-weight: 600;
        color: #000;
    }

    table tbody tr {
        border: 1px solid #eee;
        height: 30px;
        color: #555;

        :hover{
            background: #00000006;
        }
    }

    table tbody td {
        border: 1px solid #eee;
    }
`;

export {
    Container,
    RevenueGraphFieldWrapper,
    GraphTitleFieldWrapper,
    OrderAnalysisGraphFieldWrapper,
    TableFieldWrapper
}
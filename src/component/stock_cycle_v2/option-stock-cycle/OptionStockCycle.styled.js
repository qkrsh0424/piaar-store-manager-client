import styled from "styled-components";

const Container = styled.div`
    overflow: auto;
    margin-bottom: 100px;

    .option-stock-cycle-box {
        padding: 20px;
    }

    .info-box {
        padding: 10px 0;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
    }

    .option-index {
        font-weight: 700;
        color: #444;
        display: flex;
        gap: 10px;
    }

    .option-index .highlight-text {
        color: #ff0000;
        font-weight: 700;
    }
`;

const ImageFieldWrapper = styled.div`
    .image-wrapper {
        width: 120px;
        height: 120px;
    }

    .image-box {
        position: relative;
        padding-bottom: 100%; // 1:1
    }

    img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        transition: .5s;
        border:1px solid #d4d4d4;
    }
`;

const TextInfoFieldWrapper = styled.div`
    padding: 10px;
    font-weight: 600;
    font-size: 14px;
    
    .data-group {
        padding-top: 2px;
    }

    @media screen and (max-width: 992px) {
        font-size: 12px;
    }
`;

const TableFieldWrapper = styled.div`
    text-align: center;
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

    .fixed-col {
        background-color: #ededed;
        position: sticky;
        left: 0;
        z-index:10;
        font-weight: 800;
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
        border: 1px solid #e7e7e7;
    }

    .highlight-text {
        color: #fff;
        background-color: #ff0000ad;
        font-weight: 700;
    }
`;

export {
    Container,
    ImageFieldWrapper,
    TextInfoFieldWrapper,
    TableFieldWrapper
}
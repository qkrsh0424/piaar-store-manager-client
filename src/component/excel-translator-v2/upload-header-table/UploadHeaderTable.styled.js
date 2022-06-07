import styled, { css } from 'styled-components';

const Container = styled.div`
    padding: 10px 20px;
`;

const ControlFieldWrapper = styled.div`
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    
    color: rgba(000, 102, 153, 0.9);

    @media only screen and (max-width: 992px){
        grid-template-columns: 1fr;
        row-gap: 10px;
    }

    .flex-box {
        display: flex;
        align-items: center;
    }

    .flex-box .excel-download {
        padding: 0 10px;
        
        &:hover{
            cursor: pointer;
            opacity: 0.6;
        }
    }

    .header-modify-btn {
        padding: 7px 0;
        background: #a9b3d5;
        color: white;
        font-size: 1em;
        font-weight: 500;
        border:1px solid #a9b3d5;
        border-radius: 20px;
        width: 200px;

        &:hover{
            cursor: pointer;
            transition: 0.2s;
            transform: scale(1.05);
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);
        }
    }
`;

const TableFieldWrapper = styled.div`
    background-color: white;
    overflow: auto;
    border-radius: 5px;
    font-size: 12px;
    box-shadow: 1px 1px 15px #a9b3d599;

    & .fixed-header {
        position: sticky;
        top: -1px;
        background: #d5dae9;
        z-index:10;
        padding: 2px;
        font-size: 16px;

        @media only screen and (max-width:576px){
            font-size: 14px;
        }
    }

    & .large-cell {
        width: 300px;
    }

    & .xlarge-cell {
        width: 500px;
    }

    @media only screen and (max-width:576px){
        font-size: 12px;
    }

    table thead tr th {
        vertical-align: middle !important;
        text-align: center;
        width: 150px;
        border-right: 1px solid #efefef;
    }

    table tbody tr {
        border-bottom: 1px solid #a7a7a740;
    }

    table tbody td {
        vertical-align: middle !important;
        text-align: center;
        width: 150px;
        border-right: 1px solid #a7a7a720;
    }
`;

export {
    Container,
    ControlFieldWrapper,
    TableFieldWrapper
}
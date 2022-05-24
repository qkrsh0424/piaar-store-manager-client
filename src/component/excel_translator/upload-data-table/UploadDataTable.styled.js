import styled, { css } from 'styled-components';

const Container = styled.div`
    padding: 10px 20px;
`;

const ControlFieldWrapper = styled.div`
    font-size: large;
    color: rgba(000, 102, 153, 0.9);
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: center;
    padding: 10px;

    @media only screen and (max-width: 992px){
        grid-template-columns: 1fr;
        row-gap: 10px;
    }

    .control-box {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 10px;

        & .upload-header-form-download {
            background: #a5a3ff;
            border: 1px solid #a5a3ff;

            &:hover{
                cursor: pointer;
                transition: 0.2s;
                transform: scale(1.05);
            }

            &:active{
                transition: 0s;
                transform: scale(1.05);
            }

            &:disabled{
                background: #d3d3d3;
                cursor: not-allowed;
                border: 1px solid #c5c5c5;
            }
        }

        @media only screen and (max-width: 992px) {
            padding: 1% 0%;
            column-gap: 20px;
        }
    }

    .control-box button {
        padding: 2%;
        background: #a9b3d5;
        color: white;
        font-size: 1em;
        font-weight: 500;
        border:1px solid #a9b3d5;
        border-radius: 20px;

        @media only screen and (max-width: 992px){
            display: inline-block;
            padding: 4px;
        }

        @media only screen and (max-width:576px ){
            padding: 0;
        }

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
    min-height: 60vh;
    max-height: 60px;
    background-color: white;
    overflow: auto;
    border-radius: 5px;
    font-size: 14px;
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

const DataControlFieldWrapper = styled.div`
    padding-top: 4%;
    display: flex; 
    text-align: center;
    align-items: center;

    form {
        margin: 10px;

        @media only screen and (max-width: 992px){
            margin: 0 auto;
            width: 100%;
        }
    }

    form label {
        font-size: 1rem;
        display: inline-block;
        margin: 4px;
        width: 300px;
        padding: 3% 0%;
        color: white;
        text-align: center;
        vertical-align: middle;
        background-color: #a9b3d5;
        border-radius: 3px;
        transition: 0.15s linear;
        font-weight: 600;

        &:hover {
            opacity: 0.8;
            cursor: pointer;
        }

        @media only screen and (max-width:992px){
            padding: 1.5% 0%;
            width: 90%;
        }

        @media only screen and (max-width:768px){
            font-size: 14px;
        }

        @media only screen and (max-width:576px){
            font-size: 12px;
        }
    }

    form input {
        font-size: 20px;
        width: 100%;
        display: none;
    }

    form button {
        font-size: 1rem;
        width: 300px;
        padding: 3% 0%;
        margin: 4px;
        color: white;
        vertical-align: middle;
        background-color: #a9b3d5;
        border-radius: 3px;
        border: none;
        transition: 0.15s linear;
        font-weight: 600;

        &:hover {
            opacity: 0.8;
            cursor: pointer;
        }

        @media only screen and (max-width:992px){
            padding: 1.5% 0%;
            width: 90%;
        }

        @media only screen and (max-width:768px){
            font-size: 14px;
        }

        @media only screen and (max-width:576px){
            font-size: 12px;
        }
    }
`;

export {
    Container,
    ControlFieldWrapper,
    TableFieldWrapper,
    DataControlFieldWrapper
}
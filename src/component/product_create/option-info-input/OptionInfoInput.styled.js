import styled from 'styled-components';

const Container = styled.div`
    padding: 10px;

    .group-title {
        font-size: 1.3rem;
        font-weight: 700;
        padding:15px;
        
        @media only screen and (max-width:425px){
            padding: 15px 0;
        }
    }

    .icon-dot, .icon-must {
        display: inline-block;
        background-color: #ff545c;
        border-radius: 50%;
        vertical-align: middle;
    }

    .icon-must {
        position: relative;
        /* top:-3px; */
        margin-left: 5px;
        width: 6px;
        height: 6px;
    }

    .option-add-box {
        text-align: center;
        padding: 5px 0px;
    }

    .option-add-btn {
        border:1px solid #f1f1f100;
        background: #4682B4;
        border-radius: 50%;
        padding: 10px;
        color: white;
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);

        &:hover{
            transform: scale(1.1);
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);
        }
    }
`;

const HeaderWrapper = styled.div`
`;

const OptionInfoWrapper = styled.div`

    .data-container{
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 10px;
        background-color: #4682B418;
    }

    .option-delete-btn {
        border:1px solid #ef5350;
        color: #ef5350;
        font-weight: 600;
        padding: 7px 12px;
        border-radius: 50%;
        float: right;

        &:hover{
            transform: scale(1.1);
            color: white;
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);

            background:#4662B4;
        }
    }

    .hidden-input {
        display: none;
    }
    
    .image-delete-box {
        height: 50px;
    }

    .delete-btn {
        color: #dc3545;
        border: 1px solid #ced4da;
        background-color: white;
    }

    .image-wrapper {
        width: 200px;
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
        transition: .2s;
        border:1px solid #cccaca;
        border-radius: 5px;
        cursor: pointer;

        :hover {
            opacity: 0.3;
        }
    }

    .table-container {
        overflow: auto;
        padding: 15px 0;
    }

    table {
        margin-bottom: 0;
    }

    table tr {
        padding:8px !important;
        border: 1px solid #dee2e6;
        text-align: center;
    }

    table td, th {
        padding:8px !important;
        border: 1px solid #dee2e6;
        text-align: center;
    }

    table td input {
        border: none;
        text-align: center;
        font-weight: 700;
        width:100%;
        padding:5px;
    }
`;

export {
    Container,
    HeaderWrapper,
    OptionInfoWrapper
}
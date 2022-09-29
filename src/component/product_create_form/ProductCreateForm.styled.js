import styled, { css } from 'styled-components';

const Container = styled.div`
    padding: 1% 5%;
    padding-bottom: 5%;

    .back-btn {
        position: fixed;
        top:10px;
        left:10px;
        background: #4682B4;
        border:none;
        width:52px;
        height: 52px;
        border-radius: 50%;
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
        transition: 0.4s;
        z-index: 999;
    
        .back-button-img{
            width:32px;
            filter: invert(100%) sepia(1%) saturate(3%) hue-rotate(90deg) brightness(113%) contrast(89%);
        }
        
        :hover{
            transform: scale(1.1);
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);

            background:#4662B4;
        }
    }
`;

const FormContainer = styled.div`
    margin-top: 80px;
    margin-bottom: 120px;
    padding-bottom: 100px;

    animation: scaleOutToIn 0.8s;
    -moz-animation: scaleOutToIn 0.8s; /* Firefox */
    -webkit-animation: scaleOutToIn 0.8s; /* Safari and Chrome */
    -o-animation: scaleOutToIn 0.8s; /* Opera */

    background:white;
    border: 1px solid #4360A3C9;
    border-radius: 5px;
    padding-bottom: 15px;
    
    .sumbit-btn {
        position: fixed;
        bottom:30px;
        right:30px;
        background: #4682B4;
        border:none;
        width:70px;
        height: 70px;
        border-radius: 10px;
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
        z-index: 999;
        transition: 0.4s;
        
        .button-img{
            width:32px;
            filter: invert(100%) sepia(1%) saturate(3%) hue-rotate(90deg) brightness(113%) contrast(89%);
        }

        :hover{
            transform: scale(1.1);
        }

        :active{
            transition: 0s;
            transform: scale(1.05);

            background:#4662B4;
        }
    }

    .group-title {
        font-size: 1.3rem;
        font-weight: 700;
        padding:15px;
        
        @media only screen and (max-width:425px){
            padding: 15px 0;
        }
    }

    .input-box {
        padding: 0 10px;
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
`;

const OptionContainer = styled.div`
    /* padding: 20px;
    border-radius: 10px;
    margin-bottom: 10px;
    background-color: #4682B418; */
`;

const StockReflectedSelectorWrapper = styled.div`
    padding:10px;
    overflow: auto;
    border-bottom: 1px solid #b9c2d8c9;

    button{
        width: 100%;
        margin:0 auto;
        padding:5px;
        background: white;
        border:1px solid #4682B4;
        border-radius: 5px;
        font-weight: 550;
        
        :hover{
            background: #4682B4C9;
            color: white;
        }
    }
    
    .btn-active {
        background-color: #4682B4 !important;
        color: white;
    }
`;

const CategorySelectorWrapper = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid #b9c2d8c9;

    .group-title {
        font-size: 1.3rem;
        font-weight: 700;
        padding:15px;
        
        @media only screen and (max-width:425px){
            padding: 15px 0;
        }
    }

    .category-box {
        font-size: 1rem;
        padding: 10px;
        column-gap: 5px;

        @media only screen and (max-width:992px){
            font-size: 14px;
            grid-template-columns: repeat(1, 1fr);
            row-gap: 10px;
        }
    }

    .category-box button {
        padding: 5px 15px;
        background: white;
        border: 1px solid #4682B4;
        box-shadow: 2px 2px 2px 2px #f1f1f1;
        border-radius: 5px;
        color:#333;
        font-weight: 600;
        transition: .2s;

        &:hover{
            background: #4682B4C9;
            color: white;
        }
    }

    .category-btn-active {
        background: #4682B4 !important;
        color:white !important;
    }

    .category-box .non-category-btn {
        color: rgba(95,115,205);
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
`;

const CategoryBtn = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.size ?? 0}, 1fr);
`;

const OptionHeaderWrapper = styled.div`
    /* padding:10px; */
    overflow: auto;

    button{
        width: 100%;
        margin:0 auto;
        padding:5px;
        background: white;
        border:1px solid #4682B4;
        border-radius: 5px;
        color:#4682B4;
        font-weight: 600;
    }

    .btn-active {
        background-color: #4682B4;
        color: white;
    }
`;

const ImageSelectorWrapper = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid #b9c2d8c9;

    input {
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
`;

const ProductInfoInputWrapper = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid #b9c2d8c9;
`;

const OptionInfoWrapper = styled.div`
    padding: 10px;

    .data-container {
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

        :disabled { 
            background-color: #f0f0f0;
        }
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

const OptionPackageWrapper = styled.div`
    padding-bottom: 50px;

    .create-btn {
        padding: 8px 25px;
        margin: 10px;
        background-color: #4c85b4bd;
        border-radius: 5px;
        border: 1px solid #4c85b4bd;
        color: white;
        font-weight: 600;

        :hover {
            transition: 0.15s;
            background-color: #4682B4;
        }
    }

    .package-delete-btn {
        border: none;
        color: #dc3545;
        background-color: white;

        :hover {
            transition: 0.2s;
            transform: scale(1.05);
            color: red;
        }
    }

    .option-package-box{
        padding: 20px 0;
    }

    .package-list{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 20px;
        padding: 5px 3px;

        @media screen and (max-width: 992px) {
            grid-template-columns: 1fr;
            row-gap: 5px;
        }
    }

    .selector-style{
        padding: 5px 0px;
        border: none;
        text-align: center;
        display: inline-block;
        transition: 0.15s;

        &:hover {
            background-color: #4c85b433;
        }
        
        :focus{
            outline: none;
        }

        @media only screen and (max-width: 992px) {
            width: 100%;
        }
    }

    table {
        overflow: auto;

        margin-bottom: 0;
    }

    table tr {
        padding:5px !important;
        border: 1px solid #dee2e6;
        text-align: center;
    }

    table td, th {
        padding:5px !important;
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
    FormContainer,
    StockReflectedSelectorWrapper,
    CategorySelectorWrapper,
    OptionHeaderWrapper,
    CategoryBtn,
    ImageSelectorWrapper,
    ProductInfoInputWrapper,
    OptionInfoWrapper,
    OptionContainer,
    OptionPackageWrapper
}
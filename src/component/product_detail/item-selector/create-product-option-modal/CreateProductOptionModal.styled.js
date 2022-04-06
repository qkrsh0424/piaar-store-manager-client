import styled, { css } from 'styled-components';

const Container = styled.div`
    /* padding: 2%; */
    padding-bottom: 2%;

    .icon-dot, .icon-must {
        display: inline-block;
        background-color: #ff545c;
        border-radius: 50%;
        vertical-align: middle;
    }

    .icon-must {
        position: relative;
        margin-left: 5px;
        width: 6px;
        height: 6px;
    }

    form {
        padding: 2%;
        
        .submit-btn{
            margin: 20px;
            float: right;
            background:#7a7bda;
            border:1px solid #7a7bda;
            border-radius:3px;
            color:white;
            font-weight:700;
            padding: 1% 5%;
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
`;

const HeaderFieldWrapper = styled.div`
    padding: 2%;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #000;

    .header-top {
        display: flex;
        justify-content: space-between;
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

    .info-text {
        color: red;
        padding: 10px 0;
    }
`;

const ModifyFormWrapper = styled.div`
    padding: 20px;

    button {
        float: right;
        background:#7a7bda;
        border:1px solid #7a7bda;
        border-radius:3px;
        color:white;
        font-weight:700;
        padding: 1% 3%;

        @media only screen and (max-width:992px){
            padding: 15px 0;
        }
    }
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

export {
    Container,
    HeaderFieldWrapper,
    ModifyFormWrapper,
    StockReflectedSelectorWrapper,
    CategorySelectorWrapper,
    CategoryBtn,
    ImageSelectorWrapper,
    ProductInfoInputWrapper
}
import styled, { css } from 'styled-components';

const Container = styled.div`
    
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

const HeaderWrapper = styled.div`
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
        color:#4682B4;
        font-weight: 600;
    }

    .btn-active {
        background-color: #4682B4;
        color: white;
    }
`;

export {
    Container,
    CategorySelectorWrapper,
    CategoryBtn,
    HeaderWrapper
}
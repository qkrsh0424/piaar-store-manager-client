import styled, { css } from 'styled-components';

const Container = styled.div`
    padding: 1%;
`;

const CategorySelectorWrapper = styled.div`
    padding: 10px 0;

    .category-box {
        display: grid;
        grid-template-columns: repeat(${props => props.children.props.size ?? 0}, 1fr);
        font-size: 1rem;
        padding:0 10px;
        column-gap: 5px;

        @media only screen and (max-width:768px){
            font-size: 14px;
            grid-template-columns: repeat(2, 1fr);
            row-gap: 10px;
        }

        @media only screen and (max-width:576px){
            font-size: 12px;
            grid-template-columns: repeat(1, 1fr);
            row-gap: 10px;
        }
    }

    .category-box button {
        padding: 5px 15px;
        background: white;
        border:1px solid #4682B480;
        border-radius: 15px;
        color:#333;
        font-weight: 600;
        box-shadow: 2px 2px 15px #b0b2b7;
        transition: .2s;

        &:hover{
            background: #4360A3C9;
            color: white;
        }
    }

    .category-btn-active {
        background: #4360A3C9 !important;
        color:white !important;
    }

    .category-box .non-category-btn {
        color: rgba(95,115,205);
    }
`;


export {
    Container,
    CategorySelectorWrapper
}
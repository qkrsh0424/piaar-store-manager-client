import styled from "styled-components";

const Container = styled.div`
    margin-top: 20px;
    background-color: #fff;
    border: 1px solid #dbdde2;
    padding: 15px;

    .label-item{
        margin: 10px 5px;
        font-size: 14px;
        font-weight: 600;
        color: #444;

        @media all and (max-width:992px) {
            margin: 10px 0 0 0;
            width: 100%;
        }
    }

    .select-item{
        width: 300px;
        height: 40px;
        padding: 5px;
        /* margin: 0 10px; */
        border: 1px solid #e1e1e1;
        border-radius: 0;
        font-size: 14px;
        -webkit-appearance: none;
        -moz-appearance: none; 
        appearance: none;
        background:url('/assets/icon/down_arrow_gray_icon.png') no-repeat right 5px center;

        &:focus{
            outline: none;
        }

        :hover {
            cursor: pointer;
        }

        @media all and (max-width:992px) {
            margin: 10px 0 0 0;
            width: 100%;
        }
    }

    .input-item {
        margin: 0 10px;
        width: 300px;
        height: 40px;
        border: 1px solid #e1e1e1;
        padding: 0 5px;
        font-size: 14px;
        box-sizing: border-box;

        &:focus{
            outline: none;
        }

        @media all and (max-width:992px) {
            width: 100%;
            margin: 10px 0 0 0;
        }
    }
`;

const CategorySearchWrapper = styled.div`
    margin-bottom: 20px;
`;

const ProductSearchWrapper = styled.div`
    margin-bottom: 20px;
`;

const OptionSearchWrapper = styled.div`
    margin-bottom: 20px;
`;

const ButtonFieldWrapper = styled.div`
    margin-top: 20px;
    padding: 0 30px;
    
    @media all and (max-width:992px) {
        padding: 0 10px;
    }

    .flex-box{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
    }

    .button-box{
        padding-left: 10px;
    }

    .button-el{
        overflow: hidden;
        position: relative;
        padding: 5px;
        width: 150px;
        background: var(--piaar-main-color);
        border: 1px solid var(--piaar-main-color);
        border-radius: 2px;
        font-size: 16px;
        font-weight: 600;
        color: white;
        cursor: pointer;
        -webkit-transition: all .1s;
        transition: all .1s;

        &:hover{
            transform: scale(1.02);
        }
        
        @media all and (max-width:992px) {
            margin: 0;
            width: 80px;
            font-size: 14px;
        }
    }
`;

export {
    Container,
    CategorySearchWrapper,
    ProductSearchWrapper,
    OptionSearchWrapper,
    ButtonFieldWrapper
}
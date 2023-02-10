import styled from "styled-components";

const Container = styled.div`
`;

const SearchFieldWrapper = styled.div`
    padding: 10px 0;
    
    .button-el {
        width: 300px;
        padding: 5px 0;
        height: 48px;
        background: white;
        border: 1px solid var(--defaultBorderColor);
        font-weight: 600;
        border-radius: 5px;
        transition: 0.15s;
        overflow: hidden;
        position: relative;
        -webkit-transition: all .1s;
        transition: all .1s;

        :hover {
            background-color: var(--defaultButtonColor);
        }
    }

    .search-category-info {
        padding: 5px;
        min-height: 30px;
    }

    .category-button-el {
        border: none;
        color: #7071da;
        text-align: left;
        text-decoration: underline;
        text-underline-offset: 5px;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        transition: 0.1s;

        &:hover {
            opacity: 0.6;
        }
    }

    .image-wrapper {
        width: 200px;
        height: 100%;
        padding: 10px 0 ;
    }

    .image-box {
        position: relative;
        padding-bottom: 100%;
        box-shadow: var(--defaultBoxShadow);
    }

    .image-box img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        left: 0;
        -webkit-transition: .5s;
        transition: .5s;
        border: 1px solid #f1f1f1;
        border-radius: 8px;
    }
`;

const DateSelectorFieldWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    
    .date-selector-box{
        width: 300px;

        @media screen and (max-width: 992px) {
            width: 100%;
        }
    }
`;

const ButtonFieldWrapper = styled.div`

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
        background: rgb(137, 145, 163);
        border: 1px solid rgb(114, 123, 144);
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

const DateButtonFieldWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    padding: 5px 0;

    .button-box {
        width: 120px;
        padding: 4px 2px;

        @media screen and (max-width: 992px) {
            width: 80px;
        }
    }
    
    .button-el {
        width: 100%;
        height: 30px;
        border-radius: 5px;
        background-color: var(--defaultButtonColor);
        border: 1px solid var(--defaultBorderColor);
        -webkit-transition: all .1s;
        transition: all .1s;

        &:hover{
            transform: scale(1.02);
        }
        
        @media all and (max-width:992px) {
            margin: 0;
            font-size: 14px;
        }
    }
`;

export {
    Container,
    DateSelectorFieldWrapper,
    SearchFieldWrapper,
    ButtonFieldWrapper,
    DateButtonFieldWrapper
}
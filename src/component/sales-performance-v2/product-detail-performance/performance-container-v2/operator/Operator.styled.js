import styled from "styled-components";

const Container = styled.div`
    /* margin: 20px 0 20px 0; */
    padding: 10px;
    /* background-color: rgb(255, 255, 255);
    border: 1px solid rgb(219, 221, 226); */
    /* border-radius: 10px; */
`;

const SearchFieldWrapper = styled.div`
    /* display: flex;
    align-items: flex-start;
    gap: 10px; */
    padding: 10px 0;

    .search-box {
        /* display: flex;
        align-items: flex-end;
        gap: 10px; */

        @media screen and (max-width: 992px) {
            width: 100%;
        }
    }

    .search-box .search-info {
        padding: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
    }
    
    .search-box .button-el {
        width: 300px;
        padding: 5px 0;
        height: 48px;
        background: white;
        border: 1px solid var(--defaultBorderColor);
        font-weight: 600;
        border-radius: 5px;
        transition: 0.15s;

        :hover {
            background-color: var(--defaultButtonColor);
        }
    }

    .selector-box {
        flex: 1;
        overflow: auto;
        background-color: #f7f7f7;
        border-radius: 5px;
        border: 1px solid #e1e1e1;
    }

    .selector-box .button-box {
        position: relative;

        :hover {
            transition: 0.1s;
            transform: scale(1.02);
        }
    }

    .search-category-info {
        padding: 10px 5px 0 5px;
        display: inline-block;
    }

    .category-button-el {
        border: none;
        color: var(--erp-main-color);
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
import styled from 'styled-components';

const Container = styled.div`
`;

const ConditionSelectorFieldWrapper = styled.div`
    padding: 10px 0;

    .title-item{
        padding: 10px;
        font-size: 1.2rem;
        font-weight: 600;
        color: #444;

        @media all and (max-width:992px) {
            margin: 10px 0 0 0;
            width: 100%;
        }
    }

    .title-item .info-text {
        font-size: 14px;
        color: #ff5d5d;
        padding: 5px 0;
    }

    .grid-box{
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
        border: 1px solid #e1e1e1;
        text-align: center;
        display: inline-block;
        transition: 0.25s;

        &:focus{
            outline: none;
        }

        @media only screen and (max-width: 992px) {
            width: 100%;
        }
    }
`;

const ConditionSearchFieldWrapper = styled.div`
    padding: 10px 0 30px 0;
    
    .grid-box{
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
        border: 1px solid #e1e1e1;
        text-align: center;
        display: inline-block;
        transition: 0.25s;

        &:focus{
            outline: none;
        }

        @media only screen and (max-width: 992px) {
            width: 100%;
        }
    }

    .search-input{
        border: 1px solid #eee;
        height: 100%;
        width: 100%;

        &:focus{
            outline: none;
        }

        &:disabled {
            background-color: #e7e7e7;
        }
    }

    .search-value-reset-btn {
        background-color: white;
        padding: 2px 8px;
        border: 1px solid transparent;
        background-color: rgb(185 190 211);
        border-radius: 2px;
    }
`;

const DateSelectorFieldWrapper = styled.div`

    .inline-box {
        display: inline;
    }

    .date-selector-box {
        border-radius: 4px;
        background-color: rgb(185 190 211);
        border: 1px solid transparent;
        text-align: center;
        width: 300px;
        display: inline;
        padding: 3px;
        font-weight: 400;
        transition: 0.25s;

        &:hover {
            background-color: rgb(185 190 211 / 40%);
        }

        @media only screen and (max-width:992px){
            width: 100%;
        }
    }

    .date-range-btn {
        border: 1px solid transparent;
        background-color: rgb(185 190 211);
        padding: 3px 20px;
        border-radius: 4px;
        transition: 0.25s;

        &:hover {
            background-color: rgb(185 190 211 / 40%);
        }

        &:active {
            background-color: rgb(185 190 211 / 60%);
        }
    }

    .date-control-box {
        display: grid;
        grid-template-columns: repeat(4, 80px);
        column-gap: 5px;
        float: right;

        @media only screen and (max-width:992px){
            width: 100%;
            grid-template-columns: repeat(4, 1fr);
            margin: 5px 0;
        }
    }
`;

export {
    Container,
    ConditionSelectorFieldWrapper,
    ConditionSearchFieldWrapper,
    DateSelectorFieldWrapper
}
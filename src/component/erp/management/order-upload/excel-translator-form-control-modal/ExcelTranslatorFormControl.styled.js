import styled from "styled-components";

const Container = styled.div`

`;

const HeaderFieldWrapper = styled.div`
    width: 100%;
    display: flex;
    position: sticky;
    top:0;
    z-index:10;
    background: white;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e1e1e1;

    .title-box{
        padding: 10px 20px;
        font-size: 20px;
        font-weight: 700;

        @media all and (max-width:992px){
            padding: 10px 10px;
            font-size: 16px;
        }
    }

    .button-box{
        padding: 10px 20px;
    
        @media all and (max-width:992px){
            padding: 10px 10px;
        }
    }

    .button-box .button-el{
        line-height: 1;
        position: relative;
        overflow: hidden;
        margin-left: 20px;
        
        width: 40px;
        height: 40px;

        background: #2C73D2;
        border:none;
        border-radius: 50%;

        transition: 0.4s;

        cursor: pointer;
        &:hover{
            transform: rotate(-360deg);
            background: #309FFF
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);
            background: #7DC2FF;
        }

        @media all and (max-width:992px){
            margin-left: 10px;
            width: 32px;
            height: 32px;
        }
    }

    .button-box .button-el .icon-box{
        width: 25px;
        height: 25px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        @media all and (max-width:992px){
            width: 20px;
            height: 20px;
        }
    }

    .button-box .button-el .icon-box .icon-el{
        width:100%;
    }
`;

const ButtonFieldWrapper = styled.div`
    padding: 5px 10px;
    margin-top: 10px;

    .flex-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
    }

    .button-el {
        overflow: hidden;
        position: relative;
        padding: 7px;
        width: 170px;
        background: var(--erp-main-color);
        border: 1px solid var(--erp-main-color);
        border-radius: 2px;
        font-size: 16px;
        font-weight: 600;
        color: white;
        cursor: pointer;
        -webkit-transition: all .1s;
        transition: all .1s;
        margin-left: 10px;

        &:hover{
            transform: scale(1.02);
        }
    }
`;

const SelectorFieldWrapper = styled.div`
    display: flex;
    padding: 5px 10px;
    gap: 20px;
    padding-bottom: 50px;

    .selector-box {
        width: 50%;
        text-align: center;
        border: 1px solid #c8c8c8;
    }

    .box-info {
        padding: 5px;
        place-content: center;
        background-color: var(--erp-main-color);
        border: 1px solid var(--erp-main-color);
        color: white;
        font-weight: 600;
    }

    .selector-box .data-wrapper {
        background-color: white;
        min-height: 100vh;
    }

    .selector-box .data-wrapper .index-el {
        width: 50px;
        float: left;
    }

    .option-item {
        padding: 5px;
        transition: 0.2s;
        border-bottom: 1px solid #eee;
        
        &:hover{
            background-color: #ededed;
        }
        
        &:active {
            background-color: #e0e0e0;
        }
    }
`;

export {
    Container,
    HeaderFieldWrapper,
    SelectorFieldWrapper,
    ButtonFieldWrapper
}
import styled from 'styled-components';

const Container = styled.div`
    min-height: 90vh;
    max-height: 90vh;
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

const SelectorFieldWrapper = styled.div`
    padding: 10px;

    .selector-box {
        width: 350px;
        padding: 20px 10px;
    }

    .flex-box {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .image-button-el{
        position: relative;
        overflow: hidden;
        width:30px;
        height: 30px;
        background: white;
        border: 1px solid #212529;
        border-radius: 2px;

        cursor: pointer;

        &:hover{
            transform: scale(1.02);
        }
    }

    .image-button-icon{
        width:80%;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
    }

    .input-item {
        margin: 0 10px;
        width: 330px;
        height: 30px;
        border: 1px solid #d9d9d9;
        border-radius: 3px;
        padding: 0 10px;
        font-size: 14px;
        box-sizing: border-box;
    }

    .button-el{
        font-size: 13px;
        font-weight: 600;
        width: 50px;
        padding: 5px;
        color: #000;
        vertical-align: middle;
        background: white;
        /* border-radius: 2px; */
        border: 1px solid #d9d9d9;
        transition: opacity 0.1s linear;

        &:hover{
            cursor: pointer;
            /* background: #2C73D2; */
            background: var(--erp-main-color);
            border: 1px solid #2C73D2;
            color: #fff;
            transition: 0.2s;
            transform: scale(1.03);
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);
        }

        @media only screen and (max-width:992px){
            width: 80px;
            font-size: 10px;
        }
    }
`

const InfoTextFieldWrapper = styled.div`
    margin-top: 20px;
    padding: 0 20px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }

    .info-box{
        font-size: 14px;
        color: #2C73D2;
        word-break: keep-all;

        @media all and (max-width: 992px){
            font-size: 12px;
        }
    }

`;

const TableOperatorFieldWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
    padding: 0 20px;
    align-items: center;
    justify-content: space-between;

    .button-el{
        font-size: 14px;
        font-weight: 700;
        width: 140px;
        padding: 10px;
        vertical-align: middle;
        background: var(--erp-main-color);
        border: 1px solid var(--erp-main-color);
        transition: opacity 0.1s linear;
        color: #fff;

        &:hover{
            cursor: pointer;
            background: #fff;
            border: 1px solid #e0e0e0;
            color: #444;
            transition: 0.2s;
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);
        }

        @media only screen and (max-width:992px){
            width: 80px;
            font-size: 10px;
        }
    }

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

const DefaultTableFieldWrapper = styled.div`
    margin-top: 10px;
    padding: 0 20px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }

    .grid-wrapper{
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        border-top: 1px solid #e0e0e0;
        border-left: 1px solid #e0e0e0;

        @media all and (max-width: 992px){
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .grid-item{
        user-select: none;
        border-right: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        padding: 8px;
        font-size: 13px;
        cursor:pointer;
        word-break: keep-all;
    }
`;

const CreateTableFieldWrapper = styled.div`
    padding: 0 20px;
    padding-bottom: 40px;
    
    
    @media all and (max-width: 992px){
        width:200%;
        padding: 0 10px;
    }

    .list-wrapper{
        border: 1px solid #e0e0e0;
    }

    .list-box{}

    .list-head-box{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e0e0e0;
        padding-top: 5px;
        padding-bottom: 5px;
        font-weight: 500;
        font-size: 14px;
    }
    

    .list-body-box{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e0e0e0;
        padding-top: 5px;
        padding-bottom: 5px;
        font-size: 14px;

        &:nth-last-child(1){
            border-bottom: none;
        }
    }

    .list-item{
        position:relative;
        padding: 0 5px;
        font-size: 14px;
        text-align: center;

        @media all and (max-width: 992px){
            font-size: 12px;
        }
    }

    .list-item .header-name-input{
        box-sizing: border-box;
        width: 100%;
        font-size: 14px;
        border: 1px solid #e0e0e0;
        padding: 5px 3px;

        &:focus{
            outline: none;
        }

        @media all and (max-width: 992px){
            font-size: 12px;
        }
    }

    .list-item .remove-button{
        font-size: 14px;
        margin: 0 auto;
        width:60px;

        @media all and (max-width: 992px){
            font-size: 12px;
            padding: 8px 0;
        }
    }
`;

export {
    Container,
    HeaderFieldWrapper,
    InfoTextFieldWrapper,
    TableOperatorFieldWrapper,
    DefaultTableFieldWrapper,
    CreateTableFieldWrapper,
    SelectorFieldWrapper
}
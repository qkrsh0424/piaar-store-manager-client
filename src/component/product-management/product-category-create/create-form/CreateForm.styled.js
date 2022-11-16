import styled from "styled-components";

const Container = styled.div`
`;

const PageTitleFieldWrapper = styled.div`
  
`;

const CategoryInfoInputFieldWrapper = styled.div`
    margin-top: 15px;
    background-color: white;
    border-radius: 10px;
    box-shadow: var(--defaultBoxShadow);

    .title-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title-label {
        font-size: 1.3rem;
        font-weight: 600;
        padding:15px;
        
        @media only screen and (max-width:992px){
            font-size: 1rem;
        }
    }

    .select-item {
        margin-left: 10px;
        width: 300px;
        height: 50px;
        padding: 10px;
        border: 1px solid #d0d0d0;
        border-radius: 5px;
        font-size: 16px;
        -webkit-appearance: none;
        -moz-appearance: none; 
        appearance: none;
        background:url('/assets/icon/down_arrow_gray_icon.png') no-repeat right 5px center;

        &:focus{
            outline: none;
        }

        @media all and (max-width:992px) {
            width: 100%;
            margin: 10px 0 0 0;
        }
    }

    .inner-content {
        padding: 20px 30px;
        border-top: 1px solid var(--defaultBorderColor)
    }

    .inner-content .input-group-box {
        display: flex;
        align-items: center;
        padding: 15px 0;
        font-size: 16px;

        @media screen and (max-width: 992px) {
            flex-direction: column;
            align-items: flex-start;
        }
    }
    
    .control-label {
        width: 200px;
        padding: 10px;
        font-weight: 500;

        @media screen and (max-width: 992px) {
            font-size: 14px;
        }
    }

    .input-group-box input {
        flex: 1;

        @media screen and (max-width: 992px) {
            width: 100%;
            flex: none;
        }
    }
`;

const CreateButtonFieldWrapper = styled.div`
    padding: 25px;
    width: 100%;
    height: 80px;
    background-color: #ecedef;
    border-top: 1px solid #d5d5d5;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 20;

    @media screen and (max-width: 992px) {
        height: auto;
        padding: 10px;
    }

    .button-box {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
        height: 100%;

        @media screen and (max-width: 992px) {
            flex-direction: column;
            width: 100%;   
        }
    }

    .button-el {
        width: 200px;
        padding: 10px;
        border: 1px solid #727b90;
        background-color: #8991a3;
        color: white;
        border-radius: 3px;
        font-weight: 700;
        transition: 0.3s;
        height: 48px;

        :hover {
            transition: 0.1s;
            transform: scale(1.02);
        }

        @media screen and (max-width: 992px) {
            width: 100%;
            font-size: 14px;
            font-weight: 600;
            padding: 3px;
        }
    }

    .store-btn {
        border: 1px solid var(--piaar-main-color);
        background-color: var(--piaar-main-color);
    }
`;


export {
    Container,
    PageTitleFieldWrapper,
    CategoryInfoInputFieldWrapper,
    CreateButtonFieldWrapper
}
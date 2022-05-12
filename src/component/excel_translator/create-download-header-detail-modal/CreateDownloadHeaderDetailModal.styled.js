import styled, { css } from 'styled-components';

const Container = styled.div`
`;

const CreateFormFieldWrapper = styled.div`
    
    .header-field {
        border-bottom: 1px solid #5961c788;
        padding:10px;
        align-items: center;
        overflow: auto;
        display: grid;
        grid-template-columns: 6fr 1fr;

        div {
            font-size: 1.3rem;
            font-weight: 700;
            padding:15px;
            @media only screen and (max-width:425px){
                padding: 15px 0;
            }
        }

        button {
            background: #aab3cdee;
            border:none;
            margin: 0 auto;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            transition: 0.4s;

            & .button-img{
                width:32px;
                filter: invert(100%) sepia(1%) saturate(3%) hue-rotate(90deg) brightness(113%) contrast(89%);
            }

            &:hover{
                transform: scale(1.1);
            }
    
            &:active{
                transition: 0s;
                transform: scale(1.05);
                background: #c7cee3ee;
            }
        }
    }

    .header-detail-box {
        height: 50vh;
        overflow: auto;
        background-color: white;
        padding: 20px;
        border-radius: 10px;
    }

    .data-wrapper {
        margin-bottom: 10px;
        border-radius: 10px;
        padding: 10px 16px 30px 16px;
        height: auto;
        background-color: #e8ecf7;

        & .arrow-img {
            display: flex;
            align-items: center;
            justify-content: center;

            @media only screen and (max-width:992px){
                transform: rotate(90deg);
            }
        }
    }

    .detail-list {
        /* background: linear-gradient(to bottom right,#dce3f6,#f0fcff);
        border: 1px solid #dce3f6;
        height: 40vh;
        overflow: auto;
        padding: 10px;
        border-radius: 5px; */
        display: grid;
        grid-template-columns: 40% 7% 50%;
        padding: 5px;
        text-align: center;
        align-items: center;

        .icon-must {
            position: relative;
            margin-left: 5px;
            width: 6px;
            height: 6px;
            display: inline-block;
            background-color: #ff545c;
            border-radius: 50%;
            vertical-align: middle;
        }

        @media only screen and (max-width:992px){
            display: grid;
            grid-template-columns: 1fr;
            row-gap: 10px;
            place-content: center;
            /* padding: 0 10%; */
        }

        @media only screen and (max-width:576px){
            grid-template-columns: 100%;
        }
    }

    .form-selector {
        display: grid;
        grid-template-columns: 1fr 7fr;
        text-align: center;
        align-items: center;

        & .add-cell-btn {
            grid-column: span 3;
        }
    }

    .download-form-info {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
    }

    .download-form-info > div {
        display: grid;
        grid-template-columns: 1fr 3fr;
        column-gap: 10px;
        text-align: left;
        align-items: center;
        margin: 10px 0px;
        
        @media only screen and (max-width:992px){
            grid-template-columns: 1fr;
            place-content: center;
        }
    
        @media only screen and (max-width:576px){
            grid-template-columns: 100%;
        }
    }

    input {
        border: none;
        padding: 10px;
        border: 1px solid #00000000;
        border-bottom: 1px solid #ced4da;
        &:focus{
            outline: none;
            border: 1px solid #4662B4;
            background: white;
        }
    }

    .delete-box {
        text-align: right;
        width: 100%;
    }

    .delete-box button {
        color: #ff7979;
        margin-bottom: 5px;
        border: none;
        background-color: inherit;

        &:hover{
            transform: scale(1.1);
            cursor: pointer;
            color: #ffbaba;

        }

        &:active{
            transition: 0s;
            transform: scale(1.05);

            color: #ffbaba;
        }
    }

    .add-btn-box {
        text-align: center;
        width: 100%;
        padding: 10px;
    }

    .add-btn-box .add-btn-icon {
        &:hover{
            transform: scale(1.1);
        }
    
        &:active{
            transition: 0s;
            transform: scale(1.05);
        
            color: #8e90e3;
        }
    }
`;


export {
    Container,
    CreateFormFieldWrapper
}
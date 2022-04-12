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
        padding: 5px;
        max-height: 400px;
        overflow: auto;
        overflow-x: hidden;
    }

    .detail-list {
        background: linear-gradient(to bottom right,#dce3f6,#f0fcff);
        border: 1px solid #dce3f6;
        height: 40vh;
        overflow: auto;
        padding: 10px;
        border-radius: 5px;
    }

    .list-group {
        display: grid;
        grid-template-columns: 90% 5%;
        column-gap: 10px;
        padding: 3px 10px;
        text-align: center;
        align-items: center;
    }

    .list-group .data-text {
        font-size: 1rem;
        font-weight: 500;
        display: grid;
        grid-template-columns: 1fr 1fr 5fr;
        padding: 2%;
        background-color: white;
        border-radius: 30px;
        align-items: center;
        
        @media only screen and (max-width:425px){
            padding: 15px 0;
        }
    }

    .data-text div div {
        &:hover{
            transform: scale(1.2);
            cursor: pointer;
            color: #7f9df3ee;
        }
    
        &:active{
            transition: 0s;
            transform: scale(1.2);
            color: #6286ff;
        }
    }

    input {
        width: 90%;
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

        color: #ff7979;
        margin-bottom: 5px;

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
import styled, { css } from 'styled-components';

const Container = styled.div`
`;

const HeadFieldWrapper = styled.div`
    user-select: none;
    position: sticky;
    top: 0;
    z-index: 11;

    background: white;
    border-bottom: 1px solid #5961c788;
    padding:10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
        font-size: 18px;
        font-weight: 700;
        @media only screen and (max-width:425px){
            padding: 15px 0;
        }
    }

    .submit-button {
        line-height: 1;
        background: #aab3cdee;
        border:none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        transition: 0.4s;

        &:hover{
            transform: scale(1.1);
        }

        &:active{
            transition: 0s;
            transform: scale(1.05);
            background: #c7cee3ee;
        }
    }
`;

const BodyFieldWrapper = styled.div`
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

    .body-field {
        padding: 20px;
        background: linear-gradient(to bottom right,#dce3f6,#f0fcff);
        padding-bottom: 50px;

        > div {
            display: grid;
            grid-template-columns: 90%;
            place-content: center;
        }

        div div {
            font-size: 1rem;
            font-weight: 500;
            padding:15px;
            @media only screen and (max-width:425px){
                padding: 15px 0;
            }
        }

        div input {
            font-size: 1.1rem;
            padding: 10px;
            border: 1px solid #00000000;
            border-bottom: 1px solid #ced4da;

            &:focus{
                outline: none;
                border: 1px solid #4662B4;
                background: white;
            }
        }
    }
`;

export {
    Container,
    HeadFieldWrapper,
    BodyFieldWrapper
}
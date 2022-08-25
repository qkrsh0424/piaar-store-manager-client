import styled, { css } from 'styled-components';

const Container = styled.div`
    .text-info {
        font-size: 14px;
        padding-left: 10px;
        color: #6084ff !important;
    }
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

const ControlFieldWrapper = styled.div`
    display: flex;
    padding:10px;
`;

const BodyFieldWrapper = styled.div`
    .fixed-header {
        position: sticky;
        top: 56px;
        z-index:10;
        font-weight: 600;
    }

    .header-detail-box {
        background-color: white;
        border-radius: 10px;
    }

    .grid-box {
        display: grid;
        grid-template-columns: 5% 5% 25% 25% 10% 25% 5%;
        text-align: center;
        align-items: center;
        justify-items: center;
        padding: 5px 0;
        font-size: 14px;
        background-color: #fff;

        @media screen and (max-width: 992px) {
            grid-template-columns: 50px 50px 250px 250px 100px 250px 50px;
        }
    }

    .header-title {
        width: 100%;
        text-align: center;
        padding: 3px;
        height: 100%;
        border-top: 1px solid #e0e0e0;
        border-bottom: 1px solid #cfcfcf;
    }

    .detail-list {
        display: grid;
        grid-template-columns: 40% 7% 50%;
        padding: 5px;
        padding-bottom: 20px;
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
        width: 100%;

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
        width: 100%;
    }

    .delete-box button {
        color: #ff7979;
        /* margin-bottom: 5px; */
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
        border-top: 1px solid;
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

    .form-move-btn-box{
        /* padding: 10px 0; */
        text-align: center;
    }

    .form-move-btn-box button {
        border: none;
        background-color: inherit;
    }
`;


export {
    Container,
    HeadFieldWrapper,
    BodyFieldWrapper,
    ControlFieldWrapper
}
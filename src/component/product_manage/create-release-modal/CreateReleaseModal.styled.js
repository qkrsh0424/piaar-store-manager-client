import styled, { css } from 'styled-components';

const Container = styled.div`
`;

const HeaderFieldWrapper = styled.div`
    padding: 1% 2%;
    padding-bottom: 10px;
    border-bottom: 1px solid #000;

    .header-top {
        display: flex;
        justify-content: space-between;
        align-items: center
    }

    .modal-title {
        font-size: 1.3rem;
        font-weight: 700;

        @media only screen and (max-width:576px){
            font-size: 16px;
        }
    }

    .modal-close-btn {
        color: #5c5c7e;

        &:hover {
            color: #80808b;
        }
    }   

    .info-text {
        color: red;
        padding: 10px 0;
    }
`;

const InputFormFieldWrapper = styled.div`
    padding: 2%;

    .icon-must {
        display: inline-block;
        background-color: #ff545c;
        border-radius: 50%;
        vertical-align: middle;
        position: relative;
        /* top:-3px; */
        margin-left: 5px;
        width: 6px;
        height: 6px;
    }

    form {
        overflow: auto;
    }

    table th, td {
        padding:8px !important;
        border: 1px solid #dee2e6;
        text-align: center;
    }

    table input {
        border: none;
        text-align: center;
        font-weight: 700;
        width:100%;
        padding:5px;
    }

    div input {
        font-size: 1rem;
        border: 1px solid #ced4da;
        background: #f5f8ff;
        
        :focus{
            outline: none;
            border: 1px solid #4662B4;
            background: white;
        }
    }

    .submit-box {
        padding: 15px;
        border-top: 1px solid #efefef;

        @media only screen and (max-width:992px){
            padding: 15px 0;
        }
    }

    .submit-box button {
        float: right;
        background:#969ec5;
        border:1px solid #969ec5;
        border-radius:3px;
        color:white;
        font-weight:700;
        padding:5px 20px;
        
        &:hover {
            opacity: 0.6;
            cursor: pointer;
        }
    }


`;


export {
    Container,
    HeaderFieldWrapper,
    InputFormFieldWrapper
}
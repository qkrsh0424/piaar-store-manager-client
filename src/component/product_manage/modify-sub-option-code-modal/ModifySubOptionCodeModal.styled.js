import styled from 'styled-components';

const Container = styled.div`
`;

const HeaderFieldWrapper = styled.div`
    padding: 2%;
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
    overflow: auto;

    input {
        font-size: 1rem;
        border: 1px solid #ced4da;
        
        :focus{
            outline: none;
            border: 1px solid #4662B4;
        }
    }

    .submit-box {
        padding: 10px;
        border-top: 1px solid #efefef;

        @media only screen and (max-width:992px){
            padding: 15px 0;
        }
    }

    .submit-box button {
        float: right;
        background:#babaff;
        border:1px solid #babaff;
        border-radius:3px;
        color:white;
        font-weight:700;
        padding: 5px 30px;
        
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
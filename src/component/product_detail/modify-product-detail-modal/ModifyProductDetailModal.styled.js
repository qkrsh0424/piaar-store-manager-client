import styled, { css } from 'styled-components';

const Container = styled.div`
    padding: 2%;
`;

const HeaderFieldWrapper = styled.div`

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

const CreateFormWrapper = styled.div`
    padding: 20px;

    .icon-dot, .icon-must {
        display: inline-block;
        background-color: #ff545c;
        border-radius: 50%;
        vertical-align: middle;
    }

    .icon-must {
        position: relative;
        margin-left: 5px;
        width: 6px;
        height: 6px;
    }

    button {
        float: right;
        background:#7a7bda;
        border:1px solid #7a7bda;
        border-radius:3px;
        color:white;
        font-weight:700;
        padding: 1% 3%;

        @media only screen and (max-width:992px){
            padding: 15px 0;
        }
    }
`;

export {
    Container,
    HeaderFieldWrapper,
    CreateFormWrapper
}
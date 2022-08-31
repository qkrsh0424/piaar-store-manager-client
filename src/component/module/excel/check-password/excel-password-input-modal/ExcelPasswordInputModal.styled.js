import styled from "styled-components";

const Container = styled.div`
    .form-el {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px;
    }
`;

const HeaderFieldViewWrapper = styled.div`
    padding: 20px 10px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
`;

const InputFieldViewWrapper = styled.div`
    width: 100%;

    input {
        width: 100%;
        border: 1px solid #bdbdbd;
        padding: 10px;
        font-size: 14px;
    }
`;

const ButtonFieldViewWrapper = styled.div`
    width: 40%;
    
    .button-el {
        width: 100%;
        padding: 10px 0;
        font-size: 14px;
        font-weight: 500;
        background: #e1e1e1;
        border: 1px solid #e1e1e1;
        transition: 0.1s;


        &:hover{
            border: 1px solid #e1e1e160;
            background: #e1e1e160;
        }
    }
`;

export {
    Container,
    HeaderFieldViewWrapper,
    InputFieldViewWrapper,
    ButtonFieldViewWrapper
}
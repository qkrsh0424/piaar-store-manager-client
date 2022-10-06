import styled from "styled-components";

const Container = styled.div`
`;

const HeaderFieldWrapper = styled.div`
    width: 100%;
    display: flex;
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
`;

const InfoFieldWrapper = styled.div`
    padding: 10px 20px;
    font-size: 14px;
    color: var(--erp-main-color);
`;

const InputFieldWrapper = styled.div`
    padding: 10px 20px;

    .input-group {
        display: flex;
        align-items: center;
        padding: 15px 0;
        font-size: 16px;
        border-bottom: 1px solid #dfdfdf;
    }

    .input-group .input-value {
        flex: 1;
        border: 1px solid #cccaca;
        /* border-radius: 4px; */
        padding: 0 5px;
        height: 40px;
    }

    .input-title-box {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 140px;
    }
`;

const ButtonFieldWrapper = styled.div`
    height: 40px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .button-el {
        width: 100%;
        height: 100%;
        border: 1px solid #00000000;
        background-color: white;

        &:hover{
            background:#e1e1e160;
        }
    }
`;

export {
    Container,
    HeaderFieldWrapper,
    InputFieldWrapper,
    InfoFieldWrapper,
    ButtonFieldWrapper
}
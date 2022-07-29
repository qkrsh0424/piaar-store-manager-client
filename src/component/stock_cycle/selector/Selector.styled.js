import styled from "styled-components";

const Container = styled.div`
    display: flex;
`;

const SelectorWrapper = styled.div`
    padding: 30px 20px;
    display: flex;
    gap: 15px;
    width: 100%;
    border-bottom: 1px solid #d4d4d4;

    .select-item {
        width: 260px;
        height: 40px;
        padding: 0 10px;
        border: 1px solid #ccc;
        border-radius: 0;
        font-size: 14px;
        -webkit-appearance: none;
        -moz-appearance: none; 
        appearance: none;
        background:url('/assets/icon/down_arrow_gray_icon.png') no-repeat right 5px center;

        &:focus{
            outline: none;
        }

        @media screen and (max-width: 992px){
            width: 70%;
        }
    }
`;

export {
    Container,
    SelectorWrapper
}
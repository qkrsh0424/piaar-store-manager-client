import styled from "styled-components";

const Container = styled.div`
`;

const SelectorWrapper = styled.div`
    padding: 30px 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    width: 100%;
    border-bottom: 1px solid #444;

    .select-item {
        width: 250px;
        height: 40px;
        padding: 0 10px;
        border: 1px solid #444;
        border-radius: 0;
        font-size: 14px;
        -webkit-appearance: none;
        -moz-appearance: none; 
        appearance: none;
        background:url('/assets/icon/down_arrow_gray_icon.png') no-repeat right 5px center;

        &:focus{
            outline: none;
        }
    }
`;

export {
    Container,
    SelectorWrapper
}
import styled from "styled-components";

const Container = styled.div`
    margin-top: 10px;
    border: 1px solid #dbdde2;
    background-color: #fff;
    padding: 15px;
    height: 50px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
`;

const SortButtonFieldWrapper = styled.div`

    .select-item {
        width: 200px;
        height: 30px;
        padding: 0 5px;
        border: 1px solid #888;
        border-radius: 0;
        font-size: 14px;
        -webkit-appearance: none;
        -moz-appearance: none; 
        appearance: none;
        background:url('/assets/icon/down_arrow_gray_icon.png') no-repeat right 5px center;

        &:focus {
            outline: none;
        }

        @media all and (max-width:992px) {
            margin: 10px 0 0 0;
            width: 100%;
        }        
    }
`;

export {
    Container,
    SortButtonFieldWrapper
}
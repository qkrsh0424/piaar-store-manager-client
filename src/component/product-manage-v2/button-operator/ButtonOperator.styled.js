import styled from "styled-components";

const Container = styled.div`
    margin-top: 10px;
    border: 1px solid #dbdde2;
    background-color: #fff;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 992px) {
        flex-direction: column;
        align-items: flex-end;
    }
`;

const ControlFieldWrapper = styled.div`
    width: 100%;
    padding: 5px;
    display: flex;
    gap: 5px;
    
    @media screen and (max-width: 992px) {
        flex-direction: column;
    }

    .button-el {
        border: 1px solid #dbdde2;
        width: 120px;
        padding: 4px 2px;
        background-color: #f7f7f7;   

        @media screen and (max-width: 992px) {
            width: 100%;
            font-size: 12px;
        }
    }

`;

const SortButtonFieldWrapper = styled.div`
    padding: 5px;
    
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

        @media all and (max-width: 992px) {
            margin: 10px 0 0 0;
            font-size: 12px;
        }        
    }
`;

export {
    Container,
    SortButtonFieldWrapper,
    ControlFieldWrapper
}
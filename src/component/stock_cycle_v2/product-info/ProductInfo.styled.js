import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    display: inline-block;
    /* position: fixed; */

    @media screen and (max-width: 992px) {
        display : none;
    }
`;

const ImageFieldWrapper = styled.div`
    .image-wrapper {
        width: 200px;
        height: 200px;
    }

    .image-box {
        position: relative;
        padding-bottom: 100%; // 1:1
    }

    img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        transition: .5s;
        border:1px solid #d4d4d4;
    }
`;

const TextInfoFieldWrapper = styled.div`
    padding: 30px 0px;
    font-weight: 700;
    
    .data-group {
        padding-top: 4px;
        display: flex;
        justify-content: space-between;
    }

    .product-option-box {
        margin: 50px 0;
        padding: 15px;
        background-color: #e7e7ff;
        border-radius: 10px;
    }

    .option-data-group {
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        font-size: 12px;
    }

    @media screen and (max-width: 992px) {
        font-size: 12px;
    }
`;

export {
    Container,
    ImageFieldWrapper,
    TextInfoFieldWrapper
}
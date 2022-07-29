import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    width: 350px;
    display: inline-block;
    /* position: fixed; */
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
        border:1px solid #f1f1f1;
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
`;

export {
    Container,
    ImageFieldWrapper,
    TextInfoFieldWrapper
}
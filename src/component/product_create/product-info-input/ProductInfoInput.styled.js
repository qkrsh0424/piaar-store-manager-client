import styled from 'styled-components';

const Container = styled.div`
    .group-title {
        font-size: 1.3rem;
        font-weight: 700;
        padding:15px;
        
        @media only screen and (max-width:425px){
            padding: 15px 0;
        }
    }

    .input-box {
        padding: 0 10px;
    }

    .icon-dot, .icon-must {
        display: inline-block;
        background-color: #ff545c;
        border-radius: 50%;
        vertical-align: middle;
    }

    .icon-must {
        position: relative;
        /* top:-3px; */
        margin-left: 5px;
        width: 6px;
        height: 6px;
    }
`;

const ImageSelectorWrapper = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid #b9c2d8c9;

    input {
        display: none;
    }

    .image-delete-box {
        height: 50px;
    }
    
    .delete-btn {
        color: #dc3545;
        border: 1px solid #ced4da;
        background-color: white;
    }

    .image-wrapper {
        width: 200px;
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
        transition: .2s;
        border:1px solid #cccaca;
        border-radius: 5px;
        cursor: pointer;

        :hover {
            opacity: 0.3;
        }
    }
`;

const ProductInfoInputWrapper = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid #b9c2d8c9;
`;

export {
    Container,
    ImageSelectorWrapper,
    ProductInfoInputWrapper
}
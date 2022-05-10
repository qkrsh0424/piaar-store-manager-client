import styled from 'styled-components';

const Container = styled.div`

`;

const ProductManageNavWrapper = styled.div`
    position:fixed;
    bottom:0;
    width:100%;
    overflow: hidden;
    z-index: 999;
    background-color: #eef1ff;

    padding:20px;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 10px;
    align-items: center;

    @media only screen and (max-width: 576px) {
        grid-template-columns: repeat(2, 1fr);
        padding: 0 20px;
        height: 100px;
    }

    button, .nav-btn {
        display: inline-block;
        padding:0.7rem;
        border:none;
        border-radius: 5px;
        text-align: center;
        background: #7a7bdae0;
        width:100%;
        font-size: 1.2rem;
        font-weight: 700;
        color:white;

        &:hover{
            color:#f1f1f1;
            text-decoration: none;
        }

        @media only screen and (max-width: 576px) {
            font-size: 12px;
            font-weight: 600;
        }
    }
`;

export {
    Container,
    ProductManageNavWrapper
}
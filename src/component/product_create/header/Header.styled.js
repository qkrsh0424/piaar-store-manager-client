import styled from 'styled-components';

const Container = styled.div`

`;

const HeaderWrapper = styled.div`
    padding:10px;
    overflow: auto;
    border-bottom: 1px solid #b9c2d8c9;

    button{
        width: 100%;
        margin:0 auto;
        padding:5px;
        background: white;
        border:1px solid #4682B4;
        border-radius: 5px;
        color:#4682B4;
        font-weight: 600;
    }

    .btn-active {
        background-color: #4682B4;
        color: white;
    }
`;

export {
    Container,
    HeaderWrapper
}
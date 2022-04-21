import styled, { css } from 'styled-components';

const Container = styled.div`
`;

const ProductManageTableWrapper = styled.div`
    height: 80vh;
	overflow: auto;
    font-size: 14px;
    & .fixedHeader {
        /* width:100%; */
        position: sticky;
        top: -1px;
        background: #f1f1f1;
        z-index:10;
    }

    @media only screen and (max-width:768px){
        font-size: 10px;
    }

    table thead tr {
        vertical-align: middle !important;
        text-align: center;
    }

    table tbody th, td {
        vertical-align: middle !important;
        text-align: center;
    }

    .control-btn button {
        padding:3px 8px;
        background: #7a7bda;
        color:white;
        border:1px solid #7a7bda;
        border-radius: 3px;
        font-weight: 600;
        margin: 3px;
    }

    .control-btn .delete-btn {
        background: #ff5555;
        border:1px solid #ff5555;
    }

    .image-wrapper {
        width: 100%;
        height: auto;
        padding: 10px 15px;
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
        border-radius: 8px;
    }

    .add-btn {
        padding:0 8px;
        background: rgba(70, 130, 180, 0.88);
        color:white;
        border:1px solid rgba(70, 130, 180, 0.88);
        border-radius: 3px;
        font-weight: 600;
    }

    .option-control button {
        padding:3px 8px;
        background: #7a7bda;
        color:white;
        border:1px solid #7a7bda;
        border-radius: 3px;
        font-weight: 600;
        margin: 0 3px;
    }

    .option-control .delete-btn {
        background: #ff5555;
        border:1px solid #ff5555;
    }

    .option-control .status-btn {
        background: #9fa0f1;
        border:1px solid #9fa0f1;
    }
`;

const OptionTr = styled.tr`
    ${(props) => props.checked ?
        css`
            background:#7a7bda80;
        `
        :
        css`
            &:hover{
                background:#f1f1f1;
            }
        `
    }
`;

const CheckCircle = styled.div`
    width:14px;
    height:14px;
    border:1px solid gray;
    border-radius:50%;
    background:${props => props.checked ? '#007bff' : 'white'};
    display:inline-block;
`;


export {
    Container,
    ProductManageTableWrapper,
    OptionTr,
    CheckCircle
}
import styled from 'styled-components';

const Container = styled.div`
    margin: 2%;

    @media screen and (max-width: 992px){
        margin: 2% 0;
    }
`;

const DataBox = styled.div`
    display: block;
    padding: 10px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 2px 2px 15px #b0b2b7;

    @media screen and (max-width: 992px){
        width: 90%;
        margin: 0 auto;
    }
`;

const ItemInfoWrapper = styled.div`
    min-height: 200px;
    padding: 10px;
    border-bottom: 1px solid #eee;

    .group-title {
        font-size: 1.3rem;
        font-weight: 700;
        padding: 10px;

        @media only screen and (max-width: 768px){
            font-size: 15px;
        }

        @media only screen and (max-width:576px){
            font-size: 14px;
        }
    }

    .grid-container {
        display: grid;    
        grid-template-columns: 150px 80%;
        grid-gap: 30px;
        padding-bottom: 10px;

        @media only screen and (max-width:992px){
            grid-template-columns: 1fr;
        }
    }    

    .image-wrapper {
        width: 100%;

        @media only screen and (max-width:992px){
            width: 150px;
        }

        @media only screen and (max-width: 768px) {
            width: 130px;
        }
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

    .info-grid-box {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        font-size: 14px;

        .grid-span-2 {
            grid-column: span 2;
        }

        .grid-span-3 {
            grid-column: span 3;
        }

        .grid-span-4 {
            grid-column: span 4;
        }

        .grid-span-6 {
            grid-column: span 6;
        }

        .info-text {
            color: #0085A5;
            font-weight: 700;
            display:inline;
            padding: 5px;
        }

        @media only screen and (max-width: 768px){
            display: block;
        }

        @media only screen and (max-width: 576px) {
            font-size: 10px;
        }
    }

    .info-grid-box div {
        border-bottom: 1px solid #0085A522;
    }

    .info-grid-box div span {
        padding: 5px;
        color: #4a4949;
    }
`;

const DetailInfoWrapper = styled.div`
    min-height: 250px;
    padding: 10px;

    .group-title {
        font-size: 1.3rem;
        font-weight: 700;
        padding: 10px;

        @media only screen and (max-width: 768px){
            font-size: 15px;
        }

        @media only screen and (max-width:576px){
            font-size: 14px;
        }
    }

    .data-container > div {
        display: grid;
        grid-template-columns: repeat(7, 1fr) !important;
        font-size: 14px;
        border-bottom: 1px solid #0085A522;
        text-align: center;
        padding: 5px;
        font-weight: 700;
        color: #0085A5;

        .grid-span-2 {
            grid-column: span 2;
        }

        @media only screen and (max-width:576px){
            font-size: 10px;
        }
    }

    .data-container .detail-header {
        color:  black;
        font-weight: 400;
    }

    .data-container .data-active {
        background: #4360A3C9 !important;
        color:white !important;
        font-weight: 600;
    }

    .data-container .data-hover {
        transition: 0.2s;

        :hover {
            background: rgb(185 190 211) !important;
            color:white !important;
        }
    }

    .control-box {
        display: flex;
        float: right;

        .add-btn {

        }

        .modify-btn {
            background: #a2a9c1;
            border:1px solid #a2a9c1;
        }

        .delete-btn {
            background: #868b9d;
            border:1px solid #868b9d;
        }
    }

    .control-box button {
        padding: 0 3px;
        background: rgb(179 199 219);
        color:white;
        align-items: center;
        border:1px solid rgb(179 199 219);
        border-radius: 5px;
        margin-left: 5px;

        @media only screen and (max-width:576px ){
            padding: 0;
        }
    }
`;

export {
    Container,
    DataBox,
    ItemInfoWrapper,
    DetailInfoWrapper
}
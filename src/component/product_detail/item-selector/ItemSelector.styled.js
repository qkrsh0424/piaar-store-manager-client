import styled, { css } from 'styled-components';

const Container = styled.div`
    /* padding: 20px; */
	/* overflow: hidden; */
    display: grid;
    grid-template-columns: 45% 10% 45%;
`;

const DataListWrapper = styled.div`

    .control-box {
        float: right;
        padding: 5px;
        padding-right: 7%;
    }

    .control-box button {
        padding:1px 3px;
        background: rgb(179 199 219);
        color:white;
        border:1px solid rgb(179 199 219);
        border-radius: 5px;
        margin-left: 5px;

        @media only screen and (max-width:576px ){
            padding: 0;
        }
    }

    .control-box {
        
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

    .item-list {
        width: 90%;
        height: 500px;
        overflow: scroll;
        background-color: white;
        border-radius: 10px;
        margin: 0 auto;
        box-shadow: 2px 2px 15px #b0b2b799;
    }
    
    .item-list > div {
        overflow: hidden;
        display: grid;
        grid-template-columns: 15% 85%;
        align-items: center;
    }

    .item-list div .prod-default-name {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        border: 1px solid #efefef80;
    }

    .fixed-header {
        position: sticky;
        top: -1px;
        background: #e7e7e7;
        z-index:10;
        padding: 2px;
        text-align: center;
    }

    .image-wrapper {
        width: 100%;
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

    .item-list .data-active {
        background: #4360A3C9 !important;
        color:white !important;
        font-weight: 700;
    }

    .item-list .data-hover {
        transition: 0.2s;

        :hover {
            background: rgb(185 190 211) !important;
            color:white !important;
        }
    }
`;

const ArrowWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;


export {
    Container,
    DataListWrapper,
    ArrowWrapper
}
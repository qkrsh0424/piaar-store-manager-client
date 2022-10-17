import styled from "styled-components";

const Container = styled.div`
    margin-top: 20px;
    background-color: #fff;
    border: 1px solid #dbdde2;
    min-height: 80vh;
    max-height: 80vh;
    overflow: auto;
`;

const ManageTableFieldWrapper = styled.div`

    table thead tr {
        vertical-align: middle !important;
        text-align: center;
    }

    table tbody th, td {
        vertical-align: middle !important;
        text-align: center;
        font-size: 14px;
    }

    .fixed-header {
        position: sticky;
        top: -1px;
        background: #f1f1f1;
        z-index: 10;
        font-size: 14px;
        height: 35px;
    }

    .fixed-header-left {
        left: 0;
        z-index: 11;
    }

    .fixed-header-left2 {
        left: 100px;
        z-index: 11;
    }

    .fixed-header-left3 {
        left: 240px;
        z-index: 11;
        box-shadow: -0.5px 0 0 0 #e0e0e0 inset;
    }

    .fixed-col-left {
        position: sticky;
        left: 0;
        z-index: 9;
    }

    .fixed-col-left2 {
        position: sticky;
        left: 100px;
        z-index: 9;
    }

    .fixed-col-left3 {
        position: sticky;
        left: 240px;
        z-index: 9;
        box-shadow: -0.5px 0 0 0 #e0e0e0 inset;
    }

    .image-wrapper {
        width: 100%;
        height: auto;
        padding: 10px 15px;
    }

    .image-box {
        position: relative;
        padding-bottom: 100%;
    }

    .image-box img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        transition: .5s;
        border: 1px solid #f1f1f1;
        border-radius: 8px;
    }

    .button-el {
        width: 30px;
        height: 30px;
        position: relative;
        overflow: hidden;
        padding: 0;

        border: 1px solid #f7f7f7;
        background-color: #f7f7f7;

        cursor: pointer;
    }
`;

export {
    Container,
    ManageTableFieldWrapper
}
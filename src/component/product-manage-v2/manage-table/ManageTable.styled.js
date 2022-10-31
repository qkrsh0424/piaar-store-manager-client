import styled from "styled-components";

const Container = styled.div`
    margin-top: 10px;
`;

const ManageTableFieldWrapper = styled.div`
    background-color: #fff;
    border: 1px solid #dbdde2;
    min-height: 80vh;
    max-height: 80vh;
    overflow: auto;

    table thead tr {
        vertical-align: middle !important;
        text-align: center;
    }

    table tbody tr {
        :hover {
            transition: 0.15s;
            cursor: pointer;
            background: #f8f8f8;
        }
    }

    table tbody th, td {
        vertical-align: middle !important;
        text-align: center;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    table tbody .tr-active {
        transition: 0.15s;
        background: #2C73D230 !important;
    }

    .fixed-header {
        position: sticky;
        top: 0px;
        background: #f1f1f1;
        z-index: 10;
        font-size: 14px;
        height: 35px;
    }

    .fixed-header-left {
        left: 0;
        z-index: 11;

        @media screen and (max-width: 992px) {
            left: 0 !important;
            z-index: 1;
        }
    }

    .fixed-col-left {
        position: sticky;
        left: 0;
        z-index: 9;

        @media screen and (max-width: 992px) {
            left: 0 !important;
            z-index: 0;
            position: relative;
        }
    }

    .link-img {
        transition: 0.1s;

        :hover {
            transform: scale(1.1);
        }
    }

    .fixed-tr-active td {
        transition: 0.15s;
        background: #edf4ff !important;
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

        border: none;
        background-color: inherit;

        cursor: pointer;
    }

    .control-btn {
        margin: 4px;
    }

    .control-btn .button-el {
        width: 80px;
        height: 25px;
        border-radius: 2px;
        border: 1px solid #c8c8c8;
        background-color: #f7f7f7;

        :hover {
            background-color: #e8e8e8;
        }
    }

    .option-control-box {
        display: flex;
        gap: 5px;
        place-content: center;
    }

    .option-control-btn .button-el {
        border: 1px solid #c8c8c8;
        background-color: inherit;
        border-radius: 3px;
    }
`;

export {
    Container,
    ManageTableFieldWrapper
}
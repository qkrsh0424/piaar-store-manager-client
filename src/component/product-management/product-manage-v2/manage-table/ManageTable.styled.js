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
    border-radius: 10px;

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

        @media screen and (max-width: 992px) {
            font-size: 12px;
        }
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

        @media screen and (max-width: 992px) {
            font-size: 12px;
        }
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
        /* padding: 10px 15px; */
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
        left: 0;
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
        background-color: var(--defaultButtonColor);

        cursor: pointer;
    }

    .control-btn {
        margin: 4px;
    }

    .control-btn .button-el {
        width: 80px;
        height: 25px;
        border-radius: 5px;
        border: 1px solid #c8c8c8;
        background-color: var(--defaultButtonColor);

        :hover {
            background-color: var(--defaultButtonHoverColor);
        }
    }

    .control-btn .text-button {
        color: #888;
        font-weight: 600;
        background-color: inherit;
        border: none;
        
        &.text-highlight {
            color: var(--erp-main-color);
            text-decoration: underline;
        }

        :disabled {
            cursor: not-allowed;
        }
    }

    .option-control-box {
        display: flex;
        gap: 5px;
        place-content: center;
    }

    .option-control-btn .button-el {
        border: 1px solid #c8c8c8;
        background-color: var(--defaultButtonColor);
        border-radius: 3px;

        :hover {
            background-color: var(--defaultButtonHoverColor);
        }
    }
`;

export {
    Container,
    ManageTableFieldWrapper
}
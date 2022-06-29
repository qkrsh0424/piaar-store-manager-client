import styled, { css } from 'styled-components';

const Container = styled.div`
`;

const TableFieldWrapper = styled.div`
    padding: 10px 0;

    .table-box {
        height: 85vh;
        overflow: auto;
        border: 1px solid #e0e0e0;
        background-color: white;
        box-shadow: 2px 2px 15px #b0b2b799;
        font-size: 14px;

        @media only screen and (max-width:768px){
            font-size: 10px;
        }
    }

    table {
        position:relative;
        text-align: center;
        /* width: fit-cont; */
        table-layout: fixed;
        border: none;
        word-break: break-all;
    }

    table thead {
        width: 100%;
    }

    table thead tr th {
        vertical-align: middle !important;
        text-align: center;
        background: #e7e7e7;
        padding: 10px;
        font-size: 14px;
        font-weight: 700;
        border-bottom: 1px solid #e0e0e0;
        /* width: 200px; */
    }

    table tbody tr {
        background: white;
        border: 1px solid #eee;
        transition: 0.2s;

        :hover{
            background-color: rgb(146 153 181 / 20%);
            cursor: pointer;
        }
    }

    .table-box .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
    }
`;

const RankIcon = styled.span`
    ${(props) => (props.rank === 1) &&
        css`
            color : #ffcb3f;
        `
        ||
        (props.rank === 2) &&
        css`
            color : #aaaaaa;
        `
        ||
        (props.rank === 3) &&
        css`
            color : #a5732a;
        `
    }
`;


export {
    Container,
    TableFieldWrapper,
    RankIcon
}
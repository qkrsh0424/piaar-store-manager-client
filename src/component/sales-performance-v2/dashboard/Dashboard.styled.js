import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const DashboardFieldWrapper = styled.div`
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    .vertical-box {
        display:flex;
        width: 50%;
        flex-direction: column;
        align-items: center;
        margin-right: 20px;
    }

    .vertical-box-info {
        border: none;
        border-bottom: 2px solid #a2a8b1;
        padding-bottom: 10px;
        margin-bottom: 20px;
        width: 100%;
        font-size: 1.2rem;
        color: #444;
        text-align: center;
        font-weight: 700;
    }

    .vertical-box .vertical-group {
        width: 100%;
        margin-bottom: 20px;
        border-bottom: 1px solid #a2a8b1;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .data-box {
        padding: 15px;
        min-height: 100px;
        max-height: 100px;
        box-shadow: var(--defaultBoxShadow);
        border-radius: 10px;
        background-color: #fff;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .data-title {
        font-size: 1.1rem;
        color: #444;
        margin-bottom: 11px;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        white-space: nowrap;
    }

    .info-box {
        position: relative;
        display: flex;
        gap: 10px;
        /* display: inline-block;
        display: inline-block; */
        font-size: 14px;
        color: #777;
        vertical-align: middle;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        white-space: nowrap;
    }

    .data-content {
        font-size: 1.2rem;
        font-weight: 700;
    }
`;

const TrendInfoFieldWrapper = styled.div`
    .trend-info-box {
        display: flex;
        flex-direction: column;
        border-left: 1px solid var(--defaultBorderColor);
        padding: 0 10px;
        justify-content: flex-end;
        align-items: center;
        width: 150px;
        height: 50px;
    }

    .trend-info {
        display: flex;
        justify-content: space-between;
        font-weight: 700;
    }
`;

export {
    Container,
    DashboardFieldWrapper,
    TrendInfoFieldWrapper
}
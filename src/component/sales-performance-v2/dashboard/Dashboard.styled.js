import styled from "styled-components";

const Container = styled.div`
`;

const ContentTextFieldWrapper = styled.div`
    .text-box {
        padding: 10px 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
    }

    .vertical-box {
        display:flex;
        width: 50%;
        flex-direction: column;
        align-items: center;
        padding: 0 10px;

        @media screen and (max-width: 1280px) {
            display: none;
        }
    }

    .vertical-box-info {
        border: none;
        border-bottom: 2px solid #a2a8b1;
        padding-bottom: 10px;
        width: 100%;
        font-size: 1.2rem;
        color: #444;
        text-align: center;
        font-weight: 700;
    }

    .text-icon-box {
        display: none;
        
        @media screen and (max-width: 1280px){
            display: block;
            display: flex;
            align-items: center;
            padding: 10px;
            gap: 10px;
        }
    }

    .icon-box {
        position: relative;
        margin-left: 5px;
        width: 10px;
        height: 10px;
        display: inline-block;
        border-radius: 1px;
        vertical-align: middle;
    }
`;

const SearchFieldWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 5px;
    padding: 10px;

    .button-el {
        width: 100px;
        padding: 5px;
        background-color: #455265;
        border: 1px solid #455265;
        color: white;
        border-radius: 5px;
    }
`;

const ChannelPerformanceFieldWrapper = styled.div`
    padding: 10px 0;
    display: flex;
    align-items: center;
    width: 100%;
    
    @media screen and (max-width: 1280px) {
        flex-direction: column;
        row-gap: 20px;
    }

    .vertical-box {
        display:flex;
        width: 50%;
        flex-direction: column;
        align-items: center;
        padding: 0 10px;

        @media screen and (max-width: 1280px) {
            width: 100%;
        }
    }

    .vertical-box .vertical-group {
        width: 100%;
        border-bottom: 1px solid #a2a8b1;
    }
`;

const ChannelDataBox = styled.div`
    padding: 15px;
    display: flex;
    justify-content: space-between;
    min-height: 100px;
    max-height: 100px;
    box-shadow: var(--defaultBoxShadow);
    border-radius: 10px;
    background-color: #fff;
    margin-bottom: 20px;
        
    @media screen and (max-width: 1280px) {
        flex-direction: column;
        align-items: flex-start;
        max-height: fit-content;
        border: 1px solid ${props => props.datetime === 'yesterday' ? '#ffae4c' : 'var(--piaar-main-color)'};
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
    
    .data-content {
        overflow: auto;
        border-left: 1px solid var(--defaultBorderColor);
        padding: 0 20px;
        
        &::-webkit-scrollbar{
            background: #e1e1e130;
            height:3px;
            width: 5px;
        }

        &::-webkit-scrollbar-track{
            border-radius: 10px;
        }
        
        &::-webkit-scrollbar-thumb{
            background-color: #00000020;
            border-radius: 10px;
        }

        @media screen and (max-width: 1280px) {
            height: 80px;
            width: 100%;
        }
    }

    .data-group {
        display: flex;
        align-items: center;
        font-weight: 700;

        @media screen and (max-width: 576px) {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 10px;
        }
    }
`;

const DashboardFieldWrapper = styled.div`
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    @media screen and (max-width: 1280px) {
        flex-direction: column;
        row-gap: 20px;
    }

    .vertical-box {
        display:flex;
        width: 50%;
        flex-direction: column;
        align-items: center;
        padding: 0 10px;

        @media screen and (max-width: 1280px) {
            width: 100%;
        }
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
            border-bottom: none;
        }
    }
`;

const DataBox = styled.div`
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

    @media screen and (max-width: 1280px) {
        flex-direction: column;
        align-items: flex-start;
        max-height: fit-content;
        border: 1px solid ${props => props.datetime === 'yesterday' ? '#ffae4c' : 'var(--piaar-main-color)'};
    }

    .data-content-group {
        @media screen and (max-width: 1280px){
            width: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
        }
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
        font-size: 14px;
        color: #777;
        vertical-align: middle;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        white-space: nowrap;

        @media screen and (max-width: 1280px) {
            flex-direction: column;
        }
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

        @media screen and (max-width: 1280px) {
            height: 30px;
            width: 200px;
            flex-direction: row;
            justify-content: space-around;
        }
    }

    .trend-info {
        display: flex;
        justify-content: space-between;
        font-weight: 700;

        @media screen and (max-width: 1280px) {
            justify-content: space-evenly;
        }
    }
`;

const SubPerformanceFieldWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    font-size: 1rem;
    padding: 0 10px;
    color: #efefef;

    @media screen and (max-width: 992px) {
        flex-direction: column;
    }

    .box-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background-color: #465265;
        box-shadow: var(--defaultBoxShadow);
        border-radius: 10px;
        padding: 10px 20px;
        width: 270px;
        color: white;

        @media screen and (max-width: 992px) {
            width: 100%;
        }
    }

    .title-info {
        border-left: 3px solid #e7e9ff;
        padding-left: 10px;
        margin: 10px 0;
        font-weight: 700;
    }

    .data-wrapper {
        width: 100%;
    }

    .data-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .group-value {
        /* color: #e7e9ff; */
        font-weight: 700;
    }
`;

export {
    Container,
    SearchFieldWrapper,
    ContentTextFieldWrapper,
    ChannelDataBox,
    ChannelPerformanceFieldWrapper,
    DashboardFieldWrapper,
    DataBox,
    TrendInfoFieldWrapper,
    SubPerformanceFieldWrapper
}
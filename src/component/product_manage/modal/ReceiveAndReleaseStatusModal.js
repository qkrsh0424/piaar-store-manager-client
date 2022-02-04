import { useState } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

import { dateToYYMMDD, dateToYYMMDDhhmmss } from '../../../handler/dateHandler';

const Container = styled.div`
`;

const BodyWrapper = styled.div`
    .icon-dot, .icon-must {
        display: inline-block;
        background-color: #ff545c;
        border-radius: 50%;
        vertical-align: middle;
    }

    .icon-must {
        position: relative;
        /* top:-3px; */
        margin-left: 5px;
        width: 6px;
        height: 6px;
    }
`;

const GroupTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    padding:15px;
    @media only screen and (max-width:425px){
        padding: 15px 0;
    }

    .closeButton {
        float: right;
        top: -5px;
    }
`;

const DataContainer = styled.div`
    display: grid;
    width: 100%;
    row-gap: 10px;
    padding: 10px;
`;

const BoardContainer = styled.div`
    min-height: 40vh;
    max-height: 40px;
    background-color: #f3f5ff;
    overflow: auto;
    border-radius: 5px;
    font-size: 14px;

    & .fixed-header {
        position: sticky;
        top: -1px;
        background: #d8def5;
        z-index:10;
        padding: 2px;
        font-size: 16px;
        box-shadow: 1px 1px 15px #c8cef7;

        @media only screen and (max-width:576px){
            font-size: 14px;
        }
    }

    & .receive-header {
        background: #c8cef7;
        box-shadow: 1px 1px 15px #c8cef7;
    }

    & .large-cell {
        width: 300px;
    }

    & .xlarge-cell {
        width: 500px;
    }

    @media only screen and (max-width:576px){
        font-size: 12px;
    }
`;

const HeaderTh = styled.th`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
    border-right: 1px solid #f3f5ff;
`;

const BodyTr = styled.tr`
    border-bottom: 1px solid #f3f5ff;
`;

const BodyTd = styled.td`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
    border-right: 1px solid #a7a7a720;
`;

const ReceiveAndReleaseStatusModal = (props) => {

    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('lg');

    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={props.open} 
                onClose={() => props.__handleEventControl().productOption().receiveAndReleaseStatusModalClose()}
            >
                <Container>
                    <BodyWrapper style={{ borderBottom: '2px solid #f1f1f1' }}>
                        <GroupTitle>
                            <span>전체상품 입출고 현황</span>
                            <IconButton aria-label="close" className="closeButton" onClick={()=>props.__handleEventControl().productOption().receiveAndReleaseStatusModalClose()}>
                                <CloseIcon />
                            </IconButton>
                        </GroupTitle>

                        <DataContainer>

                            <BoardContainer>
                                <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%' }}>
                                    <thead>
                                        <tr className="fixed-header receive-header">
                                            <HeaderTh scope="col">
                                                <span>입고날짜</span>
                                            </HeaderTh>
                                            <HeaderTh scope="col">
                                                <span>상품명</span>
                                            </HeaderTh>
                                            <HeaderTh scope="col">
                                                <span>옵션명</span>
                                            </HeaderTh>
                                            <HeaderTh scope="col">
                                                <span>옵션관리코드</span>
                                            </HeaderTh>
                                            <HeaderTh scope="col">
                                                <span>입고개수</span>
                                            </HeaderTh>
                                            <HeaderTh scope="col" className="large-cell">
                                                <span>입고메모</span>
                                            </HeaderTh>
                                        </tr>
                                    </thead>
                                    <tbody style={{ border: 'none' }}>
                                        {props.optionReceiveStatusData?.map((data, idx) => {
                                            return (
                                                <BodyTr
                                                    key={'option_receive_status_idx' + idx}
                                                >
                                                    <BodyTd className="col">
                                                        <span>
                                                            {dateToYYMMDDhhmmss(data.receive.createdAt)}
                                                        </span>
                                                    </BodyTd>
                                                    <BodyTd className="col">
                                                        <span>
                                                            {data.product.defaultName}
                                                        </span>
                                                    </BodyTd>
                                                    <BodyTd className="col">
                                                        <span>
                                                            {data.option.defaultName}
                                                        </span>
                                                    </BodyTd>
                                                    <BodyTd className="col">
                                                        <span>
                                                            {data.option.code}
                                                        </span>
                                                    </BodyTd>
                                                    <BodyTd className="col">
                                                        <span>
                                                            +{data.receive.receiveUnit}
                                                        </span>
                                                    </BodyTd>
                                                    <BodyTd className="col">
                                                        <span>
                                                            {data.receive.memo}
                                                        </span>
                                                    </BodyTd>
                                                </BodyTr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </BoardContainer>

                            <BoardContainer>
                                <table className="table table-sm" style={{ tableLayout: 'fixed', width: '100%' }}>
                                    <thead>
                                        <tr className="fixed-header">
                                            <HeaderTh scope="col">
                                                <span>출고날짜</span>
                                            </HeaderTh>
                                            <HeaderTh scope="col">
                                                <span>상품명</span>
                                            </HeaderTh>
                                            <HeaderTh scope="col">
                                                <span>옵션명</span>
                                            </HeaderTh>
                                            <HeaderTh scope="col">
                                                <span>옵션관리코드</span>
                                            </HeaderTh>
                                            <HeaderTh scope="col">
                                                <span>출고개수</span>
                                            </HeaderTh>
                                            <HeaderTh scope="col" className="large-cell">
                                                <span>출고메모</span>
                                            </HeaderTh>
                                        </tr>
                                    </thead>
                                    <tbody style={{ border: 'none' }}>
                                        {props.optionReleaseStatusData?.map((data, idx) => {
                                            return (
                                                <BodyTr
                                                    key={'option_release_status_idx' + idx}
                                                >
                                                    <BodyTd className="col">
                                                        <span>
                                                            {dateToYYMMDDhhmmss(data.release.createdAt)}
                                                        </span>
                                                    </BodyTd>
                                                    <BodyTd className="col">
                                                        <span>
                                                            {data.product.defaultName}
                                                        </span>
                                                    </BodyTd>
                                                    <BodyTd className="col">
                                                        <span>
                                                            {data.option.defaultName}
                                                        </span>
                                                    </BodyTd>
                                                    <BodyTd className="col">
                                                        <span>
                                                            {data.option.code}
                                                        </span>
                                                    </BodyTd>
                                                    <BodyTd className="col">
                                                        <span>
                                                            -{data.release.releaseUnit}
                                                        </span>
                                                    </BodyTd>
                                                    <BodyTd className="col">
                                                        <span>
                                                            {data.release.memo}
                                                        </span>
                                                    </BodyTd>
                                                </BodyTr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </BoardContainer>
                        </DataContainer>
                    </BodyWrapper>
                </Container>
            </Dialog>
        </>
    )
}

export default ReceiveAndReleaseStatusModal;
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

const NameGroup = styled.ul`
    list-style: none;
    padding:0 10px;

    & .receive-list {
        background: #ffecd4;
        font-weight: 500;
    }

    & .release-list {
        background: #d8def5;
        font-weight: 500;
    }
`;

const DataLi = styled.li`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    border: 1px solid #e9e9e9;
`;

const HeaderLi = styled.li`
    text-align: center;
`;

const TitleText = styled.div`
    overflow: hidden;
    height: auto;
`;

const ModalText = styled.div`
    overflow: hidden;
    height: auto;
    font-size: 15px;
    padding: 2px;
    text-align: center;
    border-right: 1px solid #e9e9e9;
`;

const DataWrapper = styled.div`
    min-height: 40vh;
    max-height: 40px;
    background-color: white;
    overflow: auto;
    border-radius: 5px;

    & .fixed-header {
        position: sticky;
        top: -1px;
        background: #dddddd;
        z-index:10;
        padding: 2px;
        font-size: 16px;
        font-weight: 600;

        @media only screen and (max-width:576px){
            font-size: 14px;
        }
    }
`;

const DataContainer = styled.div`
    display: grid;
    width: 100%;
    row-gap: 10px;
    padding: 10px;
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
                        
                        <DataWrapper>
                            <NameGroup>
                                <HeaderLi className="input-group fixed-header">
                                    <TitleText className="col">
                                        <span>입고 날짜</span>
                                    </TitleText>
                                    <TitleText className="col">
                                        <span>상품명</span>
                                    </TitleText>
                                    <TitleText className="col">
                                        <span>옵션명</span>
                                    </TitleText>
                                    <TitleText className="col">
                                        <span>옵션관리코드</span>
                                    </TitleText>
                                    <TitleText className="col">
                                        <span>입고 개수</span>
                                    </TitleText>
                                    <TitleText className="col">
                                        <span>메모</span>
                                    </TitleText>
                                </HeaderLi>
                                {props.optionReceiveStatusData?.map((data, idx) => {
                                    return (
                                        <DataLi
                                            key={`option_receive_status_idx` + idx}
                                        >
                                            <ModalText className="receive-list">
                                                <span>
                                                    {dateToYYMMDDhhmmss(data.receive.createdAt)}
                                                </span>
                                            </ModalText>
                                            <ModalText className="receive-list">
                                                <span>
                                                    {data.product.defaultName}
                                                </span>
                                            </ModalText>
                                            <ModalText className="receive-list">
                                                <span>
                                                    {data.option.defaultName}
                                                </span>
                                            </ModalText>
                                            <ModalText className="receive-list">
                                                <span>
                                                    {data.option.code}
                                                </span>
                                            </ModalText>
                                            <ModalText className="receive-list">
                                                <span>
                                                    {data.receive.receiveUnit}
                                                </span>
                                            </ModalText>
                                            <ModalText className="receive-list">
                                                <span>
                                                    {data.receive.memo}
                                                </span>
                                            </ModalText>
                                        </DataLi>
                                    )
                                })}
                            </NameGroup>
                        </DataWrapper>

                        <DataWrapper>
                            <NameGroup>
                                <HeaderLi className="input-group fixed-header">
                                    <TitleText className="col">
                                        <span>출고 날짜</span>
                                    </TitleText>
                                    <TitleText className="col">
                                        <span>상품명</span>
                                    </TitleText>
                                    <TitleText className="col">
                                        <span>옵션명</span>
                                    </TitleText>
                                    <TitleText className="col">
                                        <span>옵션관리코드</span>
                                    </TitleText>
                                    <TitleText className="col">
                                        <span>출고 개수</span>
                                    </TitleText>
                                    <TitleText className="col">
                                        <span>메모</span>
                                    </TitleText>
                                </HeaderLi>
                                {props.optionReleaseStatusData?.map((data, idx) => {
                                    return (
                                        <DataLi
                                            key={`option_release_status_idx` + idx}
                                        >
                                            <ModalText className="release-list">
                                                <span>
                                                    {dateToYYMMDDhhmmss(data.release.createdAt)}
                                                </span>
                                            </ModalText>
                                            <ModalText className="release-list">
                                                <span>
                                                    {data.product.defaultName}
                                                </span>
                                            </ModalText>
                                            <ModalText className="release-list">
                                                <span>
                                                    {data.option.defaultName}
                                                </span>
                                            </ModalText>
                                            <ModalText className="release-list">
                                                <span>
                                                    {data.option.code}
                                                </span>
                                            </ModalText>
                                            <ModalText className="release-list">
                                                <span>
                                                    {data.release.releaseUnit}
                                                </span>
                                            </ModalText>
                                            <ModalText className="release-list">
                                                <span>
                                                    {data.release.memo}
                                                </span>
                                            </ModalText>
                                        </DataLi>
                                    )
                                })}
                            </NameGroup>
                        </DataWrapper>
                        </DataContainer>
                    </BodyWrapper>
                </Container>
            </Dialog>
        </>
    )
}

export default ReceiveAndReleaseStatusModal;
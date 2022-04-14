import { useState } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

import { dateToYYMMDD, dateToYYMMDDhhmmss } from '../../../utils/dateFormatUtils';

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
        background: #c8cef7;
        font-weight: 500;
    }

    & .release-list {
        background: #d8def5;
        font-weight: 500;
    }

    & .status-memo-btn {
         &:hover {
             opacity: 0.8;
             cursor: pointer;
             background: #acb3e1;
             color: white;
         }
     }
`;

const DataLi = styled.li`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 1px solid #e9e9e9;
`;

const HeaderLi = styled.li`
    text-align: center;

    & .form-title{
        background-color: #e7e7e7;
        margin-bottom: 5px;
    }

    & .status-memo{
        background-color: #dddddf;
    }
`;

const TitleText = styled.div`
    overflow: hidden;
    height: auto;
`;

const ModalText = styled.div`
    overflow: hidden;
    height: auto;
    font-size: 1rem;
    padding: 2px;
    text-align: center;
    border-right: 1px solid #e9e9e9;
`;

const StatusGroup = styled.div`
    font-weight: 400;
    padding: 10px 15px;

    & .receive-list {
        background: #c8cef7;
    }

    & .release-list {
        background: #d8def5;
    }
`;

const StatusBox = styled.span`
    border: none;
    margin: 4px;
    padding: 5px 10px;
    border-radius: 3px;
`;

const DataContainer = styled.div`
    min-height: 50vh;
    max-height: 50vh;
    overflow: auto;
`;

const StockStatusModal = (props) => {

    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('lg');

    return(
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={props.open} 
                onClose={() => props.__handleEventControl().productOption().stockStatusModalClose()}
            >
                <Container>
                    <BodyWrapper style={{ borderBottom: '2px solid #f1f1f1' }}>
                        <GroupTitle>
                            <span>입출고 현황</span>
                            <IconButton aria-label="close" className="closeButton" onClick={()=>props.__handleEventControl().productOption().stockStatusModalClose()}>
                                <CloseIcon />
                            </IconButton>
                        </GroupTitle>
                        <StatusGroup>
                            <StatusBox className="receive-list">입고</StatusBox>
                            <StatusBox className="release-list">출고</StatusBox>
                        </StatusGroup>
                        <NameGroup>
                            <HeaderLi className="input-group">
                                <TitleText className="form-control form-title">
                                    <span>입출고 날짜</span>
                                </TitleText>
                                <TitleText className="form-control form-title">
                                    <span>입출고 개수</span>
                                </TitleText>
                                <TitleText className="form-control form-title status-memo">
                                    <span>메모</span>
                                </TitleText>
                                <TitleText className="form-control form-title">
                                    <span>재고현황</span>
                                </TitleText>
                            </HeaderLi>

                            <DataContainer>
                                {props.stockStatusData?.map((data) => {
                                    return (
                                        <DataLi
                                            key={data.id}
                                        >
                                            <ModalText className={data.releaseUnit ? `release-list` : 'receive-list'}>
                                                <span>
                                                    {dateToYYMMDDhhmmss(data.createdAt)}
                                                </span>
                                            </ModalText>
                                            <ModalText className={data.releaseUnit ? `release-list` : 'receive-list'}>
                                                <span>
                                                    {data.receiveUnit ? `+` + data.receiveUnit : `-` + data.releaseUnit}
                                                </span>
                                            </ModalText>
                                            <ModalText className={data.releaseUnit ? `release-list status-memo-btn` : 'receive-list status-memo-btn'} onClick={(e) => props.__handleEventControl().stockStatus().modifyModalOpen(e, data)}>
                                                <span>
                                                    {data.memo}
                                                </span>
                                            </ModalText>
                                            <ModalText className={data.releaseUnit ? `release-list` : 'receive-list'}>
                                                <span>
                                                    {data.currentStock}
                                                </span>
                                            </ModalText>
                                        </DataLi>
                                    )
                                })}
                            </DataContainer>
                        </NameGroup>
                    </BodyWrapper>
                </Container>
            </Dialog>
        </>
    );
}

export default StockStatusModal;
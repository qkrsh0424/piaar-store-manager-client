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
        background: #c8cef7;
        font-weight: 500;
    }

    & .release-list {
        background: #d8def5;
        font-weight: 500;
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
        margin-bottom: 10px;
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
                        <NameGroup>
                            <HeaderLi className="input-group">
                                <TitleText className="form-control form-title">
                                    <span>입출고 날짜</span>
                                </TitleText>
                                <TitleText className="form-control form-title">
                                    <span>입출고 개수</span>
                                </TitleText>
                                <TitleText className="form-control form-title">
                                    <span>메모</span>
                                </TitleText>
                                <TitleText className="form-control form-title">
                                    <span>재고현황</span>
                                </TitleText>
                            </HeaderLi>
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
                                                {data.receiveUnit ? `+`+data.receiveUnit : `-`+data.releaseUnit }
                                            </span>
                                        </ModalText>
                                        <ModalText className={data.releaseUnit ? `release-list` : 'receive-list'}>
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
                        </NameGroup>
                    </BodyWrapper>
                </Container>
            </Dialog>
        </>
    );
}

export default StockStatusModal;
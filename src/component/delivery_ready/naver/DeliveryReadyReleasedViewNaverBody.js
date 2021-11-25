import React,{useMemo, useState} from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';

import { dateToYYMMDDhhmmss } from '../../../handler/dateHandler';

const DataContainer = styled.div`
    padding-bottom: 150px;
    height:auto;
    background-color: rgba(122, 123, 218, 0.125);

    & .fixed-header {
        position: sticky;
        top: -1px;
        z-index:10;
        background-color: #f3f3f3;
    }
`;

const TableContainer = styled.div`
    margin: 0 20px;
    height: 50vh;
	overflow: hidden;
    font-size: 14px;
    
    & .fixed-header {
        position: sticky;
        top: -1px;
        background: #f1f1f1;
        z-index:10;
    }
    
    & .small-cell {
        width: 50px;
        padding: 0;
    }

    & .medium-cell {
        width:90px;
    }

    & .large-cell {
        width: 300px;
    }

    & .xlarge-cell {
        width: 500px;
    }

    & .option-code-btn {
         &:hover {
             opacity: 0.8;
             cursor: pointer;
             background-color: #9bb6d170;
         }
     }

     & .option-code-cell {
        background-color: #eaeaea;
     }

    @media only screen and (max-width:768px){
        font-size: 10px;
    }
`;

const BoardContainer = styled.div`
    height: 85%;
    margin-bottom: 10px;
    background-color: white;
    overflow: auto;
    border-radius: 5px;
`;

const BoardTitle = styled.div`
    margin: 10px;
    font-size: large;
    color: rgba(000, 102, 153, 0.9);
    display: inline-block;
    width: 100%;

    @media only screen and (max-width:576px){
        font-size: 16px;
    }

    @media only screen and (max-width:320px){
        font-size: 14px;
    }
`;

const HeaderTh = styled.th`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
`;

const BodyTr = styled.tr`
    border-bottom: 1px solid #a7a7a740;

    ${(props) => props.checked ?
        css`
            background-color: #9bb6d150;
        `
        :
        css`
            &:hover{
                background: #9bb6d125;
            }
        `
    }

    ${(props) => props.reflectedUnit ?
        css`
            background-color: #99cccc60;
        `
        :
        css``
    }
`;

const BodyTd = styled.td`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
    border-right: 1px solid #a7a7a720;
`;

const CheckBodyTd = styled.span`
    font-size: 13px;
    margin: 0 15px;
`;

const CancelBtn = styled.button`
    font-size: 13px;
    border-radius: 3px;
    border: none;
    background-color: inherit;
    transition: opacity 0.1s linear;

    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }
`;

const DateSelector = styled.button`
    border-radius: 4px;
    background-color: rgba(122,146,218,0.2);
    border: 1px solid transparent;
    text-align: center;
    width: 200px;
    padding: 6px 0px;
    height: auto;
    margin-left: 25px;
    transition: opacity 0.1s linear;
    font-size: 14px;
    font-weight: 400;
    border: 1px solid rgba(122,146,218,0.25);

    &:hover{
        opacity: 0.6;
    }

    @media only screen and (max-width:576px){
        font-size: 12px;
    }

    @media only screen and (max-width:320px){
        width: 50%;
        font-size: 10px;
    }
`;

const PageBox = styled.span`
    float: right;
    padding: 0 10px;

    @media only screen and (max-width:576px){
        width: 100%;
        display: inline;
        padding: 0;
        
        button {
            font-size: 10px;
        }
    }

    @media only screen and (max-width:320px){
        button {
            font-size: 8px;
            margin: 0;
        }
    }
`;

const ChangeListBtn = styled.button`
    font-size: 14px;
    border-radius: 20px;
    border: none;
    background-color: rgb(178, 179, 221);
    color: white;
    transition: opacity 0.1s linear;
    margin: 3px;
    padding: 5px 15px;

    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }

    @media only screen and (max-width:576px){
        font-size: 10px;
    }
`;

const DataOptionBox = styled.span`
    @media only screen and (max-width:576px){
        display: block;
    }

    & .unitReflectBtn {
        background-color: #99cccc;
    }

    & .unitReflectCancelBtn {
        background-color: #99b5cc;
    };
`;

const DeliveryReadyReleasedView = (props) => {
    const userRdx = useSelector(state => state.user);

    return useMemo(() => (
        <>
            {userRdx.isLoading === false &&
                <DataContainer>
                    <DateSelector type="button" onClick={() => props.__handleEventControl().deliveryReadyDateRangePicker().open()}><EventAvailableTwoToneIcon fontSize="small" color="action" /> {props.selectedDateText}</DateSelector>
                    <TableContainer>
                        <BoardTitle>
                            <span><b>네이버</b> 출고 데이터</span>
                            <CheckBodyTd>[✔️ : {props.releaseCheckedOrderList.length} / {props.releasedData ? props.releasedData.length : 0}개]</CheckBodyTd>
                            <DataOptionBox>
                                <ChangeListBtn type="button" onClick={(e) => props.__handleEventControl().releaseCheckedOrderList().changeListToUnreleaseData(e)}>일괄 출고 취소</ChangeListBtn>
                                <ChangeListBtn type="button" className="unitReflectBtn" onClick={(e) => props.__handleEventControl().deliveryReadyReleaseMemo().open(e)}>재고반영</ChangeListBtn>
                                <ChangeListBtn type="button" className="unitReflectCancelBtn" onClick={(e) => props.__handleEventControl().deliveryReadyReceiveMemo().open(e)}>재고반영 취소</ChangeListBtn>
                            </DataOptionBox>
                            <PageBox>
                                <Stack spacing={0}>
                                    <Pagination
                                        size="small"
                                        count={props.releasedDataPagenate.totalPageNumber}
                                        onChange={(e, val) => props.__handleEventControl().releaseCheckedOrderList().releaseDataPagingHandler(e, val)}
                                    />
                                </Stack>
                            </PageBox>
                        </BoardTitle>
                        <BoardContainer>
                            <table className="table table-sm" style={{ tableLayout: 'fixed' }}>
                                <thead>
                                    <tr>
                                        <HeaderTh className="fixed-header small-cell" scope="col">
                                            <Checkbox
                                                color="primary"
                                                inputProps={{ 'aria-label': '전체 출고 데이터 선택' }}
                                                onChange={() => props.__handleEventControl().releaseCheckedOrderList().checkAll()} checked={props.__handleEventControl().releaseCheckedOrderList().isCheckedAll()}
                                            />
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header medium-cell" scope="col">
                                            <span>수취인명</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header large-cell" scope="col">
                                            <span>상품명</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header large-cell" scope="col">
                                            <span>옵션정보</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header small-cell" scope="col">
                                            <span>수량</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header medium-cell" scope="col">
                                            <span>*재고 수량</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header option-code-cell" scope="col">
                                            <span>옵션관리코드</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>*상품명</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>*옵션명1</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>*옵션명2</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>비고</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>배송비 묶음번호</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>상품주문번호</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header xlarge-cell" scope="col">
                                            <span>배송지</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>수취인연락처1</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header medium-cell" scope="col">
                                            <span>우편번호</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>배송메세지</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>주문일시</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header cancel-btn small-cell" scope="col">
                                            <span></span>
                                        </HeaderTh>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.releasedData?.map((data, releasedDataIdx) => {
                                        if((releasedDataIdx < props.releasedDataPagenate.postsPerPage * props.releasedDataPagenate.currentPage)
                                            && (releasedDataIdx >= props.releasedDataPagenate.postsPerPage * (props.releasedDataPagenate.currentPage-1)))
                                        return (
                                            <BodyTr
                                            key={'releasedItem' + releasedDataIdx}
                                            onClick={() => props.__handleEventControl().releaseCheckedOrderList().checkOneLi(data.deliveryReadyItem.id)}
                                            checked={props.__handleEventControl().releaseCheckedOrderList().isChecked(data.deliveryReadyItem.id)}
                                            reflectedUnit={data.deliveryReadyItem.releaseCompleted}
                                            >
                                                <BodyTd className="col small-cell">
                                                    <Checkbox
                                                        color="default"
                                                        inputProps={{ 'aria-label': '출고 데이터 선택' }}
                                                        checked={props.__handleEventControl().releaseCheckedOrderList().isChecked(data.deliveryReadyItem.id)}
                                                    />
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.deliveryReadyItem.receiver}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.deliveryReadyItem.prodName}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.deliveryReadyItem.optionInfo}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.deliveryReadyItem.unit}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.optionStockUnit}</span>
                                                </BodyTd>
                                                <BodyTd className="col option-code-btn" onClick={(e) => props.__handleEventControl().deliveryReadyOptionInfo().open(e, data.deliveryReadyItem)}>
                                                    <span>{data.deliveryReadyItem.optionManagementCode}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.prodManagementName}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.optionDefaultName}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.optionManagementName}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.optionMemo}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.deliveryReadyItem.shipmentCostBundleNumber}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.deliveryReadyItem.prodOrderNumber}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.deliveryReadyItem.destination}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.deliveryReadyItem.receiverContact1}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.deliveryReadyItem.zipCode}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{data.deliveryReadyItem.deliveryMessage}</span>
                                                </BodyTd>
                                                <BodyTd className="col">
                                                    <span>{dateToYYMMDDhhmmss(data.deliveryReadyItem.orderDateTime)}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <CancelBtn type="button" className="col cancel-btn small-cell" onClick={(e) => props.__handleEventControl().releaseCheckedOrderList().changeToUnreleaseData(e, data.deliveryReadyItem)}>
                                                        <CloseIcon></CloseIcon>
                                                    </CancelBtn>
                                                </BodyTd>
                                            </BodyTr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </BoardContainer>
                    </TableContainer>
                </DataContainer>
            }
        </>
    ), [props.releasedData, props.releaseCheckedOrderList, props.selectedDateText, props.releasedDataPagenate])
}

export default DeliveryReadyReleasedView;
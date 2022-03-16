import React,{useMemo, useState} from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

import Checkbox from '@material-ui/core/Checkbox';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import CloseIcon from '@material-ui/icons/Close';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

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

    & .release-option-code-btn {
        &:hover {
            opacity: 0.8;
            cursor: pointer;
            background-color: #ffc99770;
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

    & .out-of-stock {
        background-color: #edededa1;
    }
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

    & .duplication-user{
        color: red;
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
    padding: 0 15px;
    display: inline-block;

    & .fixed-size-text {
        display: inline-block;
        min-width: 20px;
        text-align: center;
    }
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

const ControlBtn = styled.span`
    border: none;
    padding: 0 4px;

    ${(props) => props.clicked ?
        css`
            color: #b2b3dd;
            transform: scale(1.2);
        `
        :
        css`
            color: rgb(122, 123, 218);
            
            &:hover {
                transform: scale(1.2);
            }
        `
    }
`;

const SearchBarBox = styled.form`
    position: absolute;
`;

const SearchInput = styled.input`
    width: 100%;
    border: 2px solid #d2d2ed;
    background: #f9f9ff;
    border-radius: 5px;
    padding: 3px 10px;
    font-size: 16px;
    font-weight: 500;
`;

const ReflectControl = styled.button`
    float: right;
    font-size: 14px;
    border: none;
    border-radius: 2px;
    background-color: rgb(152 181 204);
    color: white;
    transition: 0.1s linear;
    margin: 3px;
    padding: 5px 20px;
    font-weight: 600;

    &:hover {
        background-color: rgb(117 147 171);
        cursor: pointer;
    }

    @media only screen and (max-width:576px){
        font-size: 10px;
    }
`;

const ReleaseDataControlBox = styled.div`
    padding: 2px 25px;

    @media only screen and (max-width: 992px) {
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 10px;
    }
`;

const DeliveryReadyReleasedView = (props) => {
    const userRdx = useSelector(state => state.user);

    return useMemo(() => (
        <>
            {userRdx.isLoading === false &&
                <DataContainer>
                    <ReleaseDataControlBox>
                        <DateSelector type="button" onClick={() => props.__handleEventControl().deliveryReadyDateRangePicker().open()}><EventAvailableTwoToneIcon fontSize="small" color="action" /> {props.selectedDateText}</DateSelector>
                        <ReflectControl onClick={(e) => props.__handleEventControl().searchReleasedDataList().controlReflectedData(e)}>{props.releasedDataReflectedState?.controlText}</ReflectControl>
                    </ReleaseDataControlBox>
                    <TableContainer>
                        <BoardTitle>
                            <span><b>네이버</b> 출고 데이터</span>
                            <CheckBodyTd>[✔️ : <span className="fixed-size-text">{props.releaseCheckedOrderList.length}</span> / <span className="fixed-size-text">{props.releasedData ? props.releasedData.length : 0}</span> 개]</CheckBodyTd>
                            <DataOptionBox>
                                <ChangeListBtn onClick={(e) => props.__handleEventControl().releaseCheckedOrderList().changeListToUnreleaseData(e)}>일괄 출고 취소</ChangeListBtn>
                                <ChangeListBtn className="unitReflectBtn" onClick={(e) => props.__handleEventControl().deliveryReadyReleaseMemo().open(e)}>재고반영</ChangeListBtn>
                                <ChangeListBtn className="unitReflectCancelBtn" onClick={(e) => props.__handleEventControl().deliveryReadyReceiveMemo().open(e)}>재고반영 취소</ChangeListBtn>
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
                                        <HeaderTh className="fixed-header" scope="col">
                                            <div>
                                                <span>수취인명</span>
                                                <ControlBtn><ArrowDropDownIcon type="button" onClick={() => props.__handleEventControl().sortDataList().releasedDataSortedByReceiver()} /></ControlBtn>
                                                <ControlBtn clicked={!props.receiverSearchBarData.isOpenForReleased} type="button" onClick={(e) => props.__handleEventControl().searchReleasedDataList().openSearchBarForReceiver(e)}>
                                                    <ManageSearchIcon />
                                                </ControlBtn>
                                            </div>
                                            <SearchBarBox hidden={props.receiverSearchBarData.isOpenForReleased} onSubmit={(e) => props.__handleEventControl().searchReleasedDataList().searchForReceiver(e)}>
                                                <SearchInput
                                                    type='text'
                                                    name='searchedReleasedReceiverData'
                                                    value={props.searchBarState?.searchedReleasedReceiverData || ''}
                                                    onChange={(e) => props.__handleEventControl().searchReleasedDataList().onChangeInputValue(e)}>
                                                </SearchInput>
                                            </SearchBarBox>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header large-cell" scope="col">
                                            <span>상품명</span><ArrowDropDownIcon type="button" onClick={() => props.__handleEventControl().sortDataList().releasedDataSortedByProdName()}/>
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
                                        <HeaderTh className="fixed-header option-code-cell" scope="col">
                                            <span>출고옵션코드</span>
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
                                            <div>
                                                <span>비고</span>
                                                <ControlBtn clicked={!props.storageSearchBarData.isOpenForReleased} type="button" onClick={(e) => props.__handleEventControl().searchReleasedDataList().openSearchBarForStorageMemo(e)}>
                                                    <ManageSearchIcon />
                                                </ControlBtn>
                                            </div>
                                            <SearchBarBox hidden={props.storageSearchBarData.isOpenForReleased} onSubmit={(e) => props.__handleEventControl().searchReleasedDataList().searchForStorage(e)}>
                                                <SearchInput
                                                    type='text'
                                                    name='searchedReleasedStorageData'
                                                    value={props.searchBarState?.searchedReleasedStorageData || ''}
                                                    onChange={(e) => props.__handleEventControl().searchReleasedDataList().onChangeInputValue(e)}>
                                                </SearchInput>
                                            </SearchBarBox>
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
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>피아르 메모1</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>피아르 메모2</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>피아르 메모3</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>피아르 메모4</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>피아르 메모5</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>피아르 메모6</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>피아르 메모7</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>피아르 메모8</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>피아르 메모9</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>피아르 메모10</span>
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
                                                className={data.optionStockUnit <= 0 ? 'out-of-stock' : ''}
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
                                                <BodyTd className={data.duplicationUser ? 'duplication-user' : ''}>
                                                    <span>{data.deliveryReadyItem.receiver}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.deliveryReadyItem.prodName}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.deliveryReadyItem.optionInfo}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.deliveryReadyItem.unit}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.optionStockUnit}</span>
                                                </BodyTd>
                                                <BodyTd id="optionManagementCode" className="col option-code-btn" onClick={(e) => props.__handleEventControl().deliveryReadyOptionInfo().open(e, data.deliveryReadyItem)}>
                                                    <span id="optionManagementCode">{data.deliveryReadyItem.optionManagementCode}</span>
                                                </BodyTd>
                                                <BodyTd id="releaseOptionCode" className="col release-option-code-btn" onClick={(e) => props.__handleEventControl().deliveryReadyOptionInfo().open(e, data.deliveryReadyItem)}>
                                                    <span id="releaseOptionCode">{data.deliveryReadyItem.releaseOptionCode}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.prodManagementName}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.optionDefaultName}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.optionManagementName}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.optionMemo}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.deliveryReadyItem.shipmentCostBundleNumber}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.deliveryReadyItem.prodOrderNumber}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.deliveryReadyItem.destination}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.deliveryReadyItem.receiverContact1}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.deliveryReadyItem.zipCode}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.deliveryReadyItem.deliveryMessage}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{dateToYYMMDDhhmmss(data.deliveryReadyItem.orderDateTime)}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.deliveryReadyItem.piaarMemo1}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.deliveryReadyItem.piaarMemo2}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.deliveryReadyItem.piaarMemo3}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.deliveryReadyItem.piaarMemo4}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.deliveryReadyItem.piaarMemo5}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.deliveryReadyItem.piaarMemo6}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.deliveryReadyItem.piaarMemo7}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.deliveryReadyItem.piaarMemo8}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.deliveryReadyItem.piaarMemo9}</span>
                                                </BodyTd>
                                                <BodyTd>
                                                    <span>{data.deliveryReadyItem.piaarMemo10}</span>
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
    ), [props.releasedData, props.releaseCheckedOrderList, props.selectedDateText, props.releasedDataPagenate, props.receiverSearchBarData, props.storageSearchBarData, props.searchBarState, props.releasedDataReflectedState])
}

export default DeliveryReadyReleasedView;
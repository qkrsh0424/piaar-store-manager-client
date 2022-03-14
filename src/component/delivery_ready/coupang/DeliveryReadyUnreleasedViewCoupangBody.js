import React,{useMemo, useState} from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

import Checkbox from '@material-ui/core/Checkbox';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import { dateToYYMMDDhhmmss } from '../../../handler/dateHandler';

const DataContainer = styled.div`
    padding-bottom: 50px;
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
        background-color: #ededed;
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

const CancelListBtn = styled.button`
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

const DataOptionBox = styled.span`
    @media only screen and (max-width:576px){
        display: block;
    }
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

const DeliveryReadyUnreleasedViewCoupangBody = (props) => {
    const userRdx = useSelector(state => state.user);

    return useMemo(() => (
        <>
            {userRdx.isLoading === false &&
                <DataContainer>
                    <TableContainer>
                        <BoardTitle>
                            <span><b>쿠팡</b> 미출고 데이터</span>
                            <CheckBodyTd>[✔️ : <span className="fixed-size-text">{props.unreleaseCheckedOrderList.length}</span> / <span className="fixed-size-text">{props.unreleasedData ? props.unreleasedData.length : 0}</span> 개]</CheckBodyTd>
                            <DataOptionBox>
                                <CancelListBtn type="button" onClick={(e) => props.__handleEventControl().unreleaseCheckedOrderList().deleteList(e)}>일괄 삭제</CancelListBtn>
                                <ChangeListBtn type="button" onClick={(e) => props.__handleEventControl().unreleaseCheckedOrderList().changeListToReleaseData(e)}>일괄 출고</ChangeListBtn>
                            </DataOptionBox>
                            <PageBox>
                                <Stack spacing={0}>
                                    <Pagination
                                        size="small"
                                        count={props.unreleasedDataPagenate.totalPageNumber}
                                        onChange={(e, val) => props.__handleEventControl().unreleaseCheckedOrderList().unreleaseDataPagingHandler(e, val)}
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
                                                inputProps={{ 'aria-label': '전체 미출고 데이터 선택' }}
                                                onChange={() => props.__handleEventControl().unreleaseCheckedOrderList().checkAll()} checked={props.__handleEventControl().unreleaseCheckedOrderList().isCheckedAll()}
                                            />
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <div>
                                                <span>받는사람</span>
                                                <ControlBtn><ArrowDropDownIcon type="button" onClick={() => props.__handleEventControl().sortDataList().unreleasedDataSortedByReceiver()} /></ControlBtn>
                                                <ControlBtn clicked={!props.receiverSearchBarData.isOpenForUnreleased} type="button" onClick={(e) => props.__handleEventControl().searchUnreleasedDataList().openSearchBarForReceiver(e)}>
                                                    <ManageSearchIcon />
                                                </ControlBtn>
                                            </div>
                                            <SearchBarBox hidden={props.receiverSearchBarData.isOpenForUnreleased} onSubmit={(e) => props.__handleEventControl().searchUnreleasedDataList().searchForReceiver(e)}>
                                                <SearchInput
                                                    type='text'
                                                    name='searchedUnreleasedReceiverData'
                                                    value={props.searchBarState?.searchedUnreleasedReceiverData || ''}
                                                    onChange={(e) => props.__handleEventControl().searchUnreleasedDataList().onChangeInputValue(e)}>
                                                </SearchInput>
                                            </SearchBarBox>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header large-cell" scope="col">
                                            <span>등록상품명</span><ArrowDropDownIcon type="button" onClick={() => props.__handleEventControl().sortDataList().unreleasedDataSortedByProdName()}/>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header large-cell" scope="col">
                                            <span>등록옵션명</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header small-cell" scope="col">
                                            <span>수량</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header medium-cell" scope="col">
                                            <span>*재고 수량</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header option-code-cell" scope="col">
                                            <span>업체상품코드</span>
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
                                                <ControlBtn clicked={!props.storageSearchBarData.isOpenForUnreleased} type="button" onClick={(e) => props.__handleEventControl().searchUnreleasedDataList().openSearchBarForStorageMemo(e)}>
                                                    <ManageSearchIcon />
                                                </ControlBtn>
                                            </div>
                                            <SearchBarBox hidden={props.storageSearchBarData.isOpenForUnreleased} onSubmit={(e) => props.__handleEventControl().searchUnreleasedDataList().searchForStorage(e)}>
                                                <SearchInput
                                                    type='text'
                                                    name='searchedUnreleasedStorageData'
                                                    value={props.searchBarState?.searchedUnreleasedStorageData || ''}
                                                    onChange={(e) => props.__handleEventControl().searchUnreleasedDataList().onChangeInputValue(e)}>
                                                </SearchInput>
                                            </SearchBarBox>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>묶음배송번호</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header large-cell" scope="col">
                                            <span>상품주문번호(주문번호|노출상품ID|옵션ID)</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header xlarge-cell" scope="col">
                                            <span>주소</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>전화번호</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header medium-cell" scope="col">
                                            <span>우편번호</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixed-header" scope="col">
                                            <span>배송메시지</span>
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
                                {props.unreleasedData?.map((data, unreleasedDataIdx) => {
                                        if ((unreleasedDataIdx < props.unreleasedDataPagenate.postsPerPage * props.unreleasedDataPagenate.currentPage) 
                                            && (unreleasedDataIdx >= props.unreleasedDataPagenate.postsPerPage * (props.unreleasedDataPagenate.currentPage-1)))
                                            return (
                                                <BodyTr
                                                    key={'unreleasedItem' + unreleasedDataIdx}
                                                    className={data.optionStockUnit === 0 ? 'out-of-stock' : ''}
                                                    onClick={() => props.__handleEventControl().unreleaseCheckedOrderList().checkOneLi(data.deliveryReadyItem.id)}
                                                    checked={props.__handleEventControl().unreleaseCheckedOrderList().isChecked(data.deliveryReadyItem.id)}
                                                >
                                                    <BodyTd className="col small-cell">
                                                        <Checkbox
                                                            color="default"
                                                            inputProps={{ 'aria-label': '미출고 데이터 선택' }}
                                                            checked={props.__handleEventControl().unreleaseCheckedOrderList().isChecked(data.deliveryReadyItem.id)}
                                                        />
                                                    </BodyTd>
                                                    <BodyTd className={data.duplicationUser != null ? `duplication-user` : ''}>
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
                                                    <BodyTd id="releaseOptionCode" className="release-option-code-btn" onClick={(e) => props.__handleEventControl().deliveryReadyOptionInfo().open(e, data.deliveryReadyItem)}>
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
                                                        <CancelBtn type="button" className="col delete-btn small-cell" onClick={(e) => props.__handleEventControl().unreleaseCheckedOrderList().delete(e, data.deliveryReadyItem.cid)}>
                                                            <DeleteForeverTwoToneIcon />
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
    ), [props.unreleasedData, props.unreleaseCheckedOrderList, props.unreleasedDataPagenate, props.receiverSearchBarData, props.storageSearchBarData, props.searchBarState])
}

export default DeliveryReadyUnreleasedViewCoupangBody;
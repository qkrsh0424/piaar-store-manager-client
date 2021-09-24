import React,{useMemo, useState} from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

import Checkbox from '@material-ui/core/Checkbox';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const DataContainer = styled.div`
    padding-bottom: 50px;
    height:auto;
    background-color: rgba(122, 123, 218, 0.125);

    & .fixed-header {
        position: sticky;
        top: -1px;
        z-index:10;
        background-color: #f3f3f3;

        &:hover{
            opacity: 1;
            background-color: #f3f3f3;
        }
    }
`;

const TableContainer = styled.div`
    margin: 0 20px;
    height: 50vh;
	overflow: hidden;
    font-size: 14px;
    
    & .fixedHeader {
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

const PageBox = styled.span`
    float: right;
`;

const DeliveryReadyUnreleasedView = (props) => {
    const userRdx = useSelector(state => state.user);
    
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];
    const postsPerPage = 15;
    const unreleasedDataLength = props.unreleasedData != null ? props.unreleasedData.length : 0; 
    for(let i = 1; i <= Math.ceil(unreleasedDataLength / postsPerPage); i++){
        pageNumber.push(i);
    }

    const handleChange = (e, value) => {
        setCurrentPage(value);
    };

    return useMemo(() => (
        <>
            {userRdx.isLoading === false &&
                <DataContainer>
                    <TableContainer>
                        <BoardTitle>
                            <span>미출고 데이터</span>
                            <CheckBodyTd>[✔️ : {props.unreleaseCheckedOrderList.length} / {props.unreleasedData ? props.unreleasedData.length : 0}개]</CheckBodyTd>
                            <PageBox>
                                <Stack spacing={2}>
                                    <Pagination
                                        count={pageNumber.length}
                                        onChange={(e, val) => handleChange(e, val)}
                                    />
                                </Stack>
                            </PageBox>
                        </BoardTitle>
                        <BoardContainer>
                            <table className="table table-sm" style={{ tableLayout: 'fixed' }}>
                                <thead>
                                    <tr>
                                        <HeaderTh className="fixedHeader small-cell" scope="col">
                                            <Checkbox
                                                color="primary"
                                                inputProps={{ 'aria-label': '전체 미출고 데이터 선택' }}
                                                onChange={() => props.__handleEventControl().unreleaseCheckedOrderList().checkAll()} checked={props.__handleEventControl().unreleaseCheckedOrderList().isCheckedAll()}
                                            />
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader medium-cell" scope="col">
                                            <span>받는사람</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader large-cell" scope="col">
                                            <span>상품명1</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader large-cell" scope="col">
                                            <span>상품상세1</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader small-cell" scope="col">
                                            <span>수량</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader medium-cell" scope="col">
                                            <span>*재고 수량</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>옵션관리코드</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>*상품명</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>*옵션명1</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>*옵션명2</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>주문번호</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>상품주문번호</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader xlarge-cell" scope="col">
                                            <span>주소</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>전화번호1</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader medium-cell" scope="col">
                                            <span>우편번호</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>배송메시지</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader small-cell" scope="col">
                                            <span></span>
                                        </HeaderTh>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.unreleasedData?.map((data, unreleasedDataIdx) => {
                                        if (unreleasedDataIdx < postsPerPage * currentPage && unreleasedDataIdx >= postsPerPage * (currentPage - 1))
                                            return (
                                                <BodyTr
                                                    key={'unreleasedItem' + unreleasedDataIdx}
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
                                                        <span>{data.deliveryReadyItem.orderNumber}</span>
                                                    </BodyTd>
                                                    <BodyTd className="col">
                                                        <span>{data.deliveryReadyItem.prodOrderNumber}</span>
                                                    </BodyTd>
                                                    <BodyTd className="co">
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
    ), [props.unreleasedData, props.unreleaseCheckedOrderList, currentPage])
}

export default DeliveryReadyUnreleasedView;
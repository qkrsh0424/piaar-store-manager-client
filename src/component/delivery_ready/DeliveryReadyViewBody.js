import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

import Checkbox from '@material-ui/core/Checkbox';
// import DownloadLoading from "../loading/DownloadLoading";
// import { DateRange } from "react-date-range";
import Dialog from '@material-ui/core/Dialog';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const Container = styled.div`
    /* font-family: "gowun"; */
    /* height: 100vh; */
    background-color: rgba(122, 123, 218, 0.125);
`;

const Header = styled.div`
    color: white;
    width: 100%;
    height: 50px;
    display: inline-block;
    border-radius: 5px;
    /* background-color: rgba(122, 123, 218, 0.125); */
    margin-bottom: 5px;
`;

const Form = styled.form`
    margin: 10px;
    margin-left: 20px;
`;

const DownloadButton = styled.button`
    display: inline-block;
    border: 1px solid transparent;
    font-size: 16px;
    padding: 8px;
    color: #444;
    width: 200px;
    border-radius: 3px;
    background-color: #fdfdfd;
    transition: opacity 0.1s linear;
    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }
`;

const DataContainer = styled.div`
    margin: 10px 20px;
    height:100%;
    overflow: hidden;
    border-radius: 5px;

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

const DataList = styled.li`
    font-size: 10px;
    display: flex;
    text-align: center;
    margin-bottom: 2px;
    height: 40px;
    background-color: white;

    overflow: auto;
    width: 2000px;

    /* & .delete-btn {
        background-color: rgba(217, 50, 50, 0.2);
    }

    & .cancel-btn {
        background-color: #b0bec5;
    } */

    /* & .large-cell {
        width: 100%;
    }

    & .midium-cell {
        width: 60%;
    }

    & .small-cell {
        width: 15%;
        overflow: hidden;
    } */

    & .option-code-btn {
        &:hover {
            opacity: 0.8;
            cursor: pointer;
            background-color: #9bb6d170;
        }
    }

    // 체크 항목 하이라이트
    ${(props) => props.checked ?
        css`
            background-color: #9bb6d130;
        `
        :
        css`
            &:hover{
                background: #9bb6d110;
            }
        `
    }
`;

const DateSelector = styled.button`
    float: right;
    border-radius: 4px;
    background-color: #f3f3f3;
    box-shadow: 0 1px 2px 0 rgb(35 57 66 / 21%);
    border: 1px solid transparent;
    text-align: center;
    width: 230px;
    height: 4vh;
    margin-right: 15px;
    transition: opacity 0.1s linear;
    font-size: 13px;
`;

//     &:hover {
//         opacity: 0.6;
//         cursor: pointer;
//     }
// `;

// const DatePickerButton = styled.div`
//     text-align: center;
//     padding: 10px;
//     background-color: rgb(229, 232, 237);
//     transition: opacity 0.1s linear;
//     &:hover {
//         opacity: 0.6;
//         cursor: pointer;
//     }
// `;

const CheckBodyTd = styled.span`
    font-size: 13px;
    margin: 0 15px;
`;

const CancelBtn = styled.button`
    /* width: 10%; */
    font-size: 13px;
    border-radius: 3px;
    border: none;
    /* overflow: auto; */
    border-right: 1px solid #f5f5f5;
    background-color: inherit;
    transition: opacity 0.1s linear;

    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }
`;

const GroupTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    padding:15px;
    margin-bottom: 10px;

    .closeButton {
        float: right;
        top: -5px;
    }
`;

const OptionLi = styled.li`
    margin-bottom: 6px;
    display: flex;
    border-radius: 10px;

    .form-title {
        background: rgb(147, 167, 194, 0.7);
    }

    .form-control {
        &:hover {
            cursor: pointer;
        }
    }

    // 체크 항목 하이라이트
    ${(props) => props.checked ?
        css`
            background-color: #9bb6d150;
        `
        :
        css`
            &:hover{
                background: #9bb6d130;
            }
        `
    }
`;

const OptionInfoLi = styled.li`
    display: flex;
    border-radius: 10px;
    margin-bottom: 5px;

    .info-title {
        background: rgb(255, 253, 226);
        font-size: large;
    }
`;

const OptionInfoTitle = styled.div`
    padding: 2px;
    margin-bottom: 15px;
    border-bottom: 2px solid rgb(241, 241, 241);
`;

const NameGroup = styled.div`
    padding: 0 15px;
`;

const ModalText = styled.div`
    overflow: hidden;
    min-height: 30px;
    height: auto;
    font-size: 15px;
    border: 1px solid #ced4da;
    background: rgb(147, 167, 194, 0.2);
    width: 25%;
    padding: 2px;
    text-align: center;
`;

const OptionContainer = styled.div`
`;

const ChangeBtn = styled.button`
    margin: 10px;
    float: right;
    width: 100px;
    vertical-align: middle;
    font-size: 15px;
    border-radius: 3px;
    border: 1px solid #a7a7a7;
    overflow: auto;
    height: 4vh;
    transition: opacity 0.1s linear;
    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }

    @media only screen and (max-width:400px){
        width: 80px;
    }
`;

const OptionDataList = styled.div`
    height: 50vh;
    overflow: auto;
`;

const ChangeBox = styled.div`
    width: 100%;
    display: inline-block;
`;

const TableContainer = styled.div`
    height: 50vh;
	overflow: auto;
    font-size: 14px;
    
    & .fixedHeader {
        /* width:100%; */
        position: sticky;
        top: -1px;
        background: #f1f1f1;
        z-index:10;
    }

    & .large-cell {
        width: 300px;
    }

    & .xlarge-cell {
        width: 500px;
    }

    & .small-cell {
        width: 50px;
        padding: 0;
    }

    /* & .delete-btn {
        background-color: rgba(217, 50, 50, 0.2);
    } */

    /* & .cancel-btn {
        background-color: #b0bec5;
    } */

    @media only screen and (max-width:768px){
        font-size: 10px;
    }
`;

const HeaderTh = styled.th`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
`;

const BodyTr = styled.tr`
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

const DeliveryReadyViewBody = (props) => {
    return (
        <>
            {/* <DownloadLoading open={downloadLoading} /> */}
            <Container>
                <Header>
                    <Form>
                        <DownloadButton onClick={(e) => props.__handleEventControl().downloadOrderFormData().submit(e)}>발주서 다운</DownloadButton>
                    </Form>
                </Header>
                <DataContainer>
                    <TableContainer>
                        <BoardTitle>
                            <span>미출고 데이터</span>
                            <CheckBodyTd>[✔️ : {props.unreleaseCheckedOrderList.length} / {props.unreleasedData ? props.unreleasedData.length : 0}개]</CheckBodyTd>
                        </BoardTitle>
                        <BoardContainer>
                            <table className="table table-sm" style={{ tableLayout: 'fixed' }}>
                                <thead>
                                    <tr>
                                        <HeaderTh className="fixedHeader small-cell" scope="col">
                                            <Checkbox
                                                color="primary"
                                                inputProps={{ 'aria-label': '전체 출고 등록' }}
                                                onChange={() => props.__handleEventControl().unreleaseCheckedOrderList().checkAll()} checked={props.__handleEventControl().unreleaseCheckedOrderList().isCheckedAll()}
                                            />
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>주문번호</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>상품주문번호</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>받는사람</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>전화번호1</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>우편번호</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader xlarge-cell" scope="col">
                                            <span>주소</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader xlarge-cell" scope="col">
                                            <span>상품명1</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader large-cell" scope="col">
                                            <span>상품상세1</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>옵션관리코드</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>내품수량1</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>배송메시지</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader large-cell" scope="col">
                                            <span>*상품명</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>*옵션명1</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>*옵션명2</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>*옵션 수량</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>보내는사람(지정)</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader" scope="col">
                                            <span>전화번호1(지정)</span>
                                        </HeaderTh>
                                        <HeaderTh className="fixedHeader small-cell" scope="col">
                                            <span></span>
                                        </HeaderTh>
                                    </tr>
                                </thead>
                            <tbody>
                        {props.unreleasedData?.map((data, unreleasedDataIdx) => {
                            return (
                                <BodyTr
                                    key={'unreleasedItem' + unreleasedDataIdx}
                                    onClick={() => props.__handleEventControl().unreleaseCheckedOrderList().checkOneLi(data.deliveryReadyItem.id)}
                                    checked={props.__handleEventControl().unreleaseCheckedOrderList().isChecked(data.deliveryReadyItem.id)}
                                >
                                    <BodyTd className="col small-cell">
                                        <Checkbox
                                            color="default"
                                            inputProps={{ 'aria-label': '출고 등록' }}
                                            checked={props.__handleEventControl().unreleaseCheckedOrderList().isChecked(data.deliveryReadyItem.id)}
                                        />
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>{data.deliveryReadyItem.orderNumber}</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>{data.deliveryReadyItem.prodOrderNumber}</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>{data.deliveryReadyItem.receiver}</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>{data.deliveryReadyItem.receiverContact1}</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>{data.deliveryReadyItem.zipCode}</span>
                                    </BodyTd>
                                    <BodyTd className="co xlarge-cell">
                                        <span>{data.deliveryReadyItem.destination}</span>
                                    </BodyTd>
                                    <BodyTd className="col xlarge-cell">
                                        <span>{data.deliveryReadyItem.prodName}</span>
                                    </BodyTd>
                                    <BodyTd className="col large-cell">
                                        <span>{data.deliveryReadyItem.optionInfo}</span>
                                    </BodyTd>
                                    <BodyTd className="col option-code-btn" onClick={(e) => props.__handleEventControl().changeDeliveryReadyItem().changeOptionManagementCode(e, data.deliveryReadyItem)}>
                                        <span>{data.deliveryReadyItem.optionManagementCode}</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>{data.deliveryReadyItem.unit}</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>{data.deliveryReadyItem.deliveryMessage}</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>{data.prodManagementName}</span>
                                    </BodyTd>
                                    <BodyTd className="col large-cell">
                                        <span>{data.optionDefaultName}</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>{data.optionManagementName}</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>{data.optionStockUnit}</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>스토어명</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>070-0000-0000</span>
                                    </BodyTd>
                                    <BodyTd>
                                        <CancelBtn className="col delete-btn small-cell" onClick={(e) => props.__handleEventControl().unreleaseCheckedOrderList().delete(e, data.deliveryReadyItem.id)}>
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

                    <TableContainer>
                    <BoardTitle>
                        <span>출고 데이터</span>
                        <CheckBodyTd>[✔️ : {props.releaseCheckedOrderList.length} / {props.releasedData ? props.releasedData.length : 0}개]</CheckBodyTd>
                        <DateSelector onClick={() => props.__handleEventControl().deliveryReadyDateRangePicker().open()}>🗓 {props.selectedDateText}</DateSelector>
                    </BoardTitle>
                    <BoardContainer>

                    <table className="table table-sm" style={{ tableLayout: 'fixed' }}>
                        <thead>
                            <tr>
                            <HeaderTh className="fixedHeader small-cell" scope="col">
                                <Checkbox
                                    color="primary"
                                    inputProps={{ 'aria-label': '전체 출고 재 등록' }}
                                    onChange={() => props.__handleEventControl().releaseCheckedOrderList().checkAll()} checked={props.__handleEventControl().releaseCheckedOrderList().isCheckedAll()}
                                />
                            </HeaderTh>
                            <HeaderTh className="fixedHeader" scope="col">
                                <span>주문번호</span>
                            </HeaderTh>
                            <HeaderTh className="fixedHeader" scope="col">
                                <span>상품주문번호</span>
                            </HeaderTh>
                            <HeaderTh className="fixedHeader" scope="col">
                                <span>받는사람</span>
                            </HeaderTh>
                            <HeaderTh className="fixedHeader" scope="col">
                                <span>전화번호1</span>
                            </HeaderTh>
                            <HeaderTh className="fixedHeader" scope="col">
                                <span>우편번호</span>
                            </HeaderTh>
                            <HeaderTh className="fixedHeader xlarge-cell" scope="col">
                                <span>주소</span>
                            </HeaderTh>
                            <HeaderTh className="fixedHeader xlarge-cell" scope="col">
                                <span>상품명1</span>
                            </HeaderTh>
                            <HeaderTh className="fixedHeader large-cell" scope="col">
                                <span>상품상세1</span>
                            </HeaderTh>
                            <HeaderTh className="fixedHeader" scope="col">
                                <span>옵션관리코드</span>
                            </HeaderTh>
                            <HeaderTh className="fixedHeader" scope="col">
                                <span>내품수량1</span>
                            </HeaderTh>
                            <HeaderTh className="fixedHeader" scope="col">
                                <span>배송메시지</span>
                            </HeaderTh>
                            <HeaderTh className="fixedHeader" scope="col">
                                <span>*상품명</span>
                            </HeaderTh>
                            <HeaderTh className="fixedHeader large-cell" scope="col">
                                <span>*옵션명1</span>
                            </HeaderTh>
                            <HeaderTh className="fixedHeader" scope="col">
                                <span>*옵션명2</span>
                            </HeaderTh>
                            <HeaderTh className="fixedHeader" scope="col">
                                <span>*옵션 수량</span>
                            </HeaderTh>
                            <HeaderTh className="fixedHeader" scope="col">
                                <span>보내는사람(지정)</span>
                            </HeaderTh>
                            <HeaderTh className="fixedHeader" scope="col">
                                <span>전화번호1(지정)</span>
                            </HeaderTh>
                            <HeaderTh className="fixedHeader cancel-btn small-cell" scope="col">
                                <span></span>
                            </HeaderTh>
                            </tr>
                        </thead>
                        <tbody>
                        {props.releasedData && props.releasedData.map((data, releasedDataIdx) => {
                            return (
                                <BodyTr
                                    key={'releasedItem' + releasedDataIdx}
                                    onClick={() => props.__handleEventControl().releaseCheckedOrderList().checkOneLi(data.deliveryReadyItem.id)}
                                    checked={props.__handleEventControl().releaseCheckedOrderList().isChecked(data.deliveryReadyItem.id)}
                                >
                                    <BodyTd className="col small-cell">
                                        <Checkbox
                                            color="default"
                                            inputProps={{ 'aria-label': '출고 등록' }}
                                            checked={props.__handleEventControl().releaseCheckedOrderList().isChecked(data.deliveryReadyItem.id)}
                                        />
                                    </BodyTd>
                                    <BodyTd className="col midium-cell">
                                        <span>{data.deliveryReadyItem.orderNumber}</span>
                                    </BodyTd>
                                    <BodyTd className="col midium-cell">
                                        <span>{data.deliveryReadyItem.prodOrderNumber}</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>{data.deliveryReadyItem.receiver}</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>{data.deliveryReadyItem.receiverContact1}</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>{data.deliveryReadyItem.zipCode}</span>
                                    </BodyTd>
                                    <BodyTd className="col xlarge-cell">
                                        <span>{data.deliveryReadyItem.destination}</span>
                                    </BodyTd>
                                    <BodyTd className="col xlarge-cell">
                                        <span>{data.deliveryReadyItem.prodName}</span>
                                    </BodyTd>
                                    <BodyTd className="col large-cell">
                                        <span>{data.deliveryReadyItem.optionInfo}</span>
                                    </BodyTd>
                                    <BodyTd className="col option-code-btn" onClick={(e) => props.__handleEventControl().changeDeliveryReadyItem().changeOptionManagementCode(e, data.deliveryReadyItem)}>
                                        <span>{data.deliveryReadyItem.optionManagementCode}</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>{data.deliveryReadyItem.unit}</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>{data.deliveryReadyItem.deliveryMessage}</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>{data.prodManagementName}</span>
                                    </BodyTd>
                                    <BodyTd className="col large-cell">
                                        <span>{data.optionDefaultName}</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>{data.optionManagementName}</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>{data.optionStockUnit}</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>스토어명</span>
                                    </BodyTd>
                                    <BodyTd className="col">
                                        <span>070-0000-0000</span>
                                    </BodyTd>
                                    <BodyTd>
                                        <CancelBtn className="col cancel-btn small-cell" onClick={(e) => props.__handleEventControl().releaseCheckedOrderList().changeToUnreleaseData(e, data.deliveryReadyItem.id)}>
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
            </Container>
        </>
    )
}

export default DeliveryReadyViewBody;
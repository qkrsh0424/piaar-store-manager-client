import styled from 'styled-components';
import { useSelector } from 'react-redux';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Container = styled.div`
    overflow:hidden;
    margin-bottom: 100px;
`;

const UploadBar = styled.div`
    color: white;
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    border-radius: 5px;
    background-color: rgba(122, 123, 218, 0.125);
    margin-bottom: 5px;
`;

const Form = styled.form`
    margin: 10px;
    margin-right: 20px;

    @media only screen and (max-width:576px){
        width: 100%;
    }
`;

const ControlLabel = styled.label`
    font-size: 16px;
    width: 200px;
    padding: 6px;
    margin: 4px;
    color: #444;
    text-align: center;
    vertical-align: middle;
    background-color: #fdfdfd;
    border-radius: 3px;
    transition: opacity 0.1s linear;
    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }

    @media only screen and (max-width:768px){
        font-size: 14px;
        width: 170px;
    }

    @media only screen and (max-width:576px){
        width: 100%;
        font-size: 12px;
    }
`;

const ControlBtn = styled.button`
    font-size: 16px;
    width: 200px;
    padding: 6px;
    margin: 4px;
    color: #444;
    vertical-align: middle;
    background-color: #fdfdfd;
    border-radius: 3px;
    border: none;
    transition: opacity 0.1s linear;
    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }

    @media only screen and (max-width:768px){
        font-size: 14px;
        width: 170px;
    }

    @media only screen and (max-width:576px){
        width: 100%;
        font-size: 12px;
    }
`;

const Input = styled.input`
    font-size: 20px;
    width: 100%;
    display: none;
`;

const TableContainer = styled.div`
    height: 80vh;
	overflow: auto;
    font-size: 14px;
    
    & .fiexed-header {
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
`;

const BodyTd = styled.td`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
    border-right: 1px solid #efefef80;
`;

const PageControlBtn = styled.button`
    display: inline;
    margin-left: auto;
    font-size: 14px;
    /* width: 200px; */
    /* padding: 6px; */
    color: #555;
    vertical-align: middle;
    background-color: rgba(122, 123, 218, 0.001);
    font-weight: 600;
    border: none;
    transition: opacity 0.1s linear;

    &:hover {
        color: rgba(122, 123, 218);
        cursor: pointer;
    }

    @media only screen and (max-width:576px){
        text-align: center;
        font-size: 12px;
    }
`;

const DeliveryReadyUploadBody = (props) => {
    const userRdx = useSelector(state => state.user);

    return (
        <>
            {userRdx.isLoading === false &&
                <Container className="mt-3">
                    <UploadBar>
                        <Form>
                            <ControlLabel htmlFor="upload-file-input">배송준비 엑셀 파일 업로드</ControlLabel>
                            <Input id="upload-file-input" type="file" accept=".xls,.xlsx" onClick={(e) => e.target.value = ''} onChange={(e) => props.__handleEventControl().uploadExcelData().submit(e)}/>
                        </Form>
                        <Form onSubmit={(e) => props.__handleEventControl().storeExcelData().submit(e)}>
                            <ControlBtn type="submit">배송준비 엑셀 파일 저장</ControlBtn>
                        </Form>
                        <PageControlBtn type="button" onClick={() => props.__handleEventControl().movePage().deliveryReadyView()}>발주서 다운로드 <KeyboardArrowRightIcon /></PageControlBtn>
                    </UploadBar>
                    <TableContainer>
                        <table className="table table-sm" style={{tableLayout: 'fixed' }}>
                            <thead>
                            <tr>
                                <HeaderTh className="fiexed-header" scope="col">주문번호</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">상품주문번호</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">판매채널</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">구매자명</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">구매자ID</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">수취인명</HeaderTh>
                                <HeaderTh className="fiexed-header large-cell" scope="col">결제일</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">상품번호</HeaderTh>
                                <HeaderTh className="fiexed-header xlarge-cell" scope="col">상품명</HeaderTh>
                                <HeaderTh className="fiexed-header large-cell" scope="col">옵션정보</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">옵션관리코드</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">수량</HeaderTh>
                                <HeaderTh className="fiexed-header large-cell" scope="col">발주확인일</HeaderTh>
                                <HeaderTh className="fiexed-header large-cell" scope="col">발송기한</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">배송비 묶음번호</HeaderTh>
                                <HeaderTh className="fiexed-header large-cell" scope="col">판매자 상품코드</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">판매자 내부코드1</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">판매자 내부코드2</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">수취인연락처1</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">수취인연락처2</HeaderTh>
                                <HeaderTh className="fiexed-header xlarge-cell" scope="col">배송지</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">구매자연락처</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">우편번호</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">배송메세지</HeaderTh>
                                <HeaderTh className="fiexed-header xlarge-cell" scope="col">출고지</HeaderTh>
                                <HeaderTh className="fiexed-header large-cell" scope="col">주문일시</HeaderTh>
                            </tr>
                        </thead>
                        <tbody>
                            {props.excelData?.map((data, index) => {
                                return (
                                    <BodyTr
                                        key={'subitem' + index}
                                    >
                                        <BodyTd className="col">{data.prodOrderNumber}</BodyTd>
                                        <BodyTd className="col">{data.orderNumber}</BodyTd>
                                        <BodyTd className="col">{data.salesChannel}</BodyTd>
                                        <BodyTd className="col">{data.buyer}</BodyTd>
                                        <BodyTd className="col">{data.buyerId}</BodyTd>
                                        <BodyTd className="col">{data.receiver}</BodyTd>
                                        <BodyTd className="col large-cell">{data.paymentDate}</BodyTd>
                                        <BodyTd className="col">{data.prodNumber}</BodyTd>
                                        <BodyTd className="col xlarge-cell">{data.prodName}</BodyTd>
                                        <BodyTd className="col large-cell">{data.optionInfo}</BodyTd>
                                        <BodyTd className="col">{data.optionManagementCode}</BodyTd>
                                        <BodyTd className="col">{data.unit}</BodyTd>
                                        <BodyTd className="col large-cell">{data.orderConfirmationDate}</BodyTd>
                                        <BodyTd className="col large-cell">{data.shipmentDueDate}</BodyTd>
                                        <BodyTd className="col">{data.shipmentCostBundleNumber}</BodyTd>
                                        <BodyTd className="col large-cell">{data.sellerProdCode}</BodyTd>
                                        <BodyTd className="col">{data.sellerInnerCode1}</BodyTd>
                                        <BodyTd className="col">{data.sellerInnerCode2}</BodyTd>
                                        <BodyTd className="col">{data.receiverContact1}</BodyTd>
                                        <BodyTd className="col">{data.receiverContact2}</BodyTd>
                                        <BodyTd className="col xlarge-cell">{data.destination}</BodyTd>
                                        <BodyTd className="col">{data.buyerContact}</BodyTd>
                                        <BodyTd className="col">{data.zipCode}</BodyTd>
                                        <BodyTd className="col">{data.deliveryMessage}</BodyTd>
                                        <BodyTd className="col xlarge-cell">{data.releaseArea}</BodyTd>
                                        <BodyTd className="col large-cell">{data.orderDateTime}</BodyTd>
                                    </BodyTr>
                                )
                            })}
                            </tbody>
                        </table>
                    </TableContainer>
                </Container>
            }
        </>
    );
}

export default DeliveryReadyUploadBody;
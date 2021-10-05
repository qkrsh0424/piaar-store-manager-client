import styled from 'styled-components';
import { useSelector } from 'react-redux';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { dateToYYMMDDhhmmss } from '../../../handler/dateHandler';

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
    width: 240px;
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
        width: 100%;
    }

    @media only screen and (max-width:576px){
        width: 100%;
        font-size: 12px;
    }
`;

const ControlBtn = styled.button`
    font-size: 16px;
    width: 240px;
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
        width: 100%;
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

    @media only screen and (max-width:768px){
        font-size: 12px;
    }
`;

const DeliveryReadyUploadCoupangBody = (props) => {
    const userRdx = useSelector(state => state.user);

    return (
        <>
            {userRdx.isLoading === false &&
                <Container className="mt-3">
                    <UploadBar>
                        <Form>
                            <ControlLabel htmlFor="upload-file-input"><b>쿠팡</b> 배송준비 엑셀 파일 업로드</ControlLabel>
                            <Input id="upload-file-input" type="file" accept=".xls,.xlsx" onClick={(e) => e.target.value = ''} onChange={(e) => props.__handleEventControl().uploadExcelData().submit(e)}/>
                        </Form>
                        <Form onSubmit={(e) => props.__handleEventControl().storeExcelData().submit(e)}>
                            <ControlBtn type="submit"><b>쿠팡</b> 배송준비 엑셀 파일 저장</ControlBtn>
                        </Form>
                        <PageControlBtn type="button" onClick={() => props.__handleEventControl().movePage().deliveryReadyView()}>발주서 다운로드 <KeyboardArrowRightIcon /></PageControlBtn>
                    </UploadBar>
                    <TableContainer>
                        <table className="table table-sm" style={{tableLayout: 'fixed' }}>
                            <thead>
                            <tr>
                                <HeaderTh className="fiexed-header large-cell" scope="col">상품주문번호(주문번호|노출상품ID|옵션ID)</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">구매자</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">수취인이름</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">노출상품ID</HeaderTh>
                                <HeaderTh className="fiexed-header xlarge-cell" scope="col">등록상품명</HeaderTh>
                                <HeaderTh className="fiexed-header xlarge-cell" scope="col">노출상품명</HeaderTh>
                                <HeaderTh className="fiexed-header xlarge-cell" scope="col">등록옵션명</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">업체상품코드</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">옵션ID</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">수량</HeaderTh>
                                <HeaderTh className="fiexed-header large-cell" scope="col">주문시 출고예정일</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">묶음배송번호</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">수취인전화번호</HeaderTh>
                                <HeaderTh className="fiexed-header xlarge-cell" scope="col">수취인 주소</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">구매자전화번호</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">우편번호</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">배송메세지</HeaderTh>
                                <HeaderTh className="fiexed-header" scope="col">주문일시</HeaderTh>
                            </tr>
                        </thead>
                        <tbody>
                            {props.excelData?.map((data, index) => {
                                return (
                                    <BodyTr
                                        key={'subitem' + index}
                                    >
                                        <BodyTd>{data.prodOrderNumber}</BodyTd>
                                        <BodyTd>{data.buyer}</BodyTd>
                                        <BodyTd>{data.receiver}</BodyTd>
                                        <BodyTd>{data.prodNumber}</BodyTd>
                                        <BodyTd>{data.prodName}</BodyTd>
                                        <BodyTd>{data.prodExposureName}</BodyTd>
                                        <BodyTd>{data.optionInfo}</BodyTd>
                                        <BodyTd>{data.optionManagementCode}</BodyTd>
                                        <BodyTd>{data.coupangOptionId}</BodyTd>
                                        <BodyTd>{data.unit}</BodyTd>
                                        <BodyTd>{dateToYYMMDDhhmmss(data.shipmentDueDate)}</BodyTd>
                                        <BodyTd>{data.shipmentCostBundleNumber}</BodyTd>
                                        <BodyTd>{data.receiverContact1}</BodyTd>
                                        <BodyTd>{data.destination}</BodyTd>
                                        <BodyTd>{data.buyerContact}</BodyTd>
                                        <BodyTd>{data.zipCode}</BodyTd>
                                        <BodyTd>{data.deliveryMessage}</BodyTd>
                                        <BodyTd>{dateToYYMMDDhhmmss(data.orderDateTime)}</BodyTd>
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

export default DeliveryReadyUploadCoupangBody;